/**
 * Kullanım başlangıç tarihine göre örnek kontrol takvimi üretir.
 * Program: 1. ay, 3. ay, 6. ay, 1. yıl, 1,5 yıl, 2. yıl, sonrasında 6 ayda bir.
 *
 * Bu takvim yalnızca örnek bir hatırlatma programıdır, tıbbi tavsiye değildir.
 */
import { interpolate } from '@/i18n/interpolate';
import type { UiMessages } from '@/i18n/messages/types';

import { addMonths } from './date';

export interface ScheduleEntry {
  title: string;
  dueDate: string;
  monthsAfterStart: number;
}

/** Varsayılan olarak başlangıçtan itibaren kaç yıllık program üretilir. */
export const DEFAULT_SCHEDULE_YEARS = 4;

export const SCHEDULE_DISCLAIMER =
  'Bu kontrol programı yalnızca örnek bir hatırlatma takvimidir, tıbbi tavsiye değildir. ' +
  'Kontrol sıklığını işitme uzmanınızla birlikte belirleyin.';

/** Ay sayısını kontrol başlığına çevirir. `messages` yoksa Türkçe (kayıtlı içerik / testler). */
export function scheduleTitleForMonths(months: number, messages?: UiMessages): string {
  if (messages) {
    if (months < 12) return interpolate(messages.schedule.monthCheckup, { count: months });
    if (months % 12 === 0) return interpolate(messages.schedule.yearCheckup, { count: months / 12 });
    return interpolate(messages.schedule.yearHalfCheckup, { years: Math.floor(months / 12) });
  }
  if (months < 12) return `${months}. ay kontrolü`;
  if (months % 12 === 0) return `${months / 12}. yıl kontrolü`;
  const years = Math.floor(months / 12);
  return `${years},5 yıl kontrolü`;
}

/**
 * Başlangıç tarihine göre kontrol takvimi üretir.
 * Başlıklar varsayılan olarak Türkçe üretilir (veritabanına yazılan kullanıcı görünür içerik).
 */
export function generateSchedule(
  startDate: string,
  years: number = DEFAULT_SCHEDULE_YEARS,
  titleForMonths: (months: number) => string = scheduleTitleForMonths
): ScheduleEntry[] {
  const maxMonths = years * 12;
  const baseMonths = [1, 3, 6, 12, 18, 24];
  const months: number[] = baseMonths.filter((m) => m <= maxMonths);
  for (let m = 30; m <= maxMonths; m += 6) {
    months.push(m);
  }
  return months.map((m) => ({
    title: titleForMonths(m),
    dueDate: addMonths(startDate, m),
    monthsAfterStart: m,
  }));
}
