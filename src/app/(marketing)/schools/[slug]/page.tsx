import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { SchoolHeader } from '@/components/school/school-header'
import { SchoolTabs } from '@/components/school/school-tabs'
import { Button } from '@/components/ui/button'
import { GraduationCap, ArrowRight, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function PublicSchoolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
    include: {
      academics: true,
      colleges: {
        include: {
          majors: {
            include: {
              pathways: { orderBy: { year: 'asc' } },
              careerOutcomes: true,
            },
          },
        },
      },
      sports: {
        include: {
          coaches: true,
        },
      },
      facilities: {
        include: {
          hotspots: true,
        },
      },
      nilProgram: true,
      notableAlumni: {
        orderBy: { draftYear: 'desc' as const },
      },
      rosterPlayers: {
        orderBy: [{ isStarter: 'desc' as const }, { position: 'asc' as const }, { name: 'asc' as const }],
      },
    },
  })

  if (!school) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-display text-lg tracking-normal text-foreground">
              OVV
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider gap-1.5">
                <ArrowLeft className="h-3.5 w-3.5" />
                Home
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-xs uppercase tracking-wider">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* School content */}
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-8">
        {/* Public preview banner */}
        <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald/20 bg-emerald/5 px-5 py-3 animate-in-fade">
          <p className="text-sm text-muted-foreground">
            You&apos;re previewing <span className="font-medium text-foreground">{school.name}</span> — sign up to save favorites, customize jerseys, and explore all programs.
          </p>
          <Link href="/register">
            <Button size="sm" className="text-xs uppercase tracking-wider gap-1.5 shrink-0 ml-4">
              Sign Up Free
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <SchoolHeader
          id={school.id}
          slug={school.slug}
          name={school.name}
          shortName={school.shortName}
          mascot={school.mascot}
          conference={school.conference}
          city={school.city}
          state={school.state}
          colorPrimary={school.colorPrimary}
          colorSecondary={school.colorSecondary}
          colorAccent={school.colorAccent}
          isFavorited={false}
          isPublic
        />

        <div className="mt-6">
          <SchoolTabs school={school} colorPrimary={school.colorPrimary} isPublic />
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div>
            <p className="text-sm font-medium text-foreground">Want this for your program?</p>
            <p className="text-xs text-muted-foreground">Build your own virtual visit and start tracking recruit engagement.</p>
          </div>
          <Link href="/register">
            <Button className="text-xs uppercase tracking-wider gap-1.5">
              Create Your Program
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
