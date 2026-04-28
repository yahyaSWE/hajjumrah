import { ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-markdown-display';
import { COLORS, FONT_SIZES, SPACING } from '@/lib/constants';

interface ContentRendererProps {
  content: string;
}

export function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <Markdown style={markdownStyles}>{content}</Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
});

const markdownStyles = StyleSheet.create({
  body: {
    color: COLORS.text,
    fontSize: FONT_SIZES.body,
    lineHeight: FONT_SIZES.body * 1.7,
    fontFamily: 'Inter-Regular',
  },
  heading1: {
    fontSize: FONT_SIZES.h1,
    fontWeight: '700' as const,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
    fontFamily: 'Inter-Regular',
  },
  heading2: {
    fontSize: FONT_SIZES.h2,
    fontWeight: '600' as const,
    color: COLORS.accent,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
    fontFamily: 'Inter-Regular',
  },
  heading3: {
    fontSize: FONT_SIZES.h3,
    fontWeight: '600' as const,
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.sm,
    fontFamily: 'Inter-Regular',
  },
  strong: {
    fontWeight: '600' as const,
    color: COLORS.accent,
  },
  bullet_list: {
    marginVertical: SPACING.sm,
  },
  ordered_list: {
    marginVertical: SPACING.sm,
  },
  list_item: {
    marginVertical: SPACING.xs,
    color: COLORS.text,
  },
  blockquote: {
    backgroundColor: COLORS.surface,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    marginVertical: SPACING.md,
    borderRadius: 8,
  },
  hr: {
    backgroundColor: COLORS.border,
    height: 1,
    marginVertical: SPACING.lg,
  },
});
