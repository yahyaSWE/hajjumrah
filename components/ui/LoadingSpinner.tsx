import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { COLORS, SPACING } from '@/lib/constants';

interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({ message = 'Laddar...' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.accent} />
      <ThemedText variant="bodySmall" style={styles.text}>{message}</ThemedText>
    </View>
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
    marginTop: SPACING.md,
  },
});
