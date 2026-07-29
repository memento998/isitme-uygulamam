import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';

export interface BarChartItem {
  label: string;
  value: number;
}

interface Props {
  data: readonly BarChartItem[];
  /** Grafiğin çubuk alanı yüksekliği. */
  height?: number;
}

/** Bağımlılık gerektirmeyen basit dikey çubuk grafik. */
export function BarChart({ data, height = 140 }: Props) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <View
      accessibilityRole="image"
      accessibilityLabel={`Aylık grafik: ${data.map((d) => `${d.label} ${d.value}`).join(', ')}`}
      style={styles.container}
    >
      {data.map((item) => {
        const barHeight = Math.max((item.value / max) * height, item.value > 0 ? 8 : 2);
        return (
          <View key={item.label} style={styles.column}>
            <Text style={styles.value}>{item.value > 0 ? item.value : ''}</Text>
            <View style={[styles.barArea, { height }]}>
              <View
                style={[
                  styles.bar,
                  { height: barHeight },
                  item.value === 0 && styles.barEmpty,
                ]}
              />
            </View>
            <Text style={styles.label} numberOfLines={1}>
              {item.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  column: { flex: 1, alignItems: 'center' },
  value: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '700',
    minHeight: 16,
  },
  barArea: { justifyContent: 'flex-end', width: '100%', alignItems: 'center' },
  bar: {
    width: '70%',
    maxWidth: 32,
    backgroundColor: colors.primary,
    borderTopLeftRadius: radius.sm,
    borderTopRightRadius: radius.sm,
  },
  barEmpty: { backgroundColor: colors.border },
  label: {
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
