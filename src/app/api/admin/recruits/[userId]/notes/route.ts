import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export async function POST(
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
    const parsed = z.object({ content: z.string().min(1).max(5000) }).safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

    const note = await prisma.recruitNote.create({
      data: {
        coachId: user.id,
        recruitId: userId,
        schoolId: dbUser.schoolId,
        content: parsed.data.content,
      },
    })

    return NextResponse.json({ note }, { status: 201 })
  } catch (err) {
    console.error('POST notes error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
