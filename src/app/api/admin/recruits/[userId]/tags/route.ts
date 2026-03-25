import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

async function getCoach() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true, role: true } })
  if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId) return null
  return { userId: user.id, schoolId: dbUser.schoolId }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const coach = await getCoach()
    if (!coach) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { userId } = await params
    const body = await request.json().catch(() => null)
    const parsed = z.object({ tag: z.string().min(1).max(100) }).safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

    const tag = await prisma.recruitTag.create({
      data: { schoolId: coach.schoolId, recruitId: userId, tag: parsed.data.tag },
    })

    return NextResponse.json({ tag }, { status: 201 })
  } catch (err) {
    console.error('POST tags error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const coach = await getCoach()
    if (!coach) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { userId } = await params
    const { searchParams } = new URL(request.url)
    const tag = searchParams.get('tag')
    if (!tag) return NextResponse.json({ error: 'Tag required' }, { status: 400 })

    await prisma.recruitTag.delete({
      where: { schoolId_recruitId_tag: { schoolId: coach.schoolId, recruitId: userId, tag } },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE tags error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
