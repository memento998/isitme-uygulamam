import fs from 'fs';
import path from 'path';

import { isAppOwnedPhotoUri, persistPickedPhoto, removeAppOwnedPhoto } from '../photos';

const DOCUMENT_URI = 'file:///data/user/0/com.isitmetakip.app/files/';
const PHOTO_DIR_URI = `${DOCUMENT_URI}device-photos/`;
const CACHE_URI = 'file:///data/user/0/com.isitmetakip.app/cache/picked.jpg';

const mockDeletedUris: string[] = [];
let mockCopyImpl: (destination: { exists: boolean; uri?: string }) => Promise<void> = async (
  destination
) => {
  await Promise.resolve();
  destination.exists = true;
};

jest.mock('expo-file-system', () => {
  function mockToUri(parts: unknown[]): string {
    if (parts.length === 1 && typeof parts[0] === 'string') return parts[0];
    const base =
      typeof parts[0] === 'object' && parts[0] !== null && 'uri' in parts[0]
        ? String((parts[0] as { uri: string }).uri).replace(/\/+$/, '')
        : String(parts[0] ?? '').replace(/\/+$/, '');
    const rest = parts.slice(1).map(String).filter(Boolean).join('/');
    return rest ? `${base}/${rest}` : base;
  }

  class MockDirectory {
    uri: string;
    exists = true;
    create = jest.fn();
    constructor(...parts: unknown[]) {
      this.uri = mockToUri(parts);
      if (!this.uri.endsWith('/')) this.uri += '/';
    }
  }

  class MockFile {
    uri: string;
    exists: boolean;
    copy: jest.Mock;
    delete: jest.Mock;
    constructor(...parts: unknown[]) {
      this.uri = mockToUri(parts);
      this.exists = parts.length === 1;
      this.copy = jest.fn(async (destination: { exists: boolean; uri?: string }) =>
        mockCopyImpl(destination)
      );
      this.delete = jest.fn(() => {
        mockDeletedUris.push(this.uri);
        this.exists = false;
      });
    }
  }

  return {
    Directory: MockDirectory,
    File: MockFile,
    Paths: { document: { uri: 'file:///data/user/0/com.isitmetakip.app/files/' } },
  };
});

describe('isAppOwnedPhotoUri', () => {
  test('kalıcı belge dizinindeki URI\'yi tanır', () => {
    expect(isAppOwnedPhotoUri(`${PHOTO_DIR_URI}abc.jpg`)).toBe(true);
  });

  test('önbellek URI\'sini uygulama dosyası saymaz', () => {
    expect(
      isAppOwnedPhotoUri('file:///data/user/0/com.isitmetakip.app/cache/cropped1814158652.jpg')
    ).toBe(false);
  });

  test('content URI\'sini uygulama dosyası saymaz', () => {
    expect(isAppOwnedPhotoUri('content://media/external/images/media/12')).toBe(false);
  });

  test('device-photos-malicious yolunu uygulama dosyası saymaz', () => {
    expect(isAppOwnedPhotoUri(`${DOCUMENT_URI}device-photos-malicious/abc.jpg`)).toBe(false);
  });

  test('Download altındaki device-photos yolunu uygulama dosyası saymaz', () => {
    expect(
      isAppOwnedPhotoUri('file:///storage/emulated/0/Download/device-photos/vacation.jpg')
    ).toBe(false);
  });

  test('önbellekteki device-photos yolunu uygulama dosyası saymaz', () => {
    expect(
      isAppOwnedPhotoUri('file:///data/user/0/com.isitmetakip.app/cache/device-photos/abc.jpg')
    ).toBe(false);
  });

  test('harici file URI\'sini uygulama dosyası saymaz', () => {
    expect(isAppOwnedPhotoUri('file:///tmp/device-photos/vacation.jpg')).toBe(false);
  });

  test('null ve boş değeri reddeder', () => {
    expect(isAppOwnedPhotoUri(null)).toBe(false);
    expect(isAppOwnedPhotoUri('')).toBe(false);
    expect(isAppOwnedPhotoUri(undefined)).toBe(false);
  });
});

describe('persistPickedPhoto', () => {
  beforeEach(() => {
    mockDeletedUris.length = 0;
    mockCopyImpl = async (destination) => {
      await Promise.resolve();
      destination.exists = true;
    };
  });

  test('kopya tamamlanmadan başarı dönmez', async () => {
    let finishCopy: () => void = () => undefined;
    mockCopyImpl = (destination) =>
      new Promise((resolve) => {
        finishCopy = () => {
          destination.exists = true;
          resolve();
        };
      });

    let settled: string | undefined;
    const pending = persistPickedPhoto(CACHE_URI).then((uri) => {
      settled = uri;
      return uri;
    });

    await Promise.resolve();
    expect(settled).toBeUndefined();

    finishCopy();
    const result = await pending;
    expect(result.startsWith(PHOTO_DIR_URI)).toBe(true);
    expect(result).not.toContain('picked.jpg');
  });

  test('kopya hata verirse kalıcı URI dönmez ve hedefi temizler', async () => {
    mockCopyImpl = async (destination) => {
      destination.exists = true;
      throw new Error('copy failed');
    };
    await expect(persistPickedPhoto(CACHE_URI)).rejects.toThrow('copy failed');
    expect(mockDeletedUris.some((uri) => uri.startsWith(PHOTO_DIR_URI))).toBe(true);
  });

  test('kopya dosya oluşturmazsa kalıcı URI dönmez', async () => {
    mockCopyImpl = async () => {
      await Promise.resolve();
    };
    await expect(persistPickedPhoto(CACHE_URI)).rejects.toThrow(
      'Fotoğraf kalıcı olarak kaydedilemedi.'
    );
  });

  test('mevcut kalıcı URI\'yi yeniden kopyalamaz', async () => {
    const owned = `${PHOTO_DIR_URI}already.jpg`;
    await expect(persistPickedPhoto(owned)).resolves.toBe(owned);
  });
});

describe('removeAppOwnedPhoto', () => {
  beforeEach(() => {
    mockDeletedUris.length = 0;
  });

  test('eski önbellek URI\'sini silmez', () => {
    removeAppOwnedPhoto('file:///data/user/0/com.isitmetakip.app/cache/cropped.jpg');
    expect(mockDeletedUris).toEqual([]);
  });

  test('kalıcı fotoğrafı siler', () => {
    const owned = `${PHOTO_DIR_URI}abc.jpg`;
    removeAppOwnedPhoto(owned);
    expect(mockDeletedUris).toContain(owned);
  });
});

describe('DeviceForm photo submit', () => {
  test('kayıt öncesi kalıcı kopya yapmaz', () => {
    const src = fs.readFileSync(path.join(__dirname, '../../components/DeviceForm.tsx'), 'utf8');
    expect(src).not.toContain('persistPickedPhoto');
  });
});
