import { diffInDays, isValidISODate, parseISODate } from '@/services/date';

import { interpolate } from './interpolate';
import type { UiMessages } from './messages/types';

export function formatDateLongLocalized(iso: string, months: UiMessages['months']['full']): string {
  if (!isValidISODate(iso)) return iso;
  const date = parseISODate(iso);
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatMonthYearLocalized(iso: string, months: UiMessages['months']['full']): string {
  const date = parseISODate(iso);
  return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function monthKeyLabelLocalized(key: string, months: UiMessages['months']['short']): string {
  const [y, m] = key.split('-').map(Number);
  return `${months[m - 1]} ${y}`;
}

export function daysUntilLocalized(iso: string, todayIso: string, messages: UiMessages): string {
  const diff = diffInDays(todayIso, iso);
  if (diff === 0) return messages.common.today;
  if (diff === 1) return messages.common.tomorrow;
  if (diff > 1) return interpolate(messages.common.daysLater, { count: diff });
  if (diff === -1) return messages.common.daysLateOne;
  return interpolate(messages.common.daysLateMany, { count: Math.abs(diff) });
}
