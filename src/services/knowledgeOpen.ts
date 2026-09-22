import { isRemovedTipId } from '@/knowledge/catalog';
import { isValidISODate, todayISO } from '@/services/date';
import {
  parseKnowledgePayload,
  type KnowledgeNotificationPayload,
} from '@/services/knowledgeNotifications';

export type OpenedKnowledge =
  | {
      kind: 'today';
      payload: KnowledgeNotificationPayload;
      highlight: boolean;
    }
  | {
      kind: 'snapshot';
      payload: KnowledgeNotificationPayload;
    }
  | {
      kind: 'retired';
      payload: KnowledgeNotificationPayload;
    }
  | {
      kind: 'invalid';
    };

const processedIds = new Set<string>();
let pending: OpenedKnowledge | null = null;
const listeners = new Set<(next: OpenedKnowledge | null) => void>();

function emit(): void {
  for (const listener of listeners) listener(pending);
}

export function subscribeKnowledgeOpen(listener: (next: OpenedKnowledge | null) => void): () => void {
  listeners.add(listener);
  listener(pending);
  return () => {
    listeners.delete(listener);
  };
}

export function consumeKnowledgeOpen(): OpenedKnowledge | null {
  const current = pending;
  pending = null;
  emit();
  return current;
}

export function peekKnowledgeOpen(): OpenedKnowledge | null {
  return pending;
}

export function interpretKnowledgePayload(
  payload: KnowledgeNotificationPayload,
  todayIso: string = todayISO()
): OpenedKnowledge {
  if (isRemovedTipId(payload.tipId)) {
    return { kind: 'retired', payload };
  }
  if (!isValidISODate(payload.localDate)) {
    return { kind: 'invalid' };
  }
  if (payload.localDate === todayIso) {
    return { kind: 'today', payload, highlight: true };
  }
  return { kind: 'snapshot', payload };
}

export function enqueueNotificationResponse(input: {
  identifier?: string | null;
  data?: unknown;
}): boolean {
  const id = input.identifier ?? JSON.stringify(input.data ?? {});
  if (!id || processedIds.has(id)) return false;
  const payload = parseKnowledgePayload(input.data);
  if (!payload) return false;
  processedIds.add(id);
  pending = interpretKnowledgePayload(payload);
  emit();
  return true;
}

export function clearKnowledgeOpen(): void {
  pending = null;
  emit();
}
