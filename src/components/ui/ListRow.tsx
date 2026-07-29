import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fontSize, spacing } from '@/constants/theme';

interface Props {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress: () => void;
  destructive?: boolean;
}

export function ListRow({ icon, title, subtitle, onPress, destructive = false }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={[styles.iconCircle, destructive && styles.iconCircleDanger]}>
        <Ionicons name={icon} size={20} color={destructive ? colors.danger : colors.primary} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, destructive && styles.titleDanger]}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 56,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.card,
    gap: spacing.md,
  },
  pressed: { backgroundColor: colors.primarySoft },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleDanger: { backgroundColor: colors.dangerSoft },
  textContainer: { flex: 1 },
  title: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  titleDanger: { color: colors.danger },
  subtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
});
