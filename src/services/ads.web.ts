/**
 * Web'de reklam yok; native reklam paketi web derlemesine hiç dahil edilmez.
 */
export function loadAdsModule(): null {
  return null;
}

export function initializeAds(): Promise<boolean> {
  return Promise.resolve(false);
}

export async function showLaunchInterstitialOnce(): Promise<void> {
  return;
}
