import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Rate limit: 5 requests per minute (CSV export is expensive)
    const rl = rateLimit(`analytics-export:${user.id}`, {
      windowMs: 60_000,
      maxRequests: 5,
    })
    if (!rl.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429, headers: { 'Retry-After': '60' } },
      )
    }

    const { searchParams } = new URL(request.url)
    const schoolId = searchParams.get('schoolId')
    const days = parseInt(searchParams.get('days') ?? '30')

    const since = new Date()
    since.setDate(since.getDate() - days)

    const events = await prisma.analyticsEvent.findMany({
      where: {
        ...(schoolId && { schoolId }),
        createdAt: { gte: since },
      },
      include: {
        user: { select: { displayName: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Build CSV
    const headers = [
      'Date',
      'User',
      'Email',
      'Section',
      'Action',
      'Duration (s)',
      'Session ID',
    ]
    const rows = events.map((e) => [
      new Date(e.createdAt).toISOString(),
      e.user.displayName,
      e.user.email,
      e.section,
      e.action,
      e.duration ? Math.round(e.duration / 1000).toString() : '',
      e.sessionId,
    ])

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="analytics-${days}d.csv"`,
      },
    })
  } catch (error) {
    console.error('Analytics export error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
