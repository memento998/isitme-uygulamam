import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AdBanner } from '@/components/AdBanner';
import { BarChart } from '@/components/ui/BarChart';
import { Card } from '@/components/ui/Card';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ErrorView, LoadingView } from '@/components/ui/StateViews';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useAsyncData } from '@/hooks/useAsyncData';
import { listAllCheckups } from '@/repositories/checkups';
import { listDevices } from '@/repositories/devices';
import { listAllLogs } from '@/repositories/maintenance';
import { formatDate, todayISO } from '@/services/date';
import { computeOverallStats, formatPercent, type OverallStats } from '@/services/stats';

const NO_DATA = 'Henüz yeterli veri yok';

async function loadStats(): Promise<OverallStats> {
  const [devices, checkups, logs] = await Promise.all([
    listDevices(),
    listAllCheckups(),
    listAllLogs(),
  ]);
  return computeOverallStats(devices.length, checkups, logs, todayISO());
}

export default function StatsScreen() {
  const { data: stats, loading, error, reload } = useAsyncData(loadStats);

  if (loading) return <LoadingView />;
  if (error || !stats) return <ErrorView message={error ?? undefined} onRetry={reload} />;

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      <View style={styles.grid}>
        <StatCard
          icon="hardware-chip-outline"
          label="Toplam cihaz"
          value={String(stats.totalDevices)}
          color={colors.primary}
        />
        <StatCard
          icon="checkmark-circle-outline"
          label="Tamamlanan kontrol"
          value={String(stats.completed)}
          color={colors.success}
        />
        <StatCard
          icon="time-outline"
          label="Bekleyen kontrol"
          value={String(stats.pending)}
          color={colors.primary}
        />
        <StatCard
          icon="alert-circle-outline"
          label="Geciken kontrol"
          value={String(stats.overdue)}
          color={colors.danger}
        />
      </View>

      <SectionHeader title="Oranlar" />
      <Card>
        <RateRow
          label="Genel tamamlama oranı"
          value={stats.completionRate !== null ? formatPercent(stats.completionRate) : NO_DATA}
          isEmpty={stats.completionRate === null}
        />
        <RateRow
          label="Zamanında yapma oranı"
          value={stats.onTimeRate !== null ? formatPercent(stats.onTimeRate) : NO_DATA}
          isEmpty={stats.onTimeRate === null}
        />
        <RateRow
          label="Ortalama gecikme"
          value={
            stats.averageDelayDays !== null
              ? `${Math.round(stats.averageDelayDays)} gün`
              : NO_DATA
          }
          isEmpty={stats.averageDelayDays === null}
        />
        <RateRow
          label="En yakın kontrol"
          value={
            stats.nextCheckupDate
              ? `${formatDate(stats.nextCheckupDate)} · ${stats.nextCheckupTitle ?? ''}`
              : NO_DATA
          }
          isEmpty={stats.nextCheckupDate === null}
        />
      </Card>

      <SectionHeader title="Aylık tamamlanan işlemler" />
      <Card>
        {stats.hasMonthlyData ? (
          <BarChart
            data={stats.monthlyCompleted.map((m) => ({ label: m.label, value: m.count }))}
          />
        ) : (
          <View style={styles.emptyChart}>
            <Ionicons name="bar-chart-outline" size={40} color={colors.textMuted} />
            <Text style={styles.emptyChartText}>{NO_DATA}</Text>
            <Text style={styles.emptyChartHint}>
              Kontroller ve bakım işlemleri tamamlandıkça grafik burada görünecek.
            </Text>
          </View>
        )}
      </Card>
      </ScrollView>
      <AdBanner />
    </View>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <Card style={styles.statCard}>
      <Ionicons name={icon} size={24} color={color} />
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </Card>
  );
}

function RateRow({ label, value, isEmpty }: { label: string; value: string; isEmpty: boolean }) {
  return (
    <View style={styles.rateRow}>
      <Text style={styles.rateLabel}>{label}</Text>
      <Text style={[styles.rateValue, isEmpty && styles.rateValueEmpty]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  statCard: {
    flexGrow: 1,
    flexBasis: '45%',
    alignItems: 'center',
    gap: spacing.xs,
  },
  statValue: { fontSize: fontSize.xxl, fontWeight: '700' },
  statLabel: { fontSize: fontSize.sm, color: colors.textMuted, textAlign: 'center' },
  rateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.md,
    minHeight: 44,
  },
  rateLabel: { fontSize: fontSize.sm, color: colors.text, flex: 1 },
  rateValue: { fontSize: fontSize.md, fontWeight: '700', color: colors.primary, textAlign: 'right' },
  rateValueEmpty: { color: colors.textMuted, fontWeight: '400', fontSize: fontSize.sm },
  emptyChart: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  emptyChartText: { fontSize: fontSize.md, fontWeight: '600', color: colors.textMuted },
  emptyChartHint: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
