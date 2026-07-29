import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { ErrorView } from '@/components/ui/StateViews';
import { colors, fontSize, radius, spacing } from '@/constants/theme';
import { EXPERT_WARNING, getCategory } from '@/data/troubleshooting';

type Outcome = 'resolved' | 'exhausted' | null;

export default function TroubleshootingFlowScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();
  const category = getCategory(categoryId);
  const [stepIndex, setStepIndex] = useState(0);
  const [outcome, setOutcome] = useState<Outcome>(null);

  if (!category) {
    return <ErrorView message="Sorun kategorisi bulunamadı." />;
  }

  const restart = () => {
    setStepIndex(0);
    setOutcome(null);
  };

  const handleStillBroken = () => {
    if (stepIndex + 1 < category.steps.length) {
      setStepIndex(stepIndex + 1);
    } else {
      setOutcome('exhausted');
    }
  };

  const step = category.steps[stepIndex];

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: category.title }} />
      <ScrollView contentContainerStyle={styles.content}>
        {outcome === null ? (
          <>
            <Text style={styles.progress}>
              Adım {stepIndex + 1} / {category.steps.length}
            </Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${((stepIndex + 1) / category.steps.length) * 100}%` },
                ]}
              />
            </View>
            <Card style={styles.stepCard}>
              <View style={styles.stepIconCircle}>
                <Ionicons name="hand-left-outline" size={28} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>{step.instruction}</Text>
              <Text style={styles.stepDetail}>{step.detail}</Text>
            </Card>
            <Text style={styles.question}>Bu adımdan sonra sorun düzeldi mi?</Text>
            <View style={styles.buttonRow}>
              <Button
                label="Düzeldi"
                onPress={() => setOutcome('resolved')}
                style={styles.flexButton}
              />
              <Button
                label="Devam ediyor"
                variant="secondary"
                onPress={handleStillBroken}
                style={styles.flexButton}
              />
            </View>
            <View style={styles.safetyBanner}>
              <InfoBanner
                kind="warning"
                text="Cihazı sökmeyin, elektronik parçalarını açmayın ve tehlikeli müdahalelerde bulunmayın."
              />
            </View>
          </>
        ) : outcome === 'resolved' ? (
          <Card style={styles.resultCard}>
            <View style={[styles.resultIcon, { backgroundColor: colors.successSoft }]}>
              <Ionicons name="checkmark-circle" size={48} color={colors.success} />
            </View>
            <Text style={styles.resultTitle}>Harika, sorun çözüldü!</Text>
            <Text style={styles.resultText}>
              Sorun tekrar ederse aynı adımları yeniden deneyebilir veya işitme uzmanınıza
              danışabilirsiniz.
            </Text>
            <Button label="Baştan başla" variant="secondary" onPress={restart} />
            <Button label="Sorun listesine dön" variant="ghost" onPress={() => router.back()} />
          </Card>
        ) : (
          <Card style={styles.resultCard}>
            <View style={[styles.resultIcon, { backgroundColor: colors.warningSoft }]}>
              <Ionicons name="medkit-outline" size={48} color={colors.warning} />
            </View>
            <Text style={styles.resultTitle}>Uzman desteği önerilir</Text>
            <InfoBanner kind="warning" text={EXPERT_WARNING} />
            <Text style={styles.resultText}>
              Cihaz bilgilerinizi ve klinik iletişim numaranızı Cihazlar sekmesindeki cihaz
              detayında bulabilirsiniz.
            </Text>
            <Button label="Baştan başla" variant="secondary" onPress={restart} />
            <Button label="Sorun listesine dön" variant="ghost" onPress={() => router.back()} />
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  progress: {
    fontSize: fontSize.sm,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  progressBar: {
    height: 8,
    borderRadius: radius.full,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: radius.full,
  },
  stepCard: { alignItems: 'center', gap: spacing.md },
  stepIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  stepDetail: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  question: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  buttonRow: { flexDirection: 'row', gap: spacing.md },
  flexButton: { flex: 1 },
  safetyBanner: { marginTop: spacing.xl },
  resultCard: { gap: spacing.lg },
  resultIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  resultTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  resultText: {
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
});
