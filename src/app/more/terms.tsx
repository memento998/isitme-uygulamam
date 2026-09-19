import { ScrollView, StyleSheet, Text } from 'react-native';

import { Card } from '@/components/ui/Card';
import { InfoBanner } from '@/components/ui/InfoBanner';
import { colors, fontSize, spacing } from '@/constants/theme';

export default function TermsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <InfoBanner text="Bu sayfa bir özet yer tutucudur. Nihai kullanım koşulları hukuki inceleme gerektirir." />
      <Card style={styles.card}>
        <Text style={styles.heading}>Uygulamanın kullanımı</Text>
        <Text style={styles.paragraph}>
          fixhear (İşitme Takip), işitme cihazı takip ve hatırlatma amaçlı ücretsiz bir
          uygulamadır. Bu sayfa bağlayıcı bir sözleşme değildir.
        </Text>

        <Text style={styles.heading}>Tıbbi cihaz değildir</Text>
        <Text style={styles.paragraph}>
          Uygulama tıbbi tanı koymaz, tedavi önermez ve belgelendirilmiş bir tıbbi cihaz
          değildir. Cihaz ayarları ve sağlık kararları için işitme uzmanınıza danışın.
        </Text>

        <Text style={styles.heading}>Veriler ve sorumluluk</Text>
        <Text style={styles.paragraph}>
          Girdiğiniz kayıtlar bu sürümde yalnızca cihazınızda saklanır. Yedekleme dosyasını
          nerede tutacağınız size aittir. Uygulamadaki kayıtlara dayanarak alınan kararlardan
          kullanıcı sorumludur.
        </Text>

        <Text style={styles.heading}>Reklamlar</Text>
        <Text style={styles.paragraph}>
          Uygulama reklam gösterebilir. Reklam sağlayıcısının işlediği teknik veriler Gizlilik
          Politikası sayfasında özetlenir.
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
