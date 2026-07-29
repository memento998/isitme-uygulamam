import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { ListRow } from '@/components/ui/ListRow';
import { colors, radius, spacing } from '@/constants/theme';
import { deleteAllData } from '@/repositories/settings';
import { cancelAllNotifications } from '@/services/notifications';
import { loadSampleData } from '@/services/sampleData';

export default function MoreScreen() {
  const router = useRouter();
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleDeleteAll = async () => {
    setConfirmDeleteAll(false);
    await deleteAllData();
    await cancelAllNotifications();
    setFeedback('Tüm verileriniz silindi.');
  };

  const handleLoadSample = async () => {
    await loadSampleData();
    setFeedback('Örnek veriler yüklendi.');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {feedback ? (
        <View style={styles.banner}>
          <InfoBanner text={feedback} />
        </View>
      ) : null}

      <View style={styles.group}>
        <ListRow
          icon="calendar-outline"
          title="Takvim"
          subtitle="Yaklaşan kontrol ve bakım işlemleri"
          onPress={() => router.push('/more/calendar')}
        />
        <ListRow
          icon="notifications-outline"
          title="Bildirim ayarları"
          subtitle="İzin ve bildirim saati"
          onPress={() => router.push('/more/notifications')}
        />
        <ListRow
          icon="document-text-outline"
          title="PDF raporları"
          subtitle="Cihaz özet raporu oluştur ve paylaş"
          onPress={() => router.push('/more/reports')}
        />
      </View>

      <View style={styles.group}>
        <ListRow
          icon="cloud-upload-outline"
          title="Yedekleme ve geri yükleme"
          subtitle="Verileri JSON olarak dışa aktar veya geri yükle"
          onPress={() => router.push('/more/backup')}
        />
      </View>

      <View style={styles.group}>
        <ListRow
          icon="shield-checkmark-outline"
          title="Gizlilik"
          subtitle="Verileriniz yalnızca cihazınızda saklanır"
          onPress={() => router.push('/more/privacy')}
        />
        <ListRow
          icon="medkit-outline"
          title="Tıbbi sorumluluk reddi"
          subtitle="Uygulama tıbbi tanı koymaz"
          onPress={() => router.push('/more/disclaimer')}
        />
        <ListRow
          icon="information-circle-outline"
          title="Uygulama hakkında"
          onPress={() => router.push('/more/about')}
        />
      </View>

      <View style={styles.group}>
        {__DEV__ ? (
          <ListRow
            icon="flask-outline"
            title="Örnek veri yükle (geliştirici)"
            subtitle="Yalnızca geliştirme modunda görünür"
            onPress={handleLoadSample}
          />
        ) : null}
        <ListRow
          icon="trash-outline"
          title="Tüm verileri sil"
          subtitle="Bütün cihaz ve kayıtlar kalıcı olarak silinir"
          destructive
          onPress={() => setConfirmDeleteAll(true)}
        />
      </View>

      <ConfirmDialog
        visible={confirmDeleteAll}
        title="Tüm verileri sil"
        message="Tüm cihazlarınız, kontrol takvimleriniz, bakım ve servis kayıtlarınız kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?"
        confirmLabel="Evet, hepsini sil"
        destructive
        onConfirm={handleDeleteAll}
        onCancel={() => setConfirmDeleteAll(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  banner: { marginBottom: spacing.sm },
  group: {
    borderRadius: radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
});
