import { ScrollView, StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';

export default function DisclaimerScreen() {
  const { messages } = useI18n();
  const copy = messages.legal.disclaimer;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoBanner kind="warning" text={copy.banner} />
      <Card style={styles.card}>
        <Text style={styles.heading}>{copy.purposeHeading}</Text>
        <Text style={styles.paragraph}>{copy.purposeBody}</Text>

        <Text style={styles.heading}>{copy.notAdviceHeading}</Text>
        <Text style={styles.paragraph}>{copy.notAdviceBody}</Text>

        <Text style={styles.heading}>{copy.problemHeading}</Text>
        <Text style={styles.paragraph}>{copy.problemBody}</Text>

        <Text style={styles.heading}>{copy.liabilityHeading}</Text>
        <Text style={styles.paragraph}>{copy.liabilityBody}</Text>
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
