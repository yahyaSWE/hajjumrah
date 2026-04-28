import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';
import { scheduleDepartureCountdown, cancelAllReminders } from '@/lib/notifications';
import type { TravelPlan } from '@/lib/types';

export function useActiveTravelPlan() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['travel-plan', user?.id],
    queryFn: async (): Promise<TravelPlan | null> => {
      if (!user) return null;

      const { data, error } = await supabase
        .from('travel_plans')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
}

export function useCreateTravelPlan() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      pilgrimageType,
      departureDate,
      returnDate,
    }: {
      pilgrimageType: 'hajj' | 'umrah';
      departureDate: string;
      returnDate?: string;
    }) => {
      if (!user) throw new Error('Ej inloggad');

      // Inaktivera befintliga planer
      await supabase
        .from('travel_plans')
        .update({ is_active: false })
        .eq('user_id', user.id)
        .eq('is_active', true);

      // Skapa ny plan
      const { data: plan, error: planError } = await supabase
        .from('travel_plans')
        .insert({
          user_id: user.id,
          pilgrimage_type: pilgrimageType,
          departure_date: departureDate,
          return_date: returnDate || null,
        })
        .select()
        .single();

      if (planError) throw planError;

      // Hämta relevanta templates
      const { data: templates, error: templatesError } = await supabase
        .from('preparation_templates')
        .select('*')
        .in('pilgrimage_type', [pilgrimageType, 'both']);

      if (templatesError) throw templatesError;

      // Skapa user_tasks för varje template
      if (templates && templates.length > 0) {
        const tasks = templates.map((t) => ({
          user_id: user.id,
          travel_plan_id: plan.id,
          template_id: t.id,
        }));

        const { error: tasksError } = await supabase
          .from('user_tasks')
          .insert(tasks);

        if (tasksError) throw tasksError;
      }

      // Schemalägga avresenotiser
      scheduleDepartureCountdown(departureDate, pilgrimageType).catch(() => {});

      return plan as TravelPlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-plan'] });
      queryClient.invalidateQueries({ queryKey: ['preparation-tasks'] });
    },
  });
}

export function useUpdateTravelPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      planId,
      departureDate,
      returnDate,
    }: {
      planId: string;
      departureDate: string;
      returnDate?: string;
    }) => {
      const { data, error } = await supabase
        .from('travel_plans')
        .update({
          departure_date: departureDate,
          return_date: returnDate || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', planId)
        .select()
        .single();

      if (error) throw error;
      return data as TravelPlan;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-plan'] });
      queryClient.invalidateQueries({ queryKey: ['preparation-tasks'] });
    },
  });
}

export function useDeleteTravelPlan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (planId: string) => {
      const { error } = await supabase
        .from('travel_plans')
        .delete()
        .eq('id', planId);

      if (error) throw error;

      // Avbryt alla notiser
      cancelAllReminders().catch(() => {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['travel-plan'] });
      queryClient.invalidateQueries({ queryKey: ['preparation-tasks'] });
    },
  });
}
