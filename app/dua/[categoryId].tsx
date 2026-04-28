import { ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useDuas, useDuaCategories } from '@/hooks/useDua';
import { DuaCard } from '@/components/dua/DuaCard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

export default function DuaCategoryDetail() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const { data: categories } = useDuaCategories();
  const { data: duas, isLoading, error, refetch } = useDuas(categoryId ?? '');

  const category = categories?.find((c) => c.id === categoryId);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView onRetry={refetch} />;

  return (
    <>
      <Stack.Screen options={{ title: category?.title ?? 'Åkallelser' }} />
      <BackgroundPattern>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {(!duas || duas.length === 0) && (
            <ThemedText variant="body" style={styles.empty}>Åkallelser kommer snart...</ThemedText>
          )}

          {duas?.map((dua) => (
            <DuaCard
              key={dua.id}
              id={dua.id}
              title={dua.title}
              arabicText={dua.arabic_text}
              transliteration={dua.transliteration}
              swedishTranslation={dua.swedish_translation}
              contextNote={dua.context_note}
            />
          ))}
        </ScrollView>
      </BackgroundPattern>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: SPACING.xl },
});
