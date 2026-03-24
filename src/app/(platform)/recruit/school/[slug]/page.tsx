import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { SchoolHeader } from '@/components/school/school-header'
import { SectionNavigator } from '@/components/school/section-navigator'
import { TrackSchoolView } from '@/components/school/track-school-view'
import { TourTab } from '@/components/school/tour-tab'
import { AthleticsTab } from '@/components/school/athletics-tab'
import { AcademicsTab } from '@/components/school/academics-tab'
import { NilTab } from '@/components/school/nil-tab'
import { AlumniTab } from '@/components/school/alumni-tab'
import { RosterSection } from '@/components/school/roster-section'
import { VideoSection } from '@/components/school/video-section'
import { JerseySection } from '@/components/school/jersey-section'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const school = await prisma.school.findUnique({
    where: { slug },
    select: { name: true, mascot: true, conference: true },
  })
  if (!school) return { title: 'School Not Found' }
  return {
    title: `${school.name} ${school.mascot}`,
    description: `Explore ${school.name} — ${school.conference}`,
  }
}

export default async function SchoolDetailPage({
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

  // Check if user has favorited this school
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isFavorited = false
  if (user) {
    const fav = await prisma.favorite.findUnique({
      where: {
        userId_schoolId: {
          userId: user.id,
          schoolId: school.id,
        },
      },
    })
    isFavorited = !!fav
  }

  return (
    <div
      className="mx-auto max-w-5xl pb-20 xl:pb-8"
      style={{
        ['--school-primary' as string]: school.colorPrimary,
        ['--school-secondary' as string]: school.colorSecondary,
        ['--school-accent' as string]: school.colorAccent,
      }}
    >
      <TrackSchoolView
        school={{
          id: school.id,
          slug: school.slug,
          name: school.name,
          shortName: school.shortName,
          mascot: school.mascot,
          conference: school.conference,
          city: school.city,
          state: school.state,
          colorPrimary: school.colorPrimary,
          colorSecondary: school.colorSecondary,
          logoUrl: school.logoUrl,
        }}
      />

      <SectionNavigator />

      <Breadcrumb className="mb-6 animate-in-fade">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/recruit/schools">Schools</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{school.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* ─── Header ──────────────────────────────────────────────── */}
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
        isFavorited={isFavorited}
      />

      {/* ─── Description ─────────────────────────────────────────── */}
      <section className="mt-10 animate-in-up">
        <p className="text-base leading-relaxed text-muted-foreground">
          {school.description}
        </p>
      </section>

      {/* ─── Tour ────────────────────────────────────────────────── */}
      <section id="tour" className="mt-16 scroll-mt-20">
        <SectionHeading title="Virtual Tour" />
        <TourTab
          facilities={school.facilities}
          colorPrimary={school.colorPrimary}
        />
      </section>

      {/* ─── Football ────────────────────────────────────────────── */}
      <section id="football" className="mt-16 scroll-mt-20">
        <SectionHeading title="Football Program" />
        <AthleticsTab
          sports={school.sports as any}
          stadiumCapacity={school.stadiumCapacity}
          traditions={school.traditions}
          gameDayDescription={school.gameDayDescription}
          colorPrimary={school.colorPrimary}
          schoolId={school.id}
          schoolSlug={school.slug}
        />
      </section>

      {/* ─── Academics ───────────────────────────────────────────── */}
      <section id="academics" className="mt-16 scroll-mt-20">
        <SectionHeading title="Academics" />
        <AcademicsTab
          academics={school.academics}
          colleges={school.colleges}
          schoolSlug={school.slug}
          colorPrimary={school.colorPrimary}
        />
      </section>

      {/* ─── NIL ─────────────────────────────────────────────────── */}
      <section id="nil" className="mt-16 scroll-mt-20">
        <SectionHeading title="NIL" />
        <NilTab
          nilProgram={school.nilProgram as any}
          schoolId={school.id}
          colorPrimary={school.colorPrimary}
        />
      </section>

      {/* ─── Roster ──────────────────────────────────────────────── */}
      <section id="roster" className="mt-16 scroll-mt-20">
        <SectionHeading title="Roster" />
        <RosterSection
          roster={school.rosterPlayers ?? []}
          schoolId={school.id}
          colorPrimary={school.colorPrimary}
        />
      </section>

      {/* ─── Alumni ──────────────────────────────────────────────── */}
      <section id="alumni" className="mt-16 scroll-mt-20">
        <SectionHeading title="Notable Alumni" />
        <AlumniTab
          alumni={school.notableAlumni ?? []}
          schoolId={school.id}
          colorPrimary={school.colorPrimary}
        />
      </section>

      {/* ─── Jersey Room ─────────────────────────────────────────── */}
      <section id="jersey" className="mt-16 scroll-mt-20">
        <SectionHeading title="Jersey Room" />
        <JerseySection
          schoolSlug={school.slug}
          colorPrimary={school.colorPrimary}
          hasAssets={school.jerseyAssets.length > 0}
        />
      </section>

      {/* ─── Video & Media ───────────────────────────────────────── */}
      <section id="video" className="mt-16 scroll-mt-20">
        <SectionHeading title="Video & Media" />
        <VideoSection
          videos={school.videos}
          colorPrimary={school.colorPrimary}
        />
      </section>
    </div>
  )
}

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="mb-6">
      <div className="section-divider mb-6" />
      <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">
        {title}
      </h2>
    </div>
  )
}
