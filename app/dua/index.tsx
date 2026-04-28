import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDuaCategories } from '@/hooks/useDua';
import { SectionCard } from '@/components/content/SectionCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

export default function DuaIndex() {
  const { data, isLoading, error, refetch } = useDuaCategories();
  const router = useRouter();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView onRetry={refetch} />;

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="bodySmall" style={styles.intro}>
          Åkallelser och åminnelser för pilgrimsfärden.
        </ThemedText>

        {(!data || data.length === 0) && (
          <ThemedText variant="body" style={styles.empty}>Åkallelser kommer snart...</ThemedText>
        )}

        {data?.map((cat) => (
          <SectionCard
            key={cat.id}
            title={cat.title}
            description={cat.description}
            onPress={() => router.push(`/dua/${cat.id}` as any)}
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
