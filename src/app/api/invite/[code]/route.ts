import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params

  const invite = await prisma.inviteLink.findUnique({
    where: { code },
    include: {
      school: {
        select: {
          id: true,
          name: true,
          slug: true,
          shortName: true,
          mascot: true,
          colorPrimary: true,
          colorSecondary: true,
          colorAccent: true,
          logoUrl: true,
          welcomeVideoUrl: true,
          defaultWelcomeMsg: true,
          sports: {
            take: 1,
            include: {
              coaches: {
                where: { careerRecord: { not: null } },
                take: 1,
                select: { name: true, title: true, imageUrl: true },
              },
            },
          },
        },
      },
    },
  })

  if (!invite) {
    return NextResponse.json({ error: 'Invalid invite code' }, { status: 404 })
  }

  if (invite.expiresAt && new Date(invite.expiresAt) < new Date()) {
    return NextResponse.json({ error: 'This invite link has expired' }, { status: 410 })
  }

  const headCoach = invite.school.sports[0]?.coaches[0] ?? null

  return NextResponse.json({
    school: {
      id: invite.school.id,
      name: invite.school.name,
      slug: invite.school.slug,
      shortName: invite.school.shortName,
      mascot: invite.school.mascot,
      colorPrimary: invite.school.colorPrimary,
      colorSecondary: invite.school.colorSecondary,
      colorAccent: invite.school.colorAccent,
      logoUrl: invite.school.logoUrl,
    },
    headCoach,
    welcomeMessage: invite.welcomeMessage ?? invite.school.defaultWelcomeMsg,
    welcomeVideoUrl: invite.welcomeVideoUrl ?? invite.school.welcomeVideoUrl,
  })
}
