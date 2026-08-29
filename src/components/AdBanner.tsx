/**
 * Alt banner reklamı. react-native-google-mobile-ads native modül gerektirdiği için
 * yalnızca EAS ile derlenen uygulamalarda çalışır; web ve Expo Go'da hiçbir şey
 * göstermez (uygulamayı bozmaz). Alt sekme menüsünün üstünde durur, menüyü kapatmaz.
 */
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors } from '@/constants/theme';
import { bannerUnitId, initializeAds, loadAdsModule } from '@/services/ads';

export function AdBanner() {
  const ads = useMemo(() => loadAdsModule(), []);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ads) return;
    void initializeAds().then((ok) => {
      if (ok) setReady(true);
    });
  }, [ads]);

  if (!ads || !ready) return null;

  const { BannerAd, BannerAdSize } = ads;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={bannerUnitId(ads)}
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
