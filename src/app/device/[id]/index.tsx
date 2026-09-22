import { useRef, useState } from 'react';
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
import { OTHER_BRAND } from '@/constants/brands';
import { colors, fontSize, MIN_TOUCH_SIZE, radius, spacing } from '@/constants/theme';
import { useAsyncData } from '@/hooks/useAsyncData';
import { daysUntilLocalized, useI18n } from '@/i18n';
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
import { getCheckupStatus } from '@/services/checkupStatus';
import { compareISO, formatDate, todayISO } from '@/services/date';
import { syncAllNotifications } from '@/services/notifications';
import { shareDeviceReport } from '@/services/pdf';
import type { Checkup, MaintenanceReminder } from '@/types/models';

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
  const { locale, messages, tx } = useI18n();

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
  }, messages.common.loadError);

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
  const [enabledOverrides, setEnabledOverrides] = useState<Record<string, boolean>>({});
  const [updatingReminderIds, setUpdatingReminderIds] = useState<Record<string, boolean>>({});
  const [switchError, setSwitchError] = useState<string | null>(null);
  const toggleSeq = useRef<Record<string, number>>({});

  if (loading) return <LoadingView message={messages.common.loading} />;
  if (error) {
    return <ErrorView message={error} onRetry={reload} retryLabel={messages.common.retry} />;
  }
  if (!data) return <ErrorView message={messages.deviceDetail.notFound} />;

  const { device, checkups, reminders, logs, records, today } = data;
  const earLabels = {
    left: messages.home.earLeft,
    right: messages.home.earRight,
    both: messages.home.earBoth,
  } as const;
  const powerLabels = {
    battery: messages.home.powerBattery,
    rechargeable: messages.home.powerRechargeable,
  } as const;
  const brandLabel = device.brand === OTHER_BRAND ? messages.brand.otherBrand : device.brand;

  const effectiveEnabled = (reminder: MaintenanceReminder): boolean =>
    enabledOverrides[reminder.id] ?? reminder.enabled;

  const mutate = async (action: () => Promise<unknown>) => {
    await action();
    await syncAllNotifications();
    await reload();
    setEnabledOverrides({});
  };

  const handleReminderEnabledChange = async (reminder: MaintenanceReminder, value: boolean) => {
    if (updatingReminderIds[reminder.id]) return;
    const previous = effectiveEnabled(reminder);
    const seq = (toggleSeq.current[reminder.id] ?? 0) + 1;
    toggleSeq.current[reminder.id] = seq;
    setSwitchError(null);
    setUpdatingReminderIds((current) => ({ ...current, [reminder.id]: true }));
    setEnabledOverrides((current) => ({ ...current, [reminder.id]: value }));
    try {
      await updateReminder(reminder.id, {
        enabled: value,
        intervalDays: reminder.intervalDays,
      });
    } catch (err) {
      console.warn('Hatırlatıcı güncellenemedi:', err);
      if (toggleSeq.current[reminder.id] === seq) {
        setEnabledOverrides((current) => ({ ...current, [reminder.id]: previous }));
        setSwitchError(messages.deviceDetail.switchError);
      }
      setUpdatingReminderIds((current) => {
        const next = { ...current };
        delete next[reminder.id];
        return next;
      });
      return;
    }
    setUpdatingReminderIds((current) => {
      const next = { ...current };
      delete next[reminder.id];
      return next;
    });
    try {
      await syncAllNotifications();
    } catch {
      // Bildirim senkronu DB yazımını veya Switch görünümünü geri almamalı.
    }
    try {
      await reload();
      if (toggleSeq.current[reminder.id] === seq) {
        setEnabledOverrides((current) => {
          const next = { ...current };
          delete next[reminder.id];
          return next;
        });
      }
    } catch {
      // Yükleme başarısızsa override, kaydedilen değeri göstermeye devam eder.
    }
  };

  const upcoming: UpcomingItem[] = [
    ...checkups
      .filter((c) => !c.completedAt && compareISO(c.dueDate, today) >= 0)
      .map((c) => ({ key: `c-${c.id}`, title: c.title, date: c.dueDate })),
    ...reminders
      .filter((r) => effectiveEnabled(r))
      .map((r) => ({
        key: `r-${r.id}`,
        title: messages.maintenance[r.type],
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
      title: messages.maintenance[l.type],
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
      await shareDeviceReport(device, checkups, logs, records, messages, locale);
    } catch (err) {
      console.warn('PDF oluşturulamadı:', err);
      setPdfError(messages.deviceDetail.pdfError);
    } finally {
      setPdfLoading(false);
    }
  };

  const confirmMessage = (): { title: string; message: string } => {
    switch (confirmTarget?.kind) {
      case 'device':
        return {
          title: messages.deviceDetail.deleteDeviceTitle,
          message: tx(messages.deviceDetail.deleteDeviceMessage, { name: device.name }),
        };
      case 'checkup':
        return {
          title: messages.deviceDetail.deleteCheckupTitle,
          message: tx(messages.deviceDetail.deleteRecordMessage, { title: confirmTarget.title }),
        };
      case 'service':
        return {
          title: messages.deviceDetail.deleteServiceTitle,
          message: tx(messages.deviceDetail.deleteRecordMessage, { title: confirmTarget.title }),
        };
      case 'log':
        return {
          title: messages.deviceDetail.deleteLogTitle,
          message: tx(messages.deviceDetail.deleteRecordMessage, { title: confirmTarget.title }),
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
              <Text style={styles.deviceBrand}>{brandLabel}</Text>
            </View>
          </View>
          <InfoRow label={messages.deviceDetail.ear} value={earLabels[device.earSide]} />
          <InfoRow label={messages.deviceDetail.startDate} value={formatDate(device.startDate)} />
          <InfoRow label={messages.deviceDetail.powerType} value={powerLabels[device.powerType]} />
          {device.serialNumber ? (
            <InfoRow label={messages.deviceDetail.serial} value={device.serialNumber} />
          ) : null}
          {device.warrantyEndDate ? (
            <InfoRow label={messages.deviceDetail.warranty} value={formatDate(device.warrantyEndDate)} />
          ) : null}
          {device.clinicName ? <InfoRow label={messages.deviceDetail.clinic} value={device.clinicName} /> : null}
          {device.clinicPhone ? <InfoRow label={messages.deviceDetail.phone} value={device.clinicPhone} /> : null}
          {device.notes ? <InfoRow label={messages.deviceDetail.notes} value={device.notes} /> : null}
          <InfoRow
            label={messages.deviceDetail.reminders}
            value={device.remindersEnabled ? messages.deviceDetail.remindersOn : messages.deviceDetail.remindersOff}
          />
        </Card>

        <View style={styles.actionRow}>
          <Button
            label={messages.deviceDetail.pdf}
            variant="secondary"
            onPress={handlePdf}
            loading={pdfLoading}
            style={styles.actionButton}
          />
          <Button
            label={messages.deviceDetail.edit}
            variant="secondary"
            onPress={() => router.push(`/device/${device.id}/edit`)}
            style={styles.actionButton}
          />
          <Button
            label={messages.deviceDetail.delete}
            variant="danger"
            onPress={() => setConfirmTarget({ kind: 'device' })}
            style={styles.actionButton}
          />
        </View>
        {pdfError ? <InfoBanner kind="warning" text={pdfError} /> : null}

        <SectionHeader title={messages.deviceDetail.upcoming} />
        {upcoming.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>{messages.deviceDetail.upcomingEmpty}</Text>
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
                  {formatDate(item.date)} · {daysUntilLocalized(item.date, today, messages)}
                </Text>
              </View>
            ))}
          </Card>
        )}

        <SectionHeader title={messages.deviceDetail.completedSection} />
        {completedItems.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>{messages.deviceDetail.completedEmpty}</Text>
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
          title={messages.deviceDetail.checkups}
          right={
            <Button
              label={messages.deviceDetail.addCheckup}
              variant="ghost"
              onPress={() => setCheckupFormState({ open: true, checkup: null })}
            />
          }
        />
        <InfoBanner text={messages.deviceDetail.checkupDisclaimer} />
        <View style={styles.sectionSpacer} />
        {checkups.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>{messages.deviceDetail.noPlannedCheckup}</Text>
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
                      {tx(messages.deviceDetail.planned, { date: formatDate(checkup.dueDate) })}
                    </Text>
                    {checkup.completedAt ? (
                      <Text style={styles.checkupCompleted}>
                        {tx(messages.deviceDetail.completedAt, { date: formatDate(checkup.completedAt) })}
                      </Text>
                    ) : null}
                    {checkup.note ? (
                      <Text style={styles.checkupNote}>
                        {tx(messages.deviceDetail.note, { note: checkup.note })}
                      </Text>
                    ) : null}
                  </View>
                  <StatusBadge status={status} labels={messages.checkupStatus} />
                </View>
                <View style={styles.checkupActions}>
                  {status === 'completed' ? (
                    <Button
                      label={messages.deviceDetail.reopen}
                      variant="secondary"
                      onPress={() => mutate(() => reopenCheckup(checkup.id))}
                      style={styles.checkupActionButton}
                    />
                  ) : (
                    <Button
                      label={messages.deviceDetail.complete}
                      onPress={() => setCheckupToComplete(checkup)}
                      style={styles.checkupActionButton}
                    />
                  )}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={tx(messages.deviceDetail.checkupEditA11y, { title: checkup.title })}
                    onPress={() => setCheckupFormState({ open: true, checkup })}
                    style={styles.iconButton}
                  >
                    <Ionicons name="pencil-outline" size={20} color={colors.primary} />
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={tx(messages.deviceDetail.checkupDeleteA11y, { title: checkup.title })}
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

        <SectionHeader title={messages.deviceDetail.maintenance} />
        {switchError ? <InfoBanner kind="warning" text={switchError} /> : null}
        <Card>
          {reminders.map((reminder, index) => {
            const next = nextReminderDate(reminder, device.warrantyEndDate);
            const enabled = effectiveEnabled(reminder);
            const reminderLabel = messages.maintenance[reminder.type];
            return (
              <View
                key={reminder.id}
                style={[styles.reminderBlock, index > 0 && styles.simpleRowBorder]}
              >
                <View style={styles.reminderRow}>
                  <View style={styles.reminderInfo}>
                    <Text style={styles.reminderTitle}>{reminderLabel}</Text>
                    <Text style={styles.reminderDetail}>
                      {reminder.type === 'warranty'
                        ? device.warrantyEndDate
                          ? tx(messages.deviceDetail.warrantyEnd, {
                              date: formatDate(device.warrantyEndDate),
                            })
                          : messages.deviceDetail.warrantyMissing
                        : tx(messages.deviceDetail.intervalDays, { count: reminder.intervalDays }) +
                          (next
                            ? ` · ${tx(messages.deviceDetail.nextAt, { date: formatDate(next) })}`
                            : '')}
                    </Text>
                    {reminder.lastDoneAt ? (
                      <Text style={styles.reminderDetail}>
                        {tx(messages.deviceDetail.lastDone, { date: formatDate(reminder.lastDoneAt) })}
                      </Text>
                    ) : null}
                  </View>
                  <View style={styles.reminderActions}>
                    <Switch
                      accessibilityLabel={tx(messages.deviceDetail.reminderA11y, { label: reminderLabel })}
                      value={enabled}
                      disabled={!!updatingReminderIds[reminder.id]}
                      onValueChange={(value) => void handleReminderEnabledChange(reminder, value)}
                      trackColor={{ false: colors.border, true: colors.primary }}
                      thumbColor="#FFFFFF"
                    />
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={tx(messages.deviceDetail.reminderEditA11y, {
                        label: reminderLabel,
                      })}
                      onPress={() =>
                        setReminderToEdit({
                          ...reminder,
                          enabled: effectiveEnabled(reminder),
                        })
                      }
                      style={styles.iconButton}
                    >
                      <Ionicons name="pencil-outline" size={20} color={colors.primary} />
                    </Pressable>
                  </View>
                </View>
                {reminder.type !== 'warranty' ? (
                  <Button
                    label={messages.deviceDetail.complete}
                    onPress={() => setReminderToLog(reminder)}
                    style={styles.reminderCompleteButton}
                  />
                ) : null}
              </View>
            );
          })}
        </Card>

        <SectionHeader title={messages.deviceDetail.maintenanceHistory} />
        {logs.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>{messages.deviceDetail.maintenanceHistoryEmpty}</Text>
          </Card>
        ) : (
          <Card>
            {logs.map((log, index) => (
              <View key={log.id} style={[styles.simpleRow, index > 0 && styles.simpleRowBorder]}>
                <Ionicons name="build-outline" size={18} color={colors.primary} />
                <View style={styles.logInfo}>
                  <Text style={styles.simpleRowTitle}>{messages.maintenance[log.type]}</Text>
                  {log.note ? <Text style={styles.reminderDetail}>{log.note}</Text> : null}
                </View>
                <Text style={styles.simpleRowDate}>{formatDate(log.doneAt)}</Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={messages.deviceDetail.logDeleteA11y}
                  onPress={() =>
                    setConfirmTarget({
                      kind: 'log',
                      id: log.id,
                      title: messages.maintenance[log.type],
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
          title={messages.deviceDetail.service}
          right={
            <Button
              label={messages.deviceDetail.addService}
              variant="ghost"
              onPress={() => setServiceModalOpen(true)}
            />
          }
        />
        {records.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>{messages.deviceDetail.serviceEmpty}</Text>
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
                  accessibilityLabel={tx(messages.deviceDetail.serviceDeleteA11y, { title: record.title })}
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
        confirmLabel={messages.common.delete}
        cancelLabel={messages.common.cancel}
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
  reminderBlock: { paddingVertical: spacing.md, gap: spacing.sm },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  reminderInfo: { flex: 1 },
  reminderTitle: { fontSize: fontSize.md, fontWeight: '600', color: colors.text },
  reminderDetail: { fontSize: fontSize.xs, color: colors.textMuted, marginTop: 2 },
  reminderActions: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  reminderCompleteButton: { alignSelf: 'flex-start' },
  logInfo: { flex: 1 },
});
