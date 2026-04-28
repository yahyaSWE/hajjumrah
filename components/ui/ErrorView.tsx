import { View, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

interface ErrorViewProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorView({ message = 'Något gick fel.', onRetry }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="alert-circle-outline" size={48} color={COLORS.error} />
      <ThemedText variant="body" style={styles.text}>{message}</ThemedText>
      {onRetry && (
        <Pressable onPress={onRetry} style={styles.button}>
          <ThemedText variant="body" color={COLORS.white}>Försök igen</ThemedText>
        </Pressable>
      )}
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
    textAlign: 'center',
  },
  button: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.green,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm + 4,
    borderRadius: BORDER_RADIUS.sm,
  },
});
