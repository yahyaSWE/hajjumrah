import { Stack } from 'expo-router';
import { COLORS } from '@/lib/constants';

export default function DuaLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.background },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontFamily: 'Inter-Variable', fontWeight: '600', fontSize: 18, color: COLORS.text },
        headerShadowVisible: false,
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Åkallelser' }} />
      <Stack.Screen name="[categoryId]" options={{ title: '' }} />
    </Stack>
  );
}
