/**
 * Uygulamanın tasarım sistemi: renkler, boşluklar, yazı boyutları.
 * Beyaz + açık mavi ağırlıklı, erişilebilir kontrast oranlarıyla.
 */
export const colors = {
  primary: '#1774CF',
  primaryPressed: '#125EA8',
  primarySoft: '#E3F1FC',
  primaryBorder: '#BBDDF7',

  background: '#F4F9FD',
  card: '#FFFFFF',
  border: '#DCE8F2',

  text: '#12293E',
  textMuted: '#51687C',
  textOnPrimary: '#FFFFFF',

  success: '#1E7B34',
  successSoft: '#E5F5E9',
  warning: '#9A5B00',
  warningSoft: '#FDF1DD',
  danger: '#C0392B',
  dangerSoft: '#FBE9E7',

  overlay: 'rgba(18, 41, 62, 0.45)',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  full: 999,
} as const;

export const fontSize = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 22,
  xxl: 28,
} as const;

/** Erişilebilirlik: en küçük dokunma alanı (px). */
export const MIN_TOUCH_SIZE = 44;

export const shadow = {
  card: {
    shadowColor: '#0F2A43',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
