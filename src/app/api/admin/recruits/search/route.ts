import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
    if (!dbUser || dbUser.role !== 'coach_admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const position = searchParams.get('position')
    const graduationYear = searchParams.get('graduationYear')
    const state = searchParams.get('state')
    const page = parseInt(searchParams.get('page') ?? '1')
    const limit = 20

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: Record<string, any> = {}
    if (position) where.position = position
    if (graduationYear) where.graduationYear = parseInt(graduationYear)
    if (state) where.state = state

    const [recruits, total] = await Promise.all([
      prisma.recruitProfile.findMany({
        where,
        include: {
          user: { select: { id: true, displayName: true, email: true } },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.recruitProfile.count({ where }),
    ])

    return NextResponse.json({
      recruits: recruits.map(r => ({
        userId: r.user.id,
        name: r.user.displayName,
        email: r.user.email,
        position: r.position,
        graduationYear: r.graduationYear,
        height: r.height,
        weight: r.weight,
        gpa: r.gpa,
        highSchool: r.highSchool,
        city: r.city,
        state: r.state,
        highlightsUrl: r.highlightsUrl,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (err) {
    console.error('Search recruits error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
