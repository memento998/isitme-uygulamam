import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { AdBanner } from '@/components/AdBanner';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { EmptyState } from '@/components/ui/StateViews';
import { colors, fontSize, radius, shadow, spacing } from '@/constants/theme';
import { searchCategories } from '@/data/troubleshooting';

export default function TroubleshootingScreen() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const categories = searchCategories(query);

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
                placeholder="Sorun arayın…"
                placeholderTextColor={colors.textMuted}
                accessibilityLabel="Sorun arama alanı"
              />
              {query ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Aramayı temizle"
                  onPress={() => setQuery('')}
                  hitSlop={12}
                >
                  <Ionicons name="close-circle" size={20} color={colors.textMuted} />
                </Pressable>
              ) : null}
            </View>
            <InfoBanner text="Adımlar yalnızca güvenli, evde yapılabilecek kontrolleri içerir. Cihazınızı asla sökmeyin veya onarmaya çalışmayın." />
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${item.title} sorun giderme akışını aç`}
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
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.steps.length} adımlı çözüm akışı</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Pressable>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="search-outline"
            title="Sonuç bulunamadı"
            description="Farklı bir arama terimi deneyin."
          />
        }
      />
      <AdBanner />
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
});
