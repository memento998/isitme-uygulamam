import { useRouter } from 'expo-router';

import { DeviceForm } from '@/components/DeviceForm';
import { createDeviceWithInitialData, type DeviceInput } from '@/repositories/devices';
import { generateSchedule } from '@/services/checkupSchedule';
import { syncAllNotifications } from '@/services/notifications';

export default function NewDeviceScreen() {
  const router = useRouter();

  const handleSubmit = async (input: DeviceInput) => {
    await createDeviceWithInitialData(input, generateSchedule(input.startDate));
    await syncAllNotifications();
    router.back();
  };

  return <DeviceForm submitLabel="Cihazı Kaydet" showScheduleInfo onSubmit={handleSubmit} />;
}
