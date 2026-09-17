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
  EarSide,
  MaintenanceLog,
  MaintenanceReminder,
  MaintenanceType,
  PowerType,
  ServiceRecord,
} from '@/types/models';
import { isValidISODate, todayISO } from './date';

/**
 * JSON yedek biçimi. Fotoğraf dosyalarının kendisi dahil edilmez;
 * `photoUri` yalnızca saklanan yol/URI metnidir.
 */
export interface BackupPayload {
  app: string;
  version: number;
  exportedAt: string;
  devices: Device[];
  checkups: Checkup[];
  maintenanceReminders: MaintenanceReminder[];
  maintenanceLogs: MaintenanceLog[];
  serviceRecords: ServiceRecord[];
  settings?: AppSettings;
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

const EAR_SIDES: readonly EarSide[] = ['left', 'right', 'both'];
const POWER_TYPES: readonly PowerType[] = ['battery', 'rechargeable'];
const MAINTENANCE_TYPES: readonly MaintenanceType[] = [
  'battery',
  'charge',
  'filter',
  'tube',
  'dome',
  'cleaning',
  'clinic',
  'warranty',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0;
}

function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === 'string';
}

function isIsoDate(value: unknown): value is string {
  return typeof value === 'string' && isValidISODate(value);
}

function isNullableIsoDate(value: unknown): value is string | null {
  return value === null || isIsoDate(value);
}

function isEarSide(value: unknown): value is EarSide {
  return typeof value === 'string' && (EAR_SIDES as readonly string[]).includes(value);
}

function isPowerType(value: unknown): value is PowerType {
  return typeof value === 'string' && (POWER_TYPES as readonly string[]).includes(value);
}

function isMaintenanceType(value: unknown): value is MaintenanceType {
  return typeof value === 'string' && (MAINTENANCE_TYPES as readonly string[]).includes(value);
}

function hasUniqueIds(items: readonly { id: string }[]): boolean {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
  }
  return true;
}

function isValidDevice(value: unknown): value is Device {
  if (!isRecord(value)) return false;
  return (
    isNonEmptyString(value.id) &&
    typeof value.name === 'string' &&
    typeof value.brand === 'string' &&
    typeof value.model === 'string' &&
    isEarSide(value.earSide) &&
    isIsoDate(value.startDate) &&
    isNullableString(value.serialNumber) &&
    isNullableIsoDate(value.warrantyEndDate) &&
    isPowerType(value.powerType) &&
    isNullableString(value.clinicName) &&
    isNullableString(value.clinicPhone) &&
    isNullableString(value.notes) &&
    isNullableString(value.photoUri) &&
    typeof value.remindersEnabled === 'boolean' &&
    isIsoDate(value.createdAt)
  );
}

function isValidCheckup(value: unknown, deviceIds: Set<string>): value is Checkup {
  if (!isRecord(value)) return false;
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.deviceId) &&
    deviceIds.has(value.deviceId) &&
    typeof value.title === 'string' &&
    isIsoDate(value.dueDate) &&
    isNullableIsoDate(value.completedAt) &&
    isNullableString(value.note) &&
    isIsoDate(value.createdAt)
  );
}

function isValidReminder(value: unknown, deviceIds: Set<string>): value is MaintenanceReminder {
  if (!isRecord(value)) return false;
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.deviceId) &&
    deviceIds.has(value.deviceId) &&
    isMaintenanceType(value.type) &&
    typeof value.enabled === 'boolean' &&
    typeof value.intervalDays === 'number' &&
    Number.isInteger(value.intervalDays) &&
    value.intervalDays >= 0 &&
    isNullableIsoDate(value.lastDoneAt) &&
    isIsoDate(value.createdAt)
  );
}

function isValidLog(value: unknown, deviceIds: Set<string>): value is MaintenanceLog {
  if (!isRecord(value)) return false;
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.deviceId) &&
    deviceIds.has(value.deviceId) &&
    isMaintenanceType(value.type) &&
    isIsoDate(value.doneAt) &&
    isNullableString(value.note)
  );
}

function isValidServiceRecord(value: unknown, deviceIds: Set<string>): value is ServiceRecord {
  if (!isRecord(value)) return false;
  return (
    isNonEmptyString(value.id) &&
    isNonEmptyString(value.deviceId) &&
    deviceIds.has(value.deviceId) &&
    isIsoDate(value.date) &&
    typeof value.title === 'string' &&
    isNullableString(value.description) &&
    isIsoDate(value.createdAt)
  );
}

function isValidSettings(value: unknown): value is AppSettings {
  if (!isRecord(value)) return false;
  return (
    typeof value.notificationHour === 'number' &&
    Number.isInteger(value.notificationHour) &&
    value.notificationHour >= 0 &&
    value.notificationHour <= 23 &&
    typeof value.notificationMinute === 'number' &&
    Number.isInteger(value.notificationMinute) &&
    value.notificationMinute >= 0 &&
    value.notificationMinute <= 59
  );
}

/** Geri yüklemeden önce yedeğin şema, kayıt ve ilişkilerini doğrular. */
export function isValidBackup(data: unknown): data is BackupPayload {
  if (!isRecord(data)) return false;
  if (data.app !== BACKUP_APP_ID) return false;
  if (data.version !== BACKUP_VERSION) return false;
  if (
    !Array.isArray(data.devices) ||
    !Array.isArray(data.checkups) ||
    !Array.isArray(data.maintenanceReminders) ||
    !Array.isArray(data.maintenanceLogs) ||
    !Array.isArray(data.serviceRecords)
  ) {
    return false;
  }
  if (data.settings !== undefined && !isValidSettings(data.settings)) return false;

  if (!data.devices.every(isValidDevice)) return false;
  if (!hasUniqueIds(data.devices)) return false;

  const deviceIds = new Set(data.devices.map((device) => device.id));
  if (!data.checkups.every((item) => isValidCheckup(item, deviceIds))) return false;
  if (!hasUniqueIds(data.checkups)) return false;
  if (!data.maintenanceReminders.every((item) => isValidReminder(item, deviceIds))) return false;
  if (!hasUniqueIds(data.maintenanceReminders)) return false;
  if (!data.maintenanceLogs.every((item) => isValidLog(item, deviceIds))) return false;
  if (!hasUniqueIds(data.maintenanceLogs)) return false;
  if (!data.serviceRecords.every((item) => isValidServiceRecord(item, deviceIds))) return false;
  if (!hasUniqueIds(data.serviceRecords)) return false;

  return true;
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
