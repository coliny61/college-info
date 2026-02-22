// =============================================================================
// College Visit Platform - Theme Barrel
// Re-exports color palette and defines typography, spacing, and radii tokens
// =============================================================================

export { DARK_THEME, DEFAULT_SCHOOL_COLORS } from './colors';

// -----------------------------------------------------------------------------
// Typography
// -----------------------------------------------------------------------------

/**
 * Heading font sizes keyed by semantic name.
 * Values are React Native `fontSize` numbers (points).
 */
export const heading = {
  h1: { fontSize: 32, lineHeight: 40, fontWeight: '700' as const },
  h2: { fontSize: 24, lineHeight: 32, fontWeight: '700' as const },
  h3: { fontSize: 20, lineHeight: 28, fontWeight: '600' as const },
  h4: { fontSize: 18, lineHeight: 24, fontWeight: '600' as const },
  h5: { fontSize: 16, lineHeight: 22, fontWeight: '600' as const },
} as const;

/**
 * Body text sizes keyed by semantic name.
 */
export const body = {
  lg: { fontSize: 18, lineHeight: 28, fontWeight: '400' as const },
  md: { fontSize: 16, lineHeight: 24, fontWeight: '400' as const },
  sm: { fontSize: 14, lineHeight: 20, fontWeight: '400' as const },
  xs: { fontSize: 12, lineHeight: 16, fontWeight: '400' as const },
} as const;

export const typography = { heading, body } as const;

// -----------------------------------------------------------------------------
// Spacing
// -----------------------------------------------------------------------------

/**
 * Spacing scale (in points). Based on a 4-point grid.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

// -----------------------------------------------------------------------------
// Border Radius
// -----------------------------------------------------------------------------

/**
 * Border-radius tokens for consistent rounding across the app.
 */
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  full: 9999,
} as const;
