import type { Checkup, MaintenanceLog } from '@/types/models';
import { computeOverallStats, formatPercent } from '../stats';

const TODAY = '2026-07-13';

function makeCheckup(overrides: Partial<Checkup>): Checkup {
  return {
    id: Math.random().toString(36),
    deviceId: 'device-1',
    title: 'Kontrol',
    dueDate: '2026-07-13',
    completedAt: null,
    note: null,
    createdAt: '2026-01-01',
    ...overrides,
  };
}

function makeLog(doneAt: string): MaintenanceLog {
  return {
    id: Math.random().toString(36),
    deviceId: 'device-1',
    type: 'cleaning',
    doneAt,
    note: null,
  };
}

describe('istatistik hesaplama', () => {
  test('sıfır veri durumunda oranlar null döner (yanlış %100 gösterilmez)', () => {
    const stats = computeOverallStats(0, [], [], TODAY);
    expect(stats.completionRate).toBeNull();
    expect(stats.onTimeRate).toBeNull();
    expect(stats.averageDelayDays).toBeNull();
    expect(stats.nextCheckupDate).toBeNull();
    expect(stats.hasMonthlyData).toBe(false);
    expect(stats.monthlyCompleted).toHaveLength(6);
  });

  test('tamamlama oranı doğru hesaplanır', () => {
    const checkups = [
      makeCheckup({ dueDate: '2026-06-01', completedAt: '2026-06-01' }),
      makeCheckup({ dueDate: '2026-08-01' }),
    ];
    const stats = computeOverallStats(1, checkups, [], TODAY);
    expect(stats.completionRate).toBe(0.5);
  });

  test('zamanında yapma oranı yalnızca tamamlananlar üzerinden hesaplanır', () => {
    const checkups = [
      makeCheckup({ dueDate: '2026-06-01', completedAt: '2026-06-01' }), // zamanında
      makeCheckup({ dueDate: '2026-05-01', completedAt: '2026-05-11' }), // 10 gün geç
      makeCheckup({ dueDate: '2026-08-01' }), // bekliyor: orana dahil edilmez
    ];
    const stats = computeOverallStats(1, checkups, [], TODAY);
    expect(stats.onTimeRate).toBe(0.5);
    expect(stats.averageDelayDays).toBe(10);
  });

  test('hiç tamamlanan yoksa zamanında yapma oranı null olur', () => {
    const checkups = [makeCheckup({ dueDate: '2026-08-01' })];
    const stats = computeOverallStats(1, checkups, [], TODAY);
    expect(stats.completionRate).toBe(0);
    expect(stats.onTimeRate).toBeNull();
    expect(stats.averageDelayDays).toBeNull();
  });

  test('aylık grafik kontrol ve bakım işlemlerini birlikte sayar', () => {
    const checkups = [
      makeCheckup({ dueDate: '2026-07-01', completedAt: '2026-07-05' }),
      makeCheckup({ dueDate: '2026-06-01', completedAt: '2026-06-10' }),
    ];
    const logs = [makeLog('2026-07-02'), makeLog('2026-01-02') /* 6 ay penceresi dışında */];
    const stats = computeOverallStats(1, checkups, logs, TODAY);
    const july = stats.monthlyCompleted.find((m) => m.key === '2026-07');
    const june = stats.monthlyCompleted.find((m) => m.key === '2026-06');
    expect(july?.count).toBe(2);
    expect(june?.count).toBe(1);
    expect(stats.hasMonthlyData).toBe(true);
    expect(stats.monthlyCompleted.map((m) => m.key)).toEqual([
      '2026-02',
      '2026-03',
      '2026-04',
      '2026-05',
      '2026-06',
      '2026-07',
    ]);
  });

  test('en yakın kontrol bekleyenler arasından seçilir', () => {
    const checkups = [
      makeCheckup({ dueDate: '2026-07-01', title: 'Geciken' }),
      makeCheckup({ dueDate: '2026-09-01', title: '6. ay kontrolü' }),
    ];
    const stats = computeOverallStats(1, checkups, [], TODAY);
    expect(stats.nextCheckupDate).toBe('2026-09-01');
    expect(stats.nextCheckupTitle).toBe('6. ay kontrolü');
  });

  test('formatPercent yuvarlar', () => {
    expect(formatPercent(0.5)).toBe('%50');
    expect(formatPercent(1)).toBe('%100');
    expect(formatPercent(2 / 3)).toBe('%67');
  });
});
