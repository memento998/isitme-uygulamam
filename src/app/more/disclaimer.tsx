import { ScrollView, StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors, fontSize, spacing } from '@/constants/theme';
import { SCHEDULE_DISCLAIMER } from '@/services/checkupSchedule';

export default function DisclaimerScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoBanner
        kind="warning"
        text="Bu uygulama tıbbi tanı koymaz ve işitme uzmanınızın yerini tutmaz."
      />
      <Card style={styles.card}>
        <Text style={styles.heading}>Uygulamanın amacı</Text>
        <Text style={styles.paragraph}>
          İşitme Takip, işitme cihazınızın kontrol ve bakım tarihlerini takip etmenize yardımcı
          olan bir hatırlatma ve kayıt aracıdır. Sağladığı bilgiler yalnızca genel niteliktedir.
        </Text>

        <Text style={styles.heading}>Tıbbi tavsiye değildir</Text>
        <Text style={styles.paragraph}>
          Uygulamadaki kontrol takvimi, bakım önerileri ve sorun giderme adımları tıbbi tavsiye
          değildir. {SCHEDULE_DISCLAIMER}
        </Text>

        <Text style={styles.heading}>Sorun durumunda</Text>
        <Text style={styles.paragraph}>
          Cihazınızda çözemediğiniz bir sorun varsa cihazı açmadan veya onarmaya çalışmadan işitme
          uzmanınıza ya da yetkili servise başvurun. İşitmenizle ilgili herhangi bir değişiklik
          fark ederseniz vakit kaybetmeden bir sağlık kuruluşuna danışın.
        </Text>

        <Text style={styles.heading}>Sorumluluk</Text>
        <Text style={styles.paragraph}>
          Uygulamadaki bilgiler nedeniyle alınan kararlardan kullanıcı sorumludur. Acil durumlarda
          derhal sağlık kuruluşuna başvurun.
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
