/**
 * Yalnızca geliştirme modunda (__DEV__) kullanılabilen örnek veriler.
 * Üretim derlemelerinde bu servis çağrılamaz.
 */
import { createCheckups, completeCheckup, listCheckupsForDevice } from '@/repositories/checkups';
import { createDevice } from '@/repositories/devices';
import {
  createDefaultReminders,
  listRemindersForDevice,
  markReminderDone,
  updateReminder,
} from '@/repositories/maintenance';
import { createServiceRecord } from '@/repositories/serviceRecords';
import { generateSchedule } from './checkupSchedule';
import { addDays, addMonths, todayISO } from './date';

/** Örnek verileri ekler. Üretimde çağrılırsa hata fırlatır. */
export async function loadSampleData(): Promise<void> {
  if (!__DEV__) {
    throw new Error('Örnek veriler yalnızca geliştirme modunda yüklenebilir.');
  }

  const today = todayISO();

  // 14 ay önce başlanmış pilli cihaz: geçmiş kontrolleri kısmen tamamlanmış.
  const device1 = await createDevice({
    name: 'Sağ Kulak Cihazım',
    brand: 'Phonak',
    model: 'Audeo P90',
    earSide: 'right',
    startDate: addMonths(today, -14),
    serialNumber: 'PH-2025-004512',
    warrantyEndDate: addMonths(today, 10),
    powerType: 'battery',
    clinicName: 'Dr. Ayşe Yılmaz — Duyu İşitme Merkezi',
    clinicPhone: '0212 555 12 34',
    notes: 'Filtre değişiminde küçük boy filtre kullanılıyor.',
    photoUri: null,
    remindersEnabled: true,
  });
  await createCheckups(device1.id, generateSchedule(device1.startDate));
  const checkups1 = await listCheckupsForDevice(device1.id);
  // 1. ay ve 3. ay zamanında, 6. ay 12 gün gecikmeli tamamlandı; 1. yıl kontrolü gecikmiş durumda.
  if (checkups1[0]) await completeCheckup(checkups1[0].id, checkups1[0].dueDate, 'İlk ayar kontrolü yapıldı.');
  if (checkups1[1]) await completeCheckup(checkups1[1].id, addDays(checkups1[1].dueDate, -2), null);
  if (checkups1[2])
    await completeCheckup(checkups1[2].id, addDays(checkups1[2].dueDate, 12), 'Kubbe değiştirildi.');
  await createDefaultReminders(device1.id, 'battery');
  const reminders1 = await listRemindersForDevice(device1.id);
  for (const reminder of reminders1) {
    if (reminder.type === 'battery' || reminder.type === 'cleaning') {
      await updateReminder(reminder.id, { enabled: true, intervalDays: reminder.intervalDays });
      await markReminderDone(reminder, addDays(today, -3), null);
    }
  }
  await createServiceRecord(device1.id, {
    date: addMonths(today, -5),
    title: 'Hoparlör değişimi',
    description: 'Yetkili serviste garanti kapsamında değiştirildi.',
  });

  // 2 ay önce başlanmış şarjlı cihaz: ilk kontrolü bekleniyor.
  const device2 = await createDevice({
    name: 'Sol Kulak Cihazım',
    brand: 'Oticon',
    model: 'Real 1',
    earSide: 'left',
    startDate: addMonths(today, -2),
    serialNumber: 'OT-2026-118834',
    warrantyEndDate: addMonths(today, 22),
    powerType: 'rechargeable',
    clinicName: 'Odyolog Mehmet Kaya',
    clinicPhone: '0532 555 98 76',
    notes: null,
    photoUri: null,
    remindersEnabled: true,
  });
  await createCheckups(device2.id, generateSchedule(device2.startDate));
  const checkups2 = await listCheckupsForDevice(device2.id);
  if (checkups2[0]) await completeCheckup(checkups2[0].id, checkups2[0].dueDate, null);
  await createDefaultReminders(device2.id, 'rechargeable');
}
