import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING } from '@/lib/constants';

interface SectionCardProps {
  title: string;
  description?: string | null;
  iconName?: string;
  onPress: () => void;
}

const ICON_MAP: Record<string, keyof typeof Ionicons.glyphMap> = {
  villkor: 'checkmark-circle-outline',
  pelare: 'shield-checkmark-outline',
  obligatoriska: 'list-outline',
  'forbjudet-ihram': 'close-circle-outline',
  'steg-for-steg': 'footsteps-outline',
  faq: 'help-circle-outline',
  intro: 'book-outline',
  'travel-prep': 'airplane-outline',
  talbiyah: 'megaphone-outline',
  'common-dua': 'heart-outline',
};

export function SectionCard({ title, description, iconName, onPress }: SectionCardProps) {
  const icon = ICON_MAP[iconName ?? ''] ?? 'document-text-outline';

  return (
    <Card onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon} size={24} color={COLORS.white} />
        </View>
        <View style={styles.textContainer}>
          <ThemedText variant="h3" onCard>{title}</ThemedText>
          {description && (
            <ThemedText variant="bodySmall" onCard numberOfLines={2}>{description}</ThemedText>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={COLORS.textMutedOnCard} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  textContainer: {
    flex: 1,
    marginRight: SPACING.sm,
  },
});
