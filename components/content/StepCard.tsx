import { View, StyleSheet } from 'react-native';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING } from '@/lib/constants';

interface StepCardProps {
  stepNumber: number;
  title: string;
  description?: string;
  onPress: () => void;
}

export function StepCard({ stepNumber, title, description, onPress }: StepCardProps) {
  return (
    <Card onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.numberBadge}>
          <ThemedText variant="h3" color={COLORS.white} style={styles.number}>
            {stepNumber}
          </ThemedText>
        </View>
        <View style={styles.textContainer}>
          <ThemedText variant="h3" onCard>{title}</ThemedText>
          {description && (
            <ThemedText variant="bodySmall" onCard numberOfLines={2}>{description}</ThemedText>
          )}
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  numberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  number: {
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
  },
});
