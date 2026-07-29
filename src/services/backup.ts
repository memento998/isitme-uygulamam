/**
 * Yedekleme ve geri yükleme: tüm veriler tek bir JSON dosyasına aktarılır,
 * aynı biçimdeki dosyadan geri yüklenir.
 */
import { Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import { getDb, newId } from '@/db/database';
import { listAllCheckups } from '@/repositories/checkups';
import { listDevices } from '@/repositories/devices';
import { listAllLogs, listAllReminders } from '@/repositories/maintenance';
import { listAllServiceRecords } from '@/repositories/serviceRecords';
import { getSettings, saveSettings } from '@/repositories/settings';
import type {
  AppSettings,
  Checkup,
  Device,
  MaintenanceLog,
  MaintenanceReminder,
  ServiceRecord,
} from '@/types/models';
import { todayISO } from './date';

export interface BackupPayload {
  app: string;
  version: number;
  exportedAt: string;
  devices: Device[];
  checkups: Checkup[];
  maintenanceReminders: MaintenanceReminder[];
  maintenanceLogs: MaintenanceLog[];
  serviceRecords: ServiceRecord[];
  settings: AppSettings;
}

const BACKUP_APP_ID = 'isitme-takip';
const BACKUP_VERSION = 1;

export async function buildBackupPayload(): Promise<BackupPayload> {
  const [devices, checkups, reminders, logs, records, settings] = await Promise.all([
    listDevices(),
    listAllCheckups(),
    listAllReminders(),
    listAllLogs(),
    listAllServiceRecords(),
    getSettings(),
  ]);
  return {
    app: BACKUP_APP_ID,
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    devices,
    checkups,
    maintenanceReminders: reminders,
    maintenanceLogs: logs,
    serviceRecords: records,
    settings,
  };
}

/** Yedeği JSON dosyası olarak dışa aktarır (paylaşım penceresi / indirme). */
export async function exportBackup(): Promise<void> {
  const payload = await buildBackupPayload();
  const json = JSON.stringify(payload, null, 2);
  const fileName = `isitme-takip-yedek-${todayISO()}.json`;

  if (Platform.OS === 'web') {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    URL.revokeObjectURL(url);
    return;
  }

  const file = new File(Paths.cache, fileName);
  if (file.exists) file.delete();
  file.create();
  file.write(json);
  await Sharing.shareAsync(file.uri, {
    mimeType: 'application/json',
    dialogTitle: 'Yedeği paylaş',
  });
}

function isValidBackup(data: unknown): data is BackupPayload {
  if (typeof data !== 'object' || data === null) return false;
  const d = data as Record<string, unknown>;
  return (
    d.app === BACKUP_APP_ID &&
    typeof d.version === 'number' &&
    Array.isArray(d.devices) &&
    Array.isArray(d.checkups) &&
    Array.isArray(d.maintenanceReminders) &&
    Array.isArray(d.maintenanceLogs) &&
    Array.isArray(d.serviceRecords)
  );
}

/**
 * Kullanıcının seçtiği JSON dosyasından verileri geri yükler.
 * Mevcut tüm veriler silinir ve yedekteki verilerle değiştirilir.
 * @returns Geri yüklenen cihaz sayısı; kullanıcı seçim yapmazsa null.
 */
export async function restoreBackup(): Promise<number | null> {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/json',
    copyToCacheDirectory: true,
  });
  if (result.canceled || result.assets.length === 0) return null;

  const asset = result.assets[0];
  let text: string;
  if (Platform.OS === 'web') {
    const response = await fetch(asset.uri);
    text = await response.text();
  } else {
    text = await new File(asset.uri).text();
  }

  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error('Dosya geçerli bir JSON değil.');
  }
  if (!isValidBackup(data)) {
    throw new Error('Dosya geçerli bir İşitme Takip yedeği değil.');
  }

  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM checkups');
    await db.runAsync('DELETE FROM maintenance_logs');
    await db.runAsync('DELETE FROM maintenance_reminders');
    await db.runAsync('DELETE FROM service_records');
    await db.runAsync('DELETE FROM devices');

    for (const device of data.devices) {
      await db.runAsync(
        `INSERT INTO devices (
          id, name, brand, model, ear_side, start_date, serial_number, warranty_end_date,
          power_type, clinic_name, clinic_phone, notes, photo_uri, reminders_enabled, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          device.id ?? newId(),
          device.name ?? 'Cihaz',
          device.brand ?? '',
          device.model ?? '',
          device.earSide ?? 'both',
          device.startDate ?? todayISO(),
          device.serialNumber ?? null,
          device.warrantyEndDate ?? null,
          device.powerType ?? 'battery',
          device.clinicName ?? null,
          device.clinicPhone ?? null,
          device.notes ?? null,
          device.photoUri ?? null,
          device.remindersEnabled ? 1 : 0,
          device.createdAt ?? todayISO(),
        ]
      );
    }
    for (const checkup of data.checkups) {
      await db.runAsync(
        'INSERT INTO checkups (id, device_id, title, due_date, completed_at, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          checkup.id ?? newId(),
          checkup.deviceId,
          checkup.title ?? 'Kontrol',
          checkup.dueDate ?? todayISO(),
          checkup.completedAt ?? null,
          checkup.note ?? null,
          checkup.createdAt ?? todayISO(),
        ]
      );
    }
    for (const reminder of data.maintenanceReminders) {
      await db.runAsync(
        'INSERT INTO maintenance_reminders (id, device_id, type, enabled, interval_days, last_done_at, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [
          reminder.id ?? newId(),
          reminder.deviceId,
          reminder.type ?? 'cleaning',
          reminder.enabled ? 1 : 0,
          reminder.intervalDays ?? 30,
          reminder.lastDoneAt ?? null,
          reminder.createdAt ?? todayISO(),
        ]
      );
    }
    for (const log of data.maintenanceLogs) {
      await db.runAsync(
        'INSERT INTO maintenance_logs (id, device_id, type, done_at, note) VALUES (?, ?, ?, ?, ?)',
        [log.id ?? newId(), log.deviceId, log.type ?? 'cleaning', log.doneAt ?? todayISO(), log.note ?? null]
      );
    }
    for (const record of data.serviceRecords) {
      await db.runAsync(
        'INSERT INTO service_records (id, device_id, date, title, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [
          record.id ?? newId(),
          record.deviceId,
          record.date ?? todayISO(),
          record.title ?? 'Servis kaydı',
          record.description ?? null,
          record.createdAt ?? todayISO(),
        ]
      );
    }
  });

  if (data.settings) {
    await saveSettings({
      notificationHour: data.settings.notificationHour ?? 9,
      notificationMinute: data.settings.notificationMinute ?? 0,
    });
  }

  return data.devices.length;
}
