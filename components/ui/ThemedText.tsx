import { Text, TextProps, StyleSheet } from 'react-native';
import { COLORS, FONT_SIZES } from '@/lib/constants';

interface ThemedTextProps extends TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'bodySmall' | 'caption' | 'arabic' | 'arabicLarge';
  color?: string;
  onCard?: boolean;
}

export function ThemedText({ variant = 'body', color, onCard = false, style, ...props }: ThemedTextProps) {
  const textColor = color
    ? { color }
    : onCard
    ? { color: cardColors[variant] ?? COLORS.textOnCard }
    : undefined;

  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        textColor,
        style,
      ]}
      {...props}
    />
  );
}

const cardColors: Partial<Record<string, string>> = {
  body: COLORS.textOnCard,
  bodySmall: COLORS.textSecondaryOnCard,
  caption: COLORS.textMutedOnCard,
  h1: COLORS.textOnCard,
  h2: COLORS.textOnCard,
  h3: COLORS.textOnCard,
  arabic: COLORS.textOnCard,
  arabicLarge: COLORS.textOnCard,
};

const styles = StyleSheet.create({
  base: {
    color: COLORS.text,
    fontFamily: 'Inter-Variable',
  },
  h1: {
    fontSize: FONT_SIZES.h1,
    fontWeight: '700',
    lineHeight: FONT_SIZES.h1 * 1.3,
  },
  h2: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '600',
    lineHeight: FONT_SIZES.h2 * 1.3,
  },
  h3: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '600',
    lineHeight: FONT_SIZES.h3 * 1.4,
  },
  body: {
    fontSize: FONT_SIZES.body,
    fontWeight: '400',
    lineHeight: FONT_SIZES.body * 1.6,
  },
  bodySmall: {
    fontSize: FONT_SIZES.bodySmall,
    fontWeight: '400',
    lineHeight: FONT_SIZES.bodySmall * 1.5,
    color: COLORS.textSecondary,
  },
  caption: {
    fontSize: FONT_SIZES.caption,
    fontWeight: '400',
    lineHeight: FONT_SIZES.caption * 1.4,
    color: COLORS.textMuted,
  },
  arabic: {
    fontFamily: 'Amiri-Regular',
    fontSize: FONT_SIZES.arabicMedium,
    lineHeight: FONT_SIZES.arabicMedium * 1.8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  arabicLarge: {
    fontFamily: 'Amiri-Regular',
    fontSize: FONT_SIZES.arabicLarge,
    lineHeight: FONT_SIZES.arabicLarge * 1.8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});
