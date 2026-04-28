import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';
import type { UserTaskWithTemplate, PreparationCategory } from '@/lib/types';

const CATEGORY_ICONS: Record<PreparationCategory, string> = {
  andlig: 'heart',
  dokument: 'document-text',
  halsa: 'medkit',
  packning: 'bag-handle',
  kunskap: 'school',
  praktiskt: 'briefcase',
};

const CATEGORY_COLORS: Record<PreparationCategory, string> = {
  andlig: '#E8B4B8',
  dokument: '#93C5FD',
  halsa: '#86EFAC',
  packning: '#FCD34D',
  kunskap: '#C4B5FD',
  praktiskt: '#FDA4AF',
};

interface TaskItemProps {
  task: UserTaskWithTemplate;
  onToggle: (taskId: string, isCompleted: boolean) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  const category = task.template.category;
  const iconName = (task.template.icon_name || CATEGORY_ICONS[category]) as any;
  const categoryColor = CATEGORY_COLORS[category];

  const dueDate = new Date(task.due_date);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  let dueLabel: string;
  let dueColor: string = COLORS.textSecondary;
  if (task.is_completed) {
    dueLabel = 'Avklarad';
    dueColor = COLORS.success;
  } else if (diffDays < 0) {
    dueLabel = `${Math.abs(diffDays)} dagar försenad`;
    dueColor = COLORS.error;
  } else if (diffDays === 0) {
    dueLabel = 'Idag';
    dueColor = COLORS.accent;
  } else if (diffDays === 1) {
    dueLabel = 'Imorgon';
    dueColor = COLORS.accent;
  } else if (diffDays <= 7) {
    dueLabel = `Om ${diffDays} dagar`;
  } else if (diffDays <= 30) {
    dueLabel = `Om ${Math.ceil(diffDays / 7)} veckor`;
  } else {
    dueLabel = `Om ${Math.ceil(diffDays / 30)} månader`;
  }

  return (
    <TouchableOpacity
      style={[styles.container, task.is_completed && styles.containerCompleted]}
      onPress={() => onToggle(task.id, !task.is_completed)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, task.is_completed && styles.checkboxChecked]}>
        {task.is_completed && (
          <Ionicons name="checkmark" size={16} color={COLORS.background} />
        )}
      </View>

      <View style={styles.iconContainer}>
        <View style={[styles.icon, { backgroundColor: categoryColor + '20' }]}>
          <Ionicons name={iconName} size={18} color={categoryColor} />
        </View>
      </View>

      <View style={styles.textContainer}>
        <ThemedText
          variant="body"
          style={[styles.title, task.is_completed && styles.titleCompleted]}
        >
          {task.template.title}
        </ThemedText>
        {task.template.description && (
          <ThemedText
            variant="caption"
            color={COLORS.textSecondary}
            numberOfLines={2}
          >
            {task.template.description}
          </ThemedText>
        )}
        <ThemedText variant="caption" color={dueColor} style={styles.dueLabel}>
          {dueLabel}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: SPACING.sm,
  },
  containerCompleted: {
    opacity: 0.6,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.textMuted,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: COLORS.success,
    borderColor: COLORS.success,
  },
  iconContainer: {
    marginTop: 2,
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: '500',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textMuted,
  },
  dueLabel: {
    marginTop: 2,
    fontWeight: '500',
  },
});
