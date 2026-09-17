import type { SQLiteDatabase } from 'expo-sqlite';

import { getDb, newId } from '@/db/database';
import { insertCheckupRows } from '@/repositories/checkups';
import { insertDefaultReminderRows } from '@/repositories/maintenance';
import { persistPickedPhoto, removeAppOwnedPhoto } from '@/services/photos';
import type { Device, EarSide, PowerType } from '@/types/models';
import { todayISO } from '@/services/date';

interface DeviceRow {
  id: string;
  name: string;
  brand: string;
  model: string;
  ear_side: string;
  start_date: string;
  serial_number: string | null;
  warranty_end_date: string | null;
  power_type: string;
  clinic_name: string | null;
  clinic_phone: string | null;
  notes: string | null;
  photo_uri: string | null;
  reminders_enabled: number;
  created_at: string;
}

function mapRow(row: DeviceRow): Device {
  return {
    id: row.id,
    name: row.name,
    brand: row.brand,
    model: row.model,
    earSide: row.ear_side as EarSide,
    startDate: row.start_date,
    serialNumber: row.serial_number,
    warrantyEndDate: row.warranty_end_date,
    powerType: row.power_type as PowerType,
    clinicName: row.clinic_name,
    clinicPhone: row.clinic_phone,
    notes: row.notes,
    photoUri: row.photo_uri,
    remindersEnabled: row.reminders_enabled === 1,
    createdAt: row.created_at,
  };
}

export type DeviceInput = Omit<Device, 'id' | 'createdAt'>;

async function persistPhotoIfNeeded(photoUri: string | null): Promise<string | null> {
  if (!photoUri) return null;
  return persistPickedPhoto(photoUri);
}

async function insertDeviceRow(db: SQLiteDatabase, device: Device): Promise<void> {
  await db.runAsync(
    `INSERT INTO devices (
      id, name, brand, model, ear_side, start_date, serial_number, warranty_end_date,
      power_type, clinic_name, clinic_phone, notes, photo_uri, reminders_enabled, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      device.id,
      device.name,
      device.brand,
      device.model,
      device.earSide,
      device.startDate,
      device.serialNumber,
      device.warrantyEndDate,
      device.powerType,
      device.clinicName,
      device.clinicPhone,
      device.notes,
      device.photoUri,
      device.remindersEnabled ? 1 : 0,
      device.createdAt,
    ]
  );
}

export async function listDevices(): Promise<Device[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<DeviceRow>('SELECT * FROM devices ORDER BY created_at DESC');
  return rows.map(mapRow);
}

export async function getDevice(id: string): Promise<Device | null> {
  const db = await getDb();
  const row = await db.getFirstAsync<DeviceRow>('SELECT * FROM devices WHERE id = ?', [id]);
  return row ? mapRow(row) : null;
}

export async function createDevice(input: DeviceInput): Promise<Device> {
  const photoUri = await persistPhotoIfNeeded(input.photoUri);
  const device: Device = { ...input, photoUri, id: newId(), createdAt: todayISO() };
  const db = await getDb();
  try {
    await insertDeviceRow(db, device);
  } catch (error) {
    if (photoUri && photoUri !== input.photoUri) removeAppOwnedPhoto(photoUri);
    throw error;
  }
  return device;
}

/**
 * Yeni cihazı, kontrol takvimini ve varsayılan hatırlatıcı kayıtlarını tek SQLite
 * işleminde yazar. Bildirim senkronu çağıranın işlem dışında yapması gerekir.
 */
export async function createDeviceWithInitialData(
  input: DeviceInput,
  schedule: readonly { title: string; dueDate: string }[]
): Promise<Device> {
  const photoUri = await persistPhotoIfNeeded(input.photoUri);
  const device: Device = { ...input, photoUri, id: newId(), createdAt: todayISO() };
  const db = await getDb();
  try {
    await db.withTransactionAsync(async () => {
      await insertDeviceRow(db, device);
      await insertCheckupRows(db, device.id, schedule);
      await insertDefaultReminderRows(db, device.id, device.powerType);
    });
  } catch (error) {
    if (photoUri && photoUri !== input.photoUri) removeAppOwnedPhoto(photoUri);
    throw error;
  }
  return device;
}

export async function updateDevice(id: string, input: DeviceInput): Promise<void> {
  const existing = await getDevice(id);
  const previousUri = existing?.photoUri ?? null;
  const nextPhotoUri = await persistPhotoIfNeeded(input.photoUri);

  const db = await getDb();
  try {
    await db.runAsync(
      `UPDATE devices SET
        name = ?, brand = ?, model = ?, ear_side = ?, start_date = ?, serial_number = ?,
        warranty_end_date = ?, power_type = ?, clinic_name = ?, clinic_phone = ?, notes = ?,
        photo_uri = ?, reminders_enabled = ?
      WHERE id = ?`,
      [
        input.name,
        input.brand,
        input.model,
        input.earSide,
        input.startDate,
        input.serialNumber,
        input.warrantyEndDate,
        input.powerType,
        input.clinicName,
        input.clinicPhone,
        input.notes,
        nextPhotoUri,
        input.remindersEnabled ? 1 : 0,
        id,
      ]
    );
  } catch (error) {
    if (nextPhotoUri && nextPhotoUri !== input.photoUri && nextPhotoUri !== previousUri) {
      removeAppOwnedPhoto(nextPhotoUri);
    }
    throw error;
  }

  if (previousUri && previousUri !== nextPhotoUri) {
    removeAppOwnedPhoto(previousUri);
  }
}

/** Cihazı ve ilişkili tüm kayıtları siler (ON DELETE CASCADE). */
export async function deleteDevice(id: string): Promise<void> {
  const existing = await getDevice(id);
  const db = await getDb();
  await db.runAsync('DELETE FROM devices WHERE id = ?', [id]);
  removeAppOwnedPhoto(existing?.photoUri);
}
