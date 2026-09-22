import { useEffect } from 'react';
import { AppState } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { KnowledgeNotificationBridge } from '@/components/KnowledgeNotificationBridge';
import { colors } from '@/constants/theme';
import { I18nProvider, useI18n } from '@/i18n';
import { showLaunchInterstitialOnce } from '@/services/ads';
import { configureNotifications, syncAllNotifications } from '@/services/notifications';

export default function RootLayout() {
  return (
    <I18nProvider>
      <RootLayoutInner />
    </I18nProvider>
  );
}

function RootLayoutInner() {
  const { messages } = useI18n();

  useEffect(() => {
    configureNotifications();
    void syncAllNotifications();
    void showLaunchInterstitialOnce();
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        void syncAllNotifications();
      }
    });
    return () => sub.remove();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <KnowledgeNotificationBridge />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.primary,
          headerTitleStyle: { color: colors.text, fontWeight: '700' },
          headerBackTitle: messages.common.back,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="device/new" options={{ title: messages.deviceForm.titleNew, presentation: 'modal' }} />
        <Stack.Screen name="device/[id]/index" options={{ title: messages.deviceDetail.screenTitle }} />
        <Stack.Screen
          name="device/[id]/edit"
          options={{ title: messages.deviceForm.titleEdit, presentation: 'modal' }}
        />
        <Stack.Screen name="troubleshooting/[categoryId]" options={{ title: messages.nav.troubleshooting }} />
        <Stack.Screen name="knowledge/index" options={{ title: messages.knowledge.knowledgeBank }} />
        <Stack.Screen name="knowledge/[id]" options={{ title: messages.knowledge.knowledgeBank }} />
        <Stack.Screen name="more/calendar" options={{ title: messages.calendar.title }} />
        <Stack.Screen name="more/notifications" options={{ title: messages.more.notificationSettings }} />
        <Stack.Screen name="more/language" options={{ title: messages.language.title }} />
        <Stack.Screen name="more/backup" options={{ title: messages.backup.title }} />
        <Stack.Screen name="more/reports" options={{ title: messages.pdf.reportsTitle }} />
        <Stack.Screen name="more/privacy" options={{ title: messages.legal.privacy.title }} />
        <Stack.Screen name="more/terms" options={{ title: messages.legal.terms.title }} />
        <Stack.Screen name="more/disclaimer" options={{ title: messages.legal.disclaimer.title }} />
        <Stack.Screen name="more/about" options={{ title: messages.legal.about.title }} />
      </Stack>
    </>
  );
}
