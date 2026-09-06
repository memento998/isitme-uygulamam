import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { AppModal } from '@/components/ui/AppModal';
import { colors, fontSize, MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';

interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  value: string;
  options: readonly Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
}

/** Formda tek satırlık seçim; tıklanınca seçenekler alt alta listelenir. */
export function SelectField({
  label,
  value,
  options,
  onChange,
  placeholder = 'Seçin',
  required = false,
  error,
  helperText,
}: Props) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        accessibilityLabel={selected ? `${label}: ${selected.label}` : `${label}: seçilmedi`}
        onPress={() => setOpen(true)}
        style={[styles.button, error ? styles.buttonError : null]}
      >
        <Text style={selected ? styles.value : styles.placeholder} numberOfLines={1}>
          {selected ? selected.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
      </Pressable>
      {error ? <Text style={styles.error}>{error}</Text> : helperText ? (
        <Text style={styles.helper}>{helperText}</Text>
      ) : null}

      <AppModal visible={open} title={label} onClose={() => setOpen(false)}>
        <View accessibilityRole="list">
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <Pressable
                key={option.value}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                accessibilityLabel={option.label}
                onPress={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                style={({ pressed }) => [
                  styles.option,
                  isSelected && styles.optionSelected,
                  pressed && styles.optionPressed,
                ]}
              >
                <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                  {option.label}
                </Text>
                {isSelected ? (
                  <Ionicons name="checkmark" size={20} color={colors.primary} />
                ) : null}
              </Pressable>
            );
          })}
        </View>
      </AppModal>
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
  button: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  buttonError: { borderColor: colors.danger },
  value: { flex: 1, fontSize: fontSize.md, color: colors.text },
  placeholder: { flex: 1, fontSize: fontSize.md, color: colors.textMuted },
  helper: { color: colors.textMuted, fontSize: fontSize.xs, marginTop: spacing.xs },
  error: { color: colors.danger, fontSize: fontSize.xs, marginTop: spacing.xs },
  option: {
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  optionSelected: { backgroundColor: colors.primarySoft },
  optionPressed: { backgroundColor: colors.primarySoft },
  optionLabel: { flex: 1, fontSize: fontSize.md, color: colors.text, fontWeight: '500' },
  optionLabelSelected: { color: colors.primary, fontWeight: '700' },
});
