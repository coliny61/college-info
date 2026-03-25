import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { generateInsight } from '@/lib/ai-insights'
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

  // Only generate insights for recruits with moderate+ engagement
  const score = await calculateEngagementScore(userId, schoolId)
  if (score.score < 26) {
    return NextResponse.json({
      insight: null,
      reason: 'Engagement score too low for insights (requires >= 26)',
    })
  }

  const recruit = await prisma.user.findUnique({
    where: { id: userId },
    select: { displayName: true },
  })
  if (!recruit) return NextResponse.json({ error: 'Recruit not found' }, { status: 404 })

  const insight = await generateInsight(userId, schoolId, recruit.displayName)

  return NextResponse.json({ insight })
}
