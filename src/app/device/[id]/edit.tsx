import { useLocalSearchParams, useRouter } from 'expo-router';

import { DeviceForm } from '@/components/DeviceForm';
import { ErrorView, LoadingView } from '@/components/ui/StateViews';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getDevice, updateDevice, type DeviceInput } from '@/repositories/devices';
import { syncAllNotifications } from '@/services/notifications';

export default function EditDeviceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: device, loading, error, reload } = useAsyncData(() => getDevice(id));

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={reload} />;
  if (!device) return <ErrorView message="Cihaz bulunamadı." />;

  const handleSubmit = async (input: DeviceInput) => {
    await updateDevice(device.id, input);
    await syncAllNotifications();
    router.back();
  };

  return <DeviceForm initial={device} submitLabel="Değişiklikleri Kaydet" onSubmit={handleSubmit} />;
}
