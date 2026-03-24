import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { randomBytes } from 'crypto'

async function getCoachSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, schoolId: true, role: true },
  })
  if (!dbUser || dbUser.role !== 'coach_admin') return null

  const schoolId = dbUser.schoolId ?? (await prisma.school.findFirst({ select: { id: true } }))?.id
  if (!schoolId) return null

  return { userId: dbUser.id, schoolId }
}

export async function GET() {
  const coach = await getCoachSchool()
  if (!coach) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const invites = await prisma.inviteLink.findMany({
    where: { schoolId: coach.schoolId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      code: true,
      expiresAt: true,
      usedCount: true,
      welcomeMessage: true,
      welcomeVideoUrl: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ invites })
}

export async function POST(request: Request) {
  const coach = await getCoachSchool()
  if (!coach) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => ({}))
  const {
    expiresAt,
    welcomeMessage,
    welcomeVideoUrl,
    quantity = 1,
  } = body as {
    expiresAt?: string
    welcomeMessage?: string
    welcomeVideoUrl?: string
    quantity?: number
  }

  const count = Math.min(Math.max(1, quantity), 100) // clamp 1-100
  const defaultExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  const created = []
  for (let i = 0; i < count; i++) {
    const code = randomBytes(6).toString('hex')
    const invite = await prisma.inviteLink.create({
      data: {
        schoolId: coach.schoolId,
        createdBy: coach.userId,
        code,
        expiresAt: expiresAt ? new Date(expiresAt) : defaultExpiry,
        welcomeMessage: welcomeMessage || null,
        welcomeVideoUrl: welcomeVideoUrl || null,
      },
    })
    created.push(invite)
  }

  return NextResponse.json({ invites: created }, { status: 201 })
}
