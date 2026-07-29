import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Card } from '@/components/ui/Card';
import { colors, fontSize, spacing } from '@/constants/theme';

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <MaterialCommunityIcons name="ear-hearing" size={48} color={colors.primary} />
        </View>
        <Text style={styles.appName}>İşitme Takip</Text>
        <Text style={styles.version}>Sürüm {version}</Text>
      </View>

      <Card style={styles.card}>
        <Text style={styles.paragraph}>
          İşitme Takip; işitme cihazı kullanan kişilerin cihazlarını, periyodik kontrollerini,
          bakım işlemlerini ve yaşadıkları temel sorunları takip edebilmesi için geliştirilmiş
          ücretsiz bir uygulamadır.
        </Text>
        <Text style={styles.paragraph}>
          Uygulama internet bağlantısı gerektirmez; tüm verileriniz yalnızca cihazınızda saklanır.
        </Text>
        <Text style={styles.paragraph}>
          Bu uygulama tıbbi bir araç değildir. Kontrol sıklığı ve cihaz ayarları için her zaman
          işitme uzmanınıza danışın.
        </Text>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl, gap: spacing.xl },
  logoContainer: { alignItems: 'center', gap: spacing.sm, marginTop: spacing.xl },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appName: { fontSize: fontSize.xxl, fontWeight: '700', color: colors.text },
  version: { fontSize: fontSize.sm, color: colors.textMuted },
  card: { gap: spacing.md },
  paragraph: { fontSize: fontSize.sm, color: colors.textMuted, lineHeight: 21 },
});
