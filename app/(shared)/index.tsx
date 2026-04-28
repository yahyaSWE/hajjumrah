import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SectionCard } from '@/components/content/SectionCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

const ITEMS = [
  { slug: 'intro', title: 'Introduktion', description: 'Pilgrimsfärdens religiösa betydelse', route: '/(shared)/intro' },
  { slug: 'travel-prep', title: 'Förberedelser inför resan', description: 'Råd och tips innan avresa', route: '/(shared)/travel-prep' },
  { slug: 'talbiyah', title: 'Talbiyah', description: 'Text, uttal och betydelse', route: '/(shared)/talbiyah' },
  { slug: 'common-dua', title: 'Gemensamma åkallelser', description: 'Dhikr som gäller både Hajj och Umrah', route: '/(shared)/common-dua' },
] as const;

export default function SharedIndex() {
  const router = useRouter();

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="bodySmall" style={styles.intro}>
          Gemensamt innehåll för Hajj och Umrah.
        </ThemedText>

        {ITEMS.map((item) => (
          <SectionCard
            key={item.slug}
            title={item.title}
            description={item.description}
            iconName={item.slug}
            onPress={() => router.push(item.route as any)}
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
});
