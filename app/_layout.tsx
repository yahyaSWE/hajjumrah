import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { QueryProvider } from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';
import { NotificationProvider } from '@/providers/NotificationProvider';
import { COLORS } from '@/lib/constants';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Amiri-Regular': require('../assets/fonts/Amiri-Regular.ttf'),
    'Amiri-Bold': require('../assets/fonts/Amiri-Bold.ttf'),
    'Inter-Variable': require('../assets/fonts/Inter-Variable.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <QueryProvider>
        <NotificationProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: COLORS.background },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
              fontFamily: 'Inter-Variable',
              fontWeight: '600',
              fontSize: 18,
              color: COLORS.text,
            },
            headerShadowVisible: false,
            contentStyle: { backgroundColor: COLORS.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(shared)" options={{ headerShown: false }} />
          <Stack.Screen name="hajj" options={{ headerShown: false }} />
          <Stack.Screen name="umrah" options={{ headerShown: false }} />
          <Stack.Screen name="dua" options={{ headerShown: false }} />
          <Stack.Screen name="maps" options={{ headerShown: false }} />
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="plan" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        </NotificationProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
