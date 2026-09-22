import type { KnowledgeAudience, KnowledgeCategoryId } from './types';
import type { UiMessages } from '@/i18n/messages/types';

const CATEGORY_MESSAGE_KEY: Record<KnowledgeCategoryId, keyof UiMessages['knowledge']['categories']> =
  {
    device_basics: 'deviceIntro',
    cleaning: 'cleaning',
    parts: 'filtersAndParts',
    battery_safety: 'batteryAndSafety',
    charging: 'charging',
    moisture_storage: 'moistureAndStorage',
    troubleshooting: 'troubleshooting',
    daily_life: 'dailyLife',
    followup_awareness: 'usageAndCheck',
  };

export const KNOWLEDGE_CATEGORY_ORDER: KnowledgeCategoryId[] = [
  'device_basics',
  'cleaning',
  'parts',
  'battery_safety',
  'charging',
  'moisture_storage',
  'troubleshooting',
  'daily_life',
  'followup_awareness',
];

export function categoryLabel(id: KnowledgeCategoryId, messages: UiMessages): string {
  return messages.knowledge.categories[CATEGORY_MESSAGE_KEY[id]];
}

export function audienceLabel(id: KnowledgeAudience, messages: UiMessages): string {
  return messages.knowledge.audience[id];
}
