import { interpolate } from '../interpolate';
import {
  APP_LOCALES,
  isAppLocale,
  isRtlLocale,
  matchSupportedLocale,
  resolveAppLocale,
  resolveSystemLocale,
  type AppLocale,
} from '../locales';
import { getUiMessages, UI_MESSAGES } from '../messages';
import type { TroubleshootingCategoryId } from '../messages/types';
import { tr } from '../messages/tr';

const TROUBLESHOOTING_IDS: TroubleshootingCategoryId[] = [
  'no-sound',
  'low-sound',
  'intermittent-sound',
  'echo',
  'too-loud-ambient',
  'whistling',
  'not-charging',
  'bluetooth',
];

function collectEmpty(value: unknown, path: string, found: string[]): void {
  if (typeof value === 'string') {
    if (value.trim() === '') found.push(path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectEmpty(item, `${path}[${index}]`, found));
    return;
  }
  if (value && typeof value === 'object') {
    for (const [key, nested] of Object.entries(value)) {
      collectEmpty(nested, path ? `${path}.${key}` : key, found);
    }
  }
}

describe('interpolate', () => {
  test('replaces named tokens', () => {
    expect(interpolate('Hello {name}', { name: 'Ada' })).toBe('Hello Ada');
  });

  test('stringifies numbers', () => {
    expect(interpolate('{count} days', { count: 7 })).toBe('7 days');
    expect(interpolate('{count} days', { count: 0 })).toBe('0 days');
  });

  test('leaves unknown tokens intact', () => {
    expect(interpolate('Hi {name}, {extra}', { name: 'Ada' })).toBe('Hi Ada, {extra}');
  });

  test('does nothing when no values match', () => {
    expect(interpolate('plain {token}', {})).toBe('plain {token}');
  });
});

describe('locale matching', () => {
  test('isAppLocale recognizes supported tags only', () => {
    expect(isAppLocale('tr')).toBe(true);
    expect(isAppLocale('zh-Hans')).toBe(true);
    expect(isAppLocale('zh-Hant')).toBe(false);
    expect(isAppLocale('pt')).toBe(false);
  });

  test('Arabic is RTL', () => {
    expect(isRtlLocale('ar')).toBe(true);
    expect(isRtlLocale('tr')).toBe(false);
  });

  test('maps regional tags to supported languages', () => {
    expect(matchSupportedLocale('en-US')).toBe('en');
    expect(matchSupportedLocale('en-GB')).toBe('en');
    expect(matchSupportedLocale('en_GB')).toBe('en');
    expect(matchSupportedLocale('de-DE')).toBe('de');
    expect(matchSupportedLocale('es-MX')).toBe('es');
    expect(matchSupportedLocale('it-IT')).toBe('it');
    expect(matchSupportedLocale('fr-CA')).toBe('fr');
    expect(matchSupportedLocale('hi-IN')).toBe('hi');
    expect(matchSupportedLocale('te-IN')).toBe('te');
    expect(matchSupportedLocale('tr-TR')).toBe('tr');
    expect(matchSupportedLocale('ar-EG')).toBe('ar');
  });

  test('resolves Simplified Chinese and rejects Traditional', () => {
    expect(matchSupportedLocale('zh-Hans')).toBe('zh-Hans');
    expect(matchSupportedLocale('zh-CN')).toBe('zh-Hans');
    expect(matchSupportedLocale('zh-SG')).toBe('zh-Hans');
    expect(matchSupportedLocale('zh')).toBe('zh-Hans');
    expect(matchSupportedLocale('zh-Hant')).toBeNull();
    expect(matchSupportedLocale('zh-TW')).toBeNull();
    expect(matchSupportedLocale('zh-HK')).toBeNull();
  });

  test('returns null for Portuguese and unknown tags', () => {
    expect(matchSupportedLocale('pt-BR')).toBeNull();
    expect(matchSupportedLocale('ja-JP')).toBeNull();
    expect(matchSupportedLocale('')).toBeNull();
  });

  test('resolveSystemLocale uses first match, else English', () => {
    expect(resolveSystemLocale(['pt-BR', 'de-DE'])).toBe('de');
    expect(resolveSystemLocale(['zh-TW', 'en-US'])).toBe('en');
    expect(resolveSystemLocale(['zh-TW'])).toBe('en');
    expect(resolveSystemLocale([])).toBe('en');
  });

  test('resolveAppLocale prefers saved locale, falls back to tr, and honors system', () => {
    expect(resolveAppLocale('de', ['en-US'])).toBe('de');
    expect(resolveAppLocale(null, ['en-US'])).toBe('tr');
    expect(resolveAppLocale(undefined, ['en-US'])).toBe('tr');
    expect(resolveAppLocale('system', ['es-MX', 'en'])).toBe('es');
    expect(resolveAppLocale('system', ['pt-BR'])).toBe('en');
  });
});

describe('UI messages', () => {
  test('exports every locale against UiMessages', () => {
    expect(Object.keys(UI_MESSAGES).sort()).toEqual([...APP_LOCALES].sort());
    for (const locale of APP_LOCALES) {
      expect(getUiMessages(locale)).toBe(UI_MESSAGES[locale]);
    }
  });

  test('no locale has empty strings', () => {
    for (const locale of APP_LOCALES) {
      const empty: string[] = [];
      collectEmpty(getUiMessages(locale), '', empty);
      expect(empty).toEqual([]);
    }
  });

  test('troubleshooting categories keep the same step counts as Turkish', () => {
    for (const locale of APP_LOCALES) {
      const messages = getUiMessages(locale);
      for (const id of TROUBLESHOOTING_IDS) {
        const source = tr.troubleshooting.categories[id];
        const translated = messages.troubleshooting.categories[id];
        expect(translated.steps.length).toBe(source.steps.length);
        expect(translated.keywords.length).toBeGreaterThan(0);
        expect(translated.title.trim()).not.toBe('');
      }
    }
  });

  test('each locale has 12 month names', () => {
    for (const locale of APP_LOCALES) {
      const { full, short } = getUiMessages(locale).months;
      expect(full).toHaveLength(12);
      expect(short).toHaveLength(12);
    }
  });

  test('Arabic keeps anatomical left and right', () => {
    const ar = getUiMessages('ar' as AppLocale);
    expect(ar.home.earLeft).toContain('يسرى');
    expect(ar.home.earRight).toContain('يمنى');
    expect(ar.deviceForm.left).toContain('يسرى');
    expect(ar.deviceForm.right).toContain('يمنى');
  });

  test('Turkish general info body matches source wording', () => {
    expect(tr.knowledge.generalInfoBody).toBe(
      'Bu bölüm cihazın günlük kullanımı, dış bakımı ve saklanması içindir. Cihazınıza özel işlemler için üreticinin kullanım kılavuzunu ve yetkili servis desteğini esas alın.'
    );
    expect(tr.deviceDetail.complete).toBe('Tamamla');
    expect(tr.deviceDetail.maintenanceHistoryEmpty).toBe(
      'Tamamlanan bakım işlemleri burada görünür.'
    );
  });
});
