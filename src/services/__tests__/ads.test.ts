import fs from 'fs';
import path from 'path';

import { bannerUnitId, type AdsModule } from '@/services/ads';

function fakeAds(): AdsModule {
  return {
    BannerAd: () => null,
    BannerAdSize: { BANNER: 'BANNER', ANCHORED_ADAPTIVE_BANNER: 'ANCHORED_ADAPTIVE_BANNER' },
    TestIds: {
      BANNER: 'ca-app-pub-3940256099942544/6300978111',
      ADAPTIVE_BANNER: 'adaptive',
      INTERSTITIAL: 'interstitial',
    },
    AdEventType: { LOADED: 'loaded', ERROR: 'error', CLOSED: 'closed' },
    InterstitialAd: {
      createForAdRequest: () => ({
        addAdEventListener: () => () => undefined,
        load: () => undefined,
        show: async () => undefined,
      }),
    },
    default: () => ({ initialize: async () => ({}) }),
  };
}

describe('bannerUnitId', () => {
  it('uses the Google test banner unit when production id is null', () => {
    expect(bannerUnitId(fakeAds())).toBe('ca-app-pub-3940256099942544/6300978111');
  });
});

describe('BannerReserve', () => {
  it('mounts AdBanner in the reserved bottom slot', () => {
    const src = fs.readFileSync(
      path.join(__dirname, '../../components/BannerReserve.tsx'),
      'utf8'
    );
    expect(src).toContain('<AdBanner />');
  });
});
