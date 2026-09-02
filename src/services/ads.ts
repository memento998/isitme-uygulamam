/**
 * AdMob reklam motoru: native modülü yükler, bir kez başlatır,
 * uygulama açılışında tek bir geçiş reklamı gösterir.
 * Web ve Expo Go'da sessizce atlanır.
 */
import { Platform } from 'react-native';

import {
  PRODUCTION_BANNER_UNIT_ID,
  PRODUCTION_INTERSTITIAL_UNIT_ID,
} from '@/constants/ads';

export interface AdsModule {
  BannerAd: React.ComponentType<{
    unitId: string;
    size: string;
    requestOptions?: { requestNonPersonalizedAdsOnly?: boolean };
  }>;
  BannerAdSize: { BANNER: string; ANCHORED_ADAPTIVE_BANNER: string };
  TestIds: { BANNER: string; ADAPTIVE_BANNER: string; INTERSTITIAL: string };
  AdEventType: { LOADED: string; ERROR: string; CLOSED: string };
  InterstitialAd: {
    createForAdRequest: (
      unitId: string,
      options?: { requestNonPersonalizedAdsOnly?: boolean }
    ) => InterstitialAdInstance;
  };
  default: () => { initialize: () => Promise<unknown> };
}

interface InterstitialAdInstance {
  addAdEventListener: (event: string, listener: () => void) => () => void;
  load: () => void;
  show: () => Promise<void>;
}

let cachedModule: AdsModule | null | undefined;
let initializePromise: Promise<boolean> | null = null;
let launchInterstitialShown = false;

export function loadAdsModule(): AdsModule | null {
  if (cachedModule !== undefined) return cachedModule;
  if (Platform.OS === 'web') {
    cachedModule = null;
    return cachedModule;
  }
  try {
    // Expo Go'da native modül bulunmadığı için bu require hata fırlatır; sessizce atlanır.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    cachedModule = require('react-native-google-mobile-ads') as AdsModule;
  } catch {
    cachedModule = null;
  }
  return cachedModule;
}

/** SDK'yı bir kez başlatır. Web / Expo Go'da false döner. */
export function initializeAds(): Promise<boolean> {
  if (initializePromise) return initializePromise;
  const ads = loadAdsModule();
  if (!ads) {
    initializePromise = Promise.resolve(false);
    return initializePromise;
  }
  const mobileAds = typeof ads.default === 'function' ? ads.default() : null;
  if (!mobileAds) {
    initializePromise = Promise.resolve(false);
    return initializePromise;
  }
  initializePromise = mobileAds
    .initialize()
    .then(() => true)
    .catch(() => false);
  return initializePromise;
}

export function bannerUnitId(ads: AdsModule): string {
  return PRODUCTION_BANNER_UNIT_ID ?? ads.TestIds.BANNER;
}

/**
 * Uygulama bu oturumda ilk açıldığında tek bir geçiş reklamı yükler ve gösterir.
 * İkinci çağrıda (sekme değişimi vb.) hiçbir şey yapmaz.
 * İlk ekranın görünmesi için kısa bir gecikme bırakılır; böylece reklam açılışta
 * kullanıcıyı hemen kaplamaz ve yanlış tıklama riski azalır.
 */
export async function showLaunchInterstitialOnce(): Promise<void> {
  if (launchInterstitialShown) return;
  launchInterstitialShown = true;

  const ready = await initializeAds();
  const ads = loadAdsModule();
  if (!ready || !ads) return;

  await new Promise((resolve) => setTimeout(resolve, 1500));

  const unitId = PRODUCTION_INTERSTITIAL_UNIT_ID ?? ads.TestIds.INTERSTITIAL;
  const interstitial = ads.InterstitialAd.createForAdRequest(unitId, {
    requestNonPersonalizedAdsOnly: true,
  });

  interstitial.addAdEventListener(ads.AdEventType.LOADED, () => {
    interstitial.show().catch(() => {
      // Gösterilemezse uygulama reklamsız devam eder.
    });
  });
  interstitial.addAdEventListener(ads.AdEventType.ERROR, () => {
    // Yüklenemezse sessizce geç.
  });
  interstitial.load();
}
