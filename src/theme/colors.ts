// =============================================================================
// College Visit Platform - Color Palette
// Dark athletic base theme with school-branded accent support
// =============================================================================

/**
 * Dark theme color palette. Slate-based scale from darkest (bg900)
 * to lightest (white), plus semantic accent colors.
 */
export const DARK_THEME = {
  /** Deepest background — app root, modals */
  bg900: '#0F172A',
  /** Primary surface — cards, headers */
  bg800: '#1E293B',
  /** Elevated surface — inputs, secondary cards */
  bg700: '#334155',
  /** Borders, dividers */
  bg600: '#475569',
  /** Muted text, icons */
  bg500: '#64748B',
  /** Placeholder text */
  bg400: '#94A3B8',
  /** Secondary text */
  bg300: '#CBD5E1',
  /** Primary text (on dark backgrounds) */
  bg200: '#E2E8F0',
  /** Highlighted text */
  bg100: '#F1F5F9',
  /** Pure white — headings, emphasis */
  white: '#FFFFFF',

  // Semantic colors
  /** Default accent blue (used when no school color is set) */
  accent: '#3B82F6',
  /** Lighter accent for hover/active states */
  accentLight: '#60A5FA',
  /** Success indicators */
  success: '#22C55E',
  /** Warning indicators */
  warning: '#F59E0B',
  /** Error / destructive indicators */
  error: '#EF4444',
} as const;

/**
 * Fallback school colors used when a school has not been selected
 * or its brand colors are unavailable.
 */
export const DEFAULT_SCHOOL_COLORS = {
  primary: '#3B82F6',
  secondary: '#1E293B',
  accent: '#FFFFFF',
} as const;
