import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { id } = await params

    const invite = await prisma.inviteLink.findUnique({
      where: { id },
      select: { schoolId: true },
    })
    if (!invite) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { schoolId: true, role: true },
    })

    if (!dbUser || dbUser.role !== 'coach_admin' || !dbUser.schoolId || dbUser.schoolId !== invite.schoolId) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.inviteLink.delete({ where: { id } })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('DELETE /api/admin/invites/[id] error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
