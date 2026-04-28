import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';
import { FavoriteButton } from '@/components/ui/FavoriteButton';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

interface DuaCardProps {
  id: string;
  title: string;
  arabicText: string;
  transliteration: string;
  swedishTranslation: string;
  contextNote?: string | null;
}

export function DuaCard({
  id,
  title,
  arabicText,
  transliteration,
  swedishTranslation,
  contextNote,
}: DuaCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText variant="h3" color={COLORS.accent} style={styles.headerTitle}>{title}</ThemedText>
        <FavoriteButton itemType="dua" itemId={id} color={COLORS.accent} />
      </View>

      <View style={styles.arabicContainer}>
        <ThemedText variant="arabicLarge" color={COLORS.textOnCard}>{arabicText}</ThemedText>
      </View>

      <View style={styles.divider} />

      <ThemedText variant="body" onCard style={styles.transliteration}>
        {transliteration}
      </ThemedText>

      <ThemedText variant="body" onCard style={styles.translation}>
        {swedishTranslation}
      </ThemedText>

      {contextNote && (
        <View style={styles.contextContainer}>
          <ThemedText variant="caption" color={COLORS.green}>{contextNote}</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderOnCard,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    flex: 1,
  },
  arabicContainer: {
    padding: SPACING.lg,
    backgroundColor: '#F9FAFB',
  },
  divider: {
    height: 3,
    backgroundColor: COLORS.green,
  },
  transliteration: {
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
    fontStyle: 'italic',
    color: COLORS.textSecondaryOnCard,
  },
  translation: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.md,
  },
  contextContainer: {
    padding: SPACING.md,
    paddingTop: 0,
  },
});
