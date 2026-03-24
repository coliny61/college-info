import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { SchoolHeader } from '@/components/school/school-header'
import { SectionNavigator } from '@/components/school/section-navigator'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MarketingFooter } from '@/components/layout/marketing-footer'
import { TourTab } from '@/components/school/tour-tab'
import { AthleticsTab } from '@/components/school/athletics-tab'
import { AcademicsTab } from '@/components/school/academics-tab'
import { NilTab } from '@/components/school/nil-tab'
import { AlumniTab } from '@/components/school/alumni-tab'
import { VideoSection } from '@/components/school/video-section'
import { JerseySection } from '@/components/school/jersey-section'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
    select: { name: true, mascot: true, description: true, conference: true, city: true, state: true },
  })
  if (!school) return { title: 'School Not Found' }
  return {
    title: `${school.name} ${school.mascot}`,
    description: school.description.slice(0, 160),
    openGraph: {
      title: `${school.name} ${school.mascot} — Official Virtual Visit`,
      description: `Explore ${school.name}'s football program: 360° facility tours, jersey room, coaching staff, and academics. ${school.conference} · ${school.city}, ${school.state}`,
      images: [`/panoramas/${slug}-stadium.jpg`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${school.name} ${school.mascot} | OVV`,
      images: [`/panoramas/${slug}-stadium.jpg`],
    },
  }
}

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
        orderBy: { sortOrder: 'asc' },
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
      jerseyAssets: { select: { id: true } },
      videos: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  if (!school) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <div
        className="mx-auto max-w-5xl px-6 pt-24 pb-20 sm:px-8 xl:pb-16"
        style={{
          ['--school-primary' as string]: school.colorPrimary,
          ['--school-secondary' as string]: school.colorSecondary,
          ['--school-accent' as string]: school.colorAccent,
        }}
      >
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

        <SectionNavigator />

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
          logoUrl={school.logoUrl}
          isFavorited={false}
          isPublic
        />

        {/* Description */}
        <section className="mt-10">
          <p className="text-base leading-relaxed text-muted-foreground">
            {school.description}
          </p>
        </section>

        <section id="tour" className="mt-16 scroll-mt-20">
          <SectionDivider title="Virtual Tour" />
          <TourTab facilities={school.facilities} colorPrimary={school.colorPrimary} />
        </section>

        <section id="football" className="mt-16 scroll-mt-20">
          <SectionDivider title="Football Program" />
          <AthleticsTab
            sports={school.sports}
            roster={school.rosterPlayers ?? []}
            facilities={school.facilities}
            colorPrimary={school.colorPrimary}
            schoolSlug={school.slug}
            isPublic
          />
        </section>

        <section id="academics" className="mt-16 scroll-mt-20">
          <SectionDivider title="Academics" />
          <AcademicsTab
            academics={school.academics}
            colleges={school.colleges}
            schoolSlug={school.slug}
            colorPrimary={school.colorPrimary}
            isPublic
          />
        </section>

        <section id="nil" className="mt-16 scroll-mt-20">
          <SectionDivider title="NIL" />
          <NilTab nilProgram={school.nilProgram as any} schoolId={school.id} colorPrimary={school.colorPrimary} />
        </section>

        <section id="roster" className="mt-16 scroll-mt-20" />

        <section id="alumni" className="mt-16 scroll-mt-20">
          <SectionDivider title="Notable Alumni" />
          <AlumniTab alumni={school.notableAlumni ?? []} schoolId={school.id} colorPrimary={school.colorPrimary} />
        </section>

        <section id="jersey" className="mt-16 scroll-mt-20">
          <SectionDivider title="Jersey Room" />
          <JerseySection schoolSlug={school.slug} colorPrimary={school.colorPrimary} hasAssets={school.jerseyAssets.length > 0} isPublic />
        </section>

        <section id="video" className="mt-16 scroll-mt-20">
          <SectionDivider title="Video & Media" />
          <VideoSection videos={school.videos} colorPrimary={school.colorPrimary} />
        </section>
      </div>

      {/* Bottom CTA */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
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

      <MarketingFooter />
    </div>
  )
}

function SectionDivider({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <div className="section-divider mb-6" />
      <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">{title}</h2>
    </div>
  )
}
