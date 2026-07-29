import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/constants/theme';
import { configureNotifications, syncAllNotifications } from '@/services/notifications';

export default function RootLayout() {
  useEffect(() => {
    configureNotifications();
    void syncAllNotifications();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: 'Geri',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="device/new" options={{ title: 'Yeni Cihaz', presentation: 'modal' }} />
        <Stack.Screen name="device/[id]/index" options={{ title: 'Cihaz Detayı' }} />
        <Stack.Screen
          name="device/[id]/edit"
          options={{ title: 'Cihazı Düzenle', presentation: 'modal' }}
        />
        <Stack.Screen name="troubleshooting/[categoryId]" options={{ title: 'Sorun Giderme' }} />
        <Stack.Screen name="more/calendar" options={{ title: 'Takvim' }} />
        <Stack.Screen name="more/notifications" options={{ title: 'Bildirim Ayarları' }} />
        <Stack.Screen name="more/backup" options={{ title: 'Yedekleme' }} />
        <Stack.Screen name="more/reports" options={{ title: 'PDF Raporları' }} />
        <Stack.Screen name="more/privacy" options={{ title: 'Gizlilik' }} />
        <Stack.Screen name="more/disclaimer" options={{ title: 'Tıbbi Sorumluluk Reddi' }} />
        <Stack.Screen name="more/about" options={{ title: 'Uygulama Hakkında' }} />
      </Stack>
    </>
  );
}
