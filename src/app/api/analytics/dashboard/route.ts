import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

async function getCoachSchoolId() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { schoolId: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'coach_admin') return null

  return dbUser.schoolId ?? (await prisma.school.findFirst({ select: { id: true } }))?.id ?? null
}

export async function GET() {
  const schoolId = await getCoachSchoolId()
  if (!schoolId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Total invited (users who used an invite for this school)
  const totalInvites = await prisma.inviteLink.aggregate({
    where: { schoolId },
    _sum: { usedCount: true },
  })

  // Unique visitors (distinct users with analytics events for this school)
  const visitors = await prisma.analyticsEvent.findMany({
    where: { schoolId },
    distinct: ['userId'],
    select: { userId: true },
  })

  // Total engagement time
  const totalTime = await prisma.analyticsEvent.aggregate({
    where: { schoolId, duration: { not: null } },
    _sum: { duration: true },
  })

  // Recent activity (last 20)
  const recentActivity = await prisma.analyticsEvent.findMany({
    where: { schoolId },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      user: { select: { displayName: true, email: true } },
    },
  })

  return NextResponse.json({
    totalInvited: totalInvites._sum.usedCount ?? 0,
    totalVisited: visitors.length,
    totalEngagementTime: totalTime._sum.duration ?? 0,
    recentActivity: recentActivity.map(e => ({
      id: e.id,
      name: e.user.displayName,
      section: e.section,
      action: e.action,
      duration: e.duration,
      createdAt: e.createdAt.toISOString(),
    })),
  })
}
