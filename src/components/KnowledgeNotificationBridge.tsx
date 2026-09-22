import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import type * as NotificationsModule from 'expo-notifications';

import { enqueueNotificationResponse } from '@/services/knowledgeOpen';

const Notifications: typeof NotificationsModule | null =
  Platform.OS === 'web'
    ? null
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      (require('expo-notifications') as typeof NotificationsModule);

export function KnowledgeNotificationBridge() {
  const router = useRouter();

  useEffect(() => {
    if (!Notifications) return;

    const handle = (response: NotificationsModule.NotificationResponse) => {
      const accepted = enqueueNotificationResponse({
        identifier: response.notification.request.identifier,
        data: response.notification.request.content.data,
      });
      if (accepted) {
        router.replace('/');
      }
    };

    void Notifications.getLastNotificationResponseAsync?.().then((response) => {
      if (response) handle(response);
    });
    const sub = Notifications.addNotificationResponseReceivedListener(handle);
    return () => sub.remove();
  }, [router]);

  return null;
}
