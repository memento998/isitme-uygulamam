import { addDays, isValidISODate } from '@/services/date';

import { ACTIVE_TIP_IDS } from './catalog';
import type { KnowledgeTipId } from './types';

/**
 * Civil calendar day difference using local Y/M/D components.
 * Does not use local timestamps divided by 86_400_000 (DST-unsafe).
 */
export function calendarDaysBetween(fromIso: string, toIso: string): number {
  if (!isValidISODate(fromIso) || !isValidISODate(toIso)) {
    throw new Error('Invalid ISO date');
  }
  const [fy, fm, fd] = fromIso.split('-').map(Number);
  const [ty, tm, td] = toIso.split('-').map(Number);
  const fromUtc = Date.UTC(fy, fm - 1, fd);
  const toUtc = Date.UTC(ty, tm - 1, td);
  return Math.trunc((toUtc - fromUtc) / 86_400_000);
}

/** Index in the 49-item daily order. Does not use the numeric part of the tip id. */
export function tipIndexForCalendarDay(startIso: string, dateIso: string): number {
  const delta = calendarDaysBetween(startIso, dateIso);
  const count = ACTIVE_TIP_IDS.length;
  return ((delta % count) + count) % count;
}

export function tipIdForCalendarDay(startIso: string, dateIso: string): KnowledgeTipId {
  return ACTIVE_TIP_IDS[tipIndexForCalendarDay(startIso, dateIso)];
}

export function nextLocalMidnight(from: Date = new Date()): Date {
  return new Date(from.getFullYear(), from.getMonth(), from.getDate() + 1, 0, 0, 0, 0);
}

export function dateAtLocalTime(iso: string, hour: number, minute: number): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d, hour, minute, 0, 0);
}

export function addLocalDays(iso: string, days: number): string {
  return addDays(iso, days);
}

export function isSameLocalDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
