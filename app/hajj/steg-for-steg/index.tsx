import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useContentPages } from '@/hooks/useContent';
import { StepCard } from '@/components/content/StepCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

export default function HajjStegForSteg() {
  const { data, isLoading, error, refetch } = useContentPages('hajj', 'steg-for-steg');
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView onRetry={refetch} />;

  const steps = data?.filter((p) => p.day_number !== null).sort((a, b) => (a.day_number ?? 0) - (b.day_number ?? 0)) ?? [];

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="bodySmall" style={styles.intro}>
          Följ Hajj dag för dag, moment för moment.
        </ThemedText>

        {steps.length === 0 && (
          <ThemedText variant="body" style={styles.empty}>Innehåll kommer snart...</ThemedText>
        )}

        {steps.map((step) => (
          <StepCard
            key={step.id}
            stepNumber={step.day_number!}
            title={step.title}
            onPress={() => router.push(`/hajj/steg-for-steg/${step.slug}` as any)}
          />
        ))}
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: SPACING.xxl },
  intro: { marginBottom: SPACING.sm },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: SPACING.xl },
});
