/**
 * Yerel bildirim yönetimi (expo-notifications).
 * Web'de yerel bildirim desteklenmediği için tüm fonksiyonlar sessizce atlanır.
 *
 * Strateji: veriler her değiştiğinde `syncAllNotifications` çağrılır; planlanmış
 * tüm bildirimler iptal edilip güncel verilere göre yeniden kurulur.
 */
import { Platform } from 'react-native';
import type * as NotificationsModule from 'expo-notifications';

import { listAllCheckups } from '@/repositories/checkups';
import { listDevices } from '@/repositories/devices';
import { listAllReminders, nextReminderDate } from '@/repositories/maintenance';
import { getSettings } from '@/repositories/settings';
import { MAINTENANCE_TYPE_LABELS } from '@/types/models';
import { compareISO, formatDate, parseISODate, todayISO } from './date';

// Web'de modülün içe aktarılması bile uyarı ürettiği için yalnızca native platformlarda yüklenir.
const Notifications: typeof NotificationsModule | null =
  Platform.OS === 'web'
    ? null
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      (require('expo-notifications') as typeof NotificationsModule);

/** Bildirim izni istenmeden önce kullanıcıya gösterilecek açıklama. */
export const PERMISSION_EXPLANATION =
  'Kontrol ve bakım tarihleriniz geldiğinde size hatırlatma gönderebilmemiz için ' +
  'bildirim iznine ihtiyacımız var. Bildirimler yalnızca sizin eklediğiniz cihazların ' +
  'planlanan işlemleri için kullanılır.';

export type PermissionState = 'granted' | 'denied' | 'undetermined' | 'unsupported';

/** Uygulama açılışında bir kez çağrılır; bildirimlerin ön planda da görünmesini sağlar. */
export function configureNotifications(): void {
  if (!Notifications) return;
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });
}

async function ensureAndroidChannel(): Promise<void> {
  if (!Notifications || Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync('reminders', {
    name: 'Hatırlatmalar',
    importance: Notifications.AndroidImportance.DEFAULT,
    description: 'Kontrol ve bakım hatırlatmaları',
  });
}

export async function getPermissionState(): Promise<PermissionState> {
  if (!Notifications) return 'unsupported';
  const result = await Notifications.getPermissionsAsync();
  if (result.granted) return 'granted';
  return result.canAskAgain ? 'undetermined' : 'denied';
}

/** Bildirim izni ister. İzin açıklaması ekran tarafından önceden gösterilmelidir. */
export async function requestPermission(): Promise<boolean> {
  if (!Notifications) return false;
  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

function dateAt(iso: string, hour: number, minute: number): Date {
  const date = parseISODate(iso);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function scheduleAt(title: string, body: string, when: Date): Promise<void> {
  if (!Notifications) return;
  await Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: when,
      channelId: 'reminders',
    },
  });
}

/**
 * Tüm bildirimleri güncel verilere göre yeniden planlar.
 * İzin verilmemişse hiçbir şey yapmaz.
 */
export async function syncAllNotifications(): Promise<void> {
  if (!Notifications) return;
  try {
    const permission = await Notifications.getPermissionsAsync();
    if (!permission.granted) return;
    await ensureAndroidChannel();
    await Notifications.cancelAllScheduledNotificationsAsync();

    const [devices, checkups, reminders, settings] = await Promise.all([
      listDevices(),
      listAllCheckups(),
      listAllReminders(),
      getSettings(),
    ]);
    const today = todayISO();
    const now = Date.now();
    const deviceMap = new Map(devices.map((d) => [d.id, d]));

    const planned: { title: string; body: string; when: Date }[] = [];

    for (const checkup of checkups) {
      if (checkup.completedAt) continue;
      const device = deviceMap.get(checkup.deviceId);
      if (!device || !device.remindersEnabled) continue;
      const when = dateAt(
        checkup.dueDate,
        settings.notificationHour,
        settings.notificationMinute
      );
      if (when.getTime() <= now) continue;
      planned.push({
        title: 'Kontrol hatırlatması',
        body: `${device.name}: ${checkup.title} — ${formatDate(checkup.dueDate)}`,
        when,
      });
    }

    for (const reminder of reminders) {
      if (!reminder.enabled) continue;
      const device = deviceMap.get(reminder.deviceId);
      if (!device || !device.remindersEnabled) continue;
      const next = nextReminderDate(reminder, device.warrantyEndDate);
      if (!next || compareISO(next, today) < 0) continue;
      const when = dateAt(next, settings.notificationHour, settings.notificationMinute);
      if (when.getTime() <= now) continue;
      const label = MAINTENANCE_TYPE_LABELS[reminder.type];
      planned.push({
        title: 'Bakım hatırlatması',
        body: `${device.name}: ${label} — ${formatDate(next)}`,
        when,
      });
    }

    // İşletim sistemi sınırlarını zorlamamak için en yakın 60 bildirimi planla.
    planned.sort((a, b) => a.when.getTime() - b.when.getTime());
    for (const item of planned.slice(0, 60)) {
      await scheduleAt(item.title, item.body, item.when);
    }
  } catch (error) {
    // Bildirim planlama hatası uygulamayı durdurmamalı.
    console.warn('Bildirimler planlanamadı:', error);
  }
}

/** Planlanmış tüm bildirimleri iptal eder (tüm veriler silindiğinde kullanılır). */
export async function cancelAllNotifications(): Promise<void> {
  if (!Notifications) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
