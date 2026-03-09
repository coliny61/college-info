import { notFound } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import { CollegeDetail } from '@/components/school/college-detail'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ slug: string; collegeSlug: string }>
}) {
  const { slug, collegeSlug } = await params

  const school = await prisma.school.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      slug: true,
      colorPrimary: true,
    },
  })

  if (!school) notFound()

  const college = await prisma.college.findFirst({
    where: {
      schoolId: school.id,
      slug: collegeSlug,
    },
    include: {
      majors: {
        include: {
          pathways: { orderBy: { year: 'asc' } },
          careerOutcomes: true,
        },
      },
    },
  })

  if (!college) notFound()

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
            <BreadcrumbLink asChild>
              <Link href={`/recruit/school/${school.slug}`}>{school.name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{college.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-2xl font-bold text-foreground animate-in-up">{college.name}</h1>

      <CollegeDetail
        college={college}
        schoolId={school.id}
        colorPrimary={school.colorPrimary}
      />
    </div>
  )
}
