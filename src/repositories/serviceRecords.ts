import { getDb, newId } from '@/db/database';
import type { ServiceRecord } from '@/types/models';
import { todayISO } from '@/services/date';

interface ServiceRecordRow {
  id: string;
  device_id: string;
  date: string;
  title: string;
  description: string | null;
  created_at: string;
}

function mapRow(row: ServiceRecordRow): ServiceRecord {
  return {
    id: row.id,
    deviceId: row.device_id,
    date: row.date,
    title: row.title,
    description: row.description,
    createdAt: row.created_at,
  };
}

export async function listServiceRecordsForDevice(deviceId: string): Promise<ServiceRecord[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<ServiceRecordRow>(
    'SELECT * FROM service_records WHERE device_id = ? ORDER BY date DESC',
    [deviceId]
  );
  return rows.map(mapRow);
}

export async function listAllServiceRecords(): Promise<ServiceRecord[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<ServiceRecordRow>('SELECT * FROM service_records');
  return rows.map(mapRow);
}

export async function createServiceRecord(
  deviceId: string,
  fields: { date: string; title: string; description: string | null }
): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    'INSERT INTO service_records (id, device_id, date, title, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [newId(), deviceId, fields.date, fields.title, fields.description, todayISO()]
  );
}

export async function deleteServiceRecord(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync('DELETE FROM service_records WHERE id = ?', [id]);
}
