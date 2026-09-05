import {
  isDevicesPath,
  isHeaderSectionActive,
  normalizePath,
  titleForPath,
} from '@/components/HeaderSectionBar';

describe('header section navigation', () => {
  it('normalizes trailing slashes', () => {
    expect(normalizePath('/stats/')).toBe('/stats');
    expect(normalizePath('/')).toBe('/');
  });

  it('treats root paths as Cihazlarım', () => {
    expect(isDevicesPath('/')).toBe(true);
    expect(isDevicesPath('')).toBe(true);
    expect(isDevicesPath('/(tabs)')).toBe(true);
    expect(isDevicesPath('/(tabs)/index')).toBe(true);
    expect(isDevicesPath('/stats')).toBe(false);
  });

  it('maps each path to the matching section title', () => {
    expect(titleForPath('/')).toBe('Cihazlarım');
    expect(titleForPath('/troubleshooting')).toBe('Sorun Giderme');
    expect(titleForPath('/stats')).toBe('İstatistik');
    expect(titleForPath('/more')).toBe('Daha Fazla');
  });

  it('marks only the current section active', () => {
    expect(isHeaderSectionActive('/', 'devices')).toBe(true);
    expect(isHeaderSectionActive('/', 'more')).toBe(false);
    expect(isHeaderSectionActive('/troubleshooting', 'troubleshooting')).toBe(true);
    expect(isHeaderSectionActive('/stats', 'stats')).toBe(true);
    expect(isHeaderSectionActive('/more', 'more')).toBe(true);
    expect(isHeaderSectionActive('/(tabs)/more', 'more')).toBe(true);
  });
});
