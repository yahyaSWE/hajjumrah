import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/providers/AuthProvider';

export type FavoriteItemType = 'content_page' | 'dua' | 'faq';

interface Favorite {
  id: string;
  user_id: string;
  item_type: FavoriteItemType;
  item_id: string;
  created_at: string;
}

export function useFavorites(itemType?: FavoriteItemType) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['favorites', user?.id, itemType],
    queryFn: async (): Promise<Favorite[]> => {
      if (!user) return [];

      let query = supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (itemType) {
        query = query.eq('item_type', itemType);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Favorite[];
    },
    enabled: !!user,
  });
}

export function useIsFavorite(itemType: FavoriteItemType, itemId: string) {
  const { data: favorites } = useFavorites();
  return favorites?.some((f) => f.item_type === itemType && f.item_id === itemId) ?? false;
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      itemType,
      itemId,
      isFavorite,
    }: {
      itemType: FavoriteItemType;
      itemId: string;
      isFavorite: boolean;
    }) => {
      if (!user) throw new Error('Ej inloggad');

      if (isFavorite) {
        // Ta bort favorit
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('item_type', itemType)
          .eq('item_id', itemId);

        if (error) throw error;
      } else {
        // Lägg till favorit
        const { error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            item_type: itemType,
            item_id: itemId,
          });

        if (error) throw error;
      }
    },
    onMutate: async ({ itemType, itemId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ['favorites'] });

      queryClient.setQueriesData(
        { queryKey: ['favorites'] },
        (old: any) => {
          if (!old) return old;
          if (isFavorite) {
            return old.filter(
              (f: Favorite) => !(f.item_type === itemType && f.item_id === itemId)
            );
          } else {
            return [
              {
                id: 'temp-' + itemId,
                user_id: '',
                item_type: itemType,
                item_id: itemId,
                created_at: new Date().toISOString(),
              },
              ...old,
            ];
          }
        }
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });
}

// Hämta favorit-duas med full dua-data
export function useFavoriteDuas() {
  const { user } = useAuth();
  const { data: favorites } = useFavorites('dua');

  return useQuery({
    queryKey: ['favorite-duas', user?.id, favorites?.map((f) => f.item_id)],
    queryFn: async () => {
      if (!favorites || favorites.length === 0) return [];

      const ids = favorites.map((f) => f.item_id);
      const { data, error } = await supabase
        .from('duas')
        .select('*')
        .in('id', ids);

      if (error) throw error;
      return data;
    },
    enabled: !!user && !!favorites && favorites.length > 0,
  });
}

// Hämta favorit-content med full data
export function useFavoriteContent() {
  const { user } = useAuth();
  const { data: favorites } = useFavorites('content_page');

  return useQuery({
    queryKey: ['favorite-content', user?.id, favorites?.map((f) => f.item_id)],
    queryFn: async () => {
      if (!favorites || favorites.length === 0) return [];

      const ids = favorites.map((f) => f.item_id);
      const { data, error } = await supabase
        .from('content_pages')
        .select('*, subsection:subsections(slug, title, section:sections(slug, title))')
        .in('id', ids);

      if (error) throw error;
      return data;
    },
    enabled: !!user && !!favorites && favorites.length > 0,
  });
}
