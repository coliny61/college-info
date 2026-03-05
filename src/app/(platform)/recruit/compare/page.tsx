import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, GraduationCap, DollarSign, Users, Trophy, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface SearchParams {
  schools?: string
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams
  const slugs = params.schools?.split(',').slice(0, 3) ?? []

  if (slugs.length < 2) {
    return (
      <div className="mx-auto max-w-4xl text-center py-16">
        <h1 className="text-2xl font-bold text-foreground">Select Schools to Compare</h1>
        <p className="mt-2 text-muted-foreground">
          Go to Browse Schools and select 2-3 schools to compare.
        </p>
        <Link href="/recruit/schools" className="mt-6 inline-block">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Browse Schools
          </Button>
        </Link>
      </div>
    )
  }

  const schools = await prisma.school.findMany({
    where: { slug: { in: slugs } },
    include: {
      academics: true,
      sports: { select: { name: true, record: true, ranking: true } },
    },
  })

  // Sort to match URL order
  const ordered = slugs
    .map((s) => schools.find((sc) => sc.slug === s))
    .filter(Boolean) as typeof schools

  const rows: { label: string; icon: React.ReactNode; values: (string | number | null)[] }[] = [
    {
      label: 'Location',
      icon: <MapPin className="h-4 w-4" />,
      values: ordered.map((s) => `${s.city}, ${s.state}`),
    },
    {
      label: 'Conference',
      icon: <Trophy className="h-4 w-4" />,
      values: ordered.map((s) => s.conference),
    },
    {
      label: 'Enrollment',
      icon: <Users className="h-4 w-4" />,
      values: ordered.map((s) => s.academics?.enrollment?.toLocaleString() ?? '—'),
    },
    {
      label: 'Admission Rate',
      icon: <GraduationCap className="h-4 w-4" />,
      values: ordered.map((s) =>
        s.academics ? `${(s.academics.admissionRate * 100).toFixed(0)}%` : '—'
      ),
    },
    {
      label: 'SAT Average',
      icon: null,
      values: ordered.map((s) => s.academics?.satAvg?.toString() ?? '—'),
    },
    {
      label: 'ACT Average',
      icon: null,
      values: ordered.map((s) => s.academics?.actAvg?.toString() ?? '—'),
    },
    {
      label: 'Tuition (In-State)',
      icon: <DollarSign className="h-4 w-4" />,
      values: ordered.map((s) =>
        s.academics ? `$${s.academics.tuitionInState.toLocaleString()}` : '—'
      ),
    },
    {
      label: 'Tuition (Out-of-State)',
      icon: null,
      values: ordered.map((s) =>
        s.academics ? `$${s.academics.tuitionOutOfState.toLocaleString()}` : '—'
      ),
    },
    {
      label: 'Graduation Rate',
      icon: null,
      values: ordered.map((s) =>
        s.academics ? `${(s.academics.graduationRate * 100).toFixed(0)}%` : '—'
      ),
    },
    {
      label: 'Median Earnings',
      icon: null,
      values: ordered.map((s) =>
        s.academics ? `$${s.academics.medianEarnings.toLocaleString()}` : '—'
      ),
    },
    {
      label: 'Sports',
      icon: <Trophy className="h-4 w-4" />,
      values: ordered.map((s) => s.sports.map((sp) => sp.name).join(', ') || '—'),
    },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 animate-in-up">
        <Link
          href="/recruit/schools"
          className="mb-3 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to schools
        </Link>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Compare Schools
        </h1>
      </div>

      <Card className="overflow-hidden animate-in-up delay-1">
        <CardContent className="p-0">
          {/* School headers */}
          <div
            className="grid border-b border-border"
            style={{ gridTemplateColumns: `200px repeat(${ordered.length}, 1fr)` }}
          >
            <div className="p-4" />
            {ordered.map((s) => (
              <div key={s.id} className="border-l border-border p-4 text-center">
                <div
                  className="mx-auto mb-2 h-1 w-16 rounded-full"
                  style={{ backgroundColor: s.colorPrimary }}
                />
                <Link href={`/recruit/school/${s.slug}`}>
                  <h3
                    className="text-xl font-black text-scoreboard hover:underline"
                    style={{ color: s.colorPrimary }}
                  >
                    {s.shortName}
                  </h3>
                </Link>
                <p className="mt-1 text-xs text-muted-foreground">{s.name}</p>
                <Badge className="mt-2" style={{ backgroundColor: s.colorPrimary, color: '#fff' }}>
                  {s.conference}
                </Badge>
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid ${i % 2 === 0 ? 'bg-muted/30' : ''}`}
              style={{ gridTemplateColumns: `200px repeat(${ordered.length}, 1fr)` }}
            >
              <div className="flex items-center gap-2 p-4 text-sm font-medium text-muted-foreground">
                {row.icon}
                {row.label}
              </div>
              {row.values.map((val, j) => (
                <div
                  key={j}
                  className="border-l border-border p-4 text-center text-sm font-medium text-foreground"
                >
                  {val}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
