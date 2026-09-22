export const APP_LOCALES = ['tr', 'en', 'de', 'es', 'it', 'fr', 'ar', 'zh-Hans', 'hi', 'te'] as const;
export type AppLocale = (typeof APP_LOCALES)[number];
export type LanguagePreference = 'system' | AppLocale;

export const LOCALE_NATIVE_NAMES: Record<AppLocale, string> = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  it: 'Italiano',
  fr: 'Français',
  ar: 'العربية',
  'zh-Hans': '简体中文',
  hi: 'हिन्दी',
  te: 'తెలుగు',
};

export const RTL_LOCALES: readonly AppLocale[] = ['ar'];

export function isAppLocale(value: string): value is AppLocale {
  return (APP_LOCALES as readonly string[]).includes(value);
}

export function isRtlLocale(locale: AppLocale): boolean {
  return (RTL_LOCALES as readonly AppLocale[]).includes(locale);
}

const LANGUAGE_TO_LOCALE: Record<string, AppLocale> = {
  tr: 'tr',
  en: 'en',
  de: 'de',
  es: 'es',
  it: 'it',
  fr: 'fr',
  ar: 'ar',
  hi: 'hi',
  te: 'te',
};

function parseTag(tag: string): { language: string; script?: string; region?: string } | null {
  const normalized = tag.trim().replace(/_/g, '-');
  if (!normalized) return null;

  try {
    const locale = new Intl.Locale(normalized);
    return {
      language: locale.language.toLowerCase(),
      script: locale.script?.toLowerCase(),
      region: locale.region?.toUpperCase(),
    };
  } catch {
    const parts = normalized.split('-').filter(Boolean);
    if (parts.length === 0) return null;
    const language = parts[0].toLowerCase();
    let script: string | undefined;
    let region: string | undefined;
    for (const part of parts.slice(1)) {
      if (part.length === 4 && /[A-Za-z]{4}/.test(part)) {
        script = part.toLowerCase();
      } else if (part.length === 2 && /[A-Za-z]{2}/.test(part)) {
        region = part.toUpperCase();
      } else if (part.length === 3 && /^\d{3}$/.test(part)) {
        region = part;
      }
    }
    return { language, script, region };
  }
}

/**
 * Resolve BCP-47 tags.
 * en-US/en-GB -> en; de-DE -> de; es-MX -> es; it/fr/hi/te same.
 * zh-Hans, zh-CN, zh-SG -> zh-Hans.
 * zh-Hant, zh-TW, zh-HK -> unsupported (null).
 * bare zh -> zh-Hans (bare zh assumed Simplified).
 * pt-BR and unknown -> null (caller falls back to en for system, or keeps tr for missing saved pref).
 */
export function matchSupportedLocale(tag: string): AppLocale | null {
  const parsed = parseTag(tag);
  if (!parsed) return null;

  if (parsed.language === 'zh') {
    const { script, region } = parsed;
    if (script === 'hant' || region === 'TW' || region === 'HK' || region === 'MO') {
      return null;
    }
    if (script === 'hans' || region === 'CN' || region === 'SG' || (!script && !region)) {
      return 'zh-Hans';
    }
    return null;
  }

  return LANGUAGE_TO_LOCALE[parsed.language] ?? null;
}

/** Walk system language tags in preference order; first match wins; else 'en'. */
export function resolveSystemLocale(languageTags: readonly string[]): AppLocale {
  for (const tag of languageTags) {
    const match = matchSupportedLocale(tag);
    if (match) return match;
  }
  return 'en';
}

/**
 * Saved preference wins.
 * Missing/empty preference -> 'tr' (legacy Turkish installs).
 * 'system' -> resolveSystemLocale.
 */
export function resolveAppLocale(
  preference: LanguagePreference | null | undefined,
  languageTags: readonly string[]
): AppLocale {
  if (preference == null || (preference as string) === '') {
    return 'tr';
  }
  if (preference === 'system') {
    return resolveSystemLocale(languageTags);
  }
  return preference;
}
