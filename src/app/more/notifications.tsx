import { useCallback, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ErrorView, LoadingView } from '@/components/ui/StateViews';
import { TimeField } from '@/components/ui/TimeField';
import { colors, fontSize, spacing } from '@/constants/theme';
import { useAsyncData } from '@/hooks/useAsyncData';
import { getSettings, saveSettings } from '@/repositories/settings';
import {
  getPermissionState,
  PERMISSION_EXPLANATION,
  requestPermission,
  syncAllNotifications,
  type PermissionState,
} from '@/services/notifications';
import type { AppSettings } from '@/types/models';

const PERMISSION_LABELS: Record<PermissionState, string> = {
  granted: 'İzin verildi',
  denied: 'İzin reddedildi',
  undetermined: 'Henüz izin istenmedi',
  unsupported: 'Bu platformda desteklenmiyor',
};

export default function NotificationSettingsScreen() {
  const { data, loading, error, reload } = useAsyncData(
    useCallback(async () => {
      const [settings, permission] = await Promise.all([getSettings(), getPermissionState()]);
      return { settings, permission };
    }, [])
  );
  const [requesting, setRequesting] = useState(false);
  const [saved, setSaved] = useState(false);

  if (loading) return <LoadingView />;
  if (error || !data) return <ErrorView message={error ?? undefined} onRetry={reload} />;

  const { settings, permission } = data;

  const handleRequest = async () => {
    setRequesting(true);
    try {
      const granted = await requestPermission();
      if (granted) await syncAllNotifications();
      await reload();
    } finally {
      setRequesting(false);
    }
  };

  const handleTimeChange = async (hour: number, minute: number) => {
    const next: AppSettings = { notificationHour: hour, notificationMinute: minute };
    await saveSettings(next);
    await syncAllNotifications();
    setSaved(true);
    await reload();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {Platform.OS === 'web' ? (
        <InfoBanner
          kind="warning"
          text="Web önizlemesinde bildirimler desteklenmez. Bildirimleri Android veya iOS cihazınızda kullanabilirsiniz."
        />
      ) : null}

      <SectionHeader title="Bildirim izni" />
      <Card>
        <Text style={styles.permissionState}>
          Durum: <Text style={styles.permissionValue}>{PERMISSION_LABELS[permission]}</Text>
        </Text>
        <Text style={styles.explanation}>{PERMISSION_EXPLANATION}</Text>
        {permission === 'undetermined' ? (
          <Button label="Bildirim İzni Ver" onPress={handleRequest} loading={requesting} />
        ) : null}
        {permission === 'denied' ? (
          <InfoBanner
            kind="warning"
            text="Bildirim izni reddedilmiş. İzni telefonunuzun ayarlar bölümünden açabilirsiniz."
          />
        ) : null}
      </Card>

      <SectionHeader title="Bildirim saati" />
      <Card>
        <Text style={styles.explanation}>
          Kontrol ve bakım hatırlatmaları, planlanan günde aşağıda seçtiğiniz saatte gönderilir.
        </Text>
        <TimeField
          label="Bildirim saati"
          hour={settings.notificationHour}
          minute={settings.notificationMinute}
          onChange={handleTimeChange}
        />
        {saved ? <InfoBanner text="Bildirim saati kaydedildi ve hatırlatmalar güncellendi." /> : null}
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  permissionState: { fontSize: fontSize.md, color: colors.text, marginBottom: spacing.md },
  permissionValue: { fontWeight: '700', color: colors.primary },
  explanation: {
    fontSize: fontSize.sm,
    color: colors.textMuted,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
});
