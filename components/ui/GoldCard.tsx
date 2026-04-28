import { View, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { BORDER_RADIUS } from '@/lib/constants';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GoldCardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

export function GoldCard({ children, onPress, style }: GoldCardProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPressIn={() => { if (onPress) scale.value = withSpring(0.97); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      onPress={onPress}
      style={[styles.card, animatedStyle, style]}
    >
      {/* Gold tint base */}
      <LinearGradient
        colors={['rgba(200, 168, 78, 0.4)', 'rgba(212, 184, 106, 0.25)', 'rgba(166, 139, 60, 0.35)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.absoluteFill}
      />
      {/* Frosted glass blur */}
      <BlurView intensity={60} tint="light" style={styles.absoluteFill} />
      {/* Gold shimmer overlay */}
      <LinearGradient
        colors={['rgba(212, 184, 106, 0.3)', 'rgba(255,255,255,0.1)', 'rgba(200, 168, 78, 0.2)']}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.absoluteFill}
      />
      {/* Light catch / shine in corner */}
      <View style={styles.lightCatch}>
        <LinearGradient
          colors={['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>
      {children}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.lg,
    overflow: 'hidden',
    backgroundColor: 'rgba(200, 168, 78, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
  lightCatch: {
    position: 'absolute',
    top: -20,
    right: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    opacity: 0.7,
  },
});
