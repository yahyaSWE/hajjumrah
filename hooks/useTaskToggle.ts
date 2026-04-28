import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export function useTaskToggle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      isCompleted,
    }: {
      taskId: string;
      isCompleted: boolean;
    }) => {
      const { error } = await supabase
        .from('user_tasks')
        .update({
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .eq('id', taskId);

      if (error) throw error;
    },
    onMutate: async ({ taskId, isCompleted }) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: ['preparation-tasks'] });

      queryClient.setQueriesData(
        { queryKey: ['preparation-tasks'] },
        (old: any) => {
          if (!old) return old;
          return old.map((group: any) => ({
            ...group,
            tasks: group.tasks.map((task: any) =>
              task.id === taskId
                ? { ...task, is_completed: isCompleted, completed_at: isCompleted ? new Date().toISOString() : null }
                : task
            ),
          }));
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['preparation-tasks'] });
    },
  });
}
