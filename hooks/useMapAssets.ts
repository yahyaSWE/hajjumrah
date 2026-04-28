import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import type { MapAsset } from '@/lib/types';

export function useMapAssets() {
  return useQuery<MapAsset[]>({
    queryKey: ['map-assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('map_assets')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return data;
    },
  });
}
