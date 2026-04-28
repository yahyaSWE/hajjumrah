import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import type { UserTaskWithTemplate, PreparationTemplate, UserTask } from '@/lib/types';

export type TaskPhase = 'overdue' | 'this_week' | '2_4_weeks' | '1_2_months' | '3_plus_months' | 'completed';

export interface PhaseGroup {
  phase: TaskPhase;
  label: string;
  tasks: UserTaskWithTemplate[];
}

function computeDueDate(departureDate: string, weeksBefore: number): string {
  const dep = new Date(departureDate);
  dep.setDate(dep.getDate() - weeksBefore * 7);
  return dep.toISOString().split('T')[0];
}

function getPhase(dueDate: string, isCompleted: boolean): TaskPhase {
  if (isCompleted) return 'completed';

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  const diffDays = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays <= 7) return 'this_week';
  if (diffDays <= 28) return '2_4_weeks';
  if (diffDays <= 60) return '1_2_months';
  return '3_plus_months';
}

const PHASE_LABELS: Record<TaskPhase, string> = {
  overdue: 'Försenade',
  this_week: 'Denna vecka',
  '2_4_weeks': '2–4 veckor',
  '1_2_months': '1–2 månader',
  '3_plus_months': '3+ månader',
  completed: 'Avklarade',
};

const PHASE_ORDER: TaskPhase[] = ['overdue', 'this_week', '2_4_weeks', '1_2_months', '3_plus_months', 'completed'];

export function usePreparationTasks(travelPlanId: string | undefined, departureDate: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['preparation-tasks', travelPlanId],
    queryFn: async (): Promise<PhaseGroup[]> => {
      if (!user || !travelPlanId || !departureDate) return [];

      // Hämta user_tasks med templates
      const { data: userTasks, error: tasksError } = await supabase
        .from('user_tasks')
        .select('*')
        .eq('travel_plan_id', travelPlanId);

      if (tasksError) throw tasksError;

      const { data: templates, error: templatesError } = await supabase
        .from('preparation_templates')
        .select('*')
        .order('sort_order');

      if (templatesError) throw templatesError;

      // Koppla ihop tasks med templates
      const templateMap = new Map<string, PreparationTemplate>();
      (templates || []).forEach((t) => templateMap.set(t.id, t as PreparationTemplate));

      const enrichedTasks: UserTaskWithTemplate[] = (userTasks || []).map((task) => {
        const template = templateMap.get(task.template_id)!;
        const due_date = computeDueDate(departureDate, template.weeks_before_departure);
        return {
          ...(task as UserTask),
          template,
          due_date,
        };
      });

      // Sortera efter förfallodatum
      enrichedTasks.sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());

      // Gruppera i faser
      const groups = new Map<TaskPhase, UserTaskWithTemplate[]>();
      PHASE_ORDER.forEach((phase) => groups.set(phase, []));

      enrichedTasks.forEach((task) => {
        const phase = getPhase(task.due_date, task.is_completed);
        groups.get(phase)!.push(task);
      });

      return PHASE_ORDER
        .filter((phase) => groups.get(phase)!.length > 0)
        .map((phase) => ({
          phase,
          label: PHASE_LABELS[phase],
          tasks: groups.get(phase)!,
        }));
    },
    enabled: !!user && !!travelPlanId && !!departureDate,
  });
}

export function useTaskStats(travelPlanId: string | undefined, departureDate: string | undefined) {
  const { data: phases } = usePreparationTasks(travelPlanId, departureDate);

  if (!phases) return { total: 0, completed: 0, overdue: 0 };

  let total = 0;
  let completed = 0;
  let overdue = 0;

  phases.forEach((group) => {
    total += group.tasks.length;
    if (group.phase === 'completed') completed += group.tasks.length;
    if (group.phase === 'overdue') overdue += group.tasks.length;
  });

  return { total, completed, overdue };
}
