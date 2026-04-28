import { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';
import type { TaskPhase } from '@/hooks/usePreparationTasks';

const PHASE_ICONS: Record<TaskPhase, string> = {
  overdue: 'flash',
  this_week: 'time',
  '2_4_weeks': 'calendar',
  '1_2_months': 'calendar-outline',
  '3_plus_months': 'hourglass-outline',
  completed: 'checkmark-circle',
};

const PHASE_COLORS: Record<TaskPhase, string> = {
  overdue: COLORS.accent,
  this_week: COLORS.accent,
  '2_4_weeks': COLORS.text,
  '1_2_months': COLORS.textSecondary,
  '3_plus_months': COLORS.textMuted,
  completed: COLORS.success,
};

interface PhaseSectionProps {
  phase: TaskPhase;
  label: string;
  totalTasks: number;
  completedTasks: number;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export function PhaseSection({
  phase,
  label,
  totalTasks,
  completedTasks,
  defaultExpanded = true,
  children,
}: PhaseSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const iconName = PHASE_ICONS[phase] as any;
  const color = PHASE_COLORS[phase];
  const progress = totalTasks > 0 ? completedTasks / totalTasks : 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name={iconName} size={20} color={color} />
          <ThemedText variant="h3" color={color}>{label}</ThemedText>
        </View>
        <View style={styles.headerRight}>
          <ThemedText variant="caption" color={COLORS.textSecondary}>
            {phase === 'completed' ? totalTasks : `${completedTasks}/${totalTasks}`}
          </ThemedText>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={COLORS.textMuted}
          />
        </View>
      </TouchableOpacity>

      {phase !== 'completed' && totalTasks > 0 && (
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${progress * 100}%`, backgroundColor: color },
            ]}
          />
        </View>
      )}

      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  progressBar: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: SPACING.sm,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  content: {
    gap: SPACING.sm,
  },
});
