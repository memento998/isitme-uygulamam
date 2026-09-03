import fs from 'fs';
import path from 'path';

import { bannerUnitId, interstitialUnitId, type AdsModule } from '@/services/ads';

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

describe('ad unit ids', () => {
  it('uses the production banner unit', () => {
    expect(bannerUnitId(fakeAds())).toBe('ca-app-pub-9842945022814068/3355372710');
  });

  it('uses the production interstitial unit', () => {
    expect(interstitialUnitId(fakeAds())).toBe('ca-app-pub-9842945022814068/2668977001');
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
