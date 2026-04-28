import { View, StyleSheet } from 'react-native';
import { useContentPages } from '@/hooks/useContent';
import { ContentRenderer } from './ContentRenderer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

interface ContentScreenProps {
  sectionSlug: string;
  subsectionSlug: string;
}

export function ContentScreen({ sectionSlug, subsectionSlug }: ContentScreenProps) {
  const { data, isLoading, error, refetch } = useContentPages(sectionSlug, subsectionSlug);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorView onRetry={refetch} />;

  const firstPageId = data?.[0]?.id;
  const combinedContent = data?.map((page) => `## ${page.title}\n\n${page.body}`).join('\n\n---\n\n') ?? '';

  if (!combinedContent) {
    return (
      <BackgroundPattern>
        <ContentRenderer content="*Innehåll kommer snart...*" />
      </BackgroundPattern>
    );
  }

  return (
    <BackgroundPattern>
      <View style={styles.container}>
        {firstPageId && (
          <View style={styles.favoriteRow}>
            <FavoriteButton
              itemType="content_page"
              itemId={firstPageId}
              size={24}
            />
          </View>
        )}
        <ContentRenderer content={combinedContent} />
      </View>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  favoriteRow: {
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
  },
});
