import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { JerseyBuilder } from '@/components/jersey/jersey-builder'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default async function JerseyRoomPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      shortName: true,
      colorPrimary: true,
      colorSecondary: true,
      jerseyAssets: {
        select: {
          id: true,
          type: true,
          colorLabel: true,
          imageUrl: true,
        },
      },
    },
  })

  if (!school) {
    notFound()
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center gap-3">
        <Link href={`/recruit/school/${slug}`}>
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            <span style={{ color: school.colorPrimary }}>
              {school.name}
            </span>{' '}
            Jersey Room
          </h1>
          <p className="text-sm text-muted-foreground">
            Build your dream uniform for {school.name}.
          </p>
        </div>
      </div>

      <JerseyBuilder
        schoolId={school.id}
        schoolName={school.name}
        schoolSlug={school.slug}
        assets={school.jerseyAssets}
        colorPrimary={school.colorPrimary}
      />
    </div>
  )
}
