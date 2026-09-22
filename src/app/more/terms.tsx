import { ScrollView, StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';

export default function TermsScreen() {
  const { messages } = useI18n();
  const copy = messages.legal.terms;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoBanner text={copy.banner} />
      <Card style={styles.card}>
        <Text style={styles.heading}>{copy.usageHeading}</Text>
        <Text style={styles.paragraph}>{copy.usageBody}</Text>

        <Text style={styles.heading}>{copy.notMedicalHeading}</Text>
        <Text style={styles.paragraph}>{copy.notMedicalBody}</Text>

        <Text style={styles.heading}>{copy.dataHeading}</Text>
        <Text style={styles.paragraph}>{copy.dataBody}</Text>

        <Text style={styles.heading}>{copy.adsHeading}</Text>
        <Text style={styles.paragraph}>{copy.adsBody}</Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  card: { gap: spacing.sm },
  heading: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  paragraph: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 21 },
});
