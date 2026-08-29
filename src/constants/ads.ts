/**
 * AdMob reklam kimlikleri.
 *
 * ÖNEMLİ: AdMob hesabı açıldıktan sonra aşağıdaki değerleri gerçek kimliklerle doldurun:
 * 1. app.json → plugins → react-native-google-mobile-ads → androidAppId
 *    (şu an Google'ın resmi TEST uygulama kimliği kullanılıyor)
 * 2. PRODUCTION_BANNER_UNIT_ID ve PRODUCTION_INTERSTITIAL_UNIT_ID
 *    (null olduğu sürece test reklamı gösterilir)
 *
 * Test kimlikleriyle gerçek reklam ve gelir OLUŞMAZ; yayına çıkmadan önce mutlaka değiştirin.
 * Gerçek kimlikler: https://apps.admob.com → Uygulamalar → Reklam birimleri
 */

/** Banner reklam birimi kimliği (ca-app-pub-XXXX/YYYY). */
export const PRODUCTION_BANNER_UNIT_ID: string | null = null;

/** Geçiş (interstitial) reklam birimi kimliği (ca-app-pub-XXXX/YYYY). */
export const PRODUCTION_INTERSTITIAL_UNIT_ID: string | null = null;
