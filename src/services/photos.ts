/**
 * Cihaz fotoğraflarını uygulama belgeler dizininde tutar.
 * ImagePicker önbellek URI'leri burada kalıcı kopyaya dönüştürülür.
 */
import { Platform } from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';

const PHOTO_DIR_NAME = 'device-photos';
const ALLOWED_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'gif']);

function uniqueFileStem(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function extensionFromUri(uri: string): string {
  const clean = uri.split('?')[0] ?? uri;
  const match = /\.([a-zA-Z0-9]{2,5})$/.exec(clean);
  if (!match) return '.jpg';
  const ext = match[1].toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) return '.jpg';
  return ext === 'jpeg' ? '.jpg' : `.${ext}`;
}

/** URI bu uygulamanın kalıcı fotoğraf dizinine ait mi? */
export function isAppOwnedPhotoUri(uri: string | null | undefined): boolean {
  if (!uri) return false;
  return uri.includes(`/${PHOTO_DIR_NAME}/`);
}

function photoDirectory(): Directory {
  return new Directory(Paths.document, PHOTO_DIR_NAME);
}

/**
 * Seçilen görüntüyü belgeler dizinine kopyalar ve kalıcı URI döner.
 * Zaten uygulama dizinindeyse aynı URI'yi döner. Kopya başarısız olursa hata fırlatır.
 */
export async function persistPickedPhoto(sourceUri: string): Promise<string> {
  if (isAppOwnedPhotoUri(sourceUri)) return sourceUri;
  if (Platform.OS === 'web') return sourceUri;

  const dir = photoDirectory();
  if (!dir.exists) {
    dir.create();
  }
  const destination = new File(dir, `${uniqueFileStem()}${extensionFromUri(sourceUri)}`);
  const source = new File(sourceUri);
  if (!source.exists) {
    throw new Error('Seçilen fotoğraf okunamadı.');
  }
  source.copy(destination);
  if (!destination.exists) {
    throw new Error('Fotoğraf kalıcı olarak kaydedilemedi.');
  }
  return destination.uri;
}

/** Uygulama dizinindeki fotoğrafı siler; eksik/eski dosya çağıranı durdurmaz. */
export function removeAppOwnedPhoto(uri: string | null | undefined): void {
  if (!isAppOwnedPhotoUri(uri) || !uri) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    // Eski veya eksik dosya cihaz silmeyi/güncellemeyi engellememeli.
  }
}
