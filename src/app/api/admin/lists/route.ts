import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

async function getCoach() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { id: true, schoolId: true, role: true } })
  if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId) return null
  return { userId: dbUser.id, schoolId: dbUser.schoolId }
}

export async function GET() {
  try {
    const coach = await getCoach()
    if (!coach) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const lists = await prisma.recruitList.findMany({
      where: { schoolId: coach.schoolId },
      include: { _count: { select: { members: true } } },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ lists })
  } catch (err) {
    console.error('GET lists error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const coach = await getCoach()
    if (!coach) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await request.json().catch(() => null)
    const parsed = z.object({ name: z.string().min(1).max(200) }).safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

    const list = await prisma.recruitList.create({
      data: { schoolId: coach.schoolId, createdBy: coach.userId, name: parsed.data.name },
    })

    return NextResponse.json({ list }, { status: 201 })
  } catch (err) {
    console.error('POST lists error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
