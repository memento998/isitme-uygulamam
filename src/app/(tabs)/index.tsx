import { useEffect, useRef, useState } from 'react';
import { AppState, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { DailyTipCard } from '@/components/knowledge/DailyTipCard';
import { OpenedNotificationCard } from '@/components/knowledge/OpenedNotificationCard';
import { DeviceCard } from '@/components/DeviceCard';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState, ErrorView, LoadingView } from '@/components/ui/StateViews';
import { colors, fontSize, shadow, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { isActiveTipId } from '@/knowledge/catalog';
import { getLocalizedTip } from '@/knowledge/content';
import { nextLocalMidnight, tipIdForCalendarDay } from '@/knowledge/day';
import { useAsyncData } from '@/hooks/useAsyncData';
import { listAllCheckups } from '@/repositories/checkups';
import { deleteDevice, listDevices } from '@/repositories/devices';
import {
  ensureKnowledgeCycleStart,
  getSettings,
  markDailyKnowledgePromptSeen,
  saveDailyKnowledgeSettings,
} from '@/repositories/settings';
import { countByStatus, nextUpcomingCheckup, type StatusCounts } from '@/services/checkupStatus';
import { todayISO } from '@/services/date';
import {
  consumeKnowledgeOpen,
  subscribeKnowledgeOpen,
  type OpenedKnowledge,
} from '@/services/knowledgeOpen';
import {
  getPermissionState,
  requestPermission,
  scheduleDevKnowledgePreview,
  syncAllNotifications,
} from '@/services/notifications';
import { loadSampleData } from '@/services/sampleData';
import type { Device } from '@/types/models';

interface DeviceListItem {
  device: Device;
  counts: StatusCounts;
  nextCheckupDate: string | null;
}

interface HomeData {
  items: DeviceListItem[];
  today: string;
  tipId: string;
  promptSeen: boolean;
  dailyEnabled: boolean;
}

async function loadHome(): Promise<HomeData> {
  const today = todayISO();
  const [devices, checkups, settings, start] = await Promise.all([
    listDevices(),
    listAllCheckups(),
    getSettings(),
    ensureKnowledgeCycleStart(today),
  ]);
  const items = devices.map((device) => {
    const deviceCheckups = checkups.filter((c) => c.deviceId === device.id);
    return {
      device,
      counts: countByStatus(deviceCheckups, today),
      nextCheckupDate: nextUpcomingCheckup(deviceCheckups, today)?.dueDate ?? null,
    };
  });
  return {
    items,
    today,
    tipId: tipIdForCalendarDay(start, today),
    promptSeen: settings.dailyKnowledgePromptSeen,
    dailyEnabled: settings.dailyKnowledgeEnabled,
  };
}

export default function DevicesScreen() {
  const router = useRouter();
  const { locale, messages, tx } = useI18n();
  const { data, loading, error, reload } = useAsyncData(loadHome);
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  const [loadingSample, setLoadingSample] = useState(false);
  const [opened, setOpened] = useState<OpenedKnowledge | null>(null);
  const [highlight, setHighlight] = useState(false);
  const listRef = useRef<FlatList<DeviceListItem>>(null);

  useEffect(() => {
    return subscribeKnowledgeOpen((next) => {
      if (!next) return;
      const consumed = consumeKnowledgeOpen();
      if (!consumed) return;
      if (consumed.kind === 'invalid') {
        router.push('/knowledge');
        return;
      }
      setOpened(consumed);
      if (consumed.kind === 'today') {
        setHighlight(true);
        listRef.current?.scrollToOffset({ offset: 0, animated: true });
      }
    });
  }, [router]);

  useEffect(() => {
    if (!highlight) return;
    const timer = setTimeout(() => setHighlight(false), 2400);
    return () => clearTimeout(timer);
  }, [highlight]);

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') void reload();
    });
    const untilMidnight = nextLocalMidnight().getTime() - Date.now();
    const timer = setTimeout(() => {
      void reload();
      void syncAllNotifications();
    }, Math.max(1000, untilMidnight));
    return () => {
      sub.remove();
      clearTimeout(timer);
    };
  }, [reload]);

  if (loading) return <LoadingView message={messages.common.loading} />;
  if (error || !data) {
    return <ErrorView message={error ?? messages.common.loadError} onRetry={reload} />;
  }

  const handleDelete = async () => {
    if (!deviceToDelete) return;
    await deleteDevice(deviceToDelete.id);
    setDeviceToDelete(null);
    await syncAllNotifications();
    await reload();
  };

  const handleLoadSample = async () => {
    setLoadingSample(true);
    try {
      await loadSampleData();
      await syncAllNotifications();
      await reload();
    } finally {
      setLoadingSample(false);
    }
  };

  const enableDaily = async () => {
    const permission = await getPermissionState();
    if (permission === 'undetermined') {
      const granted = await requestPermission();
      if (!granted) {
        await markDailyKnowledgePromptSeen();
        await reload();
        return;
      }
    }
    await saveDailyKnowledgeSettings({ enabled: true, hour: 10, minute: 0 });
    await markDailyKnowledgePromptSeen();
    await syncAllNotifications();
    await reload();
  };

  const dismissPrompt = async () => {
    await markDailyKnowledgePromptSeen();
    await reload();
  };

  const tip = isActiveTipId(data.tipId) ? getLocalizedTip(data.tipId, locale) : null;

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={data.items}
        keyExtractor={(item) => item.device.id}
        contentContainerStyle={[
          styles.listContent,
          data.items.length === 0 && styles.listEmpty,
        ]}
        ListHeaderComponent={
          <View style={styles.header}>
            {opened?.kind === 'snapshot' ? (
              <OpenedNotificationCard
                payload={opened.payload}
                onOpenCurrentLanguage={
                  isActiveTipId(opened.payload.tipId)
                    ? () => router.push(`/knowledge/${opened.payload.tipId}`)
                    : undefined
                }
              />
            ) : null}
            {opened?.kind === 'retired' ? (
              <OpenedNotificationCard
                payload={opened.payload}
                retired
                onOpenBank={() => router.push('/knowledge')}
              />
            ) : null}
            {tip ? (
              <DailyTipCard
                tip={tip}
                highlighted={highlight}
                onPressCard={() => router.push(`/knowledge/${tip.id}`)}
                onPressSeeAll={() => router.push('/knowledge')}
              />
            ) : null}
            {!data.promptSeen && !data.dailyEnabled ? (
              <Card style={styles.prompt}>
                <Text style={styles.promptTitle}>{messages.knowledge.enableDailyPromptTitle}</Text>
                <Text style={styles.promptBody}>{messages.knowledge.enableDailyPromptBody}</Text>
                <Button label={messages.knowledge.enableDailyNotifications} onPress={enableDaily} />
                <Button
                  label={messages.common.notNow}
                  variant="secondary"
                  onPress={dismissPrompt}
                />
              </Card>
            ) : null}
            {__DEV__ ? (
              <Button
                label="Dev: 8s bilgi bildirimi"
                variant="ghost"
                onPress={() => void scheduleDevKnowledgePreview()}
              />
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <DeviceCard
            device={item.device}
            counts={item.counts}
            nextCheckupDate={item.nextCheckupDate}
            todayIso={data.today}
            onPress={() => router.push(`/device/${item.device.id}`)}
            onEdit={() => router.push(`/device/${item.device.id}/edit`)}
            onDelete={() => setDeviceToDelete(item.device)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            icon="add-circle-outline"
            title={messages.home.emptyTitle}
            description={messages.home.emptyDescription}
            action={
              <View style={styles.emptyActions}>
                <Button label={messages.home.addDevice} onPress={() => router.push('/device/new')} />
                {__DEV__ ? (
                  <Button
                    label={messages.home.sampleDataDev}
                    variant="secondary"
                    loading={loadingSample}
                    onPress={handleLoadSample}
                  />
                ) : null}
              </View>
            }
          />
        }
      />

      {data.items.length > 0 ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={messages.home.fabA11y}
          onPress={() => router.push('/device/new')}
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        >
          <Ionicons name="add" size={30} color={colors.textOnPrimary} />
        </Pressable>
      ) : null}

      <ConfirmDialog
        visible={deviceToDelete !== null}
        title={messages.home.deleteDeviceTitle}
        message={tx(messages.home.deleteDeviceMessage, { name: deviceToDelete?.name ?? '' })}
        confirmLabel={messages.common.delete}
        cancelLabel={messages.common.cancel}
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeviceToDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg, paddingBottom: 88 },
  listEmpty: { flexGrow: 1, justifyContent: 'center' },
  header: { gap: spacing.md, marginBottom: spacing.md },
  prompt: { gap: spacing.sm },
  promptTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  promptBody: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 20 },
  emptyActions: { gap: spacing.md, alignSelf: 'stretch' },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.card,
  },
  fabPressed: { backgroundColor: colors.primaryPressed },
});
