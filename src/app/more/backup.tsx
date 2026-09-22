import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useI18n } from '@/i18n';
import { exportBackup, restoreBackup } from '@/services/backup';
import { syncAllNotifications } from '@/services/notifications';

export default function BackupScreen() {
  const { messages, tx } = useI18n();
  const [exporting, setExporting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [message, setMessage] = useState<{ kind: 'info' | 'warning'; text: string } | null>(null);

  const handleExport = async () => {
    setExporting(true);
    setMessage(null);
    try {
      await exportBackup();
      setMessage({ kind: 'info', text: messages.backup.exportOk });
    } catch (err) {
      console.warn('Yedek oluşturulamadı:', err);
      setMessage({ kind: 'warning', text: messages.backup.exportFail });
    } finally {
      setExporting(false);
    }
  };

  const handleRestore = async () => {
    setConfirmRestore(false);
    setRestoring(true);
    setMessage(null);
    try {
      const count = await restoreBackup();
      if (count === null) {
        setMessage(null);
      } else {
        await syncAllNotifications();
        setMessage({ kind: 'info', text: tx(messages.backup.restoreCount, { count }) });
      }
    } catch (err) {
      console.warn('Geri yükleme başarısız:', err);
      const raw = err instanceof Error ? err.message : '';
      const text =
        raw === 'Dosya geçerli bir JSON değil.'
          ? messages.backup.invalidJson
          : raw === 'Dosya geçerli bir İşitme Takip yedeği değil.'
            ? messages.backup.invalidBackup
            : messages.backup.restoreFail;
      setMessage({ kind: 'warning', text });
    } finally {
      setRestoring(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {message ? <InfoBanner kind={message.kind} text={message.text} /> : null}

      <SectionHeader title={messages.backup.exportSection} />
      <Card>
        <Text style={styles.text}>{messages.backup.exportHelp}</Text>
        <Button
          label={messages.backup.exportButton}
          onPress={handleExport}
          loading={exporting}
        />
      </Card>

      <SectionHeader title={messages.backup.restoreSection} />
      <Card>
        <Text style={styles.text}>{messages.backup.restoreHelp}</Text>
        <Button
          label={messages.backup.restoreButton}
          variant="secondary"
          onPress={() => setConfirmRestore(true)}
          loading={restoring}
        />
      </Card>

      <ConfirmDialog
        visible={confirmRestore}
        title={messages.backup.restoreConfirmTitle}
        message={messages.backup.restoreConfirmMessage}
        confirmLabel={messages.common.continue}
        cancelLabel={messages.common.cancel}
        onConfirm={handleRestore}
        onCancel={() => setConfirmRestore(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  text: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
});
