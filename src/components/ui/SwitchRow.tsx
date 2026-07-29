import { StyleSheet, Switch, Text, View } from 'react-native';

import { colors, fontSize, spacing } from '@/constants/theme';

interface Props {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export function SwitchRow({ label, description, value, onValueChange }: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
      </View>
      <Switch
        accessibilityLabel={label}
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 48,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  textContainer: { flex: 1 },
  label: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  description: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
});
