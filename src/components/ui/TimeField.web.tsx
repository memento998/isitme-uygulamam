import { StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';

interface Props {
  label: string;
  hour: number;
  minute: number;
  onChange: (hour: number, minute: number) => void;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

/** Web önizlemesi için yerleşik saat girişi (input type="time"). */
export function TimeField({ label, hour, minute, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <input
        type="time"
        aria-label={label}
        value={`${pad(hour)}:${pad(minute)}`}
        onChange={(event) => {
          const [h, m] = event.target.value.split(':').map(Number);
          if (Number.isInteger(h) && Number.isInteger(m)) onChange(h, m);
        }}
        style={{
          minHeight: 48,
          border: `1px solid ${colors.border}`,
          borderRadius: radius.md,
          padding: `0 ${spacing.md}px`,
          fontSize: fontSize.md,
          color: colors.text,
          backgroundColor: colors.card,
          fontFamily: 'inherit',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: spacing.lg },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
});
