import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

import { CheckupFormModal } from '@/components/device/CheckupFormModal';
import { CompleteCheckupModal } from '@/components/device/CompleteCheckupModal';
import { ReminderDoneModal } from '@/components/device/ReminderDoneModal';
import { ReminderFormModal } from '@/components/device/ReminderFormModal';
import { ServiceRecordModal } from '@/components/device/ServiceRecordModal';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { ErrorView, LoadingView } from '@/components/ui/StateViews';
import { colors, fontSize, MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';
import { useAsyncData } from '@/hooks/useAsyncData';
import {
  completeCheckup,
  createCheckup,
  deleteCheckup,
  listCheckupsForDevice,
  reopenCheckup,
  updateCheckup,
} from '@/repositories/checkups';
import { deleteDevice, getDevice } from '@/repositories/devices';
import {
  deleteLog,
  listLogsForDevice,
  listRemindersForDevice,
  markReminderDone,
  nextReminderDate,
  updateReminder,
} from '@/repositories/maintenance';
import {
  createServiceRecord,
  deleteServiceRecord,
  listServiceRecordsForDevice,
} from '@/repositories/serviceRecords';
import { SCHEDULE_DISCLAIMER } from '@/services/checkupSchedule';
import { getCheckupStatus } from '@/services/checkupStatus';
import { compareISO, daysUntilLabel, formatDate, todayISO } from '@/services/date';
import { syncAllNotifications } from '@/services/notifications';
import { shareDeviceReport } from '@/services/pdf';
import type { Checkup, MaintenanceReminder } from '@/types/models';
import { EAR_SIDE_LABELS, MAINTENANCE_TYPE_LABELS, POWER_TYPE_LABELS } from '@/types/models';

type ConfirmTarget =
  | { kind: 'device' }
  | { kind: 'checkup'; id: string; title: string }
  | { kind: 'service'; id: string; title: string }
  | { kind: 'log'; id: string; title: string };

interface UpcomingItem {
  key: string;
  title: string;
  date: string;
}

export default function DeviceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { data, loading, error, reload } = useAsyncData(async () => {
    const device = await getDevice(id);
    if (!device) return null;
    const [checkups, reminders, logs, records] = await Promise.all([
      listCheckupsForDevice(id),
      listRemindersForDevice(id),
      listLogsForDevice(id),
      listServiceRecordsForDevice(id),
    ]);
    return { device, checkups, reminders, logs, records, today: todayISO() };
  });

  const [checkupToComplete, setCheckupToComplete] = useState<Checkup | null>(null);
  const [checkupFormState, setCheckupFormState] = useState<{ open: boolean; checkup: Checkup | null }>(
    { open: false, checkup: null }
  );
  const [reminderToEdit, setReminderToEdit] = useState<MaintenanceReminder | null>(null);
  const [reminderToLog, setReminderToLog] = useState<MaintenanceReminder | null>(null);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState<ConfirmTarget | null>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} onRetry={reload} />;
  if (!data) return <ErrorView message="Cihaz bulunamadı." />;

  const { device, checkups, reminders, logs, records, today } = data;

  const mutate = async (action: () => Promise<unknown>) => {
    await action();
    await syncAllNotifications();
    await reload();
  };

  const upcoming: UpcomingItem[] = [
    ...checkups
      .filter((c) => !c.completedAt && compareISO(c.dueDate, today) >= 0)
      .map((c) => ({ key: `c-${c.id}`, title: c.title, date: c.dueDate })),
    ...reminders
      .filter((r) => r.enabled)
      .map((r) => ({
        key: `r-${r.id}`,
        title: MAINTENANCE_TYPE_LABELS[r.type],
        date: nextReminderDate(r, device.warrantyEndDate),
      }))
      .filter((item): item is UpcomingItem => item.date !== null && compareISO(item.date, today) >= 0),
  ]
    .sort((a, b) => compareISO(a.date, b.date))
    .slice(0, 3);

  const completedItems = [
    ...checkups
      .filter((c) => c.completedAt)
      .map((c) => ({ key: `c-${c.id}`, title: c.title, date: c.completedAt as string })),
    ...logs.map((l) => ({
      key: `l-${l.id}`,
      title: MAINTENANCE_TYPE_LABELS[l.type],
      date: l.doneAt,
    })),
  ]
    .sort((a, b) => compareISO(b.date, a.date))
    .slice(0, 3);

  const handleConfirm = async () => {
    const target = confirmTarget;
    setConfirmTarget(null);
    if (!target) return;
    if (target.kind === 'device') {
      await deleteDevice(device.id);
      await syncAllNotifications();
      router.back();
      return;
    }
    if (target.kind === 'checkup') await mutate(() => deleteCheckup(target.id));
    if (target.kind === 'service') await mutate(() => deleteServiceRecord(target.id));
    if (target.kind === 'log') await mutate(() => deleteLog(target.id));
  };

  const handlePdf = async () => {
    setPdfLoading(true);
    setPdfError(null);
    try {
      await shareDeviceReport(device, checkups, logs, records);
    } catch (err) {
      console.warn('PDF oluşturulamadı:', err);
      setPdfError('PDF raporu oluşturulurken bir sorun oluştu.');
    } finally {
      setPdfLoading(false);
    }
  };

  const confirmMessage = (): { title: string; message: string } => {
    switch (confirmTarget?.kind) {
      case 'device':
        return {
          title: 'Cihazı sil',
          message: `"${device.name}" cihazı ve tüm kontrol, bakım ve servis kayıtları kalıcı olarak silinecek. Bu işlem geri alınamaz.`,
        };
      case 'checkup':
        return {
          title: 'Kontrolü sil',
          message: `"${confirmTarget.title}" kaydı silinecek. Bu işlem geri alınamaz.`,
        };
      case 'service':
        return {
          title: 'Servis kaydını sil',
          message: `"${confirmTarget.title}" kaydı silinecek. Bu işlem geri alınamaz.`,
        };
      case 'log':
        return {
          title: 'Bakım kaydını sil',
          message: `"${confirmTarget.title}" kaydı silinecek. Bu işlem geri alınamaz.`,
        };
      default:
        return { title: '', message: '' };
    }
  };

  const dialogContent = confirmMessage();

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: device.name }} />
      <ScrollView contentContainerStyle={styles.content}>
        <Card>
          <View style={styles.infoHeader}>
            {device.photoUri ? (
              <Image source={{ uri: device.photoUri }} style={styles.photo} contentFit="cover" />
            ) : (
              <View style={styles.photoPlaceholder}>
                <Ionicons name="ear-outline" size={32} color={colors.primary} />
              </View>
            )}
            <View style={styles.infoTitleContainer}>
              <Text style={styles.deviceName}>{device.name}</Text>
              <Text style={styles.deviceBrand}>{device.brand}</Text>
            </View>
          </View>
          <InfoRow label="Kulak" value={EAR_SIDE_LABELS[device.earSide]} />
          <InfoRow label="Kullanım başlangıcı" value={formatDate(device.startDate)} />
          <InfoRow label="Güç tipi" value={POWER_TYPE_LABELS[device.powerType]} />
          {device.serialNumber ? <InfoRow label="Seri numarası" value={device.serialNumber} /> : null}
          {device.warrantyEndDate ? (
            <InfoRow label="Garanti bitişi" value={formatDate(device.warrantyEndDate)} />
          ) : null}
          {device.clinicName ? <InfoRow label="Doktor / Klinik" value={device.clinicName} /> : null}
          {device.clinicPhone ? <InfoRow label="Telefon" value={device.clinicPhone} /> : null}
          {device.notes ? <InfoRow label="Notlar" value={device.notes} /> : null}
          <InfoRow
            label="Hatırlatıcılar"
            value={device.remindersEnabled ? 'Açık' : 'Kapalı'}
          />
        </Card>

        <View style={styles.actionRow}>
          <Button
            label="PDF Raporu"
            variant="secondary"
            onPress={handlePdf}
            loading={pdfLoading}
            style={styles.actionButton}
          />
          <Button
            label="Düzenle"
            variant="secondary"
            onPress={() => router.push(`/device/${device.id}/edit`)}
            style={styles.actionButton}
          />
          <Button
            label="Sil"
            variant="danger"
            onPress={() => setConfirmTarget({ kind: 'device' })}
            style={styles.actionButton}
          />
        </View>
        {pdfError ? <InfoBanner kind="warning" text={pdfError} /> : null}

        <SectionHeader title="Yaklaşan işlemler" />
        {upcoming.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Yaklaşan işlem yok.</Text>
          </Card>
        ) : (
          <Card>
            {upcoming.map((item, index) => (
              <View
                key={item.key}
                style={[styles.simpleRow, index > 0 && styles.simpleRowBorder]}
              >
                <Ionicons name="time-outline" size={18} color={colors.primary} />
                <Text style={styles.simpleRowTitle}>{item.title}</Text>
                <Text style={styles.simpleRowDate}>
                  {formatDate(item.date)} · {daysUntilLabel(item.date, today)}
                </Text>
              </View>
            ))}
          </Card>
        )}

        <SectionHeader title="Tamamlanan işlemler" />
        {completedItems.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Henüz tamamlanan işlem yok.</Text>
          </Card>
        ) : (
          <Card>
            {completedItems.map((item, index) => (
              <View key={item.key} style={[styles.simpleRow, index > 0 && styles.simpleRowBorder]}>
                <Ionicons name="checkmark-circle-outline" size={18} color={colors.success} />
                <Text style={styles.simpleRowTitle}>{item.title}</Text>
                <Text style={styles.simpleRowDate}>{formatDate(item.date)}</Text>
              </View>
            ))}
          </Card>
        )}

        <SectionHeader
          title="Kontrol takvimi"
          right={
            <Button
              label="Kontrol Ekle"
              variant="ghost"
              onPress={() => setCheckupFormState({ open: true, checkup: null })}
            />
          }
        />
        <InfoBanner text={SCHEDULE_DISCLAIMER} />
        <View style={styles.sectionSpacer} />
        {checkups.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Planlanmış kontrol yok.</Text>
          </Card>
        ) : (
          checkups.map((checkup) => {
            const status = getCheckupStatus(checkup, today);
            return (
              <Card key={checkup.id} style={styles.checkupCard}>
                <View style={styles.checkupHeader}>
                  <View style={styles.checkupTitleContainer}>
                    <Text style={styles.checkupTitle}>{checkup.title}</Text>
                    <Text style={styles.checkupDate}>
                      Planlanan: {formatDate(checkup.dueDate)}
                    </Text>
                    {checkup.completedAt ? (
                      <Text style={styles.checkupCompleted}>
                        Tamamlandı: {formatDate(checkup.completedAt)}
                      </Text>
                    ) : null}
                    {checkup.note ? <Text style={styles.checkupNote}>Not: {checkup.note}</Text> : null}
                  </View>
                  <StatusBadge status={status} />
                </View>
                <View style={styles.checkupActions}>
                  {status === 'completed' ? (
                    <Button
                      label="Geri Al"
                      variant="secondary"
                      onPress={() => mutate(() => reopenCheckup(checkup.id))}
                      style={styles.checkupActionButton}
                    />
                  ) : (
                    <Button
                      label="Tamamlandı"
                      onPress={() => setCheckupToComplete(checkup)}
                      style={styles.checkupActionButton}
                    />
                  )}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${checkup.title} kontrolünü düzenle`}
                    onPress={() => setCheckupFormState({ open: true, checkup })}
                    style={styles.iconButton}
                  >
                    <Ionicons name="pencil-outline" size={20} color={colors.primary} />
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${checkup.title} kontrolünü sil`}
                    onPress={() =>
                      setConfirmTarget({ kind: 'checkup', id: checkup.id, title: checkup.title })
                    }
                    style={styles.iconButton}
                  >
                    <Ionicons name="trash-outline" size={20} color={colors.danger} />
                  </Pressable>
                </View>
              </Card>
            );
          })
        )}

        <SectionHeader title="Bakım hatırlatıcıları" />
        <Card>
          {reminders.map((reminder, index) => {
            const next = nextReminderDate(reminder, device.warrantyEndDate);
            return (
              <View
                key={reminder.id}
                style={[styles.reminderRow, index > 0 && styles.simpleRowBorder]}
              >
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderTitle}>{MAINTENANCE_TYPE_LABELS[reminder.type]}</Text>
                  <Text style={styles.reminderDetail}>
                    {reminder.type === 'warranty'
                      ? device.warrantyEndDate
                        ? `Garanti bitişi: ${formatDate(device.warrantyEndDate)}`
                        : 'Garanti tarihi girilmemiş'
                      : `${reminder.intervalDays} günde bir` +
                        (next ? ` · Sıradaki: ${formatDate(next)}` : '')}
                  </Text>
                  {reminder.lastDoneAt ? (
                    <Text style={styles.reminderDetail}>
                      Son yapılma: {formatDate(reminder.lastDoneAt)}
                    </Text>
                  ) : null}
                </View>
                <View style={styles.reminderActions}>
                  <Switch
                    accessibilityLabel={`${MAINTENANCE_TYPE_LABELS[reminder.type]} hatırlatıcısı`}
                    value={reminder.enabled}
                    onValueChange={(value) =>
                      mutate(() =>
                        updateReminder(reminder.id, {
                          enabled: value,
                          intervalDays: reminder.intervalDays,
                        })
                      )
                    }
                    trackColor={{ false: colors.border, true: colors.primary }}
                    thumbColor="#FFFFFF"
                  />
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={`${MAINTENANCE_TYPE_LABELS[reminder.type]} hatırlatıcısını düzenle`}
                    onPress={() => setReminderToEdit(reminder)}
                    style={styles.iconButton}
                  >
                    <Ionicons name="pencil-outline" size={20} color={colors.primary} />
                  </Pressable>
                  {reminder.type !== 'warranty' ? (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${MAINTENANCE_TYPE_LABELS[reminder.type]} yapıldı olarak kaydet`}
                      onPress={() => setReminderToLog(reminder)}
                      style={styles.iconButton}
                    >
                      <Ionicons name="checkmark-done-outline" size={20} color={colors.success} />
                    </Pressable>
                  ) : null}
                </View>
              </View>
            );
          })}
        </Card>

        <SectionHeader title="Bakım geçmişi" />
        {logs.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Henüz bakım kaydı yok.</Text>
          </Card>
        ) : (
          <Card>
            {logs.map((log, index) => (
              <View key={log.id} style={[styles.simpleRow, index > 0 && styles.simpleRowBorder]}>
                <Ionicons name="build-outline" size={18} color={colors.primary} />
                <View style={styles.logInfo}>
                  <Text style={styles.simpleRowTitle}>{MAINTENANCE_TYPE_LABELS[log.type]}</Text>
                  {log.note ? <Text style={styles.reminderDetail}>{log.note}</Text> : null}
                </View>
                <Text style={styles.simpleRowDate}>{formatDate(log.doneAt)}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Bakım kaydını sil"
                  onPress={() =>
                    setConfirmTarget({
                      kind: 'log',
                      id: log.id,
                      title: MAINTENANCE_TYPE_LABELS[log.type],
                    })
                  }
                  style={styles.iconButton}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.danger} />
                </Pressable>
              </View>
            ))}
          </Card>
        )}

        <SectionHeader
          title="Servis kayıtları"
          right={
            <Button label="Kayıt Ekle" variant="ghost" onPress={() => setServiceModalOpen(true)} />
          }
        />
        {records.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Henüz servis kaydı yok.</Text>
          </Card>
        ) : (
          <Card>
            {records.map((record, index) => (
              <View key={record.id} style={[styles.simpleRow, index > 0 && styles.simpleRowBorder]}>
                <Ionicons name="construct-outline" size={18} color={colors.primary} />
                <View style={styles.logInfo}>
                  <Text style={styles.simpleRowTitle}>{record.title}</Text>
                  {record.description ? (
                    <Text style={styles.reminderDetail}>{record.description}</Text>
                  ) : null}
                </View>
                <Text style={styles.simpleRowDate}>{formatDate(record.date)}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${record.title} servis kaydını sil`}
                  onPress={() =>
                    setConfirmTarget({ kind: 'service', id: record.id, title: record.title })
                  }
                  style={styles.iconButton}
                >
                  <Ionicons name="trash-outline" size={18} color={colors.danger} />
                </Pressable>
              </View>
            ))}
          </Card>
        )}
      </ScrollView>

      <CompleteCheckupModal
        visible={checkupToComplete !== null}
        checkup={checkupToComplete}
        onClose={() => setCheckupToComplete(null)}
        onSave={async ({ completedAt, note }) => {
          const checkup = checkupToComplete;
          setCheckupToComplete(null);
          if (checkup) await mutate(() => completeCheckup(checkup.id, completedAt, note));
        }}
      />
      <CheckupFormModal
        visible={checkupFormState.open}
        checkup={checkupFormState.checkup}
        onClose={() => setCheckupFormState({ open: false, checkup: null })}
        onSave={async (fields) => {
          const editing = checkupFormState.checkup;
          setCheckupFormState({ open: false, checkup: null });
          if (editing) {
            await mutate(() => updateCheckup(editing.id, fields));
          } else {
            await mutate(() => createCheckup(device.id, fields.title, fields.dueDate));
          }
        }}
      />
      <ReminderFormModal
        visible={reminderToEdit !== null}
        reminder={reminderToEdit}
        onClose={() => setReminderToEdit(null)}
        onSave={async (fields) => {
          const reminder = reminderToEdit;
          setReminderToEdit(null);
          if (reminder) await mutate(() => updateReminder(reminder.id, fields));
        }}
      />
      <ReminderDoneModal
        visible={reminderToLog !== null}
        reminder={reminderToLog}
        onClose={() => setReminderToLog(null)}
        onSave={async ({ doneAt, note }) => {
          const reminder = reminderToLog;
          setReminderToLog(null);
          if (reminder) await mutate(() => markReminderDone(reminder, doneAt, note));
        }}
      />
      <ServiceRecordModal
        visible={serviceModalOpen}
        onClose={() => setServiceModalOpen(false)}
        onSave={async (fields) => {
          setServiceModalOpen(false);
          await mutate(() => createServiceRecord(device.id, fields));
        }}
      />
      <ConfirmDialog
        visible={confirmTarget !== null}
        title={dialogContent.title}
        message={dialogContent.message}
        confirmLabel="Sil"
        destructive
        onConfirm={handleConfirm}
        onCancel={() => setConfirmTarget(null)}
      />
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  photo: { width: 64, height: 64, borderRadius: radius.md },
  photoPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoTitleContainer: { flex: 1 },
  deviceName: { fontSize: fontSize.xl, fontWeight: '700', color: colors.text },
  deviceBrand: { fontSize: fontSize.md, color: colors.textMuted, marginTop: 2 },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.md,
  },
  infoLabel: { fontSize: fontSize.sm, color: colors.textMuted, flexShrink: 0 },
  infoValue: {
    fontSize: fontSize.sm,
    color: colors.text,
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg, flexWrap: 'wrap' },
  actionButton: { flexGrow: 1, flexBasis: 100 },
  emptyText: { fontSize: fontSize.sm, color: colors.textMuted },
  sectionSpacer: { height: spacing.md },
  simpleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    minHeight: 44,
  },
  simpleRowBorder: { borderTopWidth: 1, borderTopColor: colors.border },
  simpleRowTitle: { fontSize: fontSize.sm, color: colors.text, fontWeight: '600', flex: 1 },
  simpleRowDate: { fontSize: fontSize.xs, color: colors.textMuted },
  checkupCard: { marginBottom: spacing.md },
  checkupHeader: { flexDirection: 'row', gap: spacing.md },
  checkupTitleContainer: { flex: 1 },
  checkupTitle: { fontSize: fontSize.md, fontWeight: '700', color: colors.text },
  checkupDate: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  checkupCompleted: { fontSize: fontSize.sm, color: colors.success, marginTop: 2 },
  checkupNote: { fontSize: fontSize.sm, color: colors.text, marginTop: spacing.xs },
  checkupActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  checkupActionButton: { flex: 1 },
  iconButton: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
    backgroundColor: colors.background,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  reminderDetail: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  reminderActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  logInfo: { flex: 1 },
});
