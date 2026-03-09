import { prisma } from '@/lib/prisma'
import { AnalyticsDashboard } from './analytics-dashboard'

export default async function AdminAnalyticsPage() {
  const school = await prisma.school.findFirst()
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  // Get analytics for last 30 days
  const since = new Date()
  since.setDate(since.getDate() - 30)

  const events = await prisma.analyticsEvent.findMany({
    where: {
      schoolId: school.id,
      createdAt: { gte: since },
    },
    include: {
      user: {
        select: {
          id: true,
          displayName: true,
          email: true,
          recruitProfile: {
            select: { sport: true, position: true, graduationYear: true },
          },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  // Aggregate daily views
  const dailyViews: Record<string, number> = {}
  events.forEach((e) => {
    const day = new Date(e.createdAt).toISOString().split('T')[0]
    dailyViews[day] = (dailyViews[day] || 0) + 1
  })

  const viewsData = Object.entries(dailyViews)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, views]) => ({ date, views }))

  // Aggregate per-recruit engagement
  const recruitMap = new Map<
    string,
    {
      name: string
      email: string
      sport: string | null
      position: string | null
      graduationYear: number | null
      sections: Set<string>
      totalDuration: number
      visits: number
      lastActive: Date
    }
  >()

  events.forEach((e) => {
    const existing = recruitMap.get(e.userId) ?? {
      name: e.user.displayName,
      email: e.user.email,
      sport: e.user.recruitProfile?.sport ?? null,
      position: e.user.recruitProfile?.position ?? null,
      graduationYear: e.user.recruitProfile?.graduationYear ?? null,
      sections: new Set<string>(),
      totalDuration: 0,
      visits: 0,
      lastActive: new Date(0),
    }
    existing.sections.add(e.section)
    existing.totalDuration += e.duration ?? 0
    existing.visits++
    if (new Date(e.createdAt) > existing.lastActive) {
      existing.lastActive = new Date(e.createdAt)
    }
    recruitMap.set(e.userId, existing)
  })

  const engagementData = Array.from(recruitMap.values()).map((r) => ({
    name: r.name,
    email: r.email,
    sport: r.sport,
    position: r.position,
    graduationYear: r.graduationYear,
    sections: Array.from(r.sections),
    totalDuration: Math.round(r.totalDuration / 1000),
    visits: r.visits,
    lastActive: r.lastActive.toISOString(),
  }))

  // Section breakdown
  const sectionCounts: Record<string, number> = {}
  events.forEach((e) => {
    sectionCounts[e.section] = (sectionCounts[e.section] || 0) + 1
  })

  const sectionData = Object.entries(sectionCounts).map(([section, count]) => ({
    section,
    count,
  }))

  // Visit Insights: per-recruit college time + jersey preferences
  const visitInsights: Array<{
    name: string
    email: string
    topCollege: string | null
    collegeTime: number
    jerseyCombo: string | null
    jerseyViews: number
  }> = []

  for (const [userId, recruit] of recruitMap.entries()) {
    const userEvents = events.filter((e) => e.userId === userId)

    // College time: find college:* duration events
    const collegeEvents = userEvents.filter(
      (e) => e.section.startsWith('college:') && e.action === 'duration' && e.duration
    )
    const collegeTime: Record<string, number> = {}
    collegeEvents.forEach((e) => {
      collegeTime[e.section] = (collegeTime[e.section] || 0) + (e.duration ?? 0)
    })
    const topCollegeEntry = Object.entries(collegeTime).sort(([, a], [, b]) => b - a)[0]

    // Jersey combo: find jersey asset_selected events, get most frequent combo
    const jerseySelections = userEvents.filter(
      (e) => e.section === 'jersey' && e.action === 'asset_selected' && e.metadata
    )
    const comboCounts: Record<string, number> = {}
    const jerseyDownloads = userEvents.filter(
      (e) => e.section === 'jersey' && e.action === 'combination_downloaded' && e.metadata
    )
    jerseyDownloads.forEach((e) => {
      const meta = e.metadata as Record<string, string> | null
      if (meta) {
        const combo = [meta.helmet, meta.jersey, meta.pants].filter(Boolean).join(' / ')
        if (combo) comboCounts[combo] = (comboCounts[combo] || 0) + 1
      }
    })
    const topCombo = Object.entries(comboCounts).sort(([, a], [, b]) => b - a)[0]

    if (topCollegeEntry || topCombo || jerseySelections.length > 0) {
      visitInsights.push({
        name: recruit.name,
        email: recruit.email,
        topCollege: topCollegeEntry ? topCollegeEntry[0].replace('college:', '') : null,
        collegeTime: topCollegeEntry ? Math.round(topCollegeEntry[1] / 1000) : 0,
        jerseyCombo: topCombo ? topCombo[0] : null,
        jerseyViews: topCombo ? topCombo[1] : jerseySelections.length,
      })
    }
  }

  // Recent activity
  const recentActivity = events.slice(0, 20).map((e) => ({
    id: e.id,
    name: e.user.displayName,
    section: e.section,
    action: e.action,
    createdAt: e.createdAt.toISOString(),
  }))

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="mt-2 text-muted-foreground">
          Track recruit engagement with {school.name}.
        </p>
      </div>

      <AnalyticsDashboard
        schoolId={school.id}
        viewsData={viewsData}
        engagementData={engagementData}
        sectionData={sectionData}
        recentActivity={recentActivity}
        totalEvents={events.length}
        uniqueRecruits={recruitMap.size}
        visitInsights={visitInsights}
      />
    </div>
  )
}
