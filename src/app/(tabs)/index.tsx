import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { DeviceCard } from '@/components/DeviceCard';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { EmptyState, ErrorView, LoadingView } from '@/components/ui/StateViews';
import { colors, shadow, spacing } from '@/constants/theme';
import { useAsyncData } from '@/hooks/useAsyncData';
import { listAllCheckups } from '@/repositories/checkups';
import { deleteDevice, listDevices } from '@/repositories/devices';
import { countByStatus, nextUpcomingCheckup, type StatusCounts } from '@/services/checkupStatus';
import { todayISO } from '@/services/date';
import { syncAllNotifications } from '@/services/notifications';
import { loadSampleData } from '@/services/sampleData';
import type { Device } from '@/types/models';

interface DeviceListItem {
  device: Device;
  counts: StatusCounts;
  nextCheckupDate: string | null;
}

async function loadDeviceList(): Promise<{ items: DeviceListItem[]; today: string }> {
  const today = todayISO();
  const [devices, checkups] = await Promise.all([listDevices(), listAllCheckups()]);
  const items = devices.map((device) => {
    const deviceCheckups = checkups.filter((c) => c.deviceId === device.id);
    return {
      device,
      counts: countByStatus(deviceCheckups, today),
      nextCheckupDate: nextUpcomingCheckup(deviceCheckups, today)?.dueDate ?? null,
    };
  });
  return { items, today };
}

export default function DevicesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { data, loading, error, reload } = useAsyncData(loadDeviceList);
  const [deviceToDelete, setDeviceToDelete] = useState<Device | null>(null);
  const [loadingSample, setLoadingSample] = useState(false);

  if (loading) return <LoadingView />;
  if (error || !data) return <ErrorView message={error ?? undefined} onRetry={reload} />;

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

  return (
    <View style={styles.container}>
      <FlatList
        data={data.items}
        keyExtractor={(item) => item.device.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: 96 + insets.bottom },
          data.items.length === 0 && styles.listEmpty,
        ]}
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
            title="Henüz cihaz eklemediniz"
            description="İşitme cihazınızı ekleyerek kontrol ve bakım takibine başlayın."
            action={
              <View style={styles.emptyActions}>
                <Button label="Cihaz Ekle" onPress={() => router.push('/device/new')} />
                {__DEV__ ? (
                  <Button
                    label="Örnek veri yükle (geliştirici)"
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
          accessibilityLabel="Yeni cihaz ekle"
          onPress={() => router.push('/device/new')}
          style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        >
          <Ionicons name="add" size={30} color={colors.textOnPrimary} />
        </Pressable>
      ) : null}

      <ConfirmDialog
        visible={deviceToDelete !== null}
        title="Cihazı sil"
        message={`"${deviceToDelete?.name ?? ''}" cihazı ve tüm kontrol, bakım ve servis kayıtları kalıcı olarak silinecek. Bu işlem geri alınamaz.`}
        confirmLabel="Sil"
        destructive
        onConfirm={handleDelete}
        onCancel={() => setDeviceToDelete(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  listContent: { padding: spacing.lg },
  listEmpty: { flexGrow: 1, justifyContent: 'center' },
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
