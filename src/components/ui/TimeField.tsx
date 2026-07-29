import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Pressable, StyleSheet, Text, View } from 'react-native';

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

export function TimeField({ label, hour, minute, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const value = new Date();
  value.setHours(hour, minute, 0, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${pad(hour)}:${pad(minute)}`}
        onPress={() => setOpen(true)}
        style={styles.input}
      >
        <Text style={styles.value}>{`${pad(hour)}:${pad(minute)}`}</Text>
      </Pressable>
      {open ? (
        <DateTimePicker
          value={value}
          mode="time"
          display="default"
          onChange={(_event, date) => {
            setOpen(false);
            if (date) onChange(date.getHours(), date.getMinutes());
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
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
    backgroundColor: colors.card,
  },
  value: { fontSize: fontSize.md, color: colors.text },
});
