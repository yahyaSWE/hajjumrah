import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { Section, Subsection } from '@/lib/types';

export function useSections() {
  return useQuery<Section[]>({
    queryKey: ['sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });
}

export function useSubsections(sectionSlug: string) {
  return useQuery<Subsection[]>({
    queryKey: ['subsections', sectionSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subsections')
        .select('*, section:sections!inner(slug)')
        .eq('sections.slug', sectionSlug)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
    enabled: !!sectionSlug,
  });
}
