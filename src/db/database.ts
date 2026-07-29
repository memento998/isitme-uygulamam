/**
 * SQLite veritabanı bağlantısı ve şema migrasyonları.
 * Expo Go uyumlu expo-sqlite kullanır; web'de wa-sqlite ile çalışır.
 */
import * as SQLite from 'expo-sqlite';

const DB_NAME = 'isitme-takip.db';
const SCHEMA_VERSION = 1;

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

async function migrate(db: SQLite.SQLiteDatabase): Promise<void> {
  const row = await db.getFirstAsync<{ user_version: number }>('PRAGMA user_version');
  const current = row?.user_version ?? 0;
  if (current >= SCHEMA_VERSION) return;

  if (current < 1) {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS devices (
        id TEXT PRIMARY KEY NOT NULL,
        name TEXT NOT NULL,
        brand TEXT NOT NULL,
        model TEXT NOT NULL,
        ear_side TEXT NOT NULL,
        start_date TEXT NOT NULL,
        serial_number TEXT,
        warranty_end_date TEXT,
        power_type TEXT NOT NULL,
        clinic_name TEXT,
        clinic_phone TEXT,
        notes TEXT,
        photo_uri TEXT,
        reminders_enabled INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS checkups (
        id TEXT PRIMARY KEY NOT NULL,
        device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        due_date TEXT NOT NULL,
        completed_at TEXT,
        note TEXT,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS maintenance_reminders (
        id TEXT PRIMARY KEY NOT NULL,
        device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        enabled INTEGER NOT NULL DEFAULT 0,
        interval_days INTEGER NOT NULL,
        last_done_at TEXT,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS maintenance_logs (
        id TEXT PRIMARY KEY NOT NULL,
        device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
        type TEXT NOT NULL,
        done_at TEXT NOT NULL,
        note TEXT
      );
      CREATE TABLE IF NOT EXISTS service_records (
        id TEXT PRIMARY KEY NOT NULL,
        device_id TEXT NOT NULL REFERENCES devices(id) ON DELETE CASCADE,
        date TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_checkups_device ON checkups(device_id);
      CREATE INDEX IF NOT EXISTS idx_reminders_device ON maintenance_reminders(device_id);
      CREATE INDEX IF NOT EXISTS idx_logs_device ON maintenance_logs(device_id);
      CREATE INDEX IF NOT EXISTS idx_service_device ON service_records(device_id);
    `);
  }

  await db.execAsync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
}

/** Veritabanı bağlantısını (tek örnek) döndürür; ilk çağrıda şemayı kurar. */
export function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbPromise) {
    dbPromise = (async () => {
      const db = await SQLite.openDatabaseAsync(DB_NAME);
      await db.execAsync('PRAGMA foreign_keys = ON');
      await migrate(db);
      return db;
    })().catch((error) => {
      dbPromise = null;
      throw error;
    });
  }
  return dbPromise;
}

/** Basit benzersiz kimlik üretir. */
export function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}
