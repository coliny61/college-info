import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { ArrowRight, GraduationCap } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const selection = await prisma.jerseySelection.findUnique({
    where: { id },
    include: { school: { select: { name: true, mascot: true } } },
  }).catch(() => null)

  if (!selection) return { title: 'Jersey Combo' }

  return {
    title: `My Jersey Combo — ${selection.school.name}`,
    description: `Check out this ${selection.school.name} ${selection.school.mascot} jersey combo built on OVV`,
    openGraph: {
      title: `My Jersey Combo — ${selection.school.name} ${selection.school.mascot}`,
      description: 'Built on OVV — Official Virtual Visit',
    },
    twitter: {
      card: 'summary',
      title: `My Jersey Combo — ${selection.school.name}`,
    },
  }
}

export default async function JerseySharePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const selection = await prisma.jerseySelection.findUnique({
    where: { id },
    include: {
      school: {
        select: {
          name: true,
          shortName: true,
          mascot: true,
          slug: true,
          colorPrimary: true,
          colorSecondary: true,
          colorAccent: true,
          logoUrl: true,
        },
      },
    },
  }).catch(() => null)

  if (!selection) notFound()

  const school = selection.school

  // Fetch the jersey assets for display
  const [helmet, jersey, pants] = await Promise.all([
    prisma.jerseyAsset.findUnique({ where: { id: selection.helmetId }, select: { imageUrl: true, colorLabel: true } }).catch(() => null),
    prisma.jerseyAsset.findUnique({ where: { id: selection.jerseyId }, select: { imageUrl: true, colorLabel: true } }).catch(() => null),
    prisma.jerseyAsset.findUnique({ where: { id: selection.pantsId }, select: { imageUrl: true, colorLabel: true } }).catch(() => null),
  ])

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-12">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <span className="text-display text-lg text-foreground">OVV</span>
      </div>

      {/* Jersey card */}
      <div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${school.colorPrimary}, ${school.colorSecondary})` }}
      >
        <div className="absolute inset-0 bg-noise pointer-events-none" />

        <div className="relative p-6 text-center">
          {school.logoUrl && (
            <Image src={school.logoUrl} alt={school.name} width={48} height={48} className="mx-auto mb-3 opacity-80" />
          )}
          <p className="text-[10px] uppercase tracking-[0.25em]" style={{ color: school.colorAccent + 'AA' }}>
            My Jersey Combo
          </p>
          <h1 className="text-display text-xl" style={{ color: school.colorAccent }}>
            {school.name}
          </h1>
        </div>

        {/* Jersey pieces */}
        <div className="relative flex flex-col items-center gap-0 pb-8 px-8">
          {helmet?.imageUrl && (
            <div className="relative h-32 w-32">
              <Image src={helmet.imageUrl} alt="Helmet" fill className="object-contain" />
            </div>
          )}
          {jersey?.imageUrl && (
            <div className="relative -mt-2 h-36 w-36">
              <Image src={jersey.imageUrl} alt="Jersey" fill className="object-contain" />
            </div>
          )}
          {pants?.imageUrl && (
            <div className="relative -mt-2 h-32 w-32">
              <Image src={pants.imageUrl} alt="Pants" fill className="object-contain" />
            </div>
          )}
        </div>

        {/* Branding */}
        <div className="relative px-6 pb-4 text-center">
          <p className="text-[9px] uppercase tracking-[0.2em] opacity-50" style={{ color: school.colorAccent }}>
            Built on OVV — Official Virtual Visit
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 text-center space-y-3">
        <Link href={`/schools/${school.slug}`}>
          <Button variant="outline" className="gap-2">
            Explore {school.shortName} <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <p className="text-xs text-muted-foreground">
          <Link href="/register" className="text-emerald hover:underline">Sign up free</Link> to build your own jersey combo
        </p>
      </div>
    </div>
  )
}
