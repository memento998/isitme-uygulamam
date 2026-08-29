/**
 * AdMob reklam kimlikleri.
 *
 * ÖNEMLİ: AdMob hesabı açıldıktan sonra aşağıdaki iki değeri gerçek kimliklerle doldurun:
 * 1. app.json → plugins → react-native-google-mobile-ads → androidAppId
 *    (şu an Google'ın resmi TEST uygulama kimliği kullanılıyor)
 * 2. Buradaki PRODUCTION_BANNER_UNIT_ID (şu an null; null olduğu sürece test reklamı gösterilir)
 *
 * Test kimlikleriyle gerçek reklam ve gelir OLUŞMAZ; yayına çıkmadan önce mutlaka değiştirin.
 * Gerçek kimlikler: https://apps.admob.com → Uygulamalar → Reklam birimleri
 */

/** AdMob'da oluşturulacak "Banner" reklam biriminin kimliği (ca-app-pub-XXXX/YYYY biçiminde). */
export const PRODUCTION_BANNER_UNIT_ID: string | null = null;
