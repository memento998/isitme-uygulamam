/** Cihaz formunda gösterilen hazır marka listesi. Sonda her zaman Diğer vardır. */
export const HEARING_AID_BRANDS = [
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
] as const;

export const OTHER_BRAND = 'Diğer';

export const BRAND_OPTIONS = [...HEARING_AID_BRANDS, OTHER_BRAND] as const;

export type BrandOption = (typeof BRAND_OPTIONS)[number];

export function isBrandOption(value: string): value is BrandOption {
  return (BRAND_OPTIONS as readonly string[]).includes(value);
}

/** Kayıtlı markayı listedeki seçeneğe çevirir; listede yoksa Diğer. */
export function selectedBrandOption(savedBrand: string): BrandOption | '' {
  if (!savedBrand.trim()) return '';
  if (isBrandOption(savedBrand)) return savedBrand;
  return OTHER_BRAND;
}
