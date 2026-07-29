/**
 * Cihaz özet raporu: HTML üretilir, expo-print ile PDF'e çevrilip paylaşılır.
 * Web'de tarayıcının yazdırma penceresi açılır (PDF olarak kaydedilebilir).
 */
import { Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import type {
  Checkup,
  Device,
  MaintenanceLog,
  ServiceRecord,
} from '@/types/models';
import {
  CHECKUP_STATUS_LABELS,
  EAR_SIDE_LABELS,
  MAINTENANCE_TYPE_LABELS,
  POWER_TYPE_LABELS,
} from '@/types/models';
import { getCheckupStatus } from './checkupStatus';
import { formatDate, todayISO } from './date';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function row(label: string, value: string | null): string {
  if (!value) return '';
  return `<tr><td class="label">${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`;
}

export function buildDeviceReportHtml(
  device: Device,
  checkups: readonly Checkup[],
  logs: readonly MaintenanceLog[],
  records: readonly ServiceRecord[]
): string {
  const today = todayISO();

  const checkupRows = checkups
    .map((c) => {
      const status = getCheckupStatus(c, today);
      return `<tr>
        <td>${escapeHtml(c.title)}</td>
        <td>${formatDate(c.dueDate)}</td>
        <td>${CHECKUP_STATUS_LABELS[status]}</td>
        <td>${c.completedAt ? formatDate(c.completedAt) : '-'}</td>
        <td>${c.note ? escapeHtml(c.note) : '-'}</td>
      </tr>`;
    })
    .join('');

  const logRows = logs
    .map(
      (l) => `<tr>
        <td>${MAINTENANCE_TYPE_LABELS[l.type]}</td>
        <td>${formatDate(l.doneAt)}</td>
        <td>${l.note ? escapeHtml(l.note) : '-'}</td>
      </tr>`
    )
    .join('');

  const recordRows = records
    .map(
      (r) => `<tr>
        <td>${formatDate(r.date)}</td>
        <td>${escapeHtml(r.title)}</td>
        <td>${r.description ? escapeHtml(r.description) : '-'}</td>
      </tr>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<style>
  body { font-family: -apple-system, Roboto, 'Segoe UI', sans-serif; color: #12293E; padding: 24px; }
  h1 { color: #1774CF; font-size: 22px; margin-bottom: 4px; }
  h2 { color: #1774CF; font-size: 16px; margin-top: 24px; border-bottom: 2px solid #E3F1FC; padding-bottom: 4px; }
  .subtitle { color: #51687C; font-size: 12px; margin-bottom: 16px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  td, th { border: 1px solid #DCE8F2; padding: 6px 8px; text-align: left; vertical-align: top; }
  th { background: #E3F1FC; }
  td.label { font-weight: 600; width: 40%; background: #F4F9FD; }
  .empty { color: #51687C; font-size: 12px; }
  .disclaimer { margin-top: 24px; font-size: 10px; color: #51687C; border-top: 1px solid #DCE8F2; padding-top: 8px; }
</style>
</head>
<body>
  <h1>${escapeHtml(device.name)} — Cihaz Özet Raporu</h1>
  <p class="subtitle">Oluşturulma tarihi: ${formatDate(today)} · İşitme Takip uygulaması</p>

  <h2>Cihaz Bilgileri</h2>
  <table>
    ${row('Cihaz adı', device.name)}
    ${row('Marka / Model', `${device.brand} ${device.model}`)}
    ${row('Kulak', EAR_SIDE_LABELS[device.earSide])}
    ${row('Kullanım başlangıcı', formatDate(device.startDate))}
    ${row('Seri numarası', device.serialNumber)}
    ${row('Garanti bitişi', device.warrantyEndDate ? formatDate(device.warrantyEndDate) : null)}
    ${row('Güç tipi', POWER_TYPE_LABELS[device.powerType])}
    ${row('Doktor / Klinik', device.clinicName)}
    ${row('Telefon', device.clinicPhone)}
    ${row('Notlar', device.notes)}
  </table>

  <h2>Kontrol Geçmişi</h2>
  ${
    checkupRows
      ? `<table><tr><th>Kontrol</th><th>Planlanan</th><th>Durum</th><th>Tamamlanma</th><th>Not</th></tr>${checkupRows}</table>`
      : '<p class="empty">Kayıtlı kontrol yok.</p>'
  }

  <h2>Bakım Geçmişi</h2>
  ${
    logRows
      ? `<table><tr><th>İşlem</th><th>Tarih</th><th>Not</th></tr>${logRows}</table>`
      : '<p class="empty">Kayıtlı bakım işlemi yok.</p>'
  }

  <h2>Servis Kayıtları</h2>
  ${
    recordRows
      ? `<table><tr><th>Tarih</th><th>İşlem</th><th>Açıklama</th></tr>${recordRows}</table>`
      : '<p class="empty">Kayıtlı servis işlemi yok.</p>'
  }

  <p class="disclaimer">
    Bu rapor İşitme Takip uygulaması tarafından kullanıcının girdiği verilerle oluşturulmuştur.
    Tıbbi tavsiye niteliği taşımaz; işitme uzmanınızın değerlendirmesinin yerini tutmaz.
  </p>
</body>
</html>`;
}

/** Raporu PDF olarak oluşturur ve paylaşır (web'de yazdırma penceresi açar). */
export async function shareDeviceReport(
  device: Device,
  checkups: readonly Checkup[],
  logs: readonly MaintenanceLog[],
  records: readonly ServiceRecord[]
): Promise<void> {
  const html = buildDeviceReportHtml(device, checkups, logs, records);

  if (Platform.OS === 'web') {
    await Print.printAsync({ html });
    return;
  }

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: `${device.name} raporu`,
    UTI: 'com.adobe.pdf',
  });
}
