import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SectionCard } from '@/components/content/SectionCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

const SUBSECTIONS = [
  { slug: 'villkor', title: 'Villkor för Umrah', description: 'Förutsättningar för Umrah', route: '/umrah/villkor' },
  { slug: 'pelare', title: 'Pelare i Umrah', description: 'De grundläggande momenten', route: '/umrah/pelare' },
  { slug: 'obligatoriska', title: 'Obligatoriska moment', description: 'Moment som kan kompenseras', route: '/umrah/obligatoriska' },
  { slug: 'forbjudet-ihram', title: 'Förbjudet under Ihram', description: 'Regler under Ihram-tillståndet', route: '/umrah/forbjudet-ihram' },
  { slug: 'steg-for-steg', title: 'Steg-för-steg-guide', description: 'Hur Umrah utförs', route: '/umrah/steg-for-steg' },
  { slug: 'faq', title: 'Frågor & svar', description: 'Vanliga frågor om Umrah', route: '/umrah/faq' },
] as const;

export default function UmrahIndex() {
  const router = useRouter();

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="bodySmall" style={styles.intro}>
          Fullständig vägledning för den lilla pilgrimsfärden.
        </ThemedText>

        {SUBSECTIONS.map((sub) => (
          <SectionCard
            key={sub.slug}
            title={sub.title}
            description={sub.description}
            iconName={sub.slug}
            onPress={() => router.push(sub.route as any)}
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
