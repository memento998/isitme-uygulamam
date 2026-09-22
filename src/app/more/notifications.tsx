import { useCallback, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ErrorView, LoadingView } from '@/components/ui/StateViews';
import { SwitchRow } from '@/components/ui/SwitchRow';
import { TimeField } from '@/components/ui/TimeField';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getSettings, saveDailyKnowledgeSettings, saveSettings } from '@/repositories/settings';
import {
  getPermissionState,
  openSystemNotificationSettings,
  requestPermission,
  scheduleDevKnowledgePreview,
  syncAllNotifications,
  type PermissionState,
} from '@/services/notifications';
import type { AppSettings } from '@/types/models';

export default function NotificationSettingsScreen() {
  const { messages, tx } = useI18n();
  const permissionLabels: Record<PermissionState, string> = {
    granted: messages.notifications.permissionGranted,
    denied: messages.notifications.permissionDenied,
    undetermined: messages.notifications.permissionUndetermined,
    unsupported: messages.notifications.permissionUnsupported,
  };
  const { data, loading, error, reload } = useAsyncData(
    useCallback(async () => {
      const [settings, permission] = await Promise.all([getSettings(), getPermissionState()]);
      return { settings, permission };
    }, [])
  );
  const [requesting, setRequesting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [knowledgeSaved, setKnowledgeSaved] = useState(false);

  if (loading) return <LoadingView message={messages.common.loading} />;
  if (error || !data) {
    return <ErrorView message={error ?? messages.common.loadError} onRetry={reload} />;
  }

  const { settings, permission } = data;

  const handleRequest = async () => {
    setRequesting(true);
    try {
      const granted = await requestPermission();
      if (granted) await syncAllNotifications();
      await reload();
    } finally {
      setRequesting(false);
    }
  };

  const handleTimeChange = async (hour: number, minute: number) => {
    const next: Pick<AppSettings, 'notificationHour' | 'notificationMinute'> = {
      notificationHour: hour,
      notificationMinute: minute,
    };
    await saveSettings(next);
    await syncAllNotifications();
    setSaved(true);
    await reload();
  };

  const handleKnowledgeToggle = async (enabled: boolean) => {
    if (enabled && permission === 'undetermined') {
      const granted = await requestPermission();
      if (!granted) {
        await reload();
        return;
      }
    }
    await saveDailyKnowledgeSettings({
      enabled,
      hour: settings.dailyKnowledgeHour,
      minute: settings.dailyKnowledgeMinute,
    });
    await syncAllNotifications();
    setKnowledgeSaved(true);
    await reload();
  };

  const handleKnowledgeTime = async (hour: number, minute: number) => {
    await saveDailyKnowledgeSettings({
      enabled: settings.dailyKnowledgeEnabled,
      hour,
      minute,
    });
    await syncAllNotifications();
    setKnowledgeSaved(true);
    await reload();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {Platform.OS === 'web' ? (
        <InfoBanner kind="warning" text={messages.notifications.webUnsupported} />
      ) : null}

      <SectionHeader title={messages.notifications.permission} />
      <Card>
        <Text style={styles.permissionState}>
          {tx(messages.notifications.permissionStatus, { state: permissionLabels[permission] })}
        </Text>
        <Text style={styles.explanation}>{messages.notifications.permissionExplanation}</Text>
        {permission === 'undetermined' ? (
          <Button
            label={messages.notifications.requestPermission}
            onPress={handleRequest}
            loading={requesting}
          />
        ) : null}
        {permission === 'denied' ? (
          <>
            <InfoBanner kind="warning" text={messages.knowledge.permissionDeniedOpenSettings} />
            <Button
              label={messages.notifications.openSystemSettings}
              variant="secondary"
              onPress={() => void openSystemNotificationSettings()}
            />
          </>
        ) : null}
      </Card>

      <SectionHeader title={messages.notifications.maintenanceTime} />
      <Card>
        <Text style={styles.explanation}>{messages.notifications.maintenanceTimeHelp}</Text>
        <TimeField
          label={messages.notifications.maintenanceTime}
          hour={settings.notificationHour}
          minute={settings.notificationMinute}
          onChange={handleTimeChange}
        />
        {saved ? <InfoBanner text={messages.notifications.timeSaved} /> : null}
      </Card>

      <SectionHeader title={messages.notifications.dailyKnowledgeSection} />
      <Card>
        <SwitchRow
          label={messages.knowledge.dailyNotifications}
          description={
            settings.dailyKnowledgeEnabled
              ? messages.knowledge.dailyNotificationHelp
              : messages.notifications.dailyKnowledgeOffHelp
          }
          value={settings.dailyKnowledgeEnabled}
          onValueChange={(value) => void handleKnowledgeToggle(value)}
        />
        <TimeField
          label={messages.knowledge.dailyNotificationTime}
          hour={settings.dailyKnowledgeHour}
          minute={settings.dailyKnowledgeMinute}
          onChange={handleKnowledgeTime}
        />
        <Text style={styles.explanation}>{messages.knowledge.planningHorizonNote}</Text>
        {knowledgeSaved ? <InfoBanner text={messages.language.saved} /> : null}
        {__DEV__ ? (
          <Button
            label="Dev: 8s bilgi bildirimi"
            variant="ghost"
            onPress={() => void scheduleDevKnowledgePreview()}
          />
        ) : null}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  permissionState: { fontSize: fontSize.md, color: colors.text, marginBottom: spacing.md },
  explanation: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
});
