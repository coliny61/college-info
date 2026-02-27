import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { Image as ImageIcon } from 'lucide-react'

export default async function AdminMediaPage() {
  const school = await prisma.school.findFirst()
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  const media = await prisma.media.findMany({
    where: { schoolId: school.id },
    orderBy: { sortOrder: 'asc' },
  })

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Media</h1>
        <p className="mt-2 text-muted-foreground">
          Upload and manage photos and videos for your school page.
        </p>
      </div>

      {media.length === 0 ? (
        <div className="rounded-lg border-2 border-dashed border-border p-12 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No media yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload photos and videos to showcase your program. Drag and drop
            files or click to browse.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Media uploads require Supabase Storage configuration.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {media.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4">
                <p className="text-sm font-medium text-foreground">
                  {item.caption ?? 'Untitled'}
                </p>
                <p className="text-xs text-muted-foreground">{item.type}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
