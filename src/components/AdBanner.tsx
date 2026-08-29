/**
 * Alt banner reklamı. react-native-google-mobile-ads native modül gerektirdiği için
 * yalnızca EAS ile derlenen uygulamalarda çalışır; web ve Expo Go'da hiçbir şey
 * göstermez (uygulamayı bozmaz).
 */
import { useEffect, useMemo, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';
import { PRODUCTION_BANNER_UNIT_ID } from '@/constants/ads';

interface AdsModule {
  BannerAd: React.ComponentType<{
    unitId: string;
    size: string;
    requestOptions?: { requestNonPersonalizedAdsOnly?: boolean };
  }>;
  BannerAdSize: { ANCHORED_ADAPTIVE_BANNER: string };
  TestIds: { ADAPTIVE_BANNER: string };
  default: () => { initialize: () => Promise<unknown> };
}

let cachedModule: AdsModule | null | undefined;

function loadAdsModule(): AdsModule | null {
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

let initialized = false;

export function AdBanner() {
  const ads = useMemo(() => loadAdsModule(), []);
  const [ready, setReady] = useState(initialized);

  useEffect(() => {
    if (!ads || initialized) return;
    initialized = true;
    ads
      .default()
      .initialize()
      .then(() => setReady(true))
      .catch(() => {
        // Reklam başlatılamazsa uygulama reklamsız devam eder.
      });
  }, [ads]);

  if (!ads || !ready) return null;

  const { BannerAd, BannerAdSize, TestIds } = ads;
  const unitId = PRODUCTION_BANNER_UNIT_ID ?? TestIds.ADAPTIVE_BANNER;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={unitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
