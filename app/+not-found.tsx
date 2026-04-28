import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING } from '@/lib/constants';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Sidan hittades inte' }} />
      <View style={styles.container}>
        <ThemedText variant="h1">404</ThemedText>
        <ThemedText variant="body" style={styles.text}>Denna sida finns inte.</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText variant="body" color={COLORS.accent}>Tillbaka till startsidan</ThemedText>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  text: {
    marginTop: SPACING.sm,
    textAlign: 'center',
  },
  link: {
    marginTop: SPACING.lg,
  },
});
