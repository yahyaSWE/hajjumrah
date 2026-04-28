import { Stack } from 'expo-router';
import { COLORS } from '@/lib/constants';

export default function HajjLayout() {
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
      <Stack.Screen name="index" options={{ title: 'Hajj' }} />
      <Stack.Screen name="villkor" options={{ title: 'Villkor för Hajj' }} />
      <Stack.Screen name="pelare" options={{ title: 'Pelare i Hajj' }} />
      <Stack.Screen name="obligatoriska" options={{ title: 'Obligatoriska moment' }} />
      <Stack.Screen name="forbjudet-ihram" options={{ title: 'Förbjudet under Ihram' }} />
      <Stack.Screen name="steg-for-steg/index" options={{ title: 'Steg för steg' }} />
      <Stack.Screen name="steg-for-steg/[day]" options={{ title: '' }} />
      <Stack.Screen name="faq" options={{ title: 'Frågor & svar' }} />
    </Stack>
  );
}
