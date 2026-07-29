import { getDb, newId } from '@/db/database';
import type { Checkup } from '@/types/models';
import { todayISO } from '@/services/date';

interface CheckupRow {
  id: string;
  device_id: string;
  title: string;
  due_date: string;
  completed_at: string | null;
  note: string | null;
  created_at: string;
}

function mapRow(row: CheckupRow): Checkup {
  return {
    id: row.id,
    deviceId: row.device_id,
    title: row.title,
    dueDate: row.due_date,
    completedAt: row.completed_at,
    note: row.note,
    createdAt: row.created_at,
  };
}

export async function listCheckupsForDevice(deviceId: string): Promise<Checkup[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<CheckupRow>(
    'SELECT * FROM checkups WHERE device_id = ? ORDER BY due_date ASC',
    [deviceId]
  );
  return rows.map(mapRow);
}

export async function listAllCheckups(): Promise<Checkup[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<CheckupRow>('SELECT * FROM checkups ORDER BY due_date ASC');
  return rows.map(mapRow);
}

export async function createCheckup(
  deviceId: string,
  title: string,
  dueDate: string
): Promise<Checkup> {
  const db = await getDb();
  const checkup: Checkup = {
    id: newId(),
    deviceId,
    title,
    dueDate,
    completedAt: null,
    note: null,
    createdAt: todayISO(),
  };
  await db.runAsync(
    'INSERT INTO checkups (id, device_id, title, due_date, completed_at, note, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [checkup.id, checkup.deviceId, checkup.title, checkup.dueDate, null, null, checkup.createdAt]
  );
  return checkup;
}

export async function createCheckups(
  deviceId: string,
  entries: readonly { title: string; dueDate: string }[]
): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    for (const entry of entries) {
      await db.runAsync(
        'INSERT INTO checkups (id, device_id, title, due_date, completed_at, note, created_at) VALUES (?, ?, ?, ?, NULL, NULL, ?)',
        [newId(), deviceId, entry.title, entry.dueDate, todayISO()]
      );
    }
  });
}

export async function updateCheckup(
  id: string,
  fields: { title: string; dueDate: string }
): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE checkups SET title = ?, due_date = ? WHERE id = ?', [
    fields.title,
    fields.dueDate,
    id,
  ]);
}

/** Kontrolü, gerçek tamamlanma tarihi ve isteğe bağlı notla tamamlandı olarak işaretler. */
export async function completeCheckup(
  id: string,
  completedAt: string,
  note: string | null
): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE checkups SET completed_at = ?, note = ? WHERE id = ?', [
    completedAt,
    note,
    id,
  ]);
}

/** Tamamlama işlemini geri alır. */
export async function reopenCheckup(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE checkups SET completed_at = NULL WHERE id = ?', [id]);
}

export async function updateCheckupNote(id: string, note: string | null): Promise<void> {
  const db = await getDb();
  await db.runAsync('UPDATE checkups SET note = ? WHERE id = ?', [note, id]);
}

export async function deleteCheckup(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM checkups WHERE id = ?', [id]);
}
