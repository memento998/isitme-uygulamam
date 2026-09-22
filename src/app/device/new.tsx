import { useRouter } from 'expo-router';

import { DeviceForm } from '@/components/DeviceForm';
import { useI18n } from '@/i18n';
import { createDeviceWithInitialData, type DeviceInput } from '@/repositories/devices';
import { generateSchedule } from '@/services/checkupSchedule';
import { syncAllNotifications } from '@/services/notifications';

export default function NewDeviceScreen() {
  const router = useRouter();
  const { messages } = useI18n();

  const handleSubmit = async (input: DeviceInput) => {
    await createDeviceWithInitialData(input, generateSchedule(input.startDate));
    await syncAllNotifications();
    router.back();
  };

  return (
    <DeviceForm submitLabel={messages.deviceForm.submitNew} showScheduleInfo onSubmit={handleSubmit} />
  );
}
