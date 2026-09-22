export type KnowledgeCategoryId =
  | 'device_basics'
  | 'cleaning'
  | 'parts'
  | 'battery_safety'
  | 'charging'
  | 'moisture_storage'
  | 'troubleshooting'
  | 'daily_life'
  | 'followup_awareness';

export type KnowledgeAudience =
  | 'ALL'
  | 'BTE_TUBE'
  | 'RIC_RITE'
  | 'ITE'
  | 'REPLACEABLE_BATTERY'
  | 'RECHARGEABLE'
  | 'WAX_FILTER'
  | 'DOME'
  | 'BLUETOOTH';

/** Active daily-tip IDs only. Removed IDs are listed in REMOVED_TIP_IDS. */
export type KnowledgeTipId =
  | 'fh_tip_001'
  | 'fh_tip_002'
  | 'fh_tip_003'
  | 'fh_tip_004'
  | 'fh_tip_005'
  | 'fh_tip_006'
  | 'fh_tip_007'
  | 'fh_tip_008'
  | 'fh_tip_009'
  | 'fh_tip_011'
  | 'fh_tip_014'
  | 'fh_tip_015'
  | 'fh_tip_016'
  | 'fh_tip_019'
  | 'fh_tip_021'
  | 'fh_tip_027'
  | 'fh_tip_028'
  | 'fh_tip_029'
  | 'fh_tip_031'
  | 'fh_tip_032'
  | 'fh_tip_033'
  | 'fh_tip_034'
  | 'fh_tip_035'
  | 'fh_tip_036'
  | 'fh_tip_037'
  | 'fh_tip_038'
  | 'fh_tip_039'
  | 'fh_tip_040'
  | 'fh_tip_041'
  | 'fh_tip_042'
  | 'fh_tip_043'
  | 'fh_tip_045'
  | 'fh_tip_046'
  | 'fh_tip_048'
  | 'fh_tip_051'
  | 'fh_tip_052'
  | 'fh_tip_053'
  | 'fh_tip_054'
  | 'fh_tip_055'
  | 'fh_tip_056'
  | 'fh_tip_061'
  | 'fh_tip_062'
  | 'fh_tip_063'
  | 'fh_tip_064'
  | 'fh_tip_065'
  | 'fh_tip_066'
  | 'fh_tip_067'
  | 'fh_tip_068'
  | 'fh_tip_069';

export type KnowledgeJurisdiction = 'general' | 'TR';

export interface KnowledgeSource {
  id: string;
  organization: string;
  title: string;
  urls: string[];
}

export interface KnowledgeTipMeta {
  id: KnowledgeTipId;
  categoryId: KnowledgeCategoryId;
  audience: KnowledgeAudience;
  sourceIds: string[];
  contentVersion: number;
  jurisdiction: KnowledgeJurisdiction;
}

export interface KnowledgeTipCopy {
  title: string;
  message: string;
  detail: string;
}

export const KNOWLEDGE_CATALOG_VERSION = 1;

export const REMOVED_TIP_IDS = [
  'fh_tip_010',
  'fh_tip_012',
  'fh_tip_013',
  'fh_tip_017',
  'fh_tip_018',
  'fh_tip_020',
  'fh_tip_022',
  'fh_tip_023',
  'fh_tip_024',
  'fh_tip_025',
  'fh_tip_026',
  'fh_tip_030',
  'fh_tip_044',
  'fh_tip_047',
  'fh_tip_049',
  'fh_tip_050',
  'fh_tip_057',
  'fh_tip_058',
  'fh_tip_059',
  'fh_tip_060',
] as const;

export type RemovedTipId = (typeof REMOVED_TIP_IDS)[number];
