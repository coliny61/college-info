import { prisma } from '@/lib/prisma'

interface InsightResult {
  text: string
  topSections: string[]
  suggestion: string
}

const SECTION_LABELS: Record<string, string> = {
  tour: 'Virtual Tour',
  football: 'Football Program',
  academics: 'Academics',
  nil: 'NIL',
  roster: 'Roster',
  alumni: 'Alumni',
  jersey: 'Jersey Room',
  video: 'Video & Media',
}

const SECTION_SUGGESTIONS: Record<string, string> = {
  nil: 'connect them with your NIL collective leadership and discuss deal opportunities',
  academics: 'arrange a campus academic tour and introduce them to athlete academic advisors',
  football: 'have their position coach lead the visit and walk through film sessions',
  tour: 'focus the in-person visit on facility upgrades and behind-the-scenes access',
  jersey: 'have gear ready for them to try on during the visit — they love the uniforms',
  video: 'show them exclusive content and introduce them to current players featured in videos',
  alumni: 'connect them with NFL alumni who played their position',
  roster: 'discuss depth chart opportunities and how they fit into the roster',
}

export async function generateInsight(
  userId: string,
  schoolId: string,
  recruitName: string
): Promise<InsightResult | null> {
  const events = await prisma.analyticsEvent.findMany({
    where: { userId, schoolId },
    select: { section: true, action: true, duration: true, metadata: true },
  })

  if (events.length === 0) return null

  // Calculate time per section
  const sectionTime: Record<string, number> = {}
  for (const e of events) {
    const section = e.section.split('.')[0]
    sectionTime[section] = (sectionTime[section] ?? 0) + (e.duration ?? 0)
  }

  // Total time
  const totalMs = Object.values(sectionTime).reduce((a, b) => a + b, 0)
  const totalMin = Math.round(totalMs / 60000)

  if (totalMin < 1) return null

  // Top 2 sections by time
  const sorted = Object.entries(sectionTime).sort((a, b) => b[1] - a[1])
  const top2 = sorted.slice(0, 2).map(([s]) => s)

  // Notable actions
  const notableActions: string[] = []
  const actions = events.map(e => `${e.section}.${e.action}`)
  if (actions.includes('school.favorite')) notableActions.push('favorited the school')
  if (actions.includes('jersey.save_combo')) notableActions.push('saved a jersey combo')

  // Check for specific content
  const majorViews = events.filter(e => e.action === 'view_major' || e.action === 'major_expand')
  if (majorViews.length > 0) {
    const majorNames = majorViews
      .map(e => (e.metadata as Record<string, unknown>)?.majorName ?? (e.metadata as Record<string, unknown>)?.major)
      .filter(Boolean)
    if (majorNames.length > 0) {
      notableActions.push(`explored ${majorNames.length} major${majorNames.length > 1 ? 's' : ''}`)
    }
  }

  const coachViews = events.filter(e => e.action === 'view_coach_bio')
  if (coachViews.length > 0) {
    notableActions.push(`read ${coachViews.length} coach bio${coachViews.length > 1 ? 's' : ''}`)
  }

  // Build text
  const topLabels = top2.map(s => SECTION_LABELS[s] ?? s)
  const topTimesStr = top2.map(s => {
    const min = Math.round(sectionTime[s] / 60000)
    return `${SECTION_LABELS[s] ?? s} (${min} min)`
  }).join(' and ')

  let text = `${recruitName} spent ${totalMin} minute${totalMin !== 1 ? 's' : ''} on your program, focusing primarily on ${topTimesStr}.`

  if (notableActions.length > 0) {
    text += ` They ${notableActions.join(', ')}.`
  }

  // Suggestion based on top section
  const topSection = top2[0]
  const suggestion = SECTION_SUGGESTIONS[topSection] ?? 'personalize the in-person visit based on their interests'

  return {
    text,
    topSections: topLabels,
    suggestion: `During their in-person visit, ${suggestion}.`,
  }
}
