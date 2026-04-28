import React, { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { requestPermissions } from '@/lib/notifications';
import { useAuth } from '@/providers/AuthProvider';

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  const responseListener = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    if (user) {
      requestPermissions();
    }
  }, [user]);

  useEffect(() => {
    // Lyssna på tappade notiser
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen = response.notification.request.content.data?.screen;
        if (screen && typeof screen === 'string') {
          router.push(`/${screen}` as any);
        }
      }
    );

    return () => {
      if (responseListener.current) {
        responseListener.current.remove();
      }
    };
  }, []);

  return <>{children}</>;
}
