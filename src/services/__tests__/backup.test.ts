import type { BackupPayload } from '../backup';
import { isValidBackup } from '../backup';

function validBackup(overrides: Partial<BackupPayload> = {}): BackupPayload {
  return {
    app: 'isitme-takip',
    version: 1,
    exportedAt: '2026-09-17T12:00:00.000Z',
    devices: [
      {
        id: 'dev-1',
        name: 'Sağ Kulak Cihazım',
        brand: 'Phonak',
        model: '',
        earSide: 'right',
        startDate: '2025-07-01',
        serialNumber: 'PH-1',
        warrantyEndDate: '2027-07-01',
        powerType: 'battery',
        clinicName: 'Klinik',
        clinicPhone: '0212 555 12 34',
        notes: null,
        photoUri: null,
        remindersEnabled: true,
        createdAt: '2025-07-01',
      },
    ],
    checkups: [
      {
        id: 'chk-1',
        deviceId: 'dev-1',
        title: '1. ay kontrolü',
        dueDate: '2025-08-01',
        completedAt: null,
        note: null,
        createdAt: '2025-07-01',
      },
    ],
    maintenanceReminders: [
      {
        id: 'rem-1',
        deviceId: 'dev-1',
        type: 'cleaning',
        enabled: false,
        intervalDays: 7,
        lastDoneAt: null,
        createdAt: '2025-07-01',
      },
    ],
    maintenanceLogs: [
      {
        id: 'log-1',
        deviceId: 'dev-1',
        type: 'cleaning',
        doneAt: '2025-07-10',
        note: null,
      },
    ],
    serviceRecords: [
      {
        id: 'srv-1',
        deviceId: 'dev-1',
        date: '2025-09-01',
        title: 'Servis',
        description: null,
        createdAt: '2025-09-01',
      },
    ],
    settings: { notificationHour: 9, notificationMinute: 0 },
    ...overrides,
  };
}

describe('isValidBackup', () => {
  test('geçerli güncel yedeği kabul eder', () => {
    expect(isValidBackup(validBackup())).toBe(true);
  });

  test('ayarları olmayan geçerli yedeği kabul eder', () => {
    const backup = validBackup();
    delete backup.settings;
    expect(isValidBackup(backup)).toBe(true);
  });

  test('kök nesne değilse reddeder', () => {
    expect(isValidBackup(null)).toBe(false);
    expect(isValidBackup('{"app":"isitme-takip"}')).toBe(false);
  });

  test('gelecek sürümü reddeder', () => {
    expect(isValidBackup(validBackup({ version: 2 }))).toBe(false);
  });

  test('eksik devices dizisini reddeder', () => {
    const backup = validBackup();
    delete (backup as { devices?: unknown }).devices;
    expect(isValidBackup(backup)).toBe(false);
  });

  test('devices içinde nesne olmayan elemanı reddeder', () => {
    expect(isValidBackup(validBackup({ devices: ['wrong'] as never }))).toBe(false);
  });

  test('var olmayan deviceId ilişkisini reddeder', () => {
    const backup = validBackup();
    backup.checkups[0].deviceId = 'missing-device';
    expect(isValidBackup(backup)).toBe(false);
  });

  test('geçersiz tarihi reddeder', () => {
    const backup = validBackup();
    backup.devices[0].startDate = '17.09.2026';
    expect(isValidBackup(backup)).toBe(false);
  });

  test('yinelenen cihaz kimliğini reddeder', () => {
    const backup = validBackup();
    backup.devices.push({ ...backup.devices[0] });
    expect(isValidBackup(backup)).toBe(false);
  });

  test('geçersiz ayar aralığını reddeder', () => {
    expect(
      isValidBackup(validBackup({ settings: { notificationHour: 24, notificationMinute: 0 } }))
    ).toBe(false);
  });
});
