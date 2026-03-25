import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const VALID_STATUSES = ['invited', 'viewed', 'engaged', 'contacted', 'visited', 'offered', 'committed'] as const

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true, role: true } })
    if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { userId } = await params
    const body = await request.json().catch(() => null)
    const parsed = z.object({ status: z.enum(VALID_STATUSES) }).safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

    const status = await prisma.recruitStatus.upsert({
      where: { schoolId_recruitId: { schoolId: dbUser.schoolId, recruitId: userId } },
      create: { schoolId: dbUser.schoolId, recruitId: userId, status: parsed.data.status },
      update: { status: parsed.data.status },
    })

    return NextResponse.json({ status })
  } catch (err) {
    console.error('PUT status error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
