import type { AppLocale } from '@/i18n/locales';

import { getTipMeta } from './catalog';
import { TIPS_AR } from './locales/ar';
import { TIPS_DE } from './locales/de';
import { TIPS_EN } from './locales/en';
import { TIPS_ES } from './locales/es';
import { TIPS_FR } from './locales/fr';
import { TIPS_HI } from './locales/hi';
import { TIPS_IT } from './locales/it';
import { TIPS_TE } from './locales/te';
import { TIPS_TR } from './locales/tr';
import { TIPS_ZH_HANS } from './locales/zhHans';
import type { KnowledgeTipCopy, KnowledgeTipId, KnowledgeTipMeta } from './types';

export const DEFAULT_KNOWLEDGE_LOCALE: AppLocale = 'tr';

export const TIPS_BY_LOCALE: Record<AppLocale, Record<KnowledgeTipId, KnowledgeTipCopy>> = {
  tr: TIPS_TR,
  en: TIPS_EN,
  de: TIPS_DE,
  es: TIPS_ES,
  it: TIPS_IT,
  fr: TIPS_FR,
  ar: TIPS_AR,
  'zh-Hans': TIPS_ZH_HANS,
  hi: TIPS_HI,
  te: TIPS_TE,
};

function isNonEmptyCopy(copy: KnowledgeTipCopy | undefined): copy is KnowledgeTipCopy {
  return Boolean(copy?.title?.trim() && copy.message.trim() && copy.detail.trim());
}

export function getTipCopy(id: KnowledgeTipId, locale: AppLocale): KnowledgeTipCopy {
  const localized = TIPS_BY_LOCALE[locale]?.[id];
  if (isNonEmptyCopy(localized)) {
    return localized;
  }
  const fallbackTr = TIPS_TR[id];
  if (isNonEmptyCopy(fallbackTr)) {
    return fallbackTr;
  }
  return TIPS_EN[id];
}

export type LocalizedKnowledgeTip = KnowledgeTipMeta & KnowledgeTipCopy;

export function getLocalizedTip(id: KnowledgeTipId, locale: AppLocale): LocalizedKnowledgeTip {
  const meta = getTipMeta(id);
  const copy = getTipCopy(id, locale);
  return {
    ...meta,
    ...copy,
  };
}
