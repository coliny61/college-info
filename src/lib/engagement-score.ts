import { prisma } from '@/lib/prisma'

interface EngagementResult {
  score: number
  tier: 'low' | 'moderate' | 'high' | 'very_high'
  tierLabel: string
  breakdown: {
    time: number
    diversity: number
    depth: number
    intent: number
  }
}

const ALL_SECTIONS = ['tour', 'football', 'academics', 'nil', 'roster', 'alumni', 'jersey', 'video']

// Simple in-memory cache
const cache = new Map<string, { result: EngagementResult; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function calculateEngagementScore(
  userId: string,
  schoolId: string
): Promise<EngagementResult> {
  const cacheKey = `${userId}:${schoolId}`
  const cached = cache.get(cacheKey)
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.result
  }

  const events = await prisma.analyticsEvent.findMany({
    where: { userId, schoolId },
    select: {
      section: true,
      action: true,
      duration: true,
      metadata: true,
    },
  })

  if (events.length === 0) {
    const empty: EngagementResult = {
      score: 0,
      tier: 'low',
      tierLabel: 'Not yet visited',
      breakdown: { time: 0, diversity: 0, depth: 0, intent: 0 },
    }
    cache.set(cacheKey, { result: empty, timestamp: Date.now() })
    return empty
  }

  // Time (30%): total duration normalized (cap at 30 min = 100%)
  const totalDuration = events.reduce((sum, e) => sum + (e.duration ?? 0), 0)
  const maxDuration = 30 * 60 * 1000 // 30 min in ms
  const timeScore = Math.min(totalDuration / maxDuration, 1) * 100

  // Section diversity (20%): unique sections / total available
  const uniqueSections = new Set(events.map(e => e.section.split('.')[0]))
  const diversityScore = (uniqueSections.size / ALL_SECTIONS.length) * 100

  // Depth (20%): drill-down actions (view_coach_bio, view_college, view_major, view_panorama)
  const depthActions = ['view_coach_bio', 'view_college', 'view_major', 'view_panorama', 'view_career_outcome', 'major_expand']
  const depthEvents = events.filter(e => depthActions.includes(e.action))
  const depthScore = Math.min(depthEvents.length / 10, 1) * 100 // 10 depth actions = 100%

  // Intent (30%): high-value actions
  let intentPoints = 0
  const actions = new Set(events.map(e => `${e.section}.${e.action}`))
  if (actions.has('school.favorite')) intentPoints += 15
  if (actions.has('jersey.save_combo')) intentPoints += 15
  const nilDuration = events
    .filter(e => e.section === 'nil' && e.action === 'duration')
    .reduce((sum, e) => sum + (e.duration ?? 0), 0)
  if (nilDuration > 120000) intentPoints += 10 // >2 min on NIL
  // Check for return sessions
  const sessions = new Set(events.map(e => (e.metadata as Record<string, unknown>)?.sessionId ?? ''))
  if (sessions.size > 1) intentPoints += 10
  const intentScore = Math.min(intentPoints / 50, 1) * 100

  // Weighted total
  const score = Math.round(
    timeScore * 0.3 +
    diversityScore * 0.2 +
    depthScore * 0.2 +
    intentScore * 0.3
  )

  const clampedScore = Math.min(Math.max(score, 0), 100)
  const tier = clampedScore >= 76 ? 'very_high' : clampedScore >= 51 ? 'high' : clampedScore >= 26 ? 'moderate' : 'low'
  const tierLabel = tier === 'very_high' ? 'Very High Interest' : tier === 'high' ? 'High Interest' : tier === 'moderate' ? 'Moderate Interest' : 'Low Interest'

  const result: EngagementResult = {
    score: clampedScore,
    tier,
    tierLabel,
    breakdown: {
      time: Math.round(timeScore),
      diversity: Math.round(diversityScore),
      depth: Math.round(depthScore),
      intent: Math.round(intentScore),
    },
  }

  cache.set(cacheKey, { result, timestamp: Date.now() })
  return result
}
