import { Stack } from 'expo-router';
import { COLORS } from '@/lib/constants';

export default function SharedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontFamily: 'Inter-Regular', fontWeight: '600', fontSize: 18, color: COLORS.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Förberedelser' }} />
      <Stack.Screen name="intro" options={{ title: 'Introduktion' }} />
      <Stack.Screen name="travel-prep" options={{ title: 'Förberedelser' }} />
      <Stack.Screen name="talbiyah" options={{ title: 'Talbiyah' }} />
      <Stack.Screen name="common-dua" options={{ title: 'Gemensamma åkallelser' }} />
    </Stack>
  );
}
