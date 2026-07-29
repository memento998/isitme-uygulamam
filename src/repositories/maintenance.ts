import { getDb, newId } from '@/db/database';
import type { MaintenanceLog, MaintenanceReminder, MaintenanceType } from '@/types/models';
import { addDays, todayISO } from '@/services/date';

interface ReminderRow {
  id: string;
  device_id: string;
  type: string;
  enabled: number;
  interval_days: number;
  last_done_at: string | null;
  created_at: string;
}

interface LogRow {
  id: string;
  device_id: string;
  type: string;
  done_at: string;
  note: string | null;
}

function mapReminder(row: ReminderRow): MaintenanceReminder {
  return {
    id: row.id,
    deviceId: row.device_id,
    type: row.type as MaintenanceType,
    enabled: row.enabled === 1,
    intervalDays: row.interval_days,
    lastDoneAt: row.last_done_at,
    createdAt: row.created_at,
  };
}

function mapLog(row: LogRow): MaintenanceLog {
  return {
    id: row.id,
    deviceId: row.device_id,
    type: row.type as MaintenanceType,
    doneAt: row.done_at,
    note: row.note,
  };
}

/** Cihaz tipine göre varsayılan bakım hatırlatıcıları (kapalı olarak oluşturulur, kullanıcı açar). */
export const DEFAULT_REMINDER_INTERVALS: Record<MaintenanceType, number> = {
  battery: 7,
  charge: 1,
  filter: 30,
  tube: 30,
  dome: 30,
  cleaning: 7,
  clinic: 180,
  warranty: 0, // Garanti bitişi aralıklı değildir; garanti tarihine göre hatırlatılır.
};

export async function listRemindersForDevice(deviceId: string): Promise<MaintenanceReminder[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<ReminderRow>(
    'SELECT * FROM maintenance_reminders WHERE device_id = ? ORDER BY created_at ASC',
    [deviceId]
  );
  return rows.map(mapReminder);
}

export async function listAllReminders(): Promise<MaintenanceReminder[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<ReminderRow>('SELECT * FROM maintenance_reminders');
  return rows.map(mapReminder);
}

/** Yeni cihaz için cihaz güç tipine uygun varsayılan hatırlatıcı setini oluşturur. */
export async function createDefaultReminders(
  deviceId: string,
  powerType: 'battery' | 'rechargeable'
): Promise<void> {
  const types: MaintenanceType[] = [
    powerType === 'battery' ? 'battery' : 'charge',
    'filter',
    'tube',
    'dome',
    'cleaning',
    'clinic',
    'warranty',
  ];
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const type of types) {
      await db.runAsync(
        'INSERT INTO maintenance_reminders (id, device_id, type, enabled, interval_days, last_done_at, created_at) VALUES (?, ?, ?, 0, ?, NULL, ?)',
        [newId(), deviceId, type, DEFAULT_REMINDER_INTERVALS[type], todayISO()]
      );
    }
  });
}

export async function updateReminder(
  id: string,
  fields: { enabled: boolean; intervalDays: number }
): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE maintenance_reminders SET enabled = ?, interval_days = ? WHERE id = ?', [
    fields.enabled ? 1 : 0,
    fields.intervalDays,
    id,
  ]);
}

/** Bakım işlemini "yapıldı" olarak kaydeder: geçmişe log ekler ve son yapılma tarihini günceller. */
export async function markReminderDone(
  reminder: MaintenanceReminder,
  doneAt: string,
  note: string | null
): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      'INSERT INTO maintenance_logs (id, device_id, type, done_at, note) VALUES (?, ?, ?, ?, ?)',
      [newId(), reminder.deviceId, reminder.type, doneAt, note]
    );
    await db.runAsync('UPDATE maintenance_reminders SET last_done_at = ? WHERE id = ?', [
      doneAt,
      reminder.id,
    ]);
  });
}

export async function listLogsForDevice(deviceId: string): Promise<MaintenanceLog[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<LogRow>(
    'SELECT * FROM maintenance_logs WHERE device_id = ? ORDER BY done_at DESC',
    [deviceId]
  );
  return rows.map(mapLog);
}

export async function listAllLogs(): Promise<MaintenanceLog[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<LogRow>('SELECT * FROM maintenance_logs');
  return rows.map(mapLog);
}

export async function deleteLog(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM maintenance_logs WHERE id = ?', [id]);
}

/**
 * Hatırlatıcının bir sonraki planlanan tarihi.
 * Garanti tipi için cihaz garanti bitiş tarihi esas alınır (çağıran taraf sağlar).
 */
export function nextReminderDate(
  reminder: MaintenanceReminder,
  warrantyEndDate: string | null
): string | null {
  if (reminder.type === 'warranty') return warrantyEndDate;
  if (reminder.intervalDays <= 0) return null;
  const base = reminder.lastDoneAt ?? reminder.createdAt;
  return addDays(base, reminder.intervalDays);
}
