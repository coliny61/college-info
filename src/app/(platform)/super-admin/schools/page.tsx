import { prisma } from '@/lib/prisma'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export default async function SuperAdminSchoolsPage() {
  const schools = await prisma.school.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: {
        select: {
          favorites: true,
          analyticsEvents: true,
          admins: true,
        },
      },
    },
  })

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Schools</h1>
        <p className="mt-2 text-muted-foreground">
          All schools on the platform.
        </p>
      </div>

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>School</TableHead>
              <TableHead>Conference</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Admins</TableHead>
              <TableHead>Favorites</TableHead>
              <TableHead>Events</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schools.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: school.colorPrimary }}
                    />
                    <span className="font-medium">{school.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{school.conference}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {school.city}, {school.state}
                </TableCell>
                <TableCell>{school._count.admins}</TableCell>
                <TableCell>{school._count.favorites}</TableCell>
                <TableCell>{school._count.analyticsEvents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
