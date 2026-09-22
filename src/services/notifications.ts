/**
 * Yerel bildirim yönetimi (expo-notifications).
 * Web'de yerel bildirim desteklenmediği için tüm fonksiyonlar sessizce atlanır.
 *
 * Koordinatör: bakım/kontrol ve günlük bilgi bildirimlerini birlikte uzlaştırır.
 * Genel cancelAllScheduledNotificationsAsync yalnızca tüm veri silindiğinde kullanılır.
 */
import { Linking, Platform } from 'react-native';
import type * as NotificationsModule from 'expo-notifications';

import { resolveAppLocale } from '@/i18n/locales';
import { getUiMessages } from '@/i18n/messages';
import { getSystemLanguageTags } from '@/i18n/systemLocales';
import { interpolate } from '@/i18n/interpolate';
import { getLocalizedTip } from '@/knowledge/content';
import { KNOWLEDGE_CATALOG_VERSION } from '@/knowledge/types';
import { listAllCheckups } from '@/repositories/checkups';
import { listDevices } from '@/repositories/devices';
import {
  getOrAssignTipForDate,
  listNotificationPlans,
  markPlansCancelled,
  upsertNotificationPlan,
} from '@/repositories/knowledge';
import { listAllReminders, nextReminderDate } from '@/repositories/maintenance';
import { ensureKnowledgeCycleStart, getSettings } from '@/repositories/settings';
import { formatDate, parseISODate, todayISO, compareISO } from './date';
import {
  ANDROID_PENDING_LIMIT,
  firstSchedulableKnowledgeDate,
  IOS_PENDING_LIMIT,
  isKnowledgeNotificationIdentifier,
  KNOWLEDGE_CHANNEL_ID,
  KNOWLEDGE_NOTIFICATION_TYPE,
  knowledgeDatesInWindow,
  knowledgeNotificationIdentifier,
  knowledgeWindowDays,
  MAINTENANCE_SCHEDULE_LIMIT,
  shouldKeepScheduledKnowledge,
} from './knowledgeNotifications';

const Notifications: typeof NotificationsModule | null =
  Platform.OS === 'web'
    ? null
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      (require('expo-notifications') as typeof NotificationsModule);

export const PERMISSION_EXPLANATION =
  'Kontrol ve bakım tarihleriniz geldiğinde size hatırlatma gönderebilmemiz için ' +
  'bildirim iznine ihtiyacımız var. Bildirimler yalnızca sizin eklediğiniz cihazların ' +
  'planlanan işlemleri için kullanılır.';

export type PermissionState = 'granted' | 'denied' | 'undetermined' | 'unsupported';

let syncRunning = false;
let syncQueued = false;

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

export async function getPermissionState(): Promise<PermissionState> {
  if (!Notifications) return 'unsupported';
  const result = await Notifications.getPermissionsAsync();
  if (result.granted) return 'granted';
  return result.canAskAgain ? 'undetermined' : 'denied';
}

export async function requestPermission(): Promise<boolean> {
  if (!Notifications) return false;
  const result = await Notifications.requestPermissionsAsync();
  return result.granted;
}

export async function openSystemNotificationSettings(): Promise<void> {
  await Linking.openSettings();
}

function dateAt(iso: string, hour: number, minute: number): Date {
  const date = parseISODate(iso);
  date.setHours(hour, minute, 0, 0);
  return date;
}

async function ensureChannels(locale: ReturnType<typeof resolveAppLocale>): Promise<void> {
  if (!Notifications || Platform.OS !== 'android') return;
  const messages = getUiMessages(locale);
  await Notifications.setNotificationChannelAsync('reminders', {
    name: messages.notifications.remindersChannelName,
    importance: Notifications.AndroidImportance.DEFAULT,
    description: messages.notifications.remindersChannelDescription,
  });
  await Notifications.setNotificationChannelAsync(KNOWLEDGE_CHANNEL_ID, {
    name: messages.knowledge.knowledgeChannelName,
    importance: Notifications.AndroidImportance.DEFAULT,
    description: messages.knowledge.knowledgeChannelDescription,
  });
}

async function cancelByIdentifiers(identifiers: readonly string[]): Promise<void> {
  if (!Notifications || identifiers.length === 0) return;
  await Promise.all(
    identifiers.map((identifier) => Notifications.cancelScheduledNotificationAsync(identifier))
  );
}

async function syncMaintenance(now: Date): Promise<number> {
  if (!Notifications) return 0;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const maintenanceIds = scheduled
    .map((item) => item.identifier)
    .filter((id) => !isKnowledgeNotificationIdentifier(id));
  await cancelByIdentifiers(maintenanceIds);

  const [devices, checkups, reminders, settings] = await Promise.all([
    listDevices(),
    listAllCheckups(),
    listAllReminders(),
    getSettings(),
  ]);
  const today = todayISO();
  const deviceMap = new Map(devices.map((d) => [d.id, d]));
  const locale = resolveAppLocale(settings.languagePreference, getSystemLanguageTags());
  const messages = getUiMessages(locale);

  const planned: {
    identifier: string;
    title: string;
    body: string;
    when: Date;
    data: Record<string, string>;
  }[] = [];

  for (const checkup of checkups) {
    if (checkup.completedAt) continue;
    const device = deviceMap.get(checkup.deviceId);
    if (!device || !device.remindersEnabled) continue;
    const when = dateAt(checkup.dueDate, settings.notificationHour, settings.notificationMinute);
    if (when.getTime() <= now.getTime()) continue;
    planned.push({
      identifier: `fixhear.maint.checkup.${checkup.id}`,
      title: messages.notifications.checkupReminderTitle,
      body: interpolate(messages.notifications.checkupReminderBody, {
        device: device.name,
        title: checkup.title,
        date: formatDate(checkup.dueDate),
      }),
      when,
      data: { type: 'checkup', checkupId: checkup.id },
    });
  }

  for (const reminder of reminders) {
    if (!reminder.enabled) continue;
    const device = deviceMap.get(reminder.deviceId);
    if (!device || !device.remindersEnabled) continue;
    const next = nextReminderDate(reminder, device.warrantyEndDate);
    if (!next || compareISO(next, today) < 0) continue;
    const when = dateAt(next, settings.notificationHour, settings.notificationMinute);
    if (when.getTime() <= now.getTime()) continue;
    const label = messages.maintenance[reminder.type];
    planned.push({
      identifier: `fixhear.maint.reminder.${reminder.id}`,
      title: messages.notifications.maintenanceReminderTitle,
      body: interpolate(messages.notifications.maintenanceReminderBody, {
        device: device.name,
        label,
        date: formatDate(next),
      }),
      when,
      data: { type: 'maintenance', reminderId: reminder.id },
    });
  }

  planned.sort((a, b) => a.when.getTime() - b.when.getTime());
  const limited = planned.slice(0, MAINTENANCE_SCHEDULE_LIMIT);
  for (const item of limited) {
    await Notifications.scheduleNotificationAsync({
      identifier: item.identifier,
      content: { title: item.title, body: item.body, data: item.data },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: item.when,
        channelId: 'reminders',
      },
    });
  }
  return limited.length;
}

async function cancelAllKnowledgeNotifications(): Promise<void> {
  if (!Notifications) return;
  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const knowledgeIds = scheduled
    .map((item) => item.identifier)
    .filter((id) => isKnowledgeNotificationIdentifier(id));
  await cancelByIdentifiers(knowledgeIds);
  const plans = await listNotificationPlans();
  await markPlansCancelled(plans.map((plan) => plan.localDate));
}

async function syncKnowledge(now: Date, maintenanceCount: number): Promise<void> {
  if (!Notifications) return;
  const settings = await getSettings();
  if (!settings.dailyKnowledgeEnabled) {
    await cancelAllKnowledgeNotifications();
    return;
  }

  const platform = Platform.OS === 'ios' ? 'ios' : Platform.OS === 'android' ? 'android' : 'web';
  const windowDays = knowledgeWindowDays(platform, maintenanceCount);
  const today = todayISO();
  const startDate = await ensureKnowledgeCycleStart(today);
  const locale = resolveAppLocale(settings.languagePreference, getSystemLanguageTags());
  const firstDate = firstSchedulableKnowledgeDate(
    today,
    settings.dailyKnowledgeHour,
    settings.dailyKnowledgeMinute,
    now
  );
  const desiredDates = firstDate ? knowledgeDatesInWindow(firstDate, windowDays) : [];

  const scheduled = await Notifications.getAllScheduledNotificationsAsync();
  const scheduledById = new Map(scheduled.map((item) => [item.identifier, item]));
  const existingPlans = await listNotificationPlans();
  const planByDate = new Map(existingPlans.map((plan) => [plan.localDate, plan]));

  const desiredSet = new Set(desiredDates);
  const extraDates = existingPlans
    .filter((plan) => plan.status === 'scheduled' && !desiredSet.has(plan.localDate))
    .map((plan) => plan.localDate);
  await cancelByIdentifiers(extraDates.map((date) => knowledgeNotificationIdentifier(date)));
  await markPlansCancelled(extraDates);

  for (const localDate of desiredDates) {
    const assignment = await getOrAssignTipForDate(localDate, startDate, KNOWLEDGE_CATALOG_VERSION);
    const copy = getLocalizedTip(assignment.tipId, locale);
    const identifier = knowledgeNotificationIdentifier(localDate);
    const when = dateAt(localDate, settings.dailyKnowledgeHour, settings.dailyKnowledgeMinute);
    if (when.getTime() <= now.getTime()) continue;

    const existing = scheduledById.get(identifier);
    const existingData = existing?.content.data;
    const keep =
      existing &&
      shouldKeepScheduledKnowledge({
        existingLocale: String(existingData?.locale ?? ''),
        existingTipId: String(existingData?.tipId ?? ''),
        existingVersion: Number(existingData?.contentVersion ?? NaN),
        existingTitle: existing.content.title ?? '',
        existingBody: existing.content.body ?? '',
        desiredLocale: locale,
        desiredTipId: assignment.tipId,
        desiredVersion: copy.contentVersion,
        desiredTitle: copy.title,
        desiredBody: copy.message,
      });

    if (!keep) {
      if (existing) {
        await Notifications.cancelScheduledNotificationAsync(identifier);
      }
      try {
        await Notifications.scheduleNotificationAsync({
          identifier,
          content: {
            title: copy.title,
            body: copy.message,
            data: {
              type: KNOWLEDGE_NOTIFICATION_TYPE,
              tipId: assignment.tipId,
              localDate,
              locale,
              contentVersion: copy.contentVersion,
              titleSnapshot: copy.title,
              messageSnapshot: copy.message,
            },
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: when,
            channelId: KNOWLEDGE_CHANNEL_ID,
          },
        });
        await upsertNotificationPlan({
          localDate,
          tipId: assignment.tipId,
          locale,
          contentVersion: copy.contentVersion,
          titleSnapshot: copy.title,
          messageSnapshot: copy.message,
          scheduledFor: when.toISOString(),
          notificationIdentifier: identifier,
          status: 'scheduled',
        });
      } catch (error) {
        console.warn('Günlük bilgi bildirimi planlanamadı:', error);
        const previous = planByDate.get(localDate);
        if (previous) {
          await upsertNotificationPlan({ ...previous, status: 'cancelled', notificationIdentifier: null });
        }
      }
    }
  }

  const pendingLimit = Platform.OS === 'ios' ? IOS_PENDING_LIMIT : ANDROID_PENDING_LIMIT;
  void pendingLimit;
}

async function runSync(): Promise<void> {
  if (!Notifications) return;
  try {
    const permission = await Notifications.getPermissionsAsync();
    if (!permission.granted) return;
    const settings = await getSettings();
    const locale = resolveAppLocale(settings.languagePreference, getSystemLanguageTags());
    await ensureChannels(locale);
    const now = new Date();
    const maintenanceCount = await syncMaintenance(now);
    await syncKnowledge(now, maintenanceCount);
  } catch (error) {
    console.warn('Bildirimler planlanamadı:', error);
  }
}

export async function syncAllNotifications(): Promise<void> {
  if (!Notifications) return;
  if (syncRunning) {
    syncQueued = true;
    return;
  }
  syncRunning = true;
  try {
    do {
      syncQueued = false;
      await runSync();
    } while (syncQueued);
  } finally {
    syncRunning = false;
  }
}

export async function cancelAllNotifications(): Promise<void> {
  if (!Notifications) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/** Geliştirici: kısa gecikmeli günlük bilgi bildirimi. Son kullanıcıya her açılışta atılmaz. */
export async function scheduleDevKnowledgePreview(delayMs = 8000): Promise<boolean> {
  if (!Notifications || !__DEV__) return false;
  const granted = await requestPermission();
  if (!granted) return false;
  const settings = await getSettings();
  const locale = resolveAppLocale(settings.languagePreference, getSystemLanguageTags());
  const today = todayISO();
  const startDate = await ensureKnowledgeCycleStart(today);
  const assignment = await getOrAssignTipForDate(today, startDate, KNOWLEDGE_CATALOG_VERSION);
  const copy = getLocalizedTip(assignment.tipId, locale);
  await ensureChannels(locale);
  const when = new Date(Date.now() + delayMs);
  await Notifications.scheduleNotificationAsync({
    identifier: 'fixhear.knowledge.dev-preview',
    content: {
      title: copy.title,
      body: copy.message,
      data: {
        type: KNOWLEDGE_NOTIFICATION_TYPE,
        tipId: assignment.tipId,
        localDate: today,
        locale,
        contentVersion: copy.contentVersion,
        titleSnapshot: copy.title,
        messageSnapshot: copy.message,
      },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: when,
      channelId: KNOWLEDGE_CHANNEL_ID,
    },
  });
  return true;
}
