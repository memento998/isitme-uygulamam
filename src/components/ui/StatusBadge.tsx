import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';
import type { CheckupStatus } from '@/types/models';
import { CHECKUP_STATUS_LABELS } from '@/types/models';

const STATUS_COLORS: Record<CheckupStatus, { bg: string; fg: string }> = {
  pending: { bg: colors.primarySoft, fg: colors.primary },
  completed: { bg: colors.successSoft, fg: colors.success },
  overdue: { bg: colors.dangerSoft, fg: colors.danger },
};

export function StatusBadge({ status }: { status: CheckupStatus }) {
  const palette = STATUS_COLORS[status];
  return (
    <View style={[styles.badge, { backgroundColor: palette.bg }]}>
      <Text style={[styles.label, { color: palette.fg }]}>{CHECKUP_STATUS_LABELS[status]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: radius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  label: { fontSize: fontSize.xs, fontWeight: '700' },
});
