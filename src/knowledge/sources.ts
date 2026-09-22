import type { KnowledgeSource } from './types';

export const SOURCE_RECORDS = {
  S01: {
    id: 'S01',
    organization: 'NIDCD',
    title: 'Hearing Aids',
    urls: ['https://www.nidcd.nih.gov/health/hearing-aids'],
  },
  S02: {
    id: 'S02',
    organization: 'NHS',
    title: 'Hearing aids and implants',
    urls: ['https://www.nhs.uk/tests-and-treatments/hearing-aids-and-implants/'],
  },
  S03: {
    id: 'S03',
    organization: 'Sherwood Forest Hospitals NHS',
    title: 'Hearing aid and fitting information',
    urls: [
      'https://www.sfh-tr.nhs.uk/services/audiology-adults/hearing-aids/hearing-aid-and-fitting-information/',
    ],
  },
  S04: {
    id: 'S04',
    organization: 'Oticon',
    title: 'Why is the battery level in the Oticon Companion app inaccurate?',
    urls: [
      'https://www.oticon.com/support/troubleshooting/oticon-app/why-is-the-battery-level-in-the-app-inaccurate',
    ],
  },
  S05: {
    id: 'S05',
    organization: 'Oticon',
    title: 'How to take good care of your hearing aids',
    urls: [
      'https://www.oticon.com/en-us/support/care-and-cleaning/basic-hearing-aid-use/how-to-take-good-care-of-hearing-aids',
    ],
  },
  S06: {
    id: 'S06',
    organization: 'Oticon',
    title: 'How to clean your hearing aids',
    urls: [
      'https://www.oticon.com/support/care-and-cleaning/basic-hearing-aid-use/how-to-clean-hearing-aids',
    ],
  },
  S08: {
    id: 'S08',
    organization: 'Phonak',
    title: 'How to clean rechargeable Phonak Audéo hearing aids',
    urls: [
      'https://www.phonak.com/en-ca/support/knowledge-base/articles/how-to-clean-rechargeable-phonak-audeo-hearing-aids',
    ],
  },
  S09: {
    id: 'S09',
    organization: 'Leeds Teaching Hospitals NHS',
    title: 'Common faults with hearing aids',
    urls: [
      'https://www.leedsth.nhs.uk/services/hearing-and-balance-service-audiology/common-faults-with-hearing-aids/',
    ],
  },
  S12: {
    id: 'S12',
    organization: 'Oticon',
    title: 'Cleaning your hearing aids and changing batteries',
    urls: [
      'https://www.oticon.ca/hearing-loss/blog/cleaning-your-hearing-aids-and-changing-batteries',
    ],
  },
  S13: {
    id: 'S13',
    organization: 'Leeds Teaching Hospitals NHS',
    title: 'Hearing Aid Battery Safety Information',
    urls: [
      'https://www.leedsth.nhs.uk/patients/resources/hearing-aid-battery-safety-information/',
    ],
  },
  S15: {
    id: 'S15',
    organization: 'Phonak',
    title: 'Why is my Phonak charger not working?',
    urls: [
      'https://www.phonak.com/en-uk/support/knowledge-base/articles/why-is-my-phonak-charger-not-working',
    ],
  },
  S16: {
    id: 'S16',
    organization: 'Oticon',
    title: 'Problems with sound from your hearing aids',
    urls: [
      'https://www.oticon.com/en-us/support/troubleshooting/hearing-aids/problems-with-sound-from-hearing-aids',
    ],
  },
  S17: {
    id: 'S17',
    organization: 'Hampshire Hospitals NHS',
    title: 'Hearing Aid Troubleshooting Guide',
    urls: [
      'https://www.hampshirehospitals.nhs.uk/our-services/az-departments-and-specialties/audiology-1/adult-services/hearing-aid-troubleshooting-guide',
    ],
  },
  S18: {
    id: 'S18',
    organization: 'Worcestershire Acute Hospitals NHS',
    title: 'How to speak to someone with a hearing aid',
    urls: [
      'https://www.worcsacute.nhs.uk/audiology/how-to-speak-to-someone-with-a-hearing-aid/',
    ],
  },
  S19: {
    id: 'S19',
    organization: 'South Tees Hospitals NHS',
    title: 'Communication tactics',
    urls: ['https://www.southtees.nhs.uk/resources/communication-tactics-3/'],
  },
  S20: {
    id: 'S20',
    organization: 'Gloucestershire Hospitals NHS',
    title: 'Adult Hearing Services – Communication Tips',
    urls: [
      'https://www.gloshospitals.nhs.uk/your-visit/patient-information-leaflets/adult-hearing-services-communication-tips/',
    ],
  },
  S23: {
    id: 'S23',
    organization: 'NICE',
    title: 'NG98 Recommendations 1.7',
    urls: ['https://www.nice.org.uk/guidance/NG98/chapter/recommendations'],
  },
  S24: {
    id: 'S24',
    organization: 'NIDCD',
    title: 'Balance Disorders and Tinnitus',
    urls: [
      'https://www.nidcd.nih.gov/health/balance-disorders',
      'https://www.nidcd.nih.gov/health/tinnitus',
    ],
  },
  S25: {
    id: 'S25',
    organization: 'Aile ve Sosyal Hizmetler Bakanlığı',
    title:
      'Ismarlama Protez ve Ortez Merkezleri ile İşitme Cihazı Merkezleri Hakkında Yönetmelik',
    urls: [
      'https://www.aile.gov.tr/eyhgm/mevzuat/ulusal-mevzuat/yonetmelikler/ismarlama-protez-ve-ortez-merkezleri-ile-isitme-cihazi-merkezleri-hakkinda-yonetmelik/',
    ],
  },
  S26: {
    id: 'S26',
    organization: 'NIDCD',
    title: 'Auditory Neuropathy',
    urls: ['https://www.nidcd.nih.gov/health/auditory-neuropathy'],
  },
  S27: {
    id: 'S27',
    organization: 'Yalova İl Sağlık Müdürlüğü',
    title: 'İşitme cihazları – merkezleri',
    urls: ['https://yalovaism.saglik.gov.tr/TR-355285/isitme-cihazlari--merkezleri.html'],
  },
} as const satisfies Record<string, KnowledgeSource>;

export type KnowledgeSourceId = keyof typeof SOURCE_RECORDS;

export function getSource(id: KnowledgeSourceId): KnowledgeSource {
  return SOURCE_RECORDS[id];
}

export function getSourcesByIds(ids: readonly string[]): KnowledgeSource[] {
  const sources: KnowledgeSource[] = [];
  for (const id of ids) {
    if (id in SOURCE_RECORDS) {
      sources.push(SOURCE_RECORDS[id as KnowledgeSourceId]);
    }
  }
  return sources;
}
