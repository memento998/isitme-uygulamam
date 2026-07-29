/**
 * Kontrol durumu hesaplamaları.
 * - Tamamlandı: gerçek tamamlanma tarihi girilmiş.
 * - Gecikti: tamamlanmamış ve planlanan tarih bugünden önce.
 * - Bekliyor: tamamlanmamış ve planlanan tarih bugün veya sonrası.
 */
import type { Checkup, CheckupStatus } from '@/types/models';
import { compareISO } from './date';

export function getCheckupStatus(checkup: Checkup, todayIso: string): CheckupStatus {
  if (checkup.completedAt) return 'completed';
  return compareISO(checkup.dueDate, todayIso) < 0 ? 'overdue' : 'pending';
}

export interface StatusCounts {
  completed: number;
  pending: number;
  overdue: number;
  total: number;
}

export function countByStatus(checkups: readonly Checkup[], todayIso: string): StatusCounts {
  const counts: StatusCounts = { completed: 0, pending: 0, overdue: 0, total: checkups.length };
  for (const c of checkups) {
    counts[getCheckupStatus(c, todayIso)] += 1;
  }
  return counts;
}

/** Tamamlanmamış kontroller arasında en erken planlanan (gecikenler dahil). */
export function nextCheckup(checkups: readonly Checkup[], todayIso: string): Checkup | null {
  const open = checkups.filter((c) => getCheckupStatus(c, todayIso) !== 'completed');
  if (open.length === 0) return null;
  return open.reduce((min, c) => (compareISO(c.dueDate, min.dueDate) < 0 ? c : min));
}

/** Bugün veya sonrasında planlanan en yakın bekleyen kontrol. */
export function nextUpcomingCheckup(
  checkups: readonly Checkup[],
  todayIso: string
): Checkup | null {
  const upcoming = checkups.filter((c) => getCheckupStatus(c, todayIso) === 'pending');
  if (upcoming.length === 0) return null;
  return upcoming.reduce((min, c) => (compareISO(c.dueDate, min.dueDate) < 0 ? c : min));
}
