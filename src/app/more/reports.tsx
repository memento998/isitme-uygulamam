import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import { InfoBanner } from '@/components/ui/InfoBanner';
import { ListRow } from '@/components/ui/ListRow';
import { EmptyState, ErrorView, LoadingView } from '@/components/ui/StateViews';
import { colors, radius, spacing } from '@/constants/theme';
import { OTHER_BRAND } from '@/constants/brands';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useI18n } from '@/i18n';
import { listCheckupsForDevice } from '@/repositories/checkups';
import { listDevices } from '@/repositories/devices';
import { listLogsForDevice } from '@/repositories/maintenance';
import { listServiceRecordsForDevice } from '@/repositories/serviceRecords';
import { shareDeviceReport } from '@/services/pdf';
import type { Device } from '@/types/models';

export default function ReportsScreen() {
  const { locale, messages, isRTL } = useI18n();
  const { data: devices, loading, error, reload } = useAsyncData(
    listDevices,
    messages.common.loadError
  );
  const [busyId, setBusyId] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);

  if (loading) return <LoadingView message={messages.common.loading} />;
  if (error || !devices) {
    return (
      <ErrorView
        message={error ?? messages.common.loadError}
        onRetry={reload}
        retryLabel={messages.common.retry}
      />
    );
  }

  const handleGenerate = async (device: Device) => {
    if (busyId) return;
    setBusyId(device.id);
    setFailure(null);
    try {
      const [checkups, logs, records] = await Promise.all([
        listCheckupsForDevice(device.id),
        listLogsForDevice(device.id),
        listServiceRecordsForDevice(device.id),
      ]);
      await shareDeviceReport(device, checkups, logs, records, messages, locale);
    } catch (err) {
      console.warn('Rapor oluşturulamadı:', err);
      setFailure(messages.pdf.generateError);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.content, devices.length === 0 && styles.contentEmpty]}
        ListHeaderComponent={
          <View style={styles.header}>
            {failure ? <InfoBanner kind="warning" text={failure} /> : null}
            <InfoBanner text={messages.pdf.reportsHelp} />
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.rowContainer}>
            <ListRow
              icon="document-text-outline"
              title={item.name}
              subtitle={
                busyId === item.id
                  ? messages.pdf.preparing
                  : item.brand === OTHER_BRAND
                    ? messages.brand.otherBrand
                    : item.brand
              }
              onPress={() => handleGenerate(item)}
              isRTL={isRTL}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState
            icon="document-text-outline"
            title={messages.pdf.emptyTitle}
            description={messages.pdf.emptyDescription}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  contentEmpty: { flexGrow: 1, justifyContent: 'center' },
  header: { gap: spacing.md, marginBottom: spacing.md },
  rowContainer: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
});
