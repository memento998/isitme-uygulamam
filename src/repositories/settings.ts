import { getDb } from '@/db/database';
import { isAppLocale, type LanguagePreference } from '@/i18n/locales';
import { isValidISODate } from '@/services/date';
import type { AppSettings } from '@/types/models';

export const DEFAULT_SETTINGS: AppSettings = {
  notificationHour: 9,
  notificationMinute: 0,
  languagePreference: null,
  knowledgeCycleStartDate: null,
  dailyKnowledgeEnabled: false,
  dailyKnowledgeHour: 10,
  dailyKnowledgeMinute: 0,
  dailyKnowledgePromptSeen: false,
};

async function settingsMap(): Promise<Map<string, string>> {
  const db = await getDb();
  const rows = await db.getAllAsync<{ key: string; value: string }>('SELECT * FROM settings');
  return new Map(rows.map((r) => [r.key, r.value]));
}

function parseHour(value: string | undefined, fallback: number): number {
  const hour = Number(value);
  return Number.isInteger(hour) && hour >= 0 && hour <= 23 ? hour : fallback;
}

function parseMinute(value: string | undefined, fallback: number): number {
  const minute = Number(value);
  return Number.isInteger(minute) && minute >= 0 && minute <= 59 ? minute : fallback;
}

export async function getSettings(): Promise<AppSettings> {
  const map = await settingsMap();
  const rawLanguage = map.get('languagePreference');
  let languagePreference: LanguagePreference | null = null;
  if (rawLanguage === 'system' || (rawLanguage && isAppLocale(rawLanguage))) {
    languagePreference = rawLanguage;
  }

  const start = map.get('knowledgeCycleStartDate');
  return {
    notificationHour: parseHour(map.get('notificationHour'), DEFAULT_SETTINGS.notificationHour),
    notificationMinute: parseMinute(
      map.get('notificationMinute'),
      DEFAULT_SETTINGS.notificationMinute
    ),
    languagePreference,
    knowledgeCycleStartDate: start && isValidISODate(start) ? start : null,
    dailyKnowledgeEnabled: map.get('dailyKnowledgeEnabled') === '1',
    dailyKnowledgeHour: parseHour(map.get('dailyKnowledgeHour'), DEFAULT_SETTINGS.dailyKnowledgeHour),
    dailyKnowledgeMinute: parseMinute(
      map.get('dailyKnowledgeMinute'),
      DEFAULT_SETTINGS.dailyKnowledgeMinute
    ),
    dailyKnowledgePromptSeen: map.get('dailyKnowledgePromptSeen') === '1',
  };
}

async function writeSetting(key: string, value: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [key, value]);
}

export async function saveSettings(settings: Pick<AppSettings, 'notificationHour' | 'notificationMinute'>): Promise<void> {
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

export async function getLanguagePreference(): Promise<LanguagePreference | null> {
  const settings = await getSettings();
  return settings.languagePreference;
}

export async function saveLanguagePreference(preference: LanguagePreference): Promise<void> {
  await writeSetting('languagePreference', preference);
}

export async function saveDailyKnowledgeSettings(input: {
  enabled: boolean;
  hour: number;
  minute: number;
}): Promise<void> {
  const db = await getDb();
  await db.withTransactionAsync(async () => {
    await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [
      'dailyKnowledgeEnabled',
      input.enabled ? '1' : '0',
    ]);
    await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [
      'dailyKnowledgeHour',
      String(input.hour),
    ]);
    await db.runAsync('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)', [
      'dailyKnowledgeMinute',
      String(input.minute),
    ]);
  });
}

export async function markDailyKnowledgePromptSeen(): Promise<void> {
  await writeSetting('dailyKnowledgePromptSeen', '1');
}

/** İlk kullanımda yerel başlangıç tarihini kalıcı olarak yazar. */
export async function ensureKnowledgeCycleStart(todayIso: string): Promise<string> {
  const settings = await getSettings();
  if (settings.knowledgeCycleStartDate) return settings.knowledgeCycleStartDate;
  await writeSetting('knowledgeCycleStartDate', todayIso);
  return todayIso;
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
    await db.runAsync('DELETE FROM knowledge_day_assignments');
    await db.runAsync('DELETE FROM knowledge_notification_plans');
    await db.runAsync('DELETE FROM settings');
  });
}
