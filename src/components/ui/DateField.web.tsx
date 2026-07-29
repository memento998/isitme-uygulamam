import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { isValidISODate } from '@/services/date';

interface Props {
  label: string;
  value: string;
  onChange: (iso: string) => void;
  error?: string;
  required?: boolean;
  clearable?: boolean;
  helperText?: string;
}

/** Web önizlemesi için yerleşik tarih girişi (input type="date") kullanılır. */
export function DateField({
  label,
  value,
  onChange,
  error,
  required = false,
  clearable = false,
  helperText,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <View style={styles.row}>
        <input
          type="date"
          aria-label={label}
          value={value}
          onChange={(event) => {
            const next = event.target.value;
            if (next === '' || isValidISODate(next)) onChange(next);
          }}
          style={{
            flex: 1,
            minHeight: 48,
            border: `1px solid ${error ? colors.danger : colors.border}`,
            borderRadius: radius.md,
            padding: `0 ${spacing.md}px`,
            fontSize: fontSize.md,
            color: colors.text,
            backgroundColor: colors.card,
            fontFamily: 'inherit',
          }}
        />
        {clearable && value ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${label} alanını temizle`}
            onPress={() => onChange('')}
            style={styles.clearButton}
          >
            <Text style={styles.clearText}>Temizle</Text>
          </Pressable>
        ) : null}
      </View>
      {helperText ? <Text style={styles.helper}>{helperText}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
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
  required: { color: colors.danger },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  clearButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md },
  clearText: { color: colors.primary, fontSize: fontSize.sm, fontWeight: '600' },
  helper: { color: colors.textMuted, fontSize: fontSize.xs, marginTop: spacing.xs },
  error: { color: colors.danger, fontSize: fontSize.xs, marginTop: spacing.xs },
});
