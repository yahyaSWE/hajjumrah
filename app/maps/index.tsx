import { ScrollView, StyleSheet } from 'react-native';
import { useMapAssets } from '@/hooks/useMapAssets';
import { MapViewer } from '@/components/maps/MapViewer';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorView } from '@/components/ui/ErrorView';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

export default function MapsIndex() {
  const { data, isLoading, error, refetch } = useMapAssets();

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
          Kartor och illustrationer över de heliga platserna.
        </ThemedText>

        {(!data || data.length === 0) && (
          <ThemedText variant="body" style={styles.empty}>Kartor kommer snart...</ThemedText>
        )}

        {data?.map((map) => (
          <MapViewer
            key={map.id}
            imageUrl={map.image_url}
            title={map.title}
            description={map.description}
          />
        ))}
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.lg, paddingBottom: SPACING.xxl },
  intro: { marginBottom: SPACING.md },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: SPACING.xl },
});
