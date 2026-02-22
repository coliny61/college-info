// =============================================================================
// College Visit Platform - Type Definitions
// React Native/Expo app for college football recruiting visits
// =============================================================================

// -----------------------------------------------------------------------------
// Enums & Union Types
// -----------------------------------------------------------------------------

/** User roles within the college visit platform. */
export type UserRole = 'recruit' | 'parent' | 'admin';

/** Degree types offered by a major. */
export type DegreeType = 'BS' | 'BA' | 'MS' | 'PhD';

/** Jersey asset types for uniform customization. */
export type JerseyAssetType = 'helmet' | 'jersey' | 'pants';

// -----------------------------------------------------------------------------
// User
// -----------------------------------------------------------------------------

/**
 * Represents a platform user. Users can be recruits (prospective student-athletes),
 * parents linked to a recruit, or school administrators managing their institution's
 * profile and visit experience.
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  /** URL to the user's avatar image. */
  avatarUrl?: string;
  /** List of school IDs the user has favorited. */
  favorites: string[];
  /** For parent accounts: the recruit user ID this parent is linked to. */
  linkedRecruitId?: string;
  /** For admin accounts: the school ID this admin manages. */
  schoolId?: string;
  createdAt: string;
}

// -----------------------------------------------------------------------------
// School & Academics
// -----------------------------------------------------------------------------

/**
 * A university or college with a football program. Stores branding,
 * conference affiliation, and links to the school's scorecard data.
 */
export interface School {
  id: string;
  name: string;
  /** Abbreviated name used in compact UI elements (e.g., "OU", "LSU"). */
  shortName: string;
  mascot: string;
  conference: string;
  city: string;
  state: string;
  /** Reference ID for the school's recruiting scorecard. */
  scorecardId: string;
  /** School brand colors used for theming the visit experience. */
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  logoUrl: string;
  heroImageUrl: string;
  description: string;
}

/**
 * Academic statistics and financial data for a school. Used to populate
 * the academics section of the school profile and comparisons.
 */
export interface AcademicData {
  schoolId: string;
  enrollment: number;
  /** Admission rate as a decimal (e.g., 0.45 for 45%). */
  admissionRate: number;
  /** Average SAT score for admitted students. */
  satAvg: number;
  /** Average ACT score for admitted students. */
  actAvg: number;
  /** Annual in-state tuition in USD. */
  tuitionInState: number;
  /** Annual out-of-state tuition in USD. */
  tuitionOutOfState: number;
  /** Graduation rate as a decimal (e.g., 0.85 for 85%). */
  graduationRate: number;
  /** Median earnings of graduates (typically 10 years post-graduation) in USD. */
  medianEarnings: number;
  /** First-year student retention rate as a decimal. */
  retentionRate: number;
}

/**
 * An academic college within a university (e.g., College of Engineering,
 * College of Arts & Sciences). Houses one or more majors.
 */
export interface College {
  id: string;
  schoolId: string;
  name: string;
  description: string;
  totalStudents: number;
  imageUrl: string;
}

/**
 * An academic major offered within a college. Includes degree type
 * and links to degree pathways and career outcomes.
 */
export interface Major {
  id: string;
  collegeId: string;
  name: string;
  degreeType: DegreeType;
  description: string;
}

/**
 * A single year within a major's degree pathway, describing the typical
 * coursework and progression for that academic year.
 */
export interface DegreePathway {
  majorId: string;
  /** Academic year (1 = Freshman, 2 = Sophomore, 3 = Junior, 4 = Senior). */
  year: 1 | 2 | 3 | 4;
  /** Title for this year's focus (e.g., "Foundation Year", "Core Studies"). */
  title: string;
  /** List of course names taken during this year. */
  courses: string[];
  description: string;
}

/**
 * A potential career outcome for graduates of a specific major,
 * including salary data and industry growth projections.
 */
export interface CareerOutcome {
  majorId: string;
  /** Job title (e.g., "Software Engineer", "Financial Analyst"). */
  title: string;
  /** Median annual salary in USD. */
  medianSalary: number;
  /** Projected job growth rate as a decimal (e.g., 0.15 for 15%). */
  growthRate: number;
  description: string;
}

// -----------------------------------------------------------------------------
// Athletics
// -----------------------------------------------------------------------------

/**
 * A sport program at a school. Contains coaching staff references,
 * current season record, and associated athletic facilities.
 */
export interface Sport {
  id: string;
  schoolId: string;
  name: string;
  conference: string;
  headCoach: string;
  record: string;
  /** National ranking, if applicable. */
  ranking?: number;
  /** Athletic facilities associated with this sport program. */
  facilities: Facility[];
}

/**
 * A member of the coaching staff for a sport program.
 */
export interface Coach {
  id: string;
  sportId: string;
  name: string;
  /** Coaching title (e.g., "Head Coach", "Offensive Coordinator"). */
  title: string;
  imageUrl?: string;
  bio: string;
  yearsAtSchool: number;
}

// -----------------------------------------------------------------------------
// Facilities & Virtual Tours
// -----------------------------------------------------------------------------

/**
 * An athletic facility that can be explored in the virtual tour experience.
 * Supports panoramic imagery with interactive hotspots for navigation.
 */
export interface Facility {
  id: string;
  sportId: string;
  name: string;
  /** Facility category (e.g., "stadium", "practice", "weight-room", "locker-room"). */
  type: string;
  description: string;
  imageUrl: string;
  /** URL to a 360-degree panoramic image for virtual tour mode. */
  panoramaUrl?: string;
  /** Interactive hotspots placed within the panoramic view. */
  hotspots: Hotspot[];
}

/**
 * An interactive point within a facility's panoramic view. Hotspots
 * can provide information or link to another facility for navigation.
 */
export interface Hotspot {
  id: string;
  /** X coordinate in the panoramic view (normalized 0-1 or pixel-based). */
  x: number;
  /** Y coordinate in the panoramic view. */
  y: number;
  /** Z coordinate for depth positioning in 3D panoramic views. */
  z: number;
  /** Display label shown when the hotspot is visible. */
  label: string;
  description: string;
  /** If set, tapping this hotspot navigates to the linked facility's panoramic view. */
  linkedFacilityId?: string;
}

// -----------------------------------------------------------------------------
// Jersey Customization
// -----------------------------------------------------------------------------

/**
 * A jersey/uniform asset (helmet, jersey, or pants) in a specific color
 * variant for a school. Used in the uniform builder feature.
 */
export interface JerseyAsset {
  id: string;
  schoolId: string;
  type: JerseyAssetType;
  /** Human-readable color label (e.g., "Home White", "Away Crimson"). */
  colorLabel: string;
  imageUrl: string;
}

/**
 * A user's saved jersey/uniform selection for a specific school.
 * Captures which helmet, jersey, and pants combination was chosen.
 */
export interface JerseySelection {
  userId: string;
  schoolId: string;
  helmetId: string;
  jerseyId: string;
  pantsId: string;
  /** ISO 8601 timestamp of when the selection was saved. */
  timestamp: string;
}

// -----------------------------------------------------------------------------
// Analytics
// -----------------------------------------------------------------------------

/**
 * An analytics event tracked when a user interacts with the platform.
 * Used for engagement reporting and understanding how recruits explore schools.
 */
export interface AnalyticsEvent {
  id: string;
  userId: string;
  userRole: UserRole;
  /** The school being viewed when the event occurred, if applicable. */
  schoolId?: string;
  /** Session identifier for grouping events within a single app session. */
  sessionId: string;
  /** The app section where the event occurred (e.g., "academics", "facilities", "jersey-builder"). */
  section: string;
  /** The specific action taken (e.g., "view", "tap", "swipe", "favorite"). */
  action: string;
  /** Additional key-value data associated with the event. */
  metadata?: Record<string, string | number | boolean>;
  /** Duration in milliseconds for timed events (e.g., time spent on a panoramic view). */
  duration?: number;
  /** ISO 8601 timestamp of when the event occurred. */
  timestamp: string;
}

// -----------------------------------------------------------------------------
// Theming
// -----------------------------------------------------------------------------

/**
 * A derived color theme for rendering school-branded UI. Generated from
 * a school's brand colors to ensure consistent and accessible theming.
 */
export interface SchoolTheme {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  secondary: string;
  /** Text color that ensures readability on primary-colored backgrounds. */
  textOnPrimary: string;
  /** Text color that ensures readability on dark backgrounds. */
  textOnDark: string;
  /** Two-color gradient for backgrounds and hero sections [startColor, endColor]. */
  gradient: [string, string];
}
