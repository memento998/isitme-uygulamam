/** Uygulamanın veri modeli tipleri. Tüm tarihler ISO (YYYY-MM-DD) biçimindedir. */

export type EarSide = 'left' | 'right' | 'both';
export type PowerType = 'battery' | 'rechargeable';
export type CheckupStatus = 'pending' | 'completed' | 'overdue';

export interface Device {
  id: string;
  name: string;
  brand: string;
  model: string;
  earSide: EarSide;
  startDate: string;
  serialNumber: string | null;
  warrantyEndDate: string | null;
  powerType: PowerType;
  clinicName: string | null;
  clinicPhone: string | null;
  notes: string | null;
  photoUri: string | null;
  remindersEnabled: boolean;
  createdAt: string;
}

export interface Checkup {
  id: string;
  deviceId: string;
  title: string;
  dueDate: string;
  completedAt: string | null;
  note: string | null;
  createdAt: string;
}

export type MaintenanceType =
  | 'battery'
  | 'charge'
  | 'filter'
  | 'tube'
  | 'dome'
  | 'cleaning'
  | 'clinic'
  | 'warranty';

export interface MaintenanceReminder {
  id: string;
  deviceId: string;
  type: MaintenanceType;
  enabled: boolean;
  intervalDays: number;
  lastDoneAt: string | null;
  createdAt: string;
}

export interface MaintenanceLog {
  id: string;
  deviceId: string;
  type: MaintenanceType;
  doneAt: string;
  note: string | null;
}

export interface ServiceRecord {
  id: string;
  deviceId: string;
  date: string;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface AppSettings {
  /** Bildirimlerin gönderileceği saat (0-23). */
  notificationHour: number;
  /** Bildirimlerin gönderileceği dakika (0-59). */
  notificationMinute: number;
}

export const EAR_SIDE_LABELS: Record<EarSide, string> = {
  left: 'Sol kulak',
  right: 'Sağ kulak',
  both: 'İki kulak',
};

export const POWER_TYPE_LABELS: Record<PowerType, string> = {
  battery: 'Pilli',
  rechargeable: 'Şarjlı',
};

export const MAINTENANCE_TYPE_LABELS: Record<MaintenanceType, string> = {
  battery: 'Pil değiştirme',
  charge: 'Şarj kontrolü',
  filter: 'Filtre değiştirme',
  tube: 'Hortum kontrolü',
  dome: 'Kubbe kontrolü',
  cleaning: 'Cihaz temizliği',
  clinic: 'Klinik kontrolü',
  warranty: 'Garanti bitişi',
};

export const CHECKUP_STATUS_LABELS: Record<CheckupStatus, string> = {
  pending: 'Bekliyor',
  completed: 'Tamamlandı',
  overdue: 'Gecikti',
};
