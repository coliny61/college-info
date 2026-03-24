import { z } from 'zod'

// ─── Auth ────────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

export const registerSchema = z
  .object({
    displayName: z.string().min(1, 'Display name is required').max(100),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
    role: z.enum(['recruit', 'coach_admin']),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

// ─── Recruit Profile ────────────────────────────────────────────────────────

export const recruitProfileSchema = z.object({
  sport: z.string().nullish(),
  position: z.string().nullish(),
  height: z
    .string()
    .regex(/^\d+'\d+"?$/, 'Use format like 6\'2"')
    .nullish(),
  weight: z.number().int().min(50, 'Min 50 lbs').max(500, 'Max 500 lbs').nullish(),
  graduationYear: z.number().int().min(2024).max(2032).nullish(),
  gpa: z.number().min(0, 'Min 0.0').max(5.0, 'Max 5.0').nullish(),
  satScore: z.number().int().min(400, 'Min 400').max(1600, 'Max 1600').nullish(),
  actScore: z.number().int().min(1, 'Min 1').max(36, 'Max 36').nullish(),
  highSchool: z.string().max(200).nullish(),
  city: z.string().max(100).nullish(),
  state: z.string().max(50).nullish(),
  bio: z.string().max(2000, 'Max 2000 characters').nullish(),
  highlightsUrl: z.string().url('Invalid URL').or(z.literal('')).nullish(),
  // Transfer fields
  currentSchool: z.string().max(200).nullish(),
  collegeStats: z.string().max(2000).nullish(),
  eligibilityYears: z.number().int().min(1).max(4).nullish(),
  transferReason: z.string().max(1000).nullish(),
})

export type RecruitProfileInput = z.infer<typeof recruitProfileSchema>

// ─── Profile Completeness ───────────────────────────────────────────────────

export function calculateProfileCompleteness(data: RecruitProfileInput): number {
  let completeness = 0
  if (data.sport && data.graduationYear) completeness += 15
  if (data.position) completeness += 10
  if (data.height || data.weight) completeness += 10
  if (data.gpa) completeness += 10
  if (data.satScore || data.actScore) completeness += 10
  if (data.highSchool || (data.city && data.state)) completeness += 10
  if (data.bio) completeness += 15
  if (data.highlightsUrl) completeness += 20
  return completeness
}

export function getCompletenessMessage(pct: number): string {
  if (pct >= 100) return 'Profile complete — you\'re ready'
  if (pct >= 76) return 'Just a few more details!'
  if (pct >= 51) return 'Almost done — coaches love seeing highlights'
  if (pct >= 26) return 'You\'re getting there — add your stats'
  return 'Complete your profile so coaches can find you'
}

// ─── Notification Preferences ────────────────────────────────────────────────

export const notificationPreferenceSchema = z.object({
  coachViewedProfile: z.boolean(),
  newSchoolAdded: z.boolean(),
  weeklyDigest: z.boolean(),
  marketingEmails: z.boolean(),
})

export type NotificationPreferenceInput = z.infer<typeof notificationPreferenceSchema>

// ─── School (Admin) ──────────────────────────────────────────────────────────

export const schoolProfileSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional(),
  colorPrimary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
  colorSecondary: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
  colorAccent: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional(),
})

export const coachSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  title: z.string().min(1, 'Title is required').max(200),
  bio: z.string().max(2000).optional().default(''),
  yearsAtSchool: z.number().int().min(0).max(60).default(0),
})

export const facilitySchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  type: z.string().min(1, 'Type is required').max(100),
  description: z.string().max(2000).optional().default(''),
})

// ─── Analytics ───────────────────────────────────────────────────────────────

export const analyticsEventSchema = z.object({
  schoolId: z.string().uuid().optional(),
  sessionId: z.string().min(1),
  section: z.string().min(1).max(200),
  action: z.string().min(1).max(200),
  metadata: z.record(z.string(), z.unknown()).optional(),
  duration: z.number().int().min(0).optional(),
})
