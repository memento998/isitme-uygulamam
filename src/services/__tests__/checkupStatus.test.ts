import type { Checkup } from '@/types/models';
import {
  countByStatus,
  getCheckupStatus,
  nextCheckup,
  nextUpcomingCheckup,
} from '../checkupStatus';

function makeCheckup(overrides: Partial<Checkup>): Checkup {
  return {
    id: 'test-id',
    deviceId: 'device-1',
    title: 'Kontrol',
    dueDate: '2026-07-13',
    completedAt: null,
    note: null,
    createdAt: '2026-01-01',
    ...overrides,
  };
}

const TODAY = '2026-07-13';

describe('kontrol durumu hesaplama', () => {
  test('tamamlanma tarihi olan kontrol her zaman tamamlandı sayılır', () => {
    const checkup = makeCheckup({ dueDate: '2026-01-01', completedAt: '2026-01-05' });
    expect(getCheckupStatus(checkup, TODAY)).toBe('completed');
  });

  test('planlanan tarihi geçmiş ve tamamlanmamış kontrol gecikmiştir', () => {
    const checkup = makeCheckup({ dueDate: '2026-07-12' });
    expect(getCheckupStatus(checkup, TODAY)).toBe('overdue');
  });

  test('planlanan tarihi bugün olan kontrol bekliyor sayılır', () => {
    const checkup = makeCheckup({ dueDate: TODAY });
    expect(getCheckupStatus(checkup, TODAY)).toBe('pending');
  });

  test('gelecekteki kontrol bekliyor sayılır', () => {
    const checkup = makeCheckup({ dueDate: '2026-08-01' });
    expect(getCheckupStatus(checkup, TODAY)).toBe('pending');
  });

  test('countByStatus doğru sayar', () => {
    const checkups = [
      makeCheckup({ id: '1', dueDate: '2026-01-01', completedAt: '2026-01-01' }),
      makeCheckup({ id: '2', dueDate: '2026-07-01' }),
      makeCheckup({ id: '3', dueDate: '2026-08-01' }),
      makeCheckup({ id: '4', dueDate: '2026-09-01' }),
    ];
    expect(countByStatus(checkups, TODAY)).toEqual({
      completed: 1,
      overdue: 1,
      pending: 2,
      total: 4,
    });
  });

  test('boş listede sayaçlar sıfırdır', () => {
    expect(countByStatus([], TODAY)).toEqual({ completed: 0, overdue: 0, pending: 0, total: 0 });
  });

  test('nextUpcomingCheckup yalnızca bekleyenler arasından en erkenini seçer', () => {
    const checkups = [
      makeCheckup({ id: '1', dueDate: '2026-07-01' }), // gecikmiş
      makeCheckup({ id: '2', dueDate: '2026-09-01' }),
      makeCheckup({ id: '3', dueDate: '2026-08-01' }),
      makeCheckup({ id: '4', dueDate: '2026-07-20', completedAt: '2026-07-10' }),
    ];
    expect(nextUpcomingCheckup(checkups, TODAY)?.id).toBe('3');
  });

  test('nextCheckup gecikenleri de dikkate alır', () => {
    const checkups = [
      makeCheckup({ id: '1', dueDate: '2026-07-01' }),
      makeCheckup({ id: '2', dueDate: '2026-08-01' }),
    ];
    expect(nextCheckup(checkups, TODAY)?.id).toBe('1');
  });

  test('bekleyen kontrol yoksa nextUpcomingCheckup null döner', () => {
    const checkups = [makeCheckup({ id: '1', dueDate: '2026-01-01', completedAt: '2026-01-01' })];
    expect(nextUpcomingCheckup(checkups, TODAY)).toBeNull();
    expect(nextUpcomingCheckup([], TODAY)).toBeNull();
  });
});
