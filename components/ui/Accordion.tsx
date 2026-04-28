import { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from './ThemedText';
import { COLORS, SPACING, BORDER_RADIUS } from '@/lib/constants';

interface AccordionProps {
  question: string;
  answer: string;
}

export function Accordion({ question, answer }: AccordionProps) {
  const [expanded, setExpanded] = useState(false);
  const rotation = useSharedValue(0);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const toggle = () => {
    setExpanded(!expanded);
    rotation.value = withTiming(expanded ? 0 : 180, { duration: 200 });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={toggle} style={styles.header}>
        <ThemedText variant="h3" onCard style={styles.question}>{question}</ThemedText>
        <Animated.View style={chevronStyle}>
          <Ionicons name="chevron-down" size={20} color={COLORS.green} />
        </Animated.View>
      </Pressable>
      {expanded && (
        <View style={styles.body}>
          <ThemedText variant="body" onCard>{answer}</ThemedText>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.lg,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
  },
  question: {
    flex: 1,
    marginRight: SPACING.sm,
  },
  body: {
    padding: SPACING.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderOnCard,
  },
});
