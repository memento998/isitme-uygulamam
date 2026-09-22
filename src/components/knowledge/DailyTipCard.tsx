import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/ui/Card';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import type { LocalizedKnowledgeTip } from '@/knowledge/content';

interface Props {
  tip: LocalizedKnowledgeTip;
  highlighted?: boolean;
  onPressCard: () => void;
  onPressSeeAll: () => void;
}

export function DailyTipCard({ tip, highlighted = false, onPressCard, onPressSeeAll }: Props) {
  const { messages } = useI18n();
  return (
    <Card style={highlighted ? [styles.card, styles.highlighted] : styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${messages.knowledge.dailyTip}: ${tip.title}`}
        onPress={onPressCard}
        style={styles.body}
      >
        <View style={styles.iconCircle}>
          <Ionicons name="book-outline" size={22} color={colors.primary} />
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.label}>{messages.knowledge.dailyTip}</Text>
          <Text style={styles.title}>{tip.title}</Text>
          <Text style={styles.message}>{tip.message}</Text>
        </View>
      </Pressable>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={messages.knowledge.seeAllTips}
        onPress={onPressSeeAll}
        style={styles.link}
      >
        <Text style={styles.linkText}>{messages.knowledge.seeAllTips}</Text>
        <Ionicons name="chevron-forward" size={16} color={colors.primary} />
      </Pressable>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.sm },
  highlighted: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: colors.primarySoft,
  },
  body: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBlock: { flex: 1, gap: 4 },
  label: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary, textTransform: 'uppercase' },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  message: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20 },
  link: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    minHeight: 44,
    paddingRight: spacing.sm,
  },
  linkText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
});
