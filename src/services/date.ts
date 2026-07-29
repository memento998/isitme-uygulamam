/**
 * Tarih işlemlerinin tamamı bu servis üzerinden yapılır.
 * Tarihler ISO (YYYY-MM-DD) metin biçiminde saklanır ve yerel saat dilimine göre yorumlanır.
 */

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export const TURKISH_MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
] as const;

/** Date nesnesini yerel saat diliminde ISO (YYYY-MM-DD) metnine çevirir. */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** Bugünün tarihi (yerel), ISO biçiminde. */
export function todayISO(): string {
  return toISODate(new Date());
}

/** ISO metni yerel gece yarısına denk gelen Date nesnesine çevirir. */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

/** Metnin geçerli bir ISO tarih olup olmadığını denetler (ör. 2026-02-30 geçersizdir). */
export function isValidISODate(value: string): boolean {
  if (!ISO_DATE_RE.test(value)) return false;
  const [y, m, d] = value.split('-').map(Number);
  if (m < 1 || m > 12) return false;
  const date = new Date(y, m - 1, d);
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
}

/** ISO tarihi GG.AA.YYYY biçiminde gösterir. */
export function formatDate(iso: string): string {
  if (!isValidISODate(iso)) return iso;
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
}

/** ISO tarihi "13 Temmuz 2026" biçiminde gösterir. */
export function formatDateLong(iso: string): string {
  if (!isValidISODate(iso)) return iso;
  const date = parseISODate(iso);
  return `${date.getDate()} ${TURKISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** ISO tarihin ait olduğu ayı "Temmuz 2026" biçiminde gösterir. */
export function formatMonthYear(iso: string): string {
  const date = parseISODate(iso);
  return `${TURKISH_MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** Ay anahtarı: YYYY-MM. */
export function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

/** Ay anahtarını (YYYY-MM) "Tem 2026" gibi kısa etikete çevirir. */
export function monthKeyLabel(key: string): string {
  const [y, m] = key.split('-').map(Number);
  return `${TURKISH_MONTHS[m - 1].slice(0, 3)} ${y}`;
}

/** Bugünden geriye doğru son n ayın anahtarlarını (eskiden yeniye) döndürür. */
export function lastNMonthKeys(n: number, todayIso: string): string[] {
  const [y, m] = todayIso.split('-').map(Number);
  const keys: string[] = [];
  for (let i = n - 1; i >= 0; i -= 1) {
    const date = new Date(y, m - 1 - i, 1);
    keys.push(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`);
  }
  return keys;
}

/** ISO tarihe gün ekler (negatif olabilir). */
export function addDays(iso: string, days: number): string {
  const date = parseISODate(iso);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

/**
 * ISO tarihe ay ekler. Gün, hedef ayın son gününü aşarsa ay sonuna sabitlenir
 * (ör. 31 Ocak + 1 ay = 28/29 Şubat).
 */
export function addMonths(iso: string, months: number): string {
  const [y, m, d] = iso.split('-').map(Number);
  const totalMonths = m - 1 + months;
  const targetYear = y + Math.floor(totalMonths / 12);
  const targetMonth = ((totalMonths % 12) + 12) % 12;
  const lastDay = new Date(targetYear, targetMonth + 1, 0).getDate();
  return toISODate(new Date(targetYear, targetMonth, Math.min(d, lastDay)));
}

/** İki ISO tarih arasındaki gün farkı: b - a. */
export function diffInDays(a: string, b: string): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  const da = parseISODate(a).getTime();
  const db = parseISODate(b).getTime();
  return Math.round((db - da) / msPerDay);
}

/** ISO tarihleri karşılaştırır: a < b → -1, a === b → 0, a > b → 1. */
export function compareISO(a: string, b: string): number {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/** Kalan gün sayısını kullanıcıya uygun metne çevirir. */
export function daysUntilLabel(iso: string, todayIso: string): string {
  const diff = diffInDays(todayIso, iso);
  if (diff === 0) return 'Bugün';
  if (diff === 1) return 'Yarın';
  if (diff > 1) return `${diff} gün sonra`;
  if (diff === -1) return '1 gün gecikti';
  return `${Math.abs(diff)} gün gecikti`;
}
