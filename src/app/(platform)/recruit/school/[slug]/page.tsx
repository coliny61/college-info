import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { SchoolHeader } from '@/components/school/school-header'
import { SchoolTabs } from '@/components/school/school-tabs'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

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
        include: {
          hotspots: true,
        },
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
    <div className="mx-auto max-w-6xl space-y-6">
      <Breadcrumb className="animate-in-fade">
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
        isFavorited={isFavorited}
      />

      <SchoolTabs school={school} colorPrimary={school.colorPrimary} />
    </div>
  )
}
