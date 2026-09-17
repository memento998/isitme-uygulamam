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

function photoDirectory(): Directory {
  return new Directory(Paths.document, PHOTO_DIR_NAME);
}

function normalizeUri(uri: string): string {
  const stripped = uri.split('#')[0].split('?')[0];
  try {
    return decodeURI(stripped);
  } catch {
    return stripped;
  }
}

function withTrailingSlash(uri: string): string {
  return uri.endsWith('/') ? uri : `${uri}/`;
}

/** URI FixHear belgeler dizinindeki device-photos klasörünün içinde mi? */
export function isAppOwnedPhotoUri(uri: string | null | undefined): boolean {
  if (!uri || !uri.startsWith('file:')) return false;
  try {
    const directoryUri = withTrailingSlash(normalizeUri(photoDirectory().uri));
    const fileUri = normalizeUri(new File(uri).uri || uri);
    if (!fileUri.startsWith(directoryUri)) return false;
    const rest = fileUri.slice(directoryUri.length);
    if (!rest || rest.endsWith('/')) return false;
    if (rest.split('/').includes('..') || rest.includes('\\')) return false;
    return true;
  } catch {
    return false;
  }
}

function deleteIfExists(file: File): void {
  try {
    if (file.exists) file.delete();
  } catch {
    // Kısmi kopya veya eksik dosya çağıranı durdurmamalı.
  }
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
    dir.create({ intermediates: true, idempotent: true });
  }
  const destination = new File(dir, `${uniqueFileStem()}${extensionFromUri(sourceUri)}`);
  const source = new File(sourceUri);
  if (!source.exists) {
    throw new Error('Seçilen fotoğraf okunamadı.');
  }
  try {
    await source.copy(destination);
  } catch (error) {
    deleteIfExists(destination);
    throw error;
  }
  if (!destination.exists) {
    deleteIfExists(destination);
    throw new Error('Fotoğraf kalıcı olarak kaydedilemedi.');
  }
  return destination.uri;
}

/** Uygulama dizinindeki fotoğrafı siler; eksik/eski dosya çağıranı durdurmaz. */
export function removeAppOwnedPhoto(uri: string | null | undefined): void {
  if (!uri || !isAppOwnedPhotoUri(uri)) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {
    // Eski veya eksik dosya cihaz silmeyi/güncellemeyi engellememeli.
  }
}
