import { useRouter } from 'expo-router';

import { DeviceForm } from '@/components/DeviceForm';
import { createCheckups } from '@/repositories/checkups';
import { createDevice, type DeviceInput } from '@/repositories/devices';
import { createDefaultReminders } from '@/repositories/maintenance';
import { generateSchedule } from '@/services/checkupSchedule';
import { syncAllNotifications } from '@/services/notifications';

export default function NewDeviceScreen() {
  const router = useRouter();

  const handleSubmit = async (input: DeviceInput) => {
    const device = await createDevice(input);
    await createCheckups(device.id, generateSchedule(device.startDate));
    await createDefaultReminders(device.id, device.powerType);
    await syncAllNotifications();
    router.back();
  };

  return <DeviceForm submitLabel="Cihazı Kaydet" showScheduleInfo onSubmit={handleSubmit} />;
}
