import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { calculateEngagementScore } from '@/lib/engagement-score'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { schoolId: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'coach_admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const schoolId = dbUser.schoolId ?? (await prisma.school.findFirst({ select: { id: true } }))?.id
  if (!schoolId) return NextResponse.json({ error: 'No school' }, { status: 404 })

  const { userId } = await params

  // Get recruit info
  const recruit = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      displayName: true,
      email: true,
      recruitProfile: true,
    },
  })
  if (!recruit) return NextResponse.json({ error: 'Recruit not found' }, { status: 404 })

  // Get all events for this recruit at this school
  const events = await prisma.analyticsEvent.findMany({
    where: { userId, schoolId },
    orderBy: { createdAt: 'asc' },
    select: {
      section: true,
      action: true,
      duration: true,
      metadata: true,
      createdAt: true,
    },
  })

  // Section breakdown (time per section)
  const sectionTime: Record<string, number> = {}
  for (const e of events) {
    const section = e.section.split('.')[0]
    sectionTime[section] = (sectionTime[section] ?? 0) + (e.duration ?? 0)
  }
  const sectionBreakdown = Object.entries(sectionTime)
    .map(([section, duration]) => ({ section, duration }))
    .sort((a, b) => b.duration - a.duration)

  // Session timeline
  const timeline = events.map(e => ({
    section: e.section,
    action: e.action,
    duration: e.duration,
    metadata: e.metadata,
    timestamp: e.createdAt.toISOString(),
  }))

  // Engagement score
  const engagementScore = await calculateEngagementScore(userId, schoolId)

  // Specific content engaged
  const specificContent = events
    .filter(e => ['view_coach_bio', 'view_college', 'view_major', 'view_panorama', 'save_combo'].includes(e.action))
    .map(e => ({
      action: e.action,
      metadata: e.metadata,
      timestamp: e.createdAt.toISOString(),
    }))

  return NextResponse.json({
    recruit: {
      id: recruit.id,
      name: recruit.displayName,
      email: recruit.email,
      profile: recruit.recruitProfile,
    },
    sectionBreakdown,
    timeline,
    specificContent,
    engagementScore,
    totalEvents: events.length,
  })
}
