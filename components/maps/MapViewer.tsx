import { View, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

interface MapViewerProps {
  imageUrl: string;
  title: string;
  description?: string | null;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function MapViewer({ imageUrl, title, description }: MapViewerProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        contentFit="contain"
        transition={200}
      />
      <View style={styles.info}>
        <ThemedText variant="h3" onCard>{title}</ThemedText>
        {description && (
          <ThemedText variant="bodySmall" onCard>{description}</ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  image: {
    width: SCREEN_WIDTH - SPACING.lg * 2,
    height: (SCREEN_WIDTH - SPACING.lg * 2) * 0.75,
  },
  info: {
    padding: SPACING.md,
  },
});
