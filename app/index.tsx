import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { GoldCard } from '@/components/ui/GoldCard';
import { PilgrimageChoice } from '@/components/home/PilgrimageChoice';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { useAuth } from '@/providers/AuthProvider';
import { useActiveTravelPlan } from '@/hooks/useTravelPlan';
import { useTaskStats } from '@/hooks/usePreparationTasks';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { data: plan } = useActiveTravelPlan();
  const stats = useTaskStats(plan?.id, plan?.departure_date);

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + SPACING.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.headerTextContainer}>
              <ThemedText variant="h1" style={styles.appTitle}>Hajj & Umrah</ThemedText>
              <ThemedText variant="bodySmall" style={styles.appSubtitle}>
                Din guide till pilgrimsfärden
              </ThemedText>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push((user ? '/plan/index' : '/auth/login') as any)}
            >
              <Ionicons
                name={user ? 'person' : 'person-outline'}
                size={20}
                color={user ? COLORS.accent : COLORS.textMuted}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainChoices}>
          <PilgrimageChoice
            title="Hajj"
            subtitle="Den stora pilgrimsfärden"
            iconImage={require('../assets/images/Ramadan Iconic Illustration-01.png')}
            onPress={() => router.push('/hajj')}
            backgroundImage={require('../assets/images/kaaba-hajj.jpg')}
          />
          <PilgrimageChoice
            title="Umrah"
            subtitle="Den lilla pilgrimsfärden"
            iconImage={require('../assets/images/Ramadan Iconic Illustration-14.png')}
            onPress={() => router.push('/umrah')}
            backgroundImage={require('../assets/images/kaaba-umrah.jpg')}
          />
        </View>

        {/* Personlig reseplan */}
        {user && plan ? (
          <GoldCard
            onPress={() => router.push('/plan' as any)}
            style={styles.planCard}
          >
            <View style={styles.planContent}>
              <ThemedText variant="caption" color={COLORS.background} style={styles.planLabel}>
                MIN {plan.pilgrimage_type === 'hajj' ? 'HAJJ' : 'UMRAH'}
              </ThemedText>
              <ThemedText variant="h2" color={COLORS.background}>
                {(() => {
                  const now = new Date(); now.setHours(0,0,0,0);
                  const dep = new Date(plan.departure_date);
                  const diff = Math.max(0, Math.floor((dep.getTime() - now.getTime()) / (1000*60*60*24)));
                  return diff === 0 ? 'Idag!' : `${diff} dagar kvar`;
                })()}
              </ThemedText>
              <ThemedText variant="caption" color={COLORS.background} style={styles.planStats}>
                {stats.completed} av {stats.total} förberedelser klara
              </ThemedText>
            </View>
          </GoldCard>
        ) : user && !plan ? (
          <TouchableOpacity
            style={styles.createPlanCard}
            onPress={() => router.push('/plan/create')}
          >
            <Ionicons name="airplane-outline" size={24} color={COLORS.accent} />
            <View style={styles.createPlanText}>
              <ThemedText variant="h3">Skapa din reseplan</ThemedText>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Få en personlig förberedelseplan med påminnelser
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.loginPromptCard}
            onPress={() => router.push('/auth/login')}
          >
            <Ionicons name="person-outline" size={20} color={COLORS.accent} />
            <ThemedText variant="bodySmall" color={COLORS.textSecondary} style={styles.loginPromptText}>
              Logga in för att skapa din personliga reseplan
            </ThemedText>
            <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
          </TouchableOpacity>
        )}

        <View style={styles.quickLinks}>
          <GoldCard
            onPress={() => router.push('/(shared)')}
            style={styles.quickLinkCard}
          >
            <View style={styles.quickLinkRow}>
              <View style={styles.quickLinkIcon}>
                <Ionicons name="book-outline" size={20} color={COLORS.white} />
              </View>
              <View style={styles.quickLinkText}>
                <ThemedText variant="h3" color={COLORS.background}>Förberedelser</ThemedText>
                <ThemedText variant="caption" color={COLORS.background}>Gemensamt för Hajj & Umrah</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.background} />
            </View>
          </GoldCard>

          <GoldCard
            onPress={() => router.push('/dua')}
            style={styles.quickLinkCard}
          >
            <View style={styles.quickLinkRow}>
              <View style={styles.quickLinkIcon}>
                <Ionicons name="heart-outline" size={20} color={COLORS.white} />
              </View>
              <View style={styles.quickLinkText}>
                <ThemedText variant="h3" color={COLORS.background}>Åkallelser</ThemedText>
                <ThemedText variant="caption" color={COLORS.background}>Du'å & dhikr</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.background} />
            </View>
          </GoldCard>

          <GoldCard
            onPress={() => router.push('/maps')}
            style={styles.quickLinkCard}
          >
            <View style={styles.quickLinkRow}>
              <View style={styles.quickLinkIcon}>
                <Ionicons name="map-outline" size={20} color={COLORS.white} />
              </View>
              <View style={styles.quickLinkText}>
                <ThemedText variant="h3" color={COLORS.background}>Kartor</ThemedText>
                <ThemedText variant="caption" color={COLORS.background}>Heliga platser & rutter</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={18} color={COLORS.background} />
            </View>
          </GoldCard>
        </View>

        <View style={styles.footer}>
          <ThemedText variant="caption" color={COLORS.accent} style={styles.footerText}>
            islam.nu
          </ThemedText>
        </View>
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTextContainer: {
    flex: 1,
  },
  appTitle: {},
  appSubtitle: {
    marginTop: SPACING.xs,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  mainChoices: {
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  planCard: {
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  planContent: {
    alignItems: 'center',
    gap: SPACING.xs,
  },
  planLabel: {
    fontWeight: '600',
    letterSpacing: 1,
    opacity: 0.8,
  },
  planStats: {
    opacity: 0.8,
  },
  createPlanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.accent,
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  createPlanText: {
    flex: 1,
    gap: 2,
  },
  loginPromptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    gap: SPACING.sm,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  loginPromptText: {
    flex: 1,
  },
  quickLinks: {
    gap: SPACING.sm,
  },
  quickLinkCard: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  quickLinkRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quickLinkIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickLinkText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  footer: {
    alignItems: 'center',
    marginTop: SPACING.xl,
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    fontWeight: '600',
  },
});
