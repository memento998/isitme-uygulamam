import { getLocales } from 'expo-localization';

/** Device language tags in preference order (BCP-47). */
export function getSystemLanguageTags(): string[] {
  try {
    return getLocales()
      .map((item) => item.languageTag)
      .filter((tag): tag is string => Boolean(tag));
  } catch {
    try {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      return locale ? [locale] : [];
    } catch {
      return [];
    }
  }
}
