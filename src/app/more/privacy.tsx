import { ScrollView, StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors, fontSize, spacing } from '@/constants/theme';

export default function PrivacyScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoBanner text="Verileriniz bu sürümde yalnızca kendi cihazınızda saklanır." />
      <Card style={styles.card}>
        <Text style={styles.heading}>Verileriniz nerede saklanır?</Text>
        <Text style={styles.paragraph}>
          İşitme Takip uygulamasına girdiğiniz tüm bilgiler (cihazlar, kontroller, bakım ve servis
          kayıtları) yalnızca telefonunuzdaki yerel veritabanında saklanır. Bu sürümde hiçbir veri
          internete gönderilmez, hiçbir sunucuda tutulmaz.
        </Text>

        <Text style={styles.heading}>Hesap ve üyelik</Text>
        <Text style={styles.paragraph}>
          Uygulama üyelik veya giriş gerektirmez. Kişisel kimlik bilgisi toplamaz.
        </Text>

        <Text style={styles.heading}>Verilerinizin kontrolü sizde</Text>
        <Text style={styles.paragraph}>
          Verilerinizi dilediğiniz zaman &quot;Daha Fazla &gt; Yedekleme&quot; bölümünden JSON
          dosyası olarak dışa aktarabilir, &quot;Tüm verileri sil&quot; seçeneğiyle kalıcı olarak
          silebilirsiniz. Uygulamayı telefonunuzdan kaldırdığınızda tüm veriler de silinir.
        </Text>

        <Text style={styles.heading}>Bildirimler</Text>
        <Text style={styles.paragraph}>
          Bildirimler tamamen cihaz üzerinde planlanır. Bildirim içerikleri hiçbir yere
          gönderilmez.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.lg },
  card: { gap: spacing.sm },
  heading: {
    fontSize: fontSize.md,
    fontWeight: '700',
    color: colors.text,
    marginTop: spacing.md,
  },
  paragraph: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 21 },
});
