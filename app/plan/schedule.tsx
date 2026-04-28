import { View, ScrollView, StyleSheet } from 'react-native';
import { useActiveTravelPlan } from '@/hooks/useTravelPlan';
import { usePreparationTasks } from '@/hooks/usePreparationTasks';
import { useTaskToggle } from '@/hooks/useTaskToggle';
import { CountdownCard } from '@/components/plan/CountdownCard';
import { PhaseSection } from '@/components/plan/PhaseSection';
import { TaskItem } from '@/components/plan/TaskItem';
import { BackgroundPattern } from '@/components/ui/BackgroundPattern';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING } from '@/lib/constants';

export default function ScheduleScreen() {
  const { data: plan } = useActiveTravelPlan();
  const { data: phases, isLoading } = usePreparationTasks(plan?.id, plan?.departure_date);
  const toggleTask = useTaskToggle();

  if (isLoading) return <LoadingSpinner />;

  if (!plan || !phases) {
    return (
      <BackgroundPattern>
        <View style={styles.emptyContainer}>
          <ThemedText variant="body" color={COLORS.textSecondary}>
            Ingen aktiv reseplan hittades.
          </ThemedText>
        </View>
      </BackgroundPattern>
    );
  }

  const handleToggle = (taskId: string, isCompleted: boolean) => {
    toggleTask.mutate({ taskId, isCompleted });
  };

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

        <View style={styles.phases}>
          {phases.map((group) => {
            const completedInGroup = group.tasks.filter((t) => t.is_completed).length;

            return (
              <PhaseSection
                key={group.phase}
                phase={group.phase}
                label={group.label}
                totalTasks={group.tasks.length}
                completedTasks={completedInGroup}
                defaultExpanded={group.phase !== 'completed'}
              >
                {group.tasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                  />
                ))}
              </PhaseSection>
            );
          })}
        </View>
      </ScrollView>
    </BackgroundPattern>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
    gap: SPACING.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.xl,
  },
  phases: {
    gap: SPACING.sm,
  },
});
