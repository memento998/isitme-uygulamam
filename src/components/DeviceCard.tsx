import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, fontSize, MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';
import type { StatusCounts } from '@/services/checkupStatus';
import { daysUntilLocalized, useI18n } from '@/i18n';
import { formatDate } from '@/services/date';
import type { Device } from '@/types/models';
import { Card } from './ui/Card';

interface Props {
  device: Device;
  counts: StatusCounts;
  nextCheckupDate: string | null;
  todayIso: string;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function DeviceCard({
  device,
  counts,
  nextCheckupDate,
  todayIso,
  onPress,
  onEdit,
  onDelete,
}: Props) {
  const { messages, tx } = useI18n();
  const earLabels = {
    left: messages.home.earLeft,
    right: messages.home.earRight,
    both: messages.home.earBoth,
  } as const;
  const powerLabels = {
    battery: messages.home.powerBattery,
    rechargeable: messages.home.powerRechargeable,
  } as const;
  return (
    <Card style={styles.card}>
      <View style={styles.headerRow}>
        {/* Kart içinde iç içe butonlardan kaçınmak için yalnızca içerik alanı tıklanabilir. */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={tx(messages.home.openDeviceA11y, { name: device.name })}
          onPress={onPress}
          style={styles.pressableArea}
        >
          <View style={styles.headerContent}>
            {device.photoUri ? (
              <Image source={{ uri: device.photoUri }} style={styles.photo} contentFit="cover" />
            ) : (
              <View style={styles.photoPlaceholder}>
                <MaterialCommunityIcons name="ear-hearing" size={28} color={colors.primary} />
              </View>
            )}
            <View style={styles.titleContainer}>
              <Text style={styles.name}>{device.name}</Text>
              <Text style={styles.brand}>{device.brand}</Text>
              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{earLabels[device.earSide]}</Text>
                </View>
                <View style={styles.chip}>
                  <Text style={styles.chipText}>{powerLabels[device.powerType]}</Text>
                </View>
              </View>
            </View>
          </View>

          <Text style={styles.startDate}>
            {tx(messages.home.usageStart, { date: formatDate(device.startDate) })}
          </Text>

          <View style={styles.countsRow}>
            <View style={styles.countItem}>
              <Text style={[styles.countValue, { color: colors.success }]}>{counts.completed}</Text>
              <Text style={styles.countLabel}>{messages.home.completed}</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={[styles.countValue, { color: colors.primary }]}>{counts.pending}</Text>
              <Text style={styles.countLabel}>{messages.home.pending}</Text>
            </View>
            <View style={styles.countItem}>
              <Text style={[styles.countValue, { color: colors.danger }]}>{counts.overdue}</Text>
              <Text style={styles.countLabel}>{messages.home.overdue}</Text>
            </View>
          </View>

          {nextCheckupDate ? (
            <View style={styles.nextRow}>
              <Ionicons name="calendar-outline" size={16} color={colors.primary} />
              <Text style={styles.nextText}>
                {tx(messages.home.nextCheckup, {
                  date: formatDate(nextCheckupDate),
                  when: daysUntilLocalized(nextCheckupDate, todayIso, messages),
                })}
              </Text>
            </View>
          ) : (
            <View style={styles.nextRow}>
              <Ionicons name="calendar-outline" size={16} color={colors.textMuted} />
              <Text style={[styles.nextText, { color: colors.textMuted }]}>
                {messages.home.noPlannedCheckup}
              </Text>
            </View>
          )}
        </Pressable>

        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tx(messages.home.editDeviceA11y, { name: device.name })}
            onPress={onEdit}
            style={styles.iconButton}
            hitSlop={4}
          >
            <Ionicons name="pencil-outline" size={20} color={colors.primary} />
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={tx(messages.home.deleteDeviceA11y, { name: device.name })}
            onPress={onDelete}
            style={styles.iconButton}
            hitSlop={4}
          >
            <Ionicons name="trash-outline" size={20} color={colors.danger} />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: spacing.md },
  headerRow: { flexDirection: 'row', gap: spacing.md },
  pressableArea: { flex: 1 },
  headerContent: { flexDirection: 'row', gap: spacing.md },
  photo: { width: 56, height: 56, borderRadius: radius.md },
  photoPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: { flex: 1 },
  name: { fontSize: fontSize.lg, fontWeight: '700', color: colors.text },
  brand: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  chipRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm, flexWrap: 'wrap' },
  chip: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
  },
  chipText: { fontSize: fontSize.xs, color: colors.primary, fontWeight: '600' },
  actions: { gap: spacing.xs },
  iconButton: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  startDate: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: spacing.md },
  countsRow: {
    flexDirection: 'row',
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
  },
  countItem: { flex: 1, alignItems: 'center' },
  countValue: { fontSize: fontSize.xl, fontWeight: '700' },
  countLabel: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  nextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  nextText: { fontSize: fontSize.sm, color: colors.text, flex: 1 },
});
