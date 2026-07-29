import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { formatDate, parseISODate, toISODate, todayISO } from '@/services/date';

interface Props {
  label: string;
  /** ISO tarih (YYYY-MM-DD) veya boş. */
  value: string;
  onChange: (iso: string) => void;
  error?: string;
  required?: boolean;
  /** Boş bırakılabilir alanlarda temizleme düğmesi gösterir. */
  clearable?: boolean;
  helperText?: string;
}

export function DateField({
  label,
  value,
  onChange,
  error,
  required = false,
  clearable = false,
  helperText,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <View style={styles.row}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${label}: ${value ? formatDate(value) : 'seçilmedi'}`}
          onPress={() => setOpen(true)}
          style={[styles.input, error ? styles.inputError : null]}
        >
          <Text style={value ? styles.value : styles.placeholder}>
            {value ? formatDate(value) : 'Tarih seçin'}
          </Text>
        </Pressable>
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
      {open ? (
        <DateTimePicker
          value={value ? parseISODate(value) : parseISODate(todayISO())}
          mode="date"
          display="default"
          onChange={(_event, date) => {
            setOpen(false);
            if (date) onChange(toISODate(date));
          }}
        />
      ) : null}
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
  input: {
    flex: 1,
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  inputError: { borderColor: colors.danger },
  value: { fontSize: fontSize.md, color: colors.text },
  placeholder: { fontSize: fontSize.md, color: colors.textMuted },
  clearButton: { minHeight: 44, justifyContent: 'center', paddingHorizontal: spacing.md },
  clearText: { color: colors.primary, fontSize: fontSize.sm, fontWeight: '600' },
  helper: { color: colors.textMuted, fontSize: fontSize.xs, marginTop: spacing.xs },
  error: { color: colors.danger, fontSize: fontSize.xs, marginTop: spacing.xs },
});
