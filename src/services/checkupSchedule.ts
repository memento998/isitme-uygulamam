/**
 * Kullanım başlangıç tarihine göre örnek kontrol takvimi üretir.
 * Program: 1. ay, 3. ay, 6. ay, 1. yıl, 1,5 yıl, 2. yıl, sonrasında 6 ayda bir.
 *
 * Bu takvim yalnızca örnek bir hatırlatma programıdır, tıbbi tavsiye değildir.
 */
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

/** Ay sayısını Türkçe kontrol başlığına çevirir. */
export function scheduleTitleForMonths(months: number): string {
  if (months < 12) return `${months}. ay kontrolü`;
  if (months % 12 === 0) return `${months / 12}. yıl kontrolü`;
  const years = Math.floor(months / 12);
  return `${years},5 yıl kontrolü`;
}

/**
 * Başlangıç tarihine göre kontrol takvimi üretir.
 * @param startDate ISO başlangıç tarihi
 * @param years Kaç yıl ileriye kadar üretileceği
 */
export function generateSchedule(
  startDate: string,
  years: number = DEFAULT_SCHEDULE_YEARS
): ScheduleEntry[] {
  const maxMonths = years * 12;
  const baseMonths = [1, 3, 6, 12, 18, 24];
  const months: number[] = baseMonths.filter((m) => m <= maxMonths);
  for (let m = 30; m <= maxMonths; m += 6) {
    months.push(m);
  }
  return months.map((m) => ({
    title: scheduleTitleForMonths(m),
    dueDate: addMonths(startDate, m),
    monthsAfterStart: m,
  }));
}
