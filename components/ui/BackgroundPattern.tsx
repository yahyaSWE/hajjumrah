import { View, StyleSheet } from 'react-native';
import { ThemedText } from './ThemedText';
import { COLORS } from '@/lib/constants';

interface BackgroundPatternProps {
  children: React.ReactNode;
}

export function BackgroundPattern({ children }: BackgroundPatternProps) {
  return (
    <View style={styles.container}>
      <View style={styles.patternLayer}>
        <ThemedText style={styles.calligraphy1}>{'بِسْمِ اللَّهِ'}</ThemedText>
        <ThemedText style={styles.calligraphy2}>{'الرَّحْمَنِ الرَّحِيمِ'}</ThemedText>
        <ThemedText style={styles.calligraphy3}>{'لَبَّيْكَ اللَّهُمَّ'}</ThemedText>
        <ThemedText style={styles.calligraphy4}>{'سُبْحَانَ اللَّهِ'}</ThemedText>
        <ThemedText style={styles.calligraphy5}>{'الْحَمْدُ لِلَّهِ'}</ThemedText>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  patternLayer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  calligraphy1: {
    position: 'absolute',
    top: 60,
    right: -20,
    fontFamily: 'Amiri-Regular',
    fontSize: 80,
    color: 'rgba(255,255,255,0.025)',
    transform: [{ rotate: '-15deg' }],
  },
  calligraphy2: {
    position: 'absolute',
    top: 280,
    left: -40,
    fontFamily: 'Amiri-Regular',
    fontSize: 65,
    color: 'rgba(255,255,255,0.02)',
    transform: [{ rotate: '10deg' }],
  },
  calligraphy3: {
    position: 'absolute',
    top: 500,
    right: -30,
    fontFamily: 'Amiri-Regular',
    fontSize: 70,
    color: 'rgba(255,255,255,0.025)',
    transform: [{ rotate: '-8deg' }],
  },
  calligraphy4: {
    position: 'absolute',
    top: 720,
    left: -20,
    fontFamily: 'Amiri-Regular',
    fontSize: 75,
    color: 'rgba(255,255,255,0.02)',
    transform: [{ rotate: '12deg' }],
  },
  calligraphy5: {
    position: 'absolute',
    top: 940,
    right: -10,
    fontFamily: 'Amiri-Regular',
    fontSize: 60,
    color: 'rgba(255,255,255,0.025)',
    transform: [{ rotate: '-5deg' }],
  },
});
