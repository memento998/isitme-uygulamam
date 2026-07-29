import { StyleSheet, Text, TextInput, View, type KeyboardTypeOptions } from 'react-native';

import { colors, fontSize, radius, spacing } from '@/constants/theme';

interface Props {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

export function TextField({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  required = false,
  multiline = false,
  keyboardType,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        multiline={multiline}
        keyboardType={keyboardType}
        accessibilityLabel={label}
      />
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
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: fontSize.md,
    color: colors.text,
    backgroundColor: colors.card,
  },
  multiline: { minHeight: 96, textAlignVertical: 'top' },
  inputError: { borderColor: colors.danger },
  error: { color: colors.danger, fontSize: fontSize.xs, marginTop: spacing.xs },
});
