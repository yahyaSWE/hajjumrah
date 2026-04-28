export const COLORS = {
  // Dark green theme
  background: '#0A1F1F',
  backgroundLight: '#0F2B2B',
  surface: '#143535',
  surfaceElevated: '#1A4040',

  // Cards
  card: '#FFFFFF',
  cardBorder: 'rgba(255,255,255,0.08)',

  // Text
  text: '#FFFFFF',
  textOnCard: '#1A1A1A',
  textSecondary: 'rgba(255,255,255,0.65)',
  textSecondaryOnCard: '#6B7280',
  textMuted: 'rgba(255,255,255,0.4)',
  textMutedOnCard: '#9CA3AF',

  // Accents
  accent: '#C8A84E',       // Warm gold for highlights
  accentLight: '#D4B86A',
  accentDark: '#A68B3C',
  green: '#2A7C5B',        // Brighter green for icons/badges
  greenLight: '#35996F',
  greenDark: '#1E5E44',

  // Utility
  black: '#000000',
  white: '#FFFFFF',
  border: 'rgba(255,255,255,0.1)',
  borderOnCard: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
} as const;

export const FONTS = {
  arabic: 'Amiri-Regular',
  arabicBold: 'Amiri-Bold',
  regular: 'Inter-Regular',
  medium: 'Inter-Regular',
  semiBold: 'Inter-SemiBold',
  bold: 'Inter-Bold',
} as const;

export const FONT_SIZES = {
  arabicLarge: 28,
  arabicMedium: 24,
  h1: 28,
  h2: 22,
  h3: 18,
  body: 17,
  bodySmall: 15,
  caption: 13,
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;
