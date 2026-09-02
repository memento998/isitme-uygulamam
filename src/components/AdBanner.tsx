/**
 * Alt banner reklamı. react-native-google-mobile-ads native modül gerektirdiği için
 * yalnızca EAS ile derlenen uygulamalarda çalışır; web ve Expo Go'da hiçbir şey
 * göstermez. 320x50 standart banner, ayrılmış 50px slota sığar.
 */
import { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { BANNER_RESERVE_HEIGHT } from '@/constants/layout';
import { bannerUnitId, initializeAds, loadAdsModule } from '@/services/ads';

export function AdBanner() {
  const ads = useMemo(() => loadAdsModule(), []);

  useEffect(() => {
    if (!ads) return;
    void initializeAds();
  }, [ads]);

  if (!ads) return null;

  const { BannerAd, BannerAdSize } = ads;

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={bannerUnitId(ads)}
        size={BannerAdSize.BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: true }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: BANNER_RESERVE_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
