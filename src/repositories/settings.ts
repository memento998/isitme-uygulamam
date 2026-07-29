import { getDb } from '@/db/database';
import type { AppSettings } from '@/types/models';

export const DEFAULT_SETTINGS: AppSettings = {
  notificationHour: 9,
  notificationMinute: 0,
};

export async function getSettings(): Promise<AppSettings> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ key: string; value: string }>('SELECT * FROM settings');
  const map = new Map(rows.map((r) => [r.key, r.value]));
  const hour = Number(map.get('notificationHour'));
  const minute = Number(map.get('notificationMinute'));
  return {
    notificationHour:
      Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : DEFAULT_SETTINGS.notificationHour,
    notificationMinute:
      Number.isInteger(minute) && minute >= 0 && minute <= 59
        ? minute
        : DEFAULT_SETTINGS.notificationMinute,
  };
}

export async function saveSettings(settings: AppSettings): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [
      'notificationHour',
      String(settings.notificationHour),
    ]);
    await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [
      'notificationMinute',
      String(settings.notificationMinute),
    ]);
  });
}

/** Tüm kullanıcı verilerini kalıcı olarak siler. */
export async function deleteAllData(): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('DELETE FROM checkups');
    await db.runAsync('DELETE FROM maintenance_logs');
    await db.runAsync('DELETE FROM maintenance_reminders');
    await db.runAsync('DELETE FROM service_records');
    await db.runAsync('DELETE FROM devices');
    await db.runAsync('DELETE FROM settings');
  });
}
