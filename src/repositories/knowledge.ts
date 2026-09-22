import { getDb } from '@/db/database';
import type { AppLocale } from '@/i18n/locales';
import { isActiveTipId } from '@/knowledge/catalog';
import { tipIdForCalendarDay } from '@/knowledge/day';
import type { KnowledgeTipId } from '@/knowledge/types';

export interface KnowledgeDayAssignment {
  localDate: string;
  tipId: KnowledgeTipId;
  contentVersion: number;
}

export type KnowledgePlanStatus = 'scheduled' | 'cancelled';

export interface KnowledgeNotificationPlan {
  localDate: string;
  tipId: string;
  locale: string;
  contentVersion: number;
  titleSnapshot: string;
  messageSnapshot: string;
  scheduledFor: string;
  notificationIdentifier: string | null;
  status: KnowledgePlanStatus;
}

/**
 * Planlanan tarih için kalıcı tipId. Katalog güncellense bile aynı günün kimliği değişmez.
 */
export async function getOrAssignTipForDate(
  localDate: string,
  startDate: string,
  catalogContentVersion: number
): Promise<KnowledgeDayAssignment> {
  const db = await getDb();
  const existing = await db.getFirstAsync<{
    local_date: string;
    tip_id: string;
    content_version: number;
  }>('SELECT local_date, tip_id, content_version FROM knowledge_day_assignments WHERE local_date = ?', [
    localDate,
  ]);
  if (existing && isActiveTipId(existing.tip_id)) {
    return {
      localDate: existing.local_date,
      tipId: existing.tip_id,
      contentVersion: existing.content_version,
    };
  }
  const tipId = tipIdForCalendarDay(startDate, localDate);
  await db.runAsync(
    'INSERT OR REPLACE INTO knowledge_day_assignments (local_date, tip_id, content_version) VALUES (?, ?, ?)',
    [localDate, tipId, catalogContentVersion]
  );
  return { localDate, tipId, contentVersion: catalogContentVersion };
}

export async function listAssignments(): Promise<KnowledgeDayAssignment[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{
    local_date: string;
    tip_id: string;
    content_version: number;
  }>('SELECT local_date, tip_id, content_version FROM knowledge_day_assignments');
  return rows.flatMap((row) => {
    if (!isActiveTipId(row.tip_id)) return [];
    return [
      {
        localDate: row.local_date,
        tipId: row.tip_id,
        contentVersion: row.content_version,
      },
    ];
  });
}

export async function listNotificationPlans(): Promise<KnowledgeNotificationPlan[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<{
    local_date: string;
    tip_id: string;
    locale: string;
    content_version: number;
    title_snapshot: string;
    message_snapshot: string;
    scheduled_for: string;
    notification_identifier: string | null;
    status: string;
  }>('SELECT * FROM knowledge_notification_plans');
  return rows.map((row) => ({
    localDate: row.local_date,
    tipId: row.tip_id,
    locale: row.locale,
    contentVersion: row.content_version,
    titleSnapshot: row.title_snapshot,
    messageSnapshot: row.message_snapshot,
    scheduledFor: row.scheduled_for,
    notificationIdentifier: row.notification_identifier,
    status: row.status === 'scheduled' ? 'scheduled' : 'cancelled',
  }));
}

export async function upsertNotificationPlan(plan: KnowledgeNotificationPlan): Promise<void> {
  const db = await getDb();
  await db.runAsync(
    `INSERT OR REPLACE INTO knowledge_notification_plans (
      local_date, tip_id, locale, content_version, title_snapshot, message_snapshot,
      scheduled_for, notification_identifier, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      plan.localDate,
      plan.tipId,
      plan.locale,
      plan.contentVersion,
      plan.titleSnapshot,
      plan.messageSnapshot,
      plan.scheduledFor,
      plan.notificationIdentifier,
      plan.status,
    ]
  );
}

export async function markPlansCancelled(localDates: readonly string[]): Promise<void> {
  if (localDates.length === 0) return;
  const db = await getDb();
  for (const localDate of localDates) {
    await db.runAsync(
      `UPDATE knowledge_notification_plans SET status = 'cancelled', notification_identifier = NULL WHERE local_date = ?`,
      [localDate]
    );
  }
}

export function knowledgeIdentifier(localDate: string): string {
  return `fixhear.knowledge.${localDate}`;
}

export function isKnowledgeIdentifier(identifier: string): boolean {
  return identifier.startsWith('fixhear.knowledge.');
}

export type { AppLocale };
