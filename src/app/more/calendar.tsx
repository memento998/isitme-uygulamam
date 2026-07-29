import { SectionList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState, ErrorView, LoadingView } from '@/components/ui/StateViews';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { useAsyncData } from '@/hooks/useAsyncData';
import { listAllCheckups } from '@/repositories/checkups';
import { listDevices } from '@/repositories/devices';
import { listAllReminders, nextReminderDate } from '@/repositories/maintenance';
import { getCheckupStatus } from '@/services/checkupStatus';
import { compareISO, daysUntilLabel, formatDate, formatMonthYear, todayISO } from '@/services/date';
import type { CheckupStatus } from '@/types/models';
import { MAINTENANCE_TYPE_LABELS } from '@/types/models';

interface AgendaItem {
  key: string;
  date: string;
  title: string;
  deviceName: string;
  status: CheckupStatus | null;
}

interface AgendaSection {
  title: string;
  data: AgendaItem[];
}

async function loadAgenda(): Promise<{ sections: AgendaSection[]; today: string }> {
  const today = todayISO();
  const [devices, checkups, reminders] = await Promise.all([
    listDevices(),
    listAllCheckups(),
    listAllReminders(),
  ]);
  const deviceMap = new Map(devices.map((d) => [d.id, d]));

  const items: AgendaItem[] = [];
  for (const checkup of checkups) {
    if (checkup.completedAt) continue;
    const device = deviceMap.get(checkup.deviceId);
    if (!device) continue;
    items.push({
      key: `c-${checkup.id}`,
      date: checkup.dueDate,
      title: checkup.title,
      deviceName: device.name,
      status: getCheckupStatus(checkup, today),
    });
  }
  for (const reminder of reminders) {
    if (!reminder.enabled) continue;
    const device = deviceMap.get(reminder.deviceId);
    if (!device) continue;
    const next = nextReminderDate(reminder, device.warrantyEndDate);
    if (!next || compareISO(next, today) < 0) continue;
    items.push({
      key: `r-${reminder.id}`,
      date: next,
      title: MAINTENANCE_TYPE_LABELS[reminder.type],
      deviceName: device.name,
      status: null,
    });
  }

  items.sort((a, b) => compareISO(a.date, b.date));

  const sections: AgendaSection[] = [];
  for (const item of items) {
    const monthTitle = formatMonthYear(item.date);
    const last = sections[sections.length - 1];
    if (last && last.title === monthTitle) {
      last.data.push(item);
    } else {
      sections.push({ title: monthTitle, data: [item] });
    }
  }
  return { sections, today };
}

export default function CalendarScreen() {
  const { data, loading, error, reload } = useAsyncData(loadAgenda);

  if (loading) return <LoadingView />;
  if (error || !data) return <ErrorView message={error ?? undefined} onRetry={reload} />;

  return (
    <View style={styles.container}>
      <SectionList
        sections={data.sections}
        keyExtractor={(item) => item.key}
        contentContainerStyle={[
          styles.content,
          data.sections.length === 0 && styles.contentEmpty,
        ]}
        renderSectionHeader={({ section }) => (
          <Text style={styles.sectionTitle}>{section.title}</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons
                name={item.status === null ? 'build-outline' : 'calendar-outline'}
                size={20}
                color={colors.primary}
              />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.rowSubtitle}>{item.deviceName}</Text>
              <Text style={styles.rowDate}>
                {formatDate(item.date)} · {daysUntilLabel(item.date, data.today)}
              </Text>
            </View>
            {item.status ? <StatusBadge status={item.status} /> : null}
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="calendar-outline"
            title="Planlanmış işlem yok"
            description="Cihaz eklediğinizde kontrol ve bakım tarihleri burada listelenir."
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  contentEmpty: { flexGrow: 1, justifyContent: 'center' },
  sectionTitle: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.primary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
    minHeight: 64,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: { flex: 1 },
  rowTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  rowSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  rowDate: { fontSize: fontSize.xs, color: colors.primary, marginTop: 2, fontWeight: '600' },
});
