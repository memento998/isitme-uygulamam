import {
  addDays,
  addMonths,
  compareISO,
  daysUntilLabel,
  diffInDays,
  formatDate,
  formatDateLong,
  isValidISODate,
  lastNMonthKeys,
  monthKey,
  monthKeyLabel,
  parseISODate,
  toISODate,
} from '../date';

describe('date servisi', () => {
  test('toISODate ve parseISODate tutarlıdır', () => {
    expect(toISODate(new Date(2026, 6, 13))).toBe('2026-07-13');
    const parsed = parseISODate('2026-07-13');
    expect(parsed.getFullYear()).toBe(2026);
    expect(parsed.getMonth()).toBe(6);
    expect(parsed.getDate()).toBe(13);
  });

  test('isValidISODate geçersiz tarihleri yakalar', () => {
    expect(isValidISODate('2026-07-13')).toBe(true);
    expect(isValidISODate('2026-02-30')).toBe(false);
    expect(isValidISODate('2026-13-01')).toBe(false);
    expect(isValidISODate('13.07.2026')).toBe(false);
    expect(isValidISODate('')).toBe(false);
  });

  test('formatDate GG.AA.YYYY biçiminde gösterir', () => {
    expect(formatDate('2026-07-13')).toBe('13.07.2026');
  });

  test('formatDateLong Türkçe ay adı kullanır', () => {
    expect(formatDateLong('2026-07-13')).toBe('13 Temmuz 2026');
  });

  test('addDays gün ekler ve ay sınırını aşar', () => {
    expect(addDays('2026-01-30', 5)).toBe('2026-02-04');
    expect(addDays('2026-01-05', -6)).toBe('2025-12-30');
  });

  test('addMonths ay sonunu doğru sabitler', () => {
    expect(addMonths('2026-01-31', 1)).toBe('2026-02-28');
    expect(addMonths('2024-01-31', 1)).toBe('2024-02-29'); // artık yıl
    expect(addMonths('2026-01-15', 12)).toBe('2027-01-15');
    expect(addMonths('2026-11-30', 3)).toBe('2027-02-28');
  });

  test('diffInDays gün farkını hesaplar', () => {
    expect(diffInDays('2026-07-13', '2026-07-20')).toBe(7);
    expect(diffInDays('2026-07-20', '2026-07-13')).toBe(-7);
    expect(diffInDays('2026-07-13', '2026-07-13')).toBe(0);
  });

  test('compareISO sıralama yapar', () => {
    expect(compareISO('2026-01-01', '2026-01-02')).toBe(-1);
    expect(compareISO('2026-01-02', '2026-01-01')).toBe(1);
    expect(compareISO('2026-01-01', '2026-01-01')).toBe(0);
  });

  test('monthKey ve monthKeyLabel', () => {
    expect(monthKey('2026-07-13')).toBe('2026-07');
    expect(monthKeyLabel('2026-07')).toBe('Tem 2026');
  });

  test('lastNMonthKeys yıl sınırını aşar', () => {
    expect(lastNMonthKeys(3, '2026-01-15')).toEqual(['2025-11', '2025-12', '2026-01']);
  });

  test('daysUntilLabel kullanıcı dostu metin üretir', () => {
    expect(daysUntilLabel('2026-07-13', '2026-07-13')).toBe('Bugün');
    expect(daysUntilLabel('2026-07-14', '2026-07-13')).toBe('Yarın');
    expect(daysUntilLabel('2026-07-20', '2026-07-13')).toBe('7 gün sonra');
    expect(daysUntilLabel('2026-07-10', '2026-07-13')).toBe('3 gün gecikti');
  });
});
