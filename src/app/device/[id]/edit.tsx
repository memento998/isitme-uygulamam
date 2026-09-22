import { useLocalSearchParams, useRouter } from 'expo-router';

import { DeviceForm } from '@/components/DeviceForm';
import { ErrorView, LoadingView } from '@/components/ui/StateViews';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useI18n } from '@/i18n';
import { getDevice, updateDevice, type DeviceInput } from '@/repositories/devices';
import { syncAllNotifications } from '@/services/notifications';

export default function EditDeviceScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { messages } = useI18n();
  const { data: device, loading, error, reload } = useAsyncData(
    () => getDevice(id),
    messages.common.loadError
  );

  if (loading) return <LoadingView message={messages.common.loading} />;
  if (error) {
    return (
      <ErrorView message={error} onRetry={reload} retryLabel={messages.common.retry} />
    );
  }
  if (!device) {
    return <ErrorView message={messages.deviceDetail.notFound} />;
  }

  const handleSubmit = async (input: DeviceInput) => {
    await updateDevice(device.id, input);
    await syncAllNotifications();
    router.back();
  };

  return (
    <DeviceForm initial={device} submitLabel={messages.deviceForm.submitEdit} onSubmit={handleSubmit} />
  );
}
