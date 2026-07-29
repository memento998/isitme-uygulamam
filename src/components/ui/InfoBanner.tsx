import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors, fontSize, radius, spacing } from '@/constants/theme';

type Kind = 'info' | 'warning';

interface Props {
  kind?: Kind;
  text: string;
}

export function InfoBanner({ kind = 'info', text }: Props) {
  const isWarning = kind === 'warning';
  return (
    <View style={[styles.banner, isWarning ? styles.warning : styles.info]}>
      <Ionicons
        name={isWarning ? 'warning-outline' : 'information-circle-outline'}
        size={20}
        color={isWarning ? colors.warning : colors.primary}
      />
      <Text style={[styles.text, { color: isWarning ? colors.warning : colors.primary }]}>
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'flex-start',
  },
  info: { backgroundColor: colors.primarySoft },
  warning: { backgroundColor: colors.warningSoft },
  text: { flex: 1, fontSize: fontSize.sm, lineHeight: 20 },
});
