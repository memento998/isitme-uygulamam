import { generateSchedule, scheduleTitleForMonths } from '../checkupSchedule';

describe('kontrol takvimi servisi', () => {
  test('program 1, 3, 6, 12, 18, 24. ayları ve sonrasında 6 ayda bir kontrolleri içerir', () => {
    const schedule = generateSchedule('2026-01-15', 4);
    const months = schedule.map((s) => s.monthsAfterStart);
    expect(months).toEqual([1, 3, 6, 12, 18, 24, 30, 36, 42, 48]);
  });

  test('tarihler başlangıç tarihine göre hesaplanır', () => {
    const schedule = generateSchedule('2026-01-15', 4);
    expect(schedule[0].dueDate).toBe('2026-02-15'); // 1. ay
    expect(schedule[3].dueDate).toBe('2027-01-15'); // 1. yıl
    expect(schedule[5].dueDate).toBe('2028-01-15'); // 2. yıl
  });

  test('ay sonu başlangıçlarında tarih taşmaz', () => {
    const schedule = generateSchedule('2026-01-31', 1);
    expect(schedule[0].dueDate).toBe('2026-02-28'); // 1. ay → Şubat sonu
  });

  test('başlıklar Türkçe üretilir', () => {
    expect(scheduleTitleForMonths(1)).toBe('1. ay kontrolü');
    expect(scheduleTitleForMonths(6)).toBe('6. ay kontrolü');
    expect(scheduleTitleForMonths(12)).toBe('1. yıl kontrolü');
    expect(scheduleTitleForMonths(18)).toBe('1,5 yıl kontrolü');
    expect(scheduleTitleForMonths(24)).toBe('2. yıl kontrolü');
    expect(scheduleTitleForMonths(30)).toBe('2,5 yıl kontrolü');
    expect(scheduleTitleForMonths(36)).toBe('3. yıl kontrolü');
  });
});
