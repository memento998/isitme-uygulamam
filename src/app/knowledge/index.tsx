import { useMemo, useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { EmptyState } from '@/components/ui/StateViews';
import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { getLocalizedTip } from '@/knowledge/content';
import { categoryLabel, KNOWLEDGE_CATEGORY_ORDER } from '@/knowledge/labels';
import { filterKnowledgeTips } from '@/knowledge/search';
import { tipIdForCalendarDay } from '@/knowledge/day';
import type { KnowledgeCategoryId } from '@/knowledge/types';
import { useAsyncData } from '@/hooks/useAsyncData';
import { ensureKnowledgeCycleStart } from '@/repositories/settings';
import { todayISO } from '@/services/date';

export default function KnowledgeBankScreen() {
  const router = useRouter();
  const { locale, messages } = useI18n();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<KnowledgeCategoryId | 'all'>('all');
  const { data: todayTipId } = useAsyncData(async () => {
    const today = todayISO();
    const start = await ensureKnowledgeCycleStart(today);
    return tipIdForCalendarDay(start, today);
  });

  const ids = useMemo(
    () => filterKnowledgeTips(query, category, locale, messages),
    [category, locale, messages, query]
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: messages.knowledge.knowledgeBank }} />
      <FlatList
        data={ids}
        keyExtractor={(id) => id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder={messages.knowledge.searchTipsPlaceholder}
                placeholderTextColor={colors.textMuted}
                accessibilityLabel={messages.knowledge.searchTipsPlaceholder}
              />
              {query ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={messages.common.clearSearch}
                  onPress={() => setQuery('')}
                  hitSlop={12}
                >
                  <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
              <FilterChip
                label={messages.knowledge.categoryAll}
                selected={category === 'all'}
                onPress={() => setCategory('all')}
              />
              {KNOWLEDGE_CATEGORY_ORDER.map((id) => (
                <FilterChip
                  key={id}
                  label={categoryLabel(id, messages)}
                  selected={category === id}
                  onPress={() => setCategory(id)}
                />
              ))}
            </ScrollView>
            <Text style={styles.info}>{messages.knowledge.generalInfoBody}</Text>
          </View>
        }
        renderItem={({ item }) => {
          const tip = getLocalizedTip(item, locale);
          const isToday = item === todayTipId;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={tip.title}
              onPress={() => router.push(`/knowledge/${item}`)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.cardTop}>
                <Text style={styles.category}>{categoryLabel(tip.categoryId, messages)}</Text>
                {isToday ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{messages.knowledge.todayBadge}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={styles.title}>{tip.title}</Text>
              <Text style={styles.message}>{tip.message}</Text>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <EmptyState icon="search-outline" title={messages.common.noResults} description={messages.troubleshooting.emptyDescription} />
        }
      />
    </View>
  );
}

function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  list: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { gap: spacing.md, marginBottom: spacing.md },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    minHeight: 48,
    gap: spacing.sm,
  },
  searchInput: { flex: 1, fontSize: fontSize.md, color: colors.text, minHeight: 44 },
  filters: { gap: spacing.sm, paddingVertical: spacing.xs },
  chip: {
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 36,
    justifyContent: 'center',
  },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { fontSize: fontSize.xs, color: colors.textMuted, fontWeight: '600' },
  chipTextSelected: { color: colors.textOnPrimary },
  info: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20 },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
    ...shadow.card,
  },
  cardPressed: { backgroundColor: colors.primarySoft },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  category: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },
  badge: {
    backgroundColor: colors.primarySoft,
    borderRadius: radius.full,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  badgeText: { fontSize: fontSize.xs, fontWeight: '700', color: colors.primary },
  title: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  message: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20 },
});
