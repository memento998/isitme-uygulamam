import { useState } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { colors, fontSize, spacing } from '@/constants/theme';
import { exportBackup, restoreBackup } from '@/services/backup';
import { syncAllNotifications } from '@/services/notifications';

export default function BackupScreen() {
  const [exporting, setExporting] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(false);
  const [message, setMessage] = useState<{ kind: 'info' | 'warning'; text: string } | null>(null);

  const handleExport = async () => {
    setExporting(true);
    setMessage(null);
    try {
      await exportBackup();
      setMessage({ kind: 'info', text: 'Yedek dosyanız oluşturuldu.' });
    } catch (err) {
      console.warn('Yedek oluşturulamadı:', err);
      setMessage({ kind: 'warning', text: 'Yedek oluşturulurken bir sorun oluştu.' });
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
        setMessage({ kind: 'info', text: `Geri yükleme tamamlandı: ${count} cihaz yüklendi.` });
      }
    } catch (err) {
      console.warn('Geri yükleme başarısız:', err);
      setMessage({
        kind: 'warning',
        text: err instanceof Error ? err.message : 'Geri yükleme sırasında bir sorun oluştu.',
      });
    } finally {
      setRestoring(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {message ? <InfoBanner kind={message.kind} text={message.text} /> : null}

      <SectionHeader title="Yedekleme" />
      <Card>
        <Text style={styles.text}>
          Tüm cihazlarınız, kontrol takvimleriniz, bakım ve servis kayıtlarınız tek bir JSON
          dosyası olarak dışa aktarılır. Dosyayı güvenli bir yerde saklayabilirsiniz.
        </Text>
        <Button label="Verileri JSON Olarak Dışa Aktar" onPress={handleExport} loading={exporting} />
      </Card>

      <SectionHeader title="Geri yükleme" />
      <Card>
        <Text style={styles.text}>
          Daha önce aldığınız yedek dosyasını seçerek verilerinizi geri yükleyebilirsiniz. Geri
          yükleme, mevcut tüm verilerin üzerine yazar.
        </Text>
        <Button
          label="Yedekten Geri Yükle"
          variant="secondary"
          onPress={() => setConfirmRestore(true)}
          loading={restoring}
        />
      </Card>

      <ConfirmDialog
        visible={confirmRestore}
        title="Yedekten geri yükle"
        message="Geri yükleme mevcut tüm verilerinizi silecek ve yedek dosyasındaki verilerle değiştirecek. Devam etmek istiyor musunuz?"
        confirmLabel="Devam et"
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
