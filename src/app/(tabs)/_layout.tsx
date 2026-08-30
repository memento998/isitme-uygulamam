import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import { BannerReserve } from '@/components/BannerReserve';
import { HeaderOverflowMenu } from '@/components/HeaderOverflowMenu';
import { colors } from '@/constants/theme';

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.screens}>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.card },
            headerTintColor: colors.primary,
            headerTitleStyle: { color: colors.text, fontWeight: '700' },
            headerShadowVisible: false,
            headerRight: () => <HeaderOverflowMenu />,
            contentStyle: { backgroundColor: colors.background },
            animation: 'none',
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Cihazlarım' }} />
          <Stack.Screen name="troubleshooting" options={{ title: 'Sorun Giderme' }} />
          <Stack.Screen name="stats" options={{ title: 'İstatistik' }} />
          <Stack.Screen name="more" options={{ title: 'Daha Fazla' }} />
        </Stack>
      </View>
      <BannerReserve />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  screens: { flex: 1 },
});
