// =============================================================================
// Application Constants
// =============================================================================

/** Football conferences represented in the app. */
export const CONFERENCES: string[] = [
  'SEC',
  'Big Ten',
  'Big 12',
  'ACC',
  'Pac-12',
];

/** App sections used for navigation and analytics tracking. */
export const SECTIONS: string[] = [
  'academics',
  'athletics',
  'tour',
  'jersey',
  'profile',
];

/** AsyncStorage keys used throughout the app. */
export const STORAGE_KEYS = {
  AUTH: 'college_visit_user',
  USER: 'college_visit_user_profile',
  ANALYTICS: 'college_visit_analytics',
  FAVORITES: 'college_visit_favorites',
  JERSEYS: 'college_visit_jerseys',
} as const;

/** Configuration for the College Scorecard API integration. */
export const API_CONFIG = {
  SCORECARD_BASE_URL: 'https://api.data.gov/ed/collegescorecard/v1',
  SCORECARD_API_KEY: 'DEMO_KEY',
  /** Cache time-to-live in milliseconds (1 hour). */
  CACHE_TTL: 3_600_000,
} as const;

/** General application configuration. */
export const APP_CONFIG = {
  NAME: 'College Visit',
  VERSION: '1.0.0',
  /** Interval in milliseconds for flushing analytics events (10 seconds). */
  ANALYTICS_FLUSH_INTERVAL: 10_000,
} as const;
