/**
 * İstatistik hesaplamaları. Sıfır veri durumunda oranlar null döner;
 * ekran bu durumda "Henüz yeterli veri yok" gösterir.
 */
import type { Checkup, MaintenanceLog } from '@/types/models';
import { countByStatus, getCheckupStatus, nextUpcomingCheckup } from './checkupStatus';
import { compareISO, diffInDays, lastNMonthKeys, monthKey, monthKeyLabel } from './date';

export interface MonthlyCount {
  key: string;
  label: string;
  count: number;
}

export interface OverallStats {
  totalDevices: number;
  completed: number;
  pending: number;
  overdue: number;
  /** Tamamlanan / toplam kontrol. Kontrol yoksa null. */
  completionRate: number | null;
  /** Zamanında (planlanan tarihte veya öncesinde) tamamlanan / tamamlanan. Tamamlanan yoksa null. */
  onTimeRate: number | null;
  /** Geç tamamlanan kontrollerin ortalama gecikmesi (gün). Geç tamamlanan yoksa null. */
  averageDelayDays: number | null;
  /** En yakın bekleyen kontrolün tarihi ve başlığı. */
  nextCheckupDate: string | null;
  nextCheckupTitle: string | null;
  /** Son 6 ayda tamamlanan işlemler (kontrol + bakım). */
  monthlyCompleted: MonthlyCount[];
  /** Grafikte gösterecek en az bir işlem var mı? */
  hasMonthlyData: boolean;
}

export function computeOverallStats(
  totalDevices: number,
  checkups: readonly Checkup[],
  maintenanceLogs: readonly MaintenanceLog[],
  todayIso: string
): OverallStats {
  const counts = countByStatus(checkups, todayIso);

  const completionRate = counts.total > 0 ? counts.completed / counts.total : null;

  const completedCheckups = checkups.filter((c) => getCheckupStatus(c, todayIso) === 'completed');
  const onTime = completedCheckups.filter(
    (c) => c.completedAt !== null && compareISO(c.completedAt, c.dueDate) <= 0
  );
  const onTimeRate = completedCheckups.length > 0 ? onTime.length / completedCheckups.length : null;

  const lateCompletions = completedCheckups
    .filter((c) => c.completedAt !== null && compareISO(c.completedAt, c.dueDate) > 0)
    .map((c) => diffInDays(c.dueDate, c.completedAt as string));
  const averageDelayDays =
    lateCompletions.length > 0
      ? lateCompletions.reduce((sum, d) => sum + d, 0) / lateCompletions.length
      : null;

  const next = nextUpcomingCheckup(checkups, todayIso);

  const keys = lastNMonthKeys(6, todayIso);
  const byMonth = new Map<string, number>(keys.map((k) => [k, 0]));
  for (const c of completedCheckups) {
    if (c.completedAt) {
      const k = monthKey(c.completedAt);
      if (byMonth.has(k)) byMonth.set(k, (byMonth.get(k) ?? 0) + 1);
    }
  }
  for (const log of maintenanceLogs) {
    const k = monthKey(log.doneAt);
    if (byMonth.has(k)) byMonth.set(k, (byMonth.get(k) ?? 0) + 1);
  }
  const monthlyCompleted: MonthlyCount[] = keys.map((k) => ({
    key: k,
    label: monthKeyLabel(k),
    count: byMonth.get(k) ?? 0,
  }));

  return {
    totalDevices,
    completed: counts.completed,
    pending: counts.pending,
    overdue: counts.overdue,
    completionRate,
    onTimeRate,
    averageDelayDays,
    nextCheckupDate: next?.dueDate ?? null,
    nextCheckupTitle: next?.title ?? null,
    monthlyCompleted,
    hasMonthlyData: monthlyCompleted.some((m) => m.count > 0),
  };
}

/** Oranı yüzde metnine çevirir (ör. 0.5 → "%50"). */
export function formatPercent(rate: number): string {
  return `%${Math.round(rate * 100)}`;
}
