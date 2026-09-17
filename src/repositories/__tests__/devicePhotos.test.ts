import type { DeviceInput } from '../devices';
import { createDevice, createDeviceWithInitialData, updateDevice } from '../devices';

const DOCUMENT_PHOTO = 'file:///data/user/0/com.isitmetakip.app/files/device-photos/copied.jpg';
const OLD_OWNED = 'file:///data/user/0/com.isitmetakip.app/files/device-photos/old.jpg';
const CACHE_URI = 'file:///data/user/0/com.isitmetakip.app/cache/picked.jpg';
const LEGACY_CACHE = 'file:///data/user/0/com.isitmetakip.app/cache/cropped-old.jpg';

const mockPersistPickedPhoto = jest.fn();
const mockRemoveAppOwnedPhoto = jest.fn();
const mockRunAsync = jest.fn();
const mockGetFirstAsync = jest.fn();
const mockWithTransactionAsync = jest.fn(async (fn: () => Promise<void>) => fn());
const mockInsertCheckupRows = jest.fn();
const mockInsertDefaultReminderRows = jest.fn();

jest.mock('@/services/photos', () => ({
  persistPickedPhoto: (...args: unknown[]) => mockPersistPickedPhoto(...args),
  removeAppOwnedPhoto: (...args: unknown[]) => mockRemoveAppOwnedPhoto(...args),
}));

jest.mock('@/db/database', () => ({
  getDb: jest.fn(async () => ({
    runAsync: mockRunAsync,
    getFirstAsync: mockGetFirstAsync,
    getAllAsync: jest.fn(),
    withTransactionAsync: mockWithTransactionAsync,
  })),
  newId: () => 'new-id',
}));

jest.mock('@/repositories/checkups', () => ({
  insertCheckupRows: (...args: unknown[]) => mockInsertCheckupRows(...args),
}));

jest.mock('@/repositories/maintenance', () => ({
  insertDefaultReminderRows: (...args: unknown[]) => mockInsertDefaultReminderRows(...args),
}));

function deviceInput(photoUri: string | null): DeviceInput {
  return {
    name: 'Cihaz',
    brand: 'Phonak',
    model: '',
    earSide: 'right',
    startDate: '2026-01-15',
    serialNumber: null,
    warrantyEndDate: null,
    powerType: 'battery',
    clinicName: null,
    clinicPhone: null,
    notes: null,
    photoUri,
    remindersEnabled: true,
  };
}

function existingRow(photoUri: string | null) {
  return {
    id: 'dev-1',
    name: 'Cihaz',
    brand: 'Phonak',
    model: '',
    ear_side: 'right',
    start_date: '2026-01-15',
    serial_number: null,
    warranty_end_date: null,
    power_type: 'battery',
    clinic_name: null,
    clinic_phone: null,
    notes: null,
    photo_uri: photoUri,
    reminders_enabled: 1,
    created_at: '2026-01-15',
  };
}

describe('device photo persistence', () => {
  beforeEach(() => {
    mockPersistPickedPhoto.mockReset();
    mockRemoveAppOwnedPhoto.mockReset();
    mockRunAsync.mockReset();
    mockGetFirstAsync.mockReset();
    mockWithTransactionAsync.mockReset();
    mockWithTransactionAsync.mockImplementation(async (fn: () => Promise<void>) => fn());
    mockInsertCheckupRows.mockReset();
    mockInsertDefaultReminderRows.mockReset();
    mockPersistPickedPhoto.mockImplementation(async (uri: string) =>
      uri.startsWith('file:///data/user/0/com.isitmetakip.app/files/device-photos/')
        ? uri
        : DOCUMENT_PHOTO
    );
    mockRunAsync.mockResolvedValue(undefined);
  });

  test('oluşturma başarısız olursa yeni kalıcı fotoğrafı siler', async () => {
    mockWithTransactionAsync.mockRejectedValue(new Error('db'));
    await expect(
      createDeviceWithInitialData(deviceInput(CACHE_URI), [{ title: '1. ay', dueDate: '2026-02-15' }])
    ).rejects.toThrow('db');
    expect(mockPersistPickedPhoto).toHaveBeenCalledWith(CACHE_URI);
    expect(mockRemoveAppOwnedPhoto).toHaveBeenCalledWith(DOCUMENT_PHOTO);
  });

  test('güncelleme başarısız olursa yeni kopyayı siler, eski dosyaya dokunmaz', async () => {
    mockGetFirstAsync.mockResolvedValue(existingRow(OLD_OWNED));
    mockRunAsync.mockRejectedValue(new Error('db'));
    await expect(updateDevice('dev-1', deviceInput(CACHE_URI))).rejects.toThrow('db');
    expect(mockRemoveAppOwnedPhoto).toHaveBeenCalledWith(DOCUMENT_PHOTO);
    expect(mockRemoveAppOwnedPhoto).not.toHaveBeenCalledWith(OLD_OWNED);
  });

  test('başarılı değiştirmede eski kalıcı fotoğrafı yalnızca DB yazımından sonra siler', async () => {
    const order: string[] = [];
    mockPersistPickedPhoto.mockImplementation(async () => {
      order.push('persist');
      return DOCUMENT_PHOTO;
    });
    mockGetFirstAsync.mockResolvedValue(existingRow(OLD_OWNED));
    mockRunAsync.mockImplementation(async () => {
      order.push('db');
    });
    mockRemoveAppOwnedPhoto.mockImplementation((uri: string) => {
      order.push(`delete:${uri}`);
    });
    await updateDevice('dev-1', deviceInput(CACHE_URI));
    expect(order).toEqual(['persist', 'db', `delete:${OLD_OWNED}`]);
  });

  test('eski önbellek URI\'sini uygulama dosyası gibi silmez', async () => {
    mockGetFirstAsync.mockResolvedValue(existingRow(LEGACY_CACHE));
    await updateDevice('dev-1', deviceInput(CACHE_URI));
    expect(mockRemoveAppOwnedPhoto).toHaveBeenCalledWith(LEGACY_CACHE);
    expect(mockRemoveAppOwnedPhoto).not.toHaveBeenCalledWith(DOCUMENT_PHOTO);
  });

  test('aynı kalıcı URI tekrar kopyalanmaz ve silinmez', async () => {
    mockGetFirstAsync.mockResolvedValue(existingRow(OLD_OWNED));
    await updateDevice('dev-1', deviceInput(OLD_OWNED));
    expect(mockPersistPickedPhoto).toHaveBeenCalledWith(OLD_OWNED);
    expect(mockRemoveAppOwnedPhoto).not.toHaveBeenCalled();
  });

  test('fotoğraf kaldırmada eski dosyayı yalnızca DB başarısından sonra siler', async () => {
    mockGetFirstAsync.mockResolvedValue(existingRow(OLD_OWNED));
    await updateDevice('dev-1', deviceInput(null));
    expect(mockPersistPickedPhoto).not.toHaveBeenCalled();
    expect(mockRemoveAppOwnedPhoto).toHaveBeenCalledWith(OLD_OWNED);
  });

  test('fotoğraf kaldırma DB başarısız olursa eski dosyayı silmez', async () => {
    mockGetFirstAsync.mockResolvedValue(existingRow(OLD_OWNED));
    mockRunAsync.mockRejectedValue(new Error('db'));
    await expect(updateDevice('dev-1', deviceInput(null))).rejects.toThrow('db');
    expect(mockRemoveAppOwnedPhoto).not.toHaveBeenCalled();
  });

  test('createDevice başarısız olursa yeni kalıcı fotoğrafı siler', async () => {
    mockRunAsync.mockRejectedValue(new Error('db'));
    await expect(createDevice(deviceInput(CACHE_URI))).rejects.toThrow('db');
    expect(mockRemoveAppOwnedPhoto).toHaveBeenCalledWith(DOCUMENT_PHOTO);
  });
});
