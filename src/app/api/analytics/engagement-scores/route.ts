import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { calculateEngagementScore } from '@/lib/engagement-score'

export async function GET() {
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

  // Get all unique visitors
  const visitors = await prisma.analyticsEvent.findMany({
    where: { schoolId },
    distinct: ['userId'],
    select: { userId: true },
  })

  // Calculate scores for each
  const scores = await Promise.all(
    visitors.map(async (v) => {
      const user = await prisma.user.findUnique({
        where: { id: v.userId },
        select: {
          id: true,
          displayName: true,
          email: true,
          recruitProfile: {
            select: { position: true, graduationYear: true, state: true },
          },
        },
      })
      if (!user) return null

      const score = await calculateEngagementScore(v.userId, schoolId)

      return {
        userId: user.id,
        name: user.displayName,
        email: user.email,
        position: user.recruitProfile?.position,
        graduationYear: user.recruitProfile?.graduationYear,
        state: user.recruitProfile?.state,
        ...score,
      }
    })
  )

  return NextResponse.json({
    scores: scores.filter(Boolean).sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0)),
  })
}
