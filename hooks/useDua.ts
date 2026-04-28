import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { DuaCategory, Dua } from '@/lib/types';

export function useDuaCategories() {
  return useQuery<DuaCategory[]>({
    queryKey: ['dua-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dua_categories')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });
}

export function useDuas(categoryId: string) {
  return useQuery<Dua[]>({
    queryKey: ['duas', categoryId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('duas')
        .select('*')
        .eq('category_id', categoryId)
        .order('sort_order');
      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });
}
