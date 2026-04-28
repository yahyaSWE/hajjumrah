import { ScrollView, StyleSheet } from 'react-native';
import { useFAQs } from '@/hooks/useContent';
import { Accordion } from '@/components/ui/Accordion';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

export default function UmrahFAQ() {
  const { data, isLoading, error, refetch } = useFAQs('umrah');

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView onRetry={refetch} />;

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {(!data || data.length === 0) && (
          <ThemedText variant="body" style={styles.empty}>Frågor kommer snart...</ThemedText>
        )}

        {data?.map((faq) => (
          <Accordion key={faq.id} question={faq.question} answer={faq.answer} />
        ))}
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: SPACING.xl },
});
