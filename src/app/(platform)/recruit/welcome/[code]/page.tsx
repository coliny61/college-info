import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play } from 'lucide-react'
import { WelcomeTracker } from './welcome-tracker'

export default async function WelcomePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
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

  if (!invite) notFound()

  const school = invite.school
  const headCoach = school.sports[0]?.coaches[0] ?? null
  const welcomeMessage = invite.welcomeMessage ?? school.defaultWelcomeMsg
  const welcomeVideoUrl = invite.welcomeVideoUrl ?? school.welcomeVideoUrl

  return (
    <div className="mx-auto max-w-2xl">
      <WelcomeTracker inviteCode={code} schoolId={school.id} />

      {/* Branded header */}
      <div
        className="relative overflow-hidden rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${school.colorPrimary}, ${school.colorSecondary})`,
        }}
      >
        <div className="absolute inset-0 bg-noise pointer-events-none" />

        {/* Watermark */}
        <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none">
          {school.logoUrl ? (
            <Image
              src={school.logoUrl}
              alt=""
              width={300}
              height={300}
              className="h-48 w-48 opacity-[0.08]"
            />
          ) : (
            <span
              className="text-[8rem] leading-none opacity-[0.06] text-hero"
              style={{ color: school.colorAccent }}
            >
              {school.mascot}
            </span>
          )}
        </div>

        <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
          {/* School logo */}
          {school.logoUrl && (
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
              <Image src={school.logoUrl} alt={school.name} width={48} height={48} className="h-12 w-12" />
            </div>
          )}

          <p
            className="text-[10px] font-semibold uppercase tracking-[0.25em]"
            style={{ color: school.colorAccent + 'AA' }}
          >
            Welcome to
          </p>
          <h1
            className="mt-2 text-hero text-[clamp(2rem,6vw,4rem)] leading-[0.9]"
            style={{ color: school.colorAccent }}
          >
            {school.name}
          </h1>
          <p
            className="mt-2 font-display text-lg font-medium uppercase tracking-wide"
            style={{ color: school.colorAccent + '99' }}
          >
            {school.mascot}
          </p>
        </div>
      </div>

      {/* Coach card */}
      {headCoach && (
        <div className="mt-6 glass-panel rounded-xl p-6 animate-in-up delay-1">
          <div className="flex items-center gap-4">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: school.colorPrimary + '15' }}
            >
              {headCoach.imageUrl ? (
                <Image
                  src={headCoach.imageUrl}
                  alt={headCoach.name}
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <span
                  className="text-xl font-bold"
                  style={{ color: school.colorPrimary }}
                >
                  {headCoach.name.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            <div>
              <p className="font-display text-base font-semibold uppercase tracking-wide text-foreground">
                {headCoach.name}
              </p>
              <p
                className="text-[10px] font-medium uppercase tracking-[0.15em]"
                style={{ color: school.colorPrimary }}
              >
                {headCoach.title}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Welcome video */}
      {welcomeVideoUrl && (
        <div className="mt-6 animate-in-up delay-2">
          <div className="overflow-hidden rounded-xl glass-panel">
            <div className="relative aspect-video">
              <iframe
                src={welcomeVideoUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* Welcome message */}
      {welcomeMessage && (
        <div className="mt-6 glass-panel rounded-xl p-6 animate-in-up delay-3">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {welcomeMessage}
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 text-center animate-in-up delay-4">
        <Link href={`/recruit/school/${school.slug}`}>
          <Button
            size="lg"
            className="h-14 gap-3 px-10 text-sm uppercase tracking-wider font-semibold text-white"
            style={{ backgroundColor: school.colorPrimary }}
          >
            Start Your Visit
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <p className="mt-3 text-xs text-muted-foreground">
          Explore {school.shortName}&apos;s facilities, coaching staff, academics, and more
        </p>
      </div>
    </div>
  )
}
