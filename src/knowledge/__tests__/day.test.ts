import { ACTIVE_TIP_IDS } from '../catalog';
import {
  calendarDaysBetween,
  tipIdForCalendarDay,
  tipIndexForCalendarDay,
} from '../day';
import {
  firstSchedulableKnowledgeDate,
  knowledgeDatesInWindow,
  knowledgeWindowDays,
  parseKnowledgePayload,
  shouldKeepScheduledKnowledge,
} from '@/services/knowledgeNotifications';
import { interpretKnowledgePayload } from '@/services/knowledgeOpen';

describe('calendar day selection', () => {
  test('uses civil Y/M/D difference, not local timestamp / 86400000', () => {
    expect(calendarDaysBetween('2026-03-28', '2026-03-30')).toBe(2);
    expect(calendarDaysBetween('2026-10-24', '2026-10-26')).toBe(2);
    expect(calendarDaysBetween('2026-12-31', '2027-01-02')).toBe(2);
    expect(calendarDaysBetween('2024-02-28', '2024-03-01')).toBe(2);
    expect(calendarDaysBetween('2026-07-13', '2026-07-13')).toBe(0);
    expect(calendarDaysBetween('2026-07-20', '2026-07-13')).toBe(-7);
  });

  test('cycles through 49 ids in catalog order, not numeric id index', () => {
    expect(tipIndexForCalendarDay('2026-01-01', '2026-01-01')).toBe(0);
    expect(tipIdForCalendarDay('2026-01-01', '2026-01-01')).toBe('fh_tip_001');
    expect(tipIdForCalendarDay('2026-01-01', '2026-01-10')).toBe('fh_tip_011');
    expect(tipIdForCalendarDay('2026-01-01', '2026-02-19')).toBe(ACTIVE_TIP_IDS[0]);
    expect(tipIdForCalendarDay('2026-01-01', '2026-01-11')).not.toBe('fh_tip_010');
  });

  test('language or reread does not change the date index', () => {
    const first = tipIdForCalendarDay('2026-09-01', '2026-09-17');
    const second = tipIdForCalendarDay('2026-09-01', '2026-09-17');
    expect(first).toBe(second);
    expect(ACTIVE_TIP_IDS).toContain(first);
  });
});

describe('knowledge notification planning helpers', () => {
  test('does not schedule today after the chosen time', () => {
    const now = new Date(2026, 8, 17, 11, 0, 0);
    expect(firstSchedulableKnowledgeDate('2026-09-17', 10, 0, now)).toBe('2026-09-18');
    const morning = new Date(2026, 8, 17, 9, 0, 0);
    expect(firstSchedulableKnowledgeDate('2026-09-17', 10, 0, morning)).toBe('2026-09-17');
  });

  test('window shrinks around iOS pending limit and never steals maintenance slots', () => {
    expect(knowledgeWindowDays('ios', 60)).toBe(4);
    expect(knowledgeWindowDays('ios', 64)).toBe(4);
    expect(knowledgeWindowDays('android', 60)).toBe(30);
    expect(knowledgeDatesInWindow('2026-09-18', 3)).toEqual([
      '2026-09-18',
      '2026-09-19',
      '2026-09-20',
    ]);
  });

  test('payload validation rejects arbitrary routes and keeps snapshots', () => {
    expect(parseKnowledgePayload({ type: 'checkup', route: '/evil' })).toBeNull();
    const payload = parseKnowledgePayload({
      type: 'daily_knowledge',
      tipId: 'fh_tip_001',
      localDate: '2026-09-10',
      locale: 'tr',
      contentVersion: 1,
      titleSnapshot: 'Eski başlık',
      messageSnapshot: 'Eski mesaj',
    });
    expect(payload?.titleSnapshot).toBe('Eski başlık');
    expect(interpretKnowledgePayload(payload!, '2026-09-17').kind).toBe('snapshot');
    expect(
      interpretKnowledgePayload(
        { ...payload!, localDate: '2026-09-17' },
        '2026-09-17'
      ).kind
    ).toBe('today');
    expect(
      interpretKnowledgePayload({ ...payload!, tipId: 'fh_tip_010' }, '2026-09-17').kind
    ).toBe('retired');
  });

  test('keeps an existing plan only when locale/tip/version/text match', () => {
    expect(
      shouldKeepScheduledKnowledge({
        existingLocale: 'tr',
        existingTipId: 'fh_tip_001',
        existingVersion: 1,
        existingTitle: 'A',
        existingBody: 'B',
        desiredLocale: 'tr',
        desiredTipId: 'fh_tip_001',
        desiredVersion: 1,
        desiredTitle: 'A',
        desiredBody: 'B',
      })
    ).toBe(true);
    expect(
      shouldKeepScheduledKnowledge({
        existingLocale: 'tr',
        existingTipId: 'fh_tip_001',
        existingVersion: 1,
        existingTitle: 'A',
        existingBody: 'B',
        desiredLocale: 'en',
        desiredTipId: 'fh_tip_001',
        desiredVersion: 1,
        desiredTitle: 'A',
        desiredBody: 'B',
      })
    ).toBe(false);
  });
});
