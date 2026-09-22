import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { InfoBanner } from '@/components/ui/InfoBanner';
import { EmptyState } from '@/components/ui/StateViews';
import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { searchCategories } from '@/data/troubleshooting';
import { useI18n } from '@/i18n';
import type { TroubleshootingCategoryId } from '@/i18n/messages/types';

export default function TroubleshootingScreen() {
  const router = useRouter();
  const { messages, tx, isRTL } = useI18n();
  const [query, setQuery] = useState('');
  const categories = searchCategories(query, messages.troubleshooting.categories);

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color={colors.textMuted} />
              <TextInput
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
                placeholder={messages.troubleshooting.searchPlaceholder}
                placeholderTextColor={colors.textMuted}
                accessibilityLabel={messages.troubleshooting.searchA11y}
              />
              {query ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={messages.troubleshooting.clearSearch}
                  onPress={() => setQuery('')}
                  hitSlop={12}
                >
                  <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>
            <InfoBanner text={messages.troubleshooting.banner} />
          </View>
        }
        renderItem={({ item }) => {
          const localized = messages.troubleshooting.categories[item.id as TroubleshootingCategoryId];
          const title = localized?.title ?? item.title;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={tx(messages.troubleshooting.openFlowA11y, { title })}
              onPress={() => router.push(`/troubleshooting/${item.id}`)}
              style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            >
              <View style={styles.iconCircle}>
                <Ionicons
                  name={item.icon as keyof typeof Ionicons.glyphMap}
                  size={24}
                  color={colors.primary}
                />
              </View>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardSubtitle}>
                  {tx(messages.troubleshooting.stepsCount, { count: item.steps.length })}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.textMuted}
                style={isRTL ? styles.chevronRtl : undefined}
              />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title={messages.troubleshooting.empty}
            description={messages.troubleshooting.emptyDescription}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg, paddingBottom: spacing.xxl },
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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.md,
    minHeight: 72,
    ...shadow.card,
  },
  cardPressed: { backgroundColor: colors.primarySoft },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  cardSubtitle: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  chevronRtl: { transform: [{ scaleX: -1 }] },
});
