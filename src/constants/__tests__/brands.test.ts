import {
  BRAND_OPTIONS,
  HEARING_AID_BRANDS,
  OTHER_BRAND,
  isBrandOption,
  selectedBrandOption,
} from '@/constants/brands';

describe('hearing aid brands', () => {
  it('lists the given brands and puts Diğer last', () => {
    expect([...HEARING_AID_BRANDS]).toEqual([
      'Oticon',
      'Phonak',
      'Bernafon',
      'Philips',
      'Maico',
      'Sonic',
      'Unitron',
      'Au',
      'Vista',
      'Resound',
      'Signia',
      'Rexton',
      'Widex',
      'Coselgi',
      'Starkey',
      'Beltone',
      'Audiofon',
      'Earnet',
      'Helix',
    ]);
    expect(BRAND_OPTIONS[BRAND_OPTIONS.length - 1]).toBe(OTHER_BRAND);
    expect(BRAND_OPTIONS).toHaveLength(HEARING_AID_BRANDS.length + 1);
  });

  it('maps saved brands onto the picker', () => {
    expect(selectedBrandOption('')).toBe('');
    expect(selectedBrandOption('Phonak')).toBe('Phonak');
    expect(selectedBrandOption('Diğer')).toBe('Diğer');
    expect(selectedBrandOption('Bilinmeyen Marka')).toBe('Diğer');
    expect(isBrandOption('Signia')).toBe(true);
    expect(isBrandOption('Siemens')).toBe(false);
  });
});
