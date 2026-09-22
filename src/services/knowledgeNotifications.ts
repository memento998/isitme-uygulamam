import { isValidISODate } from './date';
import { addLocalDays, dateAtLocalTime } from '@/knowledge/day';
import { isActiveTipId, isRemovedTipId } from '@/knowledge/catalog';
import { isAppLocale } from '@/i18n/locales';

export const KNOWLEDGE_NOTIFICATION_TYPE = 'daily_knowledge';
export const KNOWLEDGE_CHANNEL_ID = 'fixhear_daily_knowledge_v1';
export const KNOWLEDGE_IDENTIFIER_PREFIX = 'fixhear.knowledge.';
export const MAX_KNOWLEDGE_WINDOW_DAYS = 30;
export const MAINTENANCE_SCHEDULE_LIMIT = 60;
export const IOS_PENDING_LIMIT = 64;
export const ANDROID_PENDING_LIMIT = 500;

export interface KnowledgeNotificationPayload {
  type: typeof KNOWLEDGE_NOTIFICATION_TYPE;
  tipId: string;
  localDate: string;
  locale: string;
  contentVersion: number;
  titleSnapshot: string;
  messageSnapshot: string;
}

export function knowledgeNotificationIdentifier(localDate: string): string {
  return `${KNOWLEDGE_IDENTIFIER_PREFIX}${localDate}`;
}

export function isKnowledgeNotificationIdentifier(identifier: string | undefined): boolean {
  return Boolean(identifier?.startsWith(KNOWLEDGE_IDENTIFIER_PREFIX));
}

export function knowledgeWindowDays(platform: 'ios' | 'android' | 'web', maintenanceCount: number): number {
  if (platform === 'web') return 0;
  const pendingLimit = platform === 'ios' ? IOS_PENDING_LIMIT : ANDROID_PENDING_LIMIT;
  const remaining = pendingLimit - Math.min(maintenanceCount, MAINTENANCE_SCHEDULE_LIMIT);
  return Math.max(0, Math.min(MAX_KNOWLEDGE_WINDOW_DAYS, remaining));
}

/**
 * If today's send time has passed, start from tomorrow. Same-day time change
 * never creates a second notification for today after the original time.
 */
export function firstSchedulableKnowledgeDate(
  todayIso: string,
  hour: number,
  minute: number,
  now: Date
): string | null {
  const todayAt = dateAtLocalTime(todayIso, hour, minute);
  if (todayAt.getTime() > now.getTime()) return todayIso;
  return addLocalDays(todayIso, 1);
}

export function knowledgeDatesInWindow(
  startIso: string,
  windowDays: number
): string[] {
  if (windowDays <= 0) return [];
  const dates: string[] = [];
  for (let i = 0; i < windowDays; i += 1) {
    dates.push(addLocalDays(startIso, i));
  }
  return dates;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export function parseKnowledgePayload(data: unknown): KnowledgeNotificationPayload | null {
  if (!isRecord(data)) return null;
  if (data.type !== KNOWLEDGE_NOTIFICATION_TYPE) return null;
  if (typeof data.tipId !== 'string' || data.tipId.length === 0) return null;
  if (typeof data.localDate !== 'string' || !isValidISODate(data.localDate)) return null;
  if (typeof data.locale !== 'string' || !isAppLocale(data.locale)) return null;
  if (typeof data.contentVersion !== 'number' || !Number.isFinite(data.contentVersion)) return null;
  if (typeof data.titleSnapshot !== 'string' || typeof data.messageSnapshot !== 'string') return null;
  return {
    type: KNOWLEDGE_NOTIFICATION_TYPE,
    tipId: data.tipId,
    localDate: data.localDate,
    locale: data.locale,
    contentVersion: data.contentVersion,
    titleSnapshot: data.titleSnapshot,
    messageSnapshot: data.messageSnapshot,
  };
}

export function isRemovedKnowledgeTip(tipId: string): boolean {
  return isRemovedTipId(tipId);
}

export function isActiveKnowledgeTip(tipId: string): boolean {
  return isActiveTipId(tipId);
}

export function shouldKeepScheduledKnowledge(input: {
  existingLocale: string;
  existingTipId: string;
  existingVersion: number;
  existingTitle: string;
  existingBody: string;
  desiredLocale: string;
  desiredTipId: string;
  desiredVersion: number;
  desiredTitle: string;
  desiredBody: string;
}): boolean {
  return (
    input.existingLocale === input.desiredLocale &&
    input.existingTipId === input.desiredTipId &&
    input.existingVersion === input.desiredVersion &&
    input.existingTitle === input.desiredTitle &&
    input.existingBody === input.desiredBody
  );
}
