import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavoriteDuas, useFavoriteContent } from '@/hooks/useFavorites';
import { DuaCard } from '@/components/dua/DuaCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

export default function FavoritesScreen() {
  const router = useRouter();
  const { data: favDuas, isLoading: loadingDuas } = useFavoriteDuas();
  const { data: favContent, isLoading: loadingContent } = useFavoriteContent();

  const isLoading = loadingDuas || loadingContent;
  const hasFavorites = (favDuas && favDuas.length > 0) || (favContent && favContent.length > 0);

  if (isLoading) return <LoadingSpinner />;

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {!hasFavorites && (
          <View style={styles.emptyContainer}>
            <Ionicons name="bookmark-outline" size={64} color={COLORS.textMuted} />
            <ThemedText variant="h2" style={styles.emptyTitle}>
              Inga favoriter ännu
            </ThemedText>
            <ThemedText variant="body" color={COLORS.textSecondary} style={styles.emptyText}>
              Tryck på bokmärkes-ikonen på åkallelser och innehållssidor för att spara dem här.
            </ThemedText>
          </View>
        )}

        {favContent && favContent.length > 0 && (
          <View style={styles.section}>
            <ThemedText variant="h2" style={styles.sectionTitle}>
              Sparade sidor
            </ThemedText>
            {favContent.map((page: any) => {
              const sectionSlug = page.subsection?.section?.slug;
              const subsectionSlug = page.subsection?.slug;

              return (
                <TouchableOpacity
                  key={page.id}
                  style={styles.contentCard}
                  onPress={() => {
                    if (sectionSlug && subsectionSlug) {
                      router.push(`/${sectionSlug}/${subsectionSlug}` as any);
                    }
                  }}
                >
                  <View style={styles.contentCardIcon}>
                    <Ionicons name="document-text" size={20} color={COLORS.accent} />
                  </View>
                  <View style={styles.contentCardText}>
                    <ThemedText variant="body" numberOfLines={1}>
                      {page.title}
                    </ThemedText>
                    <ThemedText variant="caption" color={COLORS.textSecondary} numberOfLines={1}>
                      {page.subsection?.section?.title} — {page.subsection?.title}
                    </ThemedText>
                  </View>
                  <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {favDuas && favDuas.length > 0 && (
          <View style={styles.section}>
            <ThemedText variant="h2" style={styles.sectionTitle}>
              Sparade åkallelser
            </ThemedText>
            {favDuas.map((dua: any) => (
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
          </View>
        )}
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xxl * 2,
    gap: SPACING.md,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    marginBottom: SPACING.md,
  },
  contentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.md,
  },
  contentCardIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCardText: {
    flex: 1,
    gap: 2,
  },
});
