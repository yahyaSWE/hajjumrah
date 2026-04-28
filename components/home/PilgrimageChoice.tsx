import { View, Pressable, StyleSheet, ImageSourcePropType } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { ThemedText } from '@/components/ui/ThemedText';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PilgrimageChoiceProps {
  title: string;
  subtitle: string;
  iconName?: keyof typeof Ionicons.glyphMap;
  iconImage?: ImageSourcePropType;
  onPress: () => void;
  backgroundImage?: ImageSourcePropType;
}

export function PilgrimageChoice({ title, subtitle, iconName, iconImage, onPress, backgroundImage }: PilgrimageChoiceProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => { scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
      style={[styles.card, animatedStyle]}
    >
      {/* Gold gradient base */}
      <LinearGradient
        colors={['#C8A84E', '#D4B86A', '#E8D08C', '#D4B86A', '#A68B3C']}
        locations={[0, 0.25, 0.5, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.absoluteFill}
      />
      {/* Background image - visible top-left, fading to bottom-right */}
      {backgroundImage && (
        <View style={styles.imageContainer}>
          <Image
            source={backgroundImage}
            style={styles.backgroundImage}
            contentFit="cover"
            contentPosition="top left"
          />
          {/* Fade from transparent top-left to solid gold bottom-right */}
          <LinearGradient
            colors={['rgba(200, 168, 78, 0.2)', 'rgba(200, 168, 78, 0.7)', '#C8A84E']}
            locations={[0, 0.4, 0.75]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.absoluteFill}
          />
          {/* Extra fade from bottom to ensure text readability */}
          <LinearGradient
            colors={['rgba(200, 168, 78, 0)', 'rgba(200, 168, 78, 0.85)', '#C8A84E']}
            locations={[0, 0.5, 0.8]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.absoluteFill}
          />
        </View>
      )}
      {/* Shine overlay */}
      <LinearGradient
        colors={['rgba(255,255,255,0.25)', 'rgba(255,255,255,0)', 'rgba(255,255,255,0.15)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={styles.absoluteFill}
      />
      {/* Light catch */}
      <View style={styles.lightCatch}>
        <LinearGradient
          colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          {iconImage ? (
            <Image source={iconImage} style={styles.iconImage} contentFit="contain" />
          ) : (
            <Ionicons name={iconName!} size={36} color={COLORS.white} />
          )}
        </View>
        <ThemedText variant="h2" color={COLORS.background} style={styles.title}>{title}</ThemedText>
        <ThemedText variant="bodySmall" color={COLORS.background} style={styles.subtitle}>{subtitle}</ThemedText>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#B8960C',
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(232, 208, 140, 0.5)',
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  lightCatch: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    opacity: 0.8,
  },
  content: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    paddingHorizontal: SPACING.lg,
  },
  iconContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    overflow: 'hidden',
  },
  iconImage: {
    width: 48,
    height: 48,
  },
  title: {
    textAlign: 'center',
    marginBottom: SPACING.xs,
  },
  subtitle: {
    textAlign: 'center',
  },
});
