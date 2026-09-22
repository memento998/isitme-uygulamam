import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import * as Linking from 'expo-linking';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { ErrorView } from '@/components/ui/StateViews';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { isActiveTipId, isRemovedTipId } from '@/knowledge/catalog';
import { getLocalizedTip } from '@/knowledge/content';
import { audienceLabel, categoryLabel } from '@/knowledge/labels';
import { getSourcesByIds } from '@/knowledge/sources';

export default function KnowledgeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { locale, messages } = useI18n();

  if (!id || isRemovedTipId(id) || !isActiveTipId(id)) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: messages.knowledge.knowledgeBank }} />
        <ErrorView
          message={messages.knowledge.tipRetiredBody}
          onRetry={() => router.replace('/knowledge')}
        />
      </View>
    );
  }

  const tip = getLocalizedTip(id, locale);
  const sources = getSourcesByIds(tip.sourceIds);

  const openUrl = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) await Linking.openURL(url);
    } catch (error) {
      console.warn('Kaynak bağlantısı açılamadı:', error);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: tip.title }} />
      <Card style={styles.card}>
        <Text style={styles.category}>{categoryLabel(tip.categoryId, messages)}</Text>
        <Text style={styles.title}>{tip.title}</Text>
        <Text style={styles.message}>{tip.message}</Text>
        <Text style={styles.detail}>{tip.detail}</Text>
        <Text style={styles.metaLabel}>{messages.knowledge.forWhom}</Text>
        <Text style={styles.metaValue}>{audienceLabel(tip.audience, messages)}</Text>
        {tip.jurisdiction === 'TR' ? (
          <InfoBanner text={messages.knowledge.jurisdictionTR} />
        ) : null}
      </Card>

      <Card style={styles.card}>
        <Text style={styles.section}>{messages.knowledge.sources}</Text>
        <Text style={styles.sourceNote}>{messages.knowledge.sourceLanguageNote}</Text>
        {sources.map((source) => (
          <View key={source.id} style={styles.source}>
            <Text style={styles.sourceOrg}>{source.organization}</Text>
            <Text style={styles.sourceTitle}>{source.title}</Text>
            {source.urls.map((url) => (
              <Pressable
                key={url}
                accessibilityRole="link"
                accessibilityLabel={url}
                onPress={() => void openUrl(url)}
                style={styles.urlButton}
              >
                <Text style={styles.url}>{url}</Text>
              </Pressable>
            ))}
          </View>
        ))}
      </Card>

      <InfoBanner text={messages.knowledge.generalInfoBody} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  card: { gap: spacing.sm },
  category: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },
  title: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  message: { fontSize: fontSize.md, color: colors.text, lineHeight: 22 },
  detail: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 21 },
  metaLabel: { fontSize: fontSize.xs, fontWeight: '700', color: colors.textMuted, marginTop: spacing.sm },
  metaValue: { fontSize: fontSize.sm, color: colors.text },
  section: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  sourceNote: { fontSize: fontSize.xs, color: colors.textMuted },
  source: { gap: 4, marginTop: spacing.sm },
  sourceOrg: { fontSize: fontSize.sm, fontWeight: '700', color: colors.text },
  sourceTitle: { fontSize: fontSize.sm, color: colors.textMuted },
  urlButton: { minHeight: 44, justifyContent: 'center' },
  url: { fontSize: fontSize.sm, color: colors.primary, writingDirection: 'ltr' },
});
