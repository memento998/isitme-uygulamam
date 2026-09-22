import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/ui/Card';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { formatDate } from '@/services/date';
import type { KnowledgeNotificationPayload } from '@/services/knowledgeNotifications';

interface Props {
  payload: KnowledgeNotificationPayload;
  retired?: boolean;
  onOpenCurrentLanguage?: () => void;
  onOpenBank?: () => void;
}

export function OpenedNotificationCard({
  payload,
  retired = false,
  onOpenCurrentLanguage,
  onOpenBank,
}: Props) {
  const { messages, tx } = useI18n();
  return (
    <Card style={styles.card}>
      <Text style={styles.label}>
        {tx(messages.knowledge.openedNotification, { date: formatDate(payload.localDate) })}
      </Text>
      {retired ? (
        <>
          <Text style={styles.title}>{messages.knowledge.tipRetired}</Text>
          <Text style={styles.message}>{messages.knowledge.tipRetiredBody}</Text>
          {onOpenBank ? (
            <Pressable accessibilityRole="link" onPress={onOpenBank} style={styles.link}>
              <Text style={styles.linkText}>{messages.knowledge.knowledgeBank}</Text>
            </Pressable>
          ) : null}
        </>
      ) : (
        <>
          <Text style={styles.title}>{payload.titleSnapshot}</Text>
          <Text style={styles.message}>{payload.messageSnapshot}</Text>
          {onOpenCurrentLanguage ? (
            <Pressable accessibilityRole="link" onPress={onOpenCurrentLanguage} style={styles.link}>
              <View style={styles.linkRow}>
                <Ionicons name="language-outline" size={16} color={colors.primary} />
                <Text style={styles.linkText}>{messages.knowledge.openInCurrentLanguage}</Text>
              </View>
            </Pressable>
          ) : null}
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.sm },
  label: { fontSize: fontSize.xs, fontWeight: '700', color: colors.warning },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  message: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20 },
  link: { minHeight: 44, justifyContent: 'center' },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  linkText: { fontSize: fontSize.sm, fontWeight: '700', color: colors.primary },
});
