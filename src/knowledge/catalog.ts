import {
  REMOVED_TIP_IDS,
  type KnowledgeTipId,
  type KnowledgeTipMeta,
  type RemovedTipId,
} from './types';

/** Active tips in daily rotation order. Gaps in numbering are intentional. */
export const ACTIVE_TIP_IDS = [
  'fh_tip_001',
  'fh_tip_002',
  'fh_tip_003',
  'fh_tip_004',
  'fh_tip_005',
  'fh_tip_006',
  'fh_tip_007',
  'fh_tip_008',
  'fh_tip_009',
  'fh_tip_011',
  'fh_tip_014',
  'fh_tip_015',
  'fh_tip_016',
  'fh_tip_019',
  'fh_tip_021',
  'fh_tip_027',
  'fh_tip_028',
  'fh_tip_029',
  'fh_tip_031',
  'fh_tip_032',
  'fh_tip_033',
  'fh_tip_034',
  'fh_tip_035',
  'fh_tip_036',
  'fh_tip_037',
  'fh_tip_038',
  'fh_tip_039',
  'fh_tip_040',
  'fh_tip_041',
  'fh_tip_042',
  'fh_tip_043',
  'fh_tip_045',
  'fh_tip_046',
  'fh_tip_048',
  'fh_tip_051',
  'fh_tip_052',
  'fh_tip_053',
  'fh_tip_054',
  'fh_tip_055',
  'fh_tip_056',
  'fh_tip_061',
  'fh_tip_062',
  'fh_tip_063',
  'fh_tip_064',
  'fh_tip_065',
  'fh_tip_066',
  'fh_tip_067',
  'fh_tip_068',
  'fh_tip_069',
] as const satisfies readonly KnowledgeTipId[];

type MissingActiveId = Exclude<KnowledgeTipId, (typeof ACTIVE_TIP_IDS)[number]>;
type ExtraActiveId = Exclude<(typeof ACTIVE_TIP_IDS)[number], KnowledgeTipId>;
type AssertActiveIdsComplete = [MissingActiveId] extends [never]
  ? [ExtraActiveId] extends [never]
    ? true
    : never
  : never;
const _assertActiveIdsComplete: AssertActiveIdsComplete = true;
void _assertActiveIdsComplete;

function meta(
  id: KnowledgeTipId,
  categoryId: KnowledgeTipMeta['categoryId'],
  audience: KnowledgeTipMeta['audience'],
  sourceIds: string[],
  jurisdiction: KnowledgeTipMeta['jurisdiction'] = 'general',
): KnowledgeTipMeta {
  return {
    id,
    categoryId,
    audience,
    sourceIds,
    contentVersion: 1,
    jurisdiction,
  };
}

export const TIP_META: Record<KnowledgeTipId, KnowledgeTipMeta> = {
  fh_tip_001: meta('fh_tip_001', 'device_basics', 'ALL', ['S01']),
  fh_tip_002: meta('fh_tip_002', 'device_basics', 'BTE_TUBE', ['S02']),
  fh_tip_003: meta('fh_tip_003', 'device_basics', 'RIC_RITE', ['S02']),
  fh_tip_004: meta('fh_tip_004', 'device_basics', 'ITE', ['S01', 'S06']),
  fh_tip_005: meta('fh_tip_005', 'device_basics', 'ALL', ['S02']),
  fh_tip_006: meta('fh_tip_006', 'device_basics', 'ALL', ['S03']),
  fh_tip_007: meta('fh_tip_007', 'cleaning', 'ALL', ['S04']),
  fh_tip_008: meta('fh_tip_008', 'cleaning', 'ALL', ['S05']),
  fh_tip_009: meta('fh_tip_009', 'cleaning', 'ALL', ['S06']),
  fh_tip_011: meta('fh_tip_011', 'cleaning', 'ALL', ['S06']),
  fh_tip_014: meta('fh_tip_014', 'cleaning', 'ALL', ['S08']),
  fh_tip_015: meta('fh_tip_015', 'cleaning', 'ALL', ['S01']),
  fh_tip_016: meta('fh_tip_016', 'parts', 'WAX_FILTER', ['S08']),
  fh_tip_019: meta('fh_tip_019', 'parts', 'DOME', ['S09']),
  fh_tip_021: meta('fh_tip_021', 'parts', 'BTE_TUBE', ['S09']),
  fh_tip_027: meta('fh_tip_027', 'battery_safety', 'REPLACEABLE_BATTERY', ['S12']),
  fh_tip_028: meta('fh_tip_028', 'battery_safety', 'REPLACEABLE_BATTERY', ['S12']),
  fh_tip_029: meta('fh_tip_029', 'battery_safety', 'ALL', ['S13']),
  fh_tip_031: meta('fh_tip_031', 'battery_safety', 'ALL', ['S13']),
  fh_tip_032: meta('fh_tip_032', 'charging', 'RECHARGEABLE', ['S08']),
  fh_tip_033: meta('fh_tip_033', 'charging', 'RECHARGEABLE', ['S15']),
  fh_tip_034: meta('fh_tip_034', 'charging', 'RECHARGEABLE', ['S15']),
  fh_tip_035: meta('fh_tip_035', 'charging', 'RECHARGEABLE', ['S15']),
  fh_tip_036: meta('fh_tip_036', 'charging', 'RECHARGEABLE', ['S08']),
  fh_tip_037: meta('fh_tip_037', 'charging', 'RECHARGEABLE', ['S15']),
  fh_tip_038: meta('fh_tip_038', 'moisture_storage', 'ALL', ['S05']),
  fh_tip_039: meta('fh_tip_039', 'moisture_storage', 'ALL', ['S05']),
  fh_tip_040: meta('fh_tip_040', 'moisture_storage', 'ALL', ['S05', 'S15']),
  fh_tip_041: meta('fh_tip_041', 'moisture_storage', 'ALL', ['S05']),
  fh_tip_042: meta('fh_tip_042', 'moisture_storage', 'ALL', ['S05']),
  fh_tip_043: meta('fh_tip_043', 'troubleshooting', 'ALL', ['S16']),
  fh_tip_045: meta('fh_tip_045', 'troubleshooting', 'ALL', ['S16']),
  fh_tip_046: meta('fh_tip_046', 'troubleshooting', 'ALL', ['S09']),
  fh_tip_048: meta('fh_tip_048', 'troubleshooting', 'BLUETOOTH', ['S17']),
  fh_tip_051: meta('fh_tip_051', 'daily_life', 'ALL', ['S01']),
  fh_tip_052: meta('fh_tip_052', 'daily_life', 'ALL', ['S18']),
  fh_tip_053: meta('fh_tip_053', 'daily_life', 'ALL', ['S18']),
  fh_tip_054: meta('fh_tip_054', 'daily_life', 'ALL', ['S19']),
  fh_tip_055: meta('fh_tip_055', 'daily_life', 'ALL', ['S20']),
  fh_tip_056: meta('fh_tip_056', 'daily_life', 'ALL', ['S20']),
  fh_tip_061: meta('fh_tip_061', 'followup_awareness', 'ALL', ['S05']),
  fh_tip_062: meta('fh_tip_062', 'followup_awareness', 'ALL', ['S01', 'S02']),
  fh_tip_063: meta('fh_tip_063', 'followup_awareness', 'ALL', ['S03']),
  fh_tip_064: meta('fh_tip_064', 'followup_awareness', 'ALL', ['S02']),
  fh_tip_065: meta('fh_tip_065', 'followup_awareness', 'ALL', ['S23']),
  fh_tip_066: meta('fh_tip_066', 'followup_awareness', 'ALL', ['S03', 'S08']),
  fh_tip_067: meta('fh_tip_067', 'followup_awareness', 'ALL', ['S24']),
  fh_tip_068: meta('fh_tip_068', 'followup_awareness', 'ALL', ['S25', 'S27'], 'TR'),
  fh_tip_069: meta('fh_tip_069', 'followup_awareness', 'ALL', ['S26']),
};

const ACTIVE_TIP_ID_SET: ReadonlySet<string> = new Set(ACTIVE_TIP_IDS);
const REMOVED_TIP_ID_SET: ReadonlySet<string> = new Set(REMOVED_TIP_IDS);

export function getTipMeta(id: KnowledgeTipId): KnowledgeTipMeta {
  return TIP_META[id];
}

export function isActiveTipId(id: string): id is KnowledgeTipId {
  return ACTIVE_TIP_ID_SET.has(id);
}

export function isRemovedTipId(id: string): id is RemovedTipId {
  return REMOVED_TIP_ID_SET.has(id);
}
