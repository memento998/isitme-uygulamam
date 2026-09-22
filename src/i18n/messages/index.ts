import type { AppLocale } from '../locales';
import type { UiMessages } from './types';
import { tr } from './tr';
import { en } from './en';
import { de } from './de';
import { es } from './es';
import { it } from './it';
import { fr } from './fr';
import { ar } from './ar';
import { zhHans } from './zhHans';
import { hi } from './hi';
import { te } from './te';

export const UI_MESSAGES: Record<AppLocale, UiMessages> = {
  tr,
  en,
  de,
  es,
  it,
  fr,
  ar,
  'zh-Hans': zhHans,
  hi,
  te,
};

export function getUiMessages(locale: AppLocale): UiMessages {
  return UI_MESSAGES[locale];
}
