import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider';
import { useActiveTravelPlan } from '@/hooks/useTravelPlan';
import { useTaskStats } from '@/hooks/usePreparationTasks';
import { ThemedText } from '@/components/ui/ThemedText';
import { GoldCard } from '@/components/ui/GoldCard';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { CountdownCard } from '@/components/plan/CountdownCard';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

export default function PlanDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: plan, isLoading } = useActiveTravelPlan();
  const stats = useTaskStats(plan?.id, plan?.departure_date);

  if (isLoading) return <LoadingSpinner />;

  if (!plan) {
    return (
      <BackgroundPattern>
        <View style={styles.emptyContainer}>
          <Ionicons name="airplane-outline" size={64} color={COLORS.accent} />
          <ThemedText variant="h2" style={styles.emptyTitle}>
            Ingen reseplan ännu
          </ThemedText>
          <ThemedText variant="body" color={COLORS.textSecondary} style={styles.emptyText}>
            Skapa din personliga reseplan och få en skräddarsydd förberedelseplan med påminnelser.
          </ThemedText>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => router.push('/plan/create')}
          >
            <Ionicons name="add-circle-outline" size={22} color={COLORS.background} />
            <ThemedText variant="body" color={COLORS.background} style={styles.createButtonText}>
              Skapa reseplan
            </ThemedText>
          </TouchableOpacity>
        </View>
      </BackgroundPattern>
    );
  }

  const pilgrimageLabel = plan.pilgrimage_type === 'hajj' ? 'Hajj' : 'Umrah';

  return (
    <BackgroundPattern>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <CountdownCard
          departureDate={plan.departure_date}
          pilgrimageType={plan.pilgrimage_type}
        />

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <ThemedText variant="h1" color={COLORS.accent}>{stats.completed}</ThemedText>
            <ThemedText variant="caption" color={COLORS.textSecondary}>Avklarade</ThemedText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <ThemedText variant="h1" color={COLORS.text}>{stats.total - stats.completed}</ThemedText>
            <ThemedText variant="caption" color={COLORS.textSecondary}>Återstår</ThemedText>
          </View>
          {stats.overdue > 0 && (
            <>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <ThemedText variant="h1" color={COLORS.error}>{stats.overdue}</ThemedText>
                <ThemedText variant="caption" color={COLORS.textSecondary}>Försenade</ThemedText>
              </View>
            </>
          )}
        </View>

        <GoldCard
          onPress={() => router.push('/plan/schedule')}
          style={styles.menuCard}
        >
          <View style={styles.menuRow}>
            <View style={styles.menuIcon}>
              <Ionicons name="list-outline" size={22} color={COLORS.white} />
            </View>
            <View style={styles.menuText}>
              <ThemedText variant="h3" color={COLORS.background}>Förberedelser</ThemedText>
              <ThemedText variant="caption" color={COLORS.background}>
                {stats.completed} av {stats.total} klara
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.background} />
          </View>
        </GoldCard>

        <TouchableOpacity
          style={styles.settingsCard}
          onPress={() => router.push('/plan/favorites' as any)}
        >
          <View style={styles.menuRow}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.surfaceElevated }]}>
              <Ionicons name="bookmark" size={22} color={COLORS.accent} />
            </View>
            <View style={styles.menuText}>
              <ThemedText variant="h3">Favoriter</ThemedText>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Sparade åkallelser & sidor
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsCard}
          onPress={() => router.push('/plan/settings')}
        >
          <View style={styles.menuRow}>
            <View style={[styles.menuIcon, { backgroundColor: COLORS.surfaceElevated }]}>
              <Ionicons name="settings-outline" size={22} color={COLORS.accent} />
            </View>
            <View style={styles.menuText}>
              <ThemedText variant="h3">Inställningar</ThemedText>
              <ThemedText variant="caption" color={COLORS.textSecondary}>
                Profil, påminnelser & konto
              </ThemedText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
    gap: SPACING.md,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    lineHeight: 24,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    backgroundColor: COLORS.accent,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.md,
  },
  createButtonText: {
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.lg,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
    gap: SPACING.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.border,
  },
  menuCard: {
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  settingsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
