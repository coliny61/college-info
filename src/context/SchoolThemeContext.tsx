import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import type { SchoolTheme, School } from '@/types';

// ---------------------------------------------------------------------------
// Color Utility Helpers
// ---------------------------------------------------------------------------

/** Parse a hex color string (#RGB or #RRGGBB) into [r, g, b] (0-255). */
function hexToRgb(hex: string): [number, number, number] {
  let cleaned = hex.replace('#', '');
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split('')
      .map((c) => c + c)
      .join('');
  }
  const num = parseInt(cleaned, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/** Convert [r, g, b] (0-255) back to a hex string. */
function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return (
    '#' +
    [r, g, b]
      .map(clamp)
      .map((v) => v.toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * Compute relative luminance of a hex color per WCAG 2.1.
 * Returns a value between 0 (black) and 1 (white).
 */
export function getLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Compute WCAG contrast ratio between two hex colors.
 * Returns a value between 1 (identical) and 21 (black vs white).
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/** Lighten a hex color by a percentage (0-100). */
function lighten(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  const amount = percent / 100;
  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount,
  );
}

/** Darken a hex color by a percentage (0-100). */
function darken(hex: string, percent: number): string {
  const [r, g, b] = hexToRgb(hex);
  const amount = 1 - percent / 100;
  return rgbToHex(r * amount, g * amount, b * amount);
}

// ---------------------------------------------------------------------------
// Theme Generation
// ---------------------------------------------------------------------------

/**
 * Generate a full SchoolTheme from a pair of brand colors.
 * Computes lighter/darker variants, accessible text colors,
 * and a two-stop gradient.
 */
export function generateSchoolTheme(
  primary: string,
  secondary: string,
): SchoolTheme {
  const primaryLight = lighten(primary, 20);
  const primaryDark = darken(primary, 20);

  // Choose text color for primary background based on WCAG contrast
  const contrastWithWhite = getContrastRatio(primary, '#FFFFFF');
  const contrastWithBlack = getContrastRatio(primary, '#000000');
  const textOnPrimary = contrastWithWhite >= contrastWithBlack ? '#FFFFFF' : '#000000';

  return {
    primary,
    primaryLight,
    primaryDark,
    secondary,
    textOnPrimary,
    textOnDark: '#FFFFFF',
    gradient: [primary, primaryDark],
  };
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const DEFAULT_THEME: SchoolTheme = generateSchoolTheme('#3B82F6', '#1E293B');

// ---------------------------------------------------------------------------
// Context Types
// ---------------------------------------------------------------------------

interface SchoolThemeContextValue {
  currentTheme: SchoolTheme;
  setSchoolTheme: (schoolId: string) => void;
  resetTheme: () => void;
}

// ---------------------------------------------------------------------------
// School Color Lookup
// ---------------------------------------------------------------------------

/**
 * Runtime registry of school colors. Populated once by `registerSchoolData`.
 * Falls back to an inline map when school data has not been registered yet.
 */
let schoolRegistry: Map<string, { primary: string; secondary: string }> | null = null;

/**
 * Register school data so the theme context can look up colors by school ID.
 * Call this once at app start (e.g., from a data barrel file) to wire up the
 * data layer without creating a circular dependency.
 *
 * @example
 * ```ts
 * import { SCHOOLS } from '@/data/schools';
 * import { registerSchoolData } from '@/context/SchoolThemeContext';
 * registerSchoolData(SCHOOLS);
 * ```
 */
export function registerSchoolData(schools: School[]) {
  schoolRegistry = new Map(
    schools.map((s) => [s.id, { primary: s.colors.primary, secondary: s.colors.secondary }]),
  );
}

/** Look up a school's brand colors by ID. Returns null when not found. */
function getSchoolColors(schoolId: string): { primary: string; secondary: string } | null {
  if (schoolRegistry) {
    return schoolRegistry.get(schoolId) ?? null;
  }
  // Inline fallback for the five launch schools (allows context to work before
  // the data layer is wired up).
  const fallback: Record<string, { primary: string; secondary: string }> = {
    texas:        { primary: '#BF5700', secondary: '#FFFFFF' },
    alabama:      { primary: '#9E1B32', secondary: '#FFFFFF' },
    'ohio-state': { primary: '#BB0000', secondary: '#666666' },
    oregon:       { primary: '#154733', secondary: '#FEE123' },
    lsu:          { primary: '#461D7C', secondary: '#FDD023' },
  };
  return fallback[schoolId] ?? null;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const SchoolThemeContext = createContext<SchoolThemeContextValue | undefined>(undefined);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function SchoolThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<SchoolTheme>(DEFAULT_THEME);

  const setSchoolTheme = useCallback((schoolId: string) => {
    const colors = getSchoolColors(schoolId);
    if (colors) {
      setCurrentTheme(generateSchoolTheme(colors.primary, colors.secondary));
    } else {
      console.warn(
        `[SchoolThemeContext] No colors found for school "${schoolId}". Using default theme.`,
      );
      setCurrentTheme(DEFAULT_THEME);
    }
  }, []);

  const resetTheme = useCallback(() => {
    setCurrentTheme(DEFAULT_THEME);
  }, []);

  const value = useMemo<SchoolThemeContextValue>(
    () => ({ currentTheme, setSchoolTheme, resetTheme }),
    [currentTheme, setSchoolTheme, resetTheme],
  );

  return (
    <SchoolThemeContext.Provider value={value}>
      {children}
    </SchoolThemeContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Access the current school theme and methods to change it.
 * Must be used within a <SchoolThemeProvider>.
 */
export function useSchoolTheme(): SchoolThemeContextValue {
  const ctx = useContext(SchoolThemeContext);
  if (ctx === undefined) {
    throw new Error('useSchoolTheme must be used within a SchoolThemeProvider');
  }
  return ctx;
}
