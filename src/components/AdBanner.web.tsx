/**
 * Web'de reklam gösterilmez; react-native-google-mobile-ads native-only olduğu için
 * web paketine hiç dahil edilmez (Metro bu dosyayı .web uzantısı sayesinde seçer).
 */
export function AdBanner() {
  return null;
}
