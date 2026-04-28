import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { SectionCard } from '@/components/content/SectionCard';
import { ThemedText } from '@/components/ui/ThemedText';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { COLORS, SPACING } from '@/lib/constants';

const SUBSECTIONS = [
  { slug: 'villkor', title: 'Villkor för Hajj', description: 'Vad som gör Hajj obligatoriskt och giltigt', route: '/hajj/villkor' },
  { slug: 'pelare', title: 'Pelare i Hajj', description: 'Moment vars utelämnande gör Hajj ogiltigt', route: '/hajj/pelare' },
  { slug: 'obligatoriska', title: 'Obligatoriska moment', description: 'Moment som kan kompenseras med offer', route: '/hajj/obligatoriska' },
  { slug: 'forbjudet-ihram', title: 'Förbjudet under Ihram', description: 'Vad som är förbjudet i Ihram-tillståndet', route: '/hajj/forbjudet-ihram' },
  { slug: 'steg-for-steg', title: 'Steg-för-steg-guide', description: 'Hur Hajj utförs dag för dag', route: '/hajj/steg-for-steg' },
  { slug: 'faq', title: 'Frågor & svar', description: 'Vanliga frågor om Hajj', route: '/hajj/faq' },
] as const;

export default function HajjIndex() {
  const router = useRouter();

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ThemedText variant="bodySmall" style={styles.intro}>
          Fullständig vägledning för den stora pilgrimsfärden.
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
