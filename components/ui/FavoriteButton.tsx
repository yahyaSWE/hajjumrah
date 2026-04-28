import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/providers/AuthProvider';
import { useIsFavorite, useToggleFavorite, FavoriteItemType } from '@/hooks/useFavorites';
import { COLORS, SPACING } from '@/lib/constants';

interface FavoriteButtonProps {
  itemType: FavoriteItemType;
  itemId: string;
  size?: number;
  color?: string;
  style?: any;
}

export function FavoriteButton({
  itemType,
  itemId,
  size = 22,
  color,
  style,
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const isFavorite = useIsFavorite(itemType, itemId);
  const toggleFavorite = useToggleFavorite();

  // Visa inte favorit-knappen om ej inloggad
  if (!user) return null;

  const handlePress = () => {
    toggleFavorite.mutate({ itemType, itemId, isFavorite });
  };

  const activeColor = color || COLORS.accent;

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handlePress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Ionicons
        name={isFavorite ? 'bookmark' : 'bookmark-outline'}
        size={size}
        color={isFavorite ? activeColor : COLORS.textMuted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: SPACING.xs,
  },
});
