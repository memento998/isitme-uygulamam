import type { AppLocale } from '@/i18n/locales';

import { ACTIVE_TIP_IDS } from './catalog';
import { getLocalizedTip } from './content';
import { audienceLabel, categoryLabel } from './labels';
import type { KnowledgeCategoryId, KnowledgeTipId } from './types';
import type { UiMessages } from '@/i18n/messages/types';

function latinSearchForm(value: string): string {
  return value.normalize('NFD').replace(/\p{M}+/gu, '');
}

/** Locale-aware search haystack. Does not strip Indic marks or assume Chinese word breaks. */
export function normalizeSearchText(value: string, locale: AppLocale): string {
  const trimmed = value.trim();
  if (!trimmed) return '';
  if (locale === 'tr') {
    return trimmed.toLocaleLowerCase('tr');
  }
  if (locale === 'zh-Hans') {
    return trimmed.toLocaleLowerCase('zh-CN');
  }
  if (locale === 'ar') {
    return trimmed.toLocaleLowerCase('ar').normalize('NFC');
  }
  if (locale === 'hi' || locale === 'te') {
    return trimmed.toLocaleLowerCase(locale === 'hi' ? 'hi-IN' : 'te-IN').normalize('NFC');
  }
  return latinSearchForm(trimmed.toLocaleLowerCase(locale));
}

function haystackForTip(
  id: KnowledgeTipId,
  locale: AppLocale,
  messages: UiMessages
): string {
  const tip = getLocalizedTip(id, locale);
  const parts = [
    tip.title,
    tip.message,
    tip.detail,
    categoryLabel(tip.categoryId, messages),
    audienceLabel(tip.audience, messages),
  ];
  return normalizeSearchText(parts.join(' '), locale);
}

export function filterKnowledgeTips(
  query: string,
  categoryId: KnowledgeCategoryId | 'all',
  locale: AppLocale,
  messages: UiMessages
): KnowledgeTipId[] {
  const needle = normalizeSearchText(query, locale);
  return ACTIVE_TIP_IDS.filter((id) => {
    const tip = getLocalizedTip(id, locale);
    if (categoryId !== 'all' && tip.categoryId !== categoryId) return false;
    if (!needle) return true;
    return haystackForTip(id, locale, messages).includes(needle);
  });
}
