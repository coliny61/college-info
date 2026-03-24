import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params

    const invite = await prisma.inviteLink.findUnique({ where: { code } })
    if (!invite) {
      return NextResponse.json({ error: 'Invite not found' }, { status: 404 })
    }

    await prisma.inviteLink.update({
      where: { id: invite.id },
      data: { usedCount: invite.usedCount + 1 },
    })

    return NextResponse.json({ success: true, usedCount: invite.usedCount + 1 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
