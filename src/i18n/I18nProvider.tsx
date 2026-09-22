import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Alert, I18nManager, Platform, View } from 'react-native';

import { getLanguagePreference, saveLanguagePreference } from '@/repositories/settings';

import { interpolate, type InterpolationValues } from './interpolate';
import {
  isRtlLocale,
  resolveAppLocale,
  type AppLocale,
  type LanguagePreference,
} from './locales';
import { getUiMessages } from './messages';
import type { UiMessages } from './messages/types';
import { getSystemLanguageTags } from './systemLocales';

interface I18nContextValue {
  locale: AppLocale;
  preference: LanguagePreference | null;
  messages: UiMessages;
  isRTL: boolean;
  tx: (template: string, values?: InterpolationValues) => string;
  setPreference: (preference: LanguagePreference) => Promise<void>;
  reload: () => Promise<void>;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function applyRtl(locale: AppLocale): boolean {
  const shouldRtl = isRtlLocale(locale);
  try {
    I18nManager.allowRTL(true);
    if (I18nManager.isRTL !== shouldRtl) {
      I18nManager.forceRTL(shouldRtl);
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [preference, setPreferenceState] = useState<LanguagePreference | null>(null);
  const [locale, setLocale] = useState<AppLocale>('tr');

  const applySavedPreference = useCallback((saved: LanguagePreference | null) => {
    const nextLocale = resolveAppLocale(saved, getSystemLanguageTags());
    applyRtl(nextLocale);
    setPreferenceState(saved);
    setLocale(nextLocale);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void getLanguagePreference().then((saved) => {
      if (cancelled) return;
      applySavedPreference(saved);
    });
    return () => {
      cancelled = true;
    };
  }, [applySavedPreference]);

  const setPreference = useCallback(
    async (next: LanguagePreference) => {
      await saveLanguagePreference(next);
      const nextLocale = resolveAppLocale(next, getSystemLanguageTags());
      const needsRestart = applyRtl(nextLocale);
      setPreferenceState(next);
      setLocale(nextLocale);
      if (needsRestart) {
        const nextMessages = getUiMessages(nextLocale);
        Alert.alert(nextMessages.language.restartNeededTitle, nextMessages.language.restartNeededBody);
      }
    },
    []
  );

  const reload = useCallback(async () => {
    const saved = await getLanguagePreference();
    applySavedPreference(saved);
  }, [applySavedPreference]);

  const value = useMemo<I18nContextValue>(() => {
    const messages = getUiMessages(locale);
    return {
      locale,
      preference,
      messages,
      isRTL: isRtlLocale(locale),
      tx: (template, values) => (values ? interpolate(template, values) : template),
      setPreference,
      reload,
    };
  }, [locale, preference, reload, setPreference]);

  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtlLocale(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  const rootStyle =
    Platform.OS === 'web'
      ? { flex: 1 }
      : { flex: 1, direction: value.isRTL ? ('rtl' as const) : ('ltr' as const) };
  const webDir = Platform.OS === 'web' ? { dir: value.isRTL ? 'rtl' : 'ltr' } : {};

  return (
    <I18nContext.Provider value={value}>
      <View style={rootStyle} {...webDir}>
        {children}
      </View>
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
