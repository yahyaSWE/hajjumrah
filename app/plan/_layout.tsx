import { useEffect } from 'react';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { COLORS } from '@/lib/constants';

export default function PlanLayout() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/auth/login');
    }
  }, [user, isLoading]);

  if (isLoading || !user) return null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontFamily: 'Inter-Regular',
          fontWeight: '600',
          fontSize: 18,
          color: COLORS.text,
        },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Min resa' }} />
      <Stack.Screen name="create" options={{ title: 'Skapa reseplan' }} />
      <Stack.Screen name="schedule" options={{ title: 'Förberedelser' }} />
      <Stack.Screen name="settings" options={{ title: 'Inställningar' }} />
      <Stack.Screen name="favorites" options={{ title: 'Favoriter' }} />
    </Stack>
  );
}
