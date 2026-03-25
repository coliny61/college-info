import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

async function verifyCoachOwnsList(listId: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true, role: true } })
  if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId) return null

  const list = await prisma.recruitList.findUnique({ where: { id: listId }, select: { schoolId: true } })
  if (!list || list.schoolId !== dbUser.schoolId) return null

  return { schoolId: dbUser.schoolId }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ listId: string }> }
) {
  try {
    const { listId } = await params
    const coach = await verifyCoachOwnsList(listId)
    if (!coach) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await request.json().catch(() => null)
    const parsed = z.object({ recruitId: z.string().uuid() }).safeParse(body)
    if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 })

    const member = await prisma.recruitListMember.create({
      data: { listId, recruitId: parsed.data.recruitId },
    })

    return NextResponse.json({ member }, { status: 201 })
  } catch (err) {
    console.error('POST list members error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ listId: string }> }
) {
  try {
    const { listId } = await params
    const coach = await verifyCoachOwnsList(listId)
    if (!coach) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const { searchParams } = new URL(request.url)
    const recruitId = searchParams.get('recruitId')
    if (!recruitId) return NextResponse.json({ error: 'recruitId required' }, { status: 400 })

    await prisma.recruitListMember.delete({
      where: { listId_recruitId: { listId, recruitId } },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE list members error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
