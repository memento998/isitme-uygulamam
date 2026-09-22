/**
 * Cihaz özet raporu: HTML üretilir, expo-print ile PDF'e çevrilip paylaşılır.
 * Web'de tarayıcının yazdırma penceresi açılır (PDF olarak kaydedilebilir).
 */
import { Platform } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import { OTHER_BRAND } from '@/constants/brands';
import { interpolate } from '@/i18n/interpolate';
import type { AppLocale } from '@/i18n/locales';
import type { UiMessages } from '@/i18n/messages/types';
import type {
  Checkup,
  Device,
  MaintenanceLog,
  ServiceRecord,
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

function earLabel(device: Device, messages: UiMessages): string {
  if (device.earSide === 'left') return messages.home.earLeft;
  if (device.earSide === 'right') return messages.home.earRight;
  return messages.home.earBoth;
}

function powerLabel(device: Device, messages: UiMessages): string {
  return device.powerType === 'battery'
    ? messages.home.powerBattery
    : messages.home.powerRechargeable;
}

function brandLabel(brand: string, messages: UiMessages): string {
  return brand === OTHER_BRAND ? messages.brand.otherBrand : brand;
}

export function buildDeviceReportHtml(
  device: Device,
  checkups: readonly Checkup[],
  logs: readonly MaintenanceLog[],
  records: readonly ServiceRecord[],
  messages: UiMessages,
  locale: AppLocale
): string {
  const today = todayISO();
  const pdf = messages.pdf;

  const checkupRows = checkups
    .map((c) => {
      const status = getCheckupStatus(c, today);
      return `<tr>
        <td>${escapeHtml(c.title)}</td>
        <td>${formatDate(c.dueDate)}</td>
        <td>${escapeHtml(messages.checkupStatus[status])}</td>
        <td>${c.completedAt ? formatDate(c.completedAt) : '-'}</td>
        <td>${c.note ? escapeHtml(c.note) : '-'}</td>
      </tr>`;
    })
    .join('');

  const logRows = logs
    .map(
      (l) => `<tr>
        <td>${escapeHtml(messages.maintenance[l.type])}</td>
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
<html lang="${escapeHtml(locale)}">
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
  <h1>${escapeHtml(interpolate(pdf.reportTitle, { name: device.name }))}</h1>
  <p class="subtitle">${escapeHtml(
    interpolate(pdf.createdAt, { date: formatDate(today), app: pdf.appName })
  )}</p>

  <h2>${escapeHtml(pdf.deviceInfo)}</h2>
  <table>
    ${row(pdf.deviceName, device.name)}
    ${row(pdf.brand, brandLabel(device.brand, messages))}
    ${row(pdf.ear, earLabel(device, messages))}
    ${row(pdf.start, formatDate(device.startDate))}
    ${row(pdf.serial, device.serialNumber)}
    ${row(pdf.warranty, device.warrantyEndDate ? formatDate(device.warrantyEndDate) : null)}
    ${row(pdf.power, powerLabel(device, messages))}
    ${row(pdf.clinic, device.clinicName)}
    ${row(pdf.phone, device.clinicPhone)}
    ${row(pdf.notes, device.notes)}
  </table>

  <h2>${escapeHtml(pdf.checkupHistory)}</h2>
  ${
    checkupRows
      ? `<table><tr><th>${escapeHtml(pdf.checkup)}</th><th>${escapeHtml(pdf.planned)}</th><th>${escapeHtml(pdf.status)}</th><th>${escapeHtml(pdf.completedAt)}</th><th>${escapeHtml(pdf.note)}</th></tr>${checkupRows}</table>`
      : `<p class="empty">${escapeHtml(pdf.noCheckups)}</p>`
  }

  <h2>${escapeHtml(pdf.maintenanceHistory)}</h2>
  ${
    logRows
      ? `<table><tr><th>${escapeHtml(pdf.action)}</th><th>${escapeHtml(pdf.date)}</th><th>${escapeHtml(pdf.note)}</th></tr>${logRows}</table>`
      : `<p class="empty">${escapeHtml(pdf.noMaintenance)}</p>`
  }

  <h2>${escapeHtml(pdf.serviceRecords)}</h2>
  ${
    recordRows
      ? `<table><tr><th>${escapeHtml(pdf.date)}</th><th>${escapeHtml(pdf.action)}</th><th>${escapeHtml(pdf.description)}</th></tr>${recordRows}</table>`
      : `<p class="empty">${escapeHtml(pdf.noService)}</p>`
  }

  <p class="disclaimer">
    ${escapeHtml(pdf.disclaimer)}
  </p>
</body>
</html>`;
}

/** Raporu PDF olarak oluşturur ve paylaşır (web'de yazdırma penceresi açar). */
export async function shareDeviceReport(
  device: Device,
  checkups: readonly Checkup[],
  logs: readonly MaintenanceLog[],
  records: readonly ServiceRecord[],
  messages: UiMessages,
  locale: AppLocale
): Promise<void> {
  const html = buildDeviceReportHtml(device, checkups, logs, records, messages, locale);

  if (Platform.OS === 'web') {
    await Print.printAsync({ html });
    return;
  }

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri, {
    mimeType: 'application/pdf',
    dialogTitle: interpolate(messages.pdf.shareTitle, { name: device.name }),
    UTI: 'com.adobe.pdf',
  });
}
