import { View, StyleSheet } from 'react-native';
import { GoldCard } from '@/components/ui/GoldCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING } from '@/lib/constants';

interface CountdownCardProps {
  departureDate: string;
  pilgrimageType: 'hajj' | 'umrah';
}

export function CountdownCard({ departureDate, pilgrimageType }: CountdownCardProps) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const dep = new Date(departureDate);
  const diffDays = Math.max(0, Math.floor((dep.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

  const pilgrimageLabel = pilgrimageType === 'hajj' ? 'Hajj' : 'Umrah';
  const dateLabel = dep.toLocaleDateString('sv-SE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let statusText: string;
  if (diffDays === 0) {
    statusText = 'Idag reser du! Bismillah!';
  } else if (diffDays === 1) {
    statusText = 'Imorgon reser du!';
  } else {
    statusText = `${diffDays} dagar kvar`;
  }

  return (
    <GoldCard style={styles.card}>
      <View style={styles.content}>
        <ThemedText variant="caption" color={COLORS.background} style={styles.label}>
          Din {pilgrimageLabel}
        </ThemedText>
        <ThemedText variant="h1" color={COLORS.background} style={styles.countdown}>
          {statusText}
        </ThemedText>
        <ThemedText variant="bodySmall" color={COLORS.background} style={styles.date}>
          Avresa: {dateLabel}
        </ThemedText>
      </View>
    </GoldCard>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  content: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  label: {
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.8,
  },
  countdown: {
    fontSize: 32,
    fontWeight: '700',
  },
  date: {
    opacity: 0.8,
  },
});
