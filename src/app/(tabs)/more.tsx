import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { ListRow } from '@/components/ui/ListRow';
import { colors, radius, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { deleteAllData } from '@/repositories/settings';
import { cancelAllNotifications } from '@/services/notifications';
import { loadSampleData } from '@/services/sampleData';

export default function MoreScreen() {
  const router = useRouter();
  const { messages, isRTL } = useI18n();
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDeleteAll = async () => {
    setConfirmDeleteAll(false);
    await deleteAllData();
    await cancelAllNotifications();
    setFeedback(messages.more.dataDeleted);
  };

  const handleLoadSample = async () => {
    await loadSampleData();
    setFeedback(messages.more.sampleLoaded);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
      {feedback ? (
        <View style={styles.banner}>
          <InfoBanner text={feedback} />
        </View>
      ) : null}

      <View style={styles.group}>
        <ListRow
          icon="book-outline"
          title={messages.knowledge.knowledgeBank}
          subtitle={messages.knowledge.knowledgeBankSubtitle}
          onPress={() => router.push('/knowledge')}
          isRTL={isRTL}
        />
        <ListRow
          icon="calendar-outline"
          title={messages.more.calendar}
          subtitle={messages.more.calendarSubtitle}
          onPress={() => router.push('/more/calendar')}
          isRTL={isRTL}
        />
        <ListRow
          icon="notifications-outline"
          title={messages.more.notificationSettings}
          subtitle={messages.more.notificationSubtitle}
          onPress={() => router.push('/more/notifications')}
          isRTL={isRTL}
        />
        <ListRow
          icon="language-outline"
          title={messages.language.title}
          subtitle={messages.common.language}
          onPress={() => router.push('/more/language')}
          isRTL={isRTL}
        />
        <ListRow
          icon="document-text-outline"
          title={messages.more.pdfReports}
          subtitle={messages.more.pdfSubtitle}
          onPress={() => router.push('/more/reports')}
          isRTL={isRTL}
        />
      </View>

      <View style={styles.group}>
        <ListRow
          icon="cloud-upload-outline"
          title={messages.more.backup}
          subtitle={messages.more.backupSubtitle}
          onPress={() => router.push('/more/backup')}
          isRTL={isRTL}
        />
      </View>

      <View style={styles.group}>
        <ListRow
          icon="shield-checkmark-outline"
          title={messages.more.privacy}
          subtitle={messages.more.privacySubtitle}
          onPress={() => router.push('/more/privacy')}
          isRTL={isRTL}
        />
        <ListRow
          icon="document-outline"
          title={messages.more.terms}
          subtitle={messages.more.termsSubtitle}
          onPress={() => router.push('/more/terms')}
          isRTL={isRTL}
        />
        <ListRow
          icon="medkit-outline"
          title={messages.more.disclaimer}
          subtitle={messages.more.disclaimerSubtitle}
          onPress={() => router.push('/more/disclaimer')}
          isRTL={isRTL}
        />
        <ListRow
          icon="information-circle-outline"
          title={messages.more.about}
          onPress={() => router.push('/more/about')}
          isRTL={isRTL}
        />
      </View>

      <View style={styles.group}>
        {__DEV__ ? (
          <ListRow
            icon="flask-outline"
            title={messages.more.sampleData}
            subtitle={messages.more.sampleDataSubtitle}
            onPress={handleLoadSample}
            isRTL={isRTL}
          />
        ) : null}
        <ListRow
          icon="trash-outline"
          title={messages.more.deleteAll}
          subtitle={messages.more.deleteAllSubtitle}
          destructive
          onPress={() => setConfirmDeleteAll(true)}
          isRTL={isRTL}
        />
      </View>

      <ConfirmDialog
        visible={confirmDeleteAll}
        title={messages.more.deleteAllTitle}
        message={messages.more.deleteAllMessage}
        confirmLabel={messages.more.deleteAllConfirm}
        cancelLabel={messages.common.cancel}
        destructive
        onConfirm={handleDeleteAll}
        onCancel={() => setConfirmDeleteAll(false)}
      />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: { flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  banner: { marginBottom: spacing.sm },
  group: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
