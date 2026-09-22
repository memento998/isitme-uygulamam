import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { APP_LOCALES, LOCALE_NATIVE_NAMES, useI18n, type LanguagePreference } from '@/i18n';
import { syncAllNotifications } from '@/services/notifications';

export default function LanguageScreen() {
  const { messages, preference, setPreference } = useI18n();

  const select = async (next: LanguagePreference) => {
    await setPreference(next);
    await syncAllNotifications();
  };

  const options: { value: LanguagePreference; label: string }[] = [
    { value: 'system', label: messages.language.systemOption },
    ...APP_LOCALES.map((locale) => ({ value: locale, label: LOCALE_NATIVE_NAMES[locale] })),
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: messages.language.title }} />
      <InfoBanner text={messages.language.subtitle} />
      <Card style={styles.card}>
        {options.map((option, index) => {
          const selected = (preference ?? 'tr') === option.value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={option.label}
              onPress={() => void select(option.value)}
              style={[styles.row, index > 0 && styles.rowBorder]}
            >
              <Text style={[styles.label, selected && styles.labelSelected]}>{option.label}</Text>
              {selected ? <Ionicons name="checkmark-circle" size={22} color={colors.primary} /> : null}
            </Pressable>
          );
        })}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  card: { paddingVertical: spacing.xs, overflow: 'hidden', borderRadius: radius.lg },
  row: {
    minHeight: 52,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  label: { fontSize: fontSize.md, color: colors.text },
  labelSelected: { fontWeight: '700', color: colors.primary },
});
