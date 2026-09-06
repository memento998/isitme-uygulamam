/**
 * Ana ekranların ortak yerleşim ölçüleri.
 * BANNER_RESERVE_HEIGHT, standart AdMob banner yüksekliğidir (320x50).
 */
export const BANNER_RESERVE_HEIGHT = 50;

/** Reklam yalnızca ana bölümlerde durur; cihaz formu gibi alt sayfalarda kapanır. */
export function isMainTabPath(pathname: string): boolean {
  const path = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return (
    path === '' ||
    path === '/' ||
    path === '/troubleshooting' ||
    path === '/stats' ||
    path === '/more' ||
    path === '/(tabs)' ||
    path.endsWith('/(tabs)/index') ||
    path.endsWith('/(tabs)/troubleshooting') ||
    path.endsWith('/(tabs)/stats') ||
    path.endsWith('/(tabs)/more')
  );
}
