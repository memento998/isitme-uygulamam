import { StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';

import { BannerReserve } from '@/components/BannerReserve';
import { HeaderSectionBar } from '@/components/HeaderSectionBar';
import { colors } from '@/constants/theme';

export default function MainLayout() {
  return (
    <View style={styles.container}>
      <View style={styles.screens}>
        <Stack
          screenOptions={{
            header: () => <HeaderSectionBar />,
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
