import { getUiMessages } from '@/i18n/messages';
import type { Checkup, Device, MaintenanceLog, ServiceRecord } from '@/types/models';

import { buildDeviceReportHtml } from '../pdf';

const device: Device = {
  id: 'd1',
  name: 'Ada cihazı',
  brand: 'Diğer',
  model: '',
  earSide: 'left',
  startDate: '2026-01-15',
  serialNumber: 'SN-1',
  warrantyEndDate: null,
  powerType: 'battery',
  clinicName: null,
  clinicPhone: null,
  notes: 'user note stays',
  photoUri: null,
  remindersEnabled: true,
  createdAt: '2026-01-15',
};

const checkups: Checkup[] = [
  {
    id: 'c1',
    deviceId: 'd1',
    title: '1. ay kontrolü',
    dueDate: '2099-02-15',
    completedAt: null,
    note: 'clinic note',
    createdAt: '2026-01-15',
  },
];

const logs: MaintenanceLog[] = [
  {
    id: 'l1',
    deviceId: 'd1',
    type: 'battery',
    doneAt: '2026-01-20',
    note: 'changed pack',
  },
];

const records: ServiceRecord[] = [];

describe('device PDF report i18n', () => {
  test('uses locale lang and translated chrome, keeps user content', () => {
    const messages = getUiMessages('en');
    const html = buildDeviceReportHtml(device, checkups, logs, records, messages, 'en');

    expect(html).toContain('<html lang="en">');
    expect(html).toContain('Ada cihazı — Device summary report');
    expect(html).toContain('Other');
    expect(html).toContain('Left ear');
    expect(html).toContain('Battery');
    expect(html).toContain('Pending');
    expect(html).toContain('Battery change');
    expect(html).toContain('1. ay kontrolü');
    expect(html).toContain('user note stays');
    expect(html).toContain('clinic note');
    expect(html).toContain('changed pack');
    expect(html).not.toContain('Cihaz Özet Raporu');
    expect(html).not.toContain('>Diğer<');
  });
});
