import { prisma } from '@/lib/prisma'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shirt } from 'lucide-react'

export default async function AdminJerseysPage() {
  const school = await prisma.school.findFirst()
  if (!school) return <p className="text-muted-foreground">No school found.</p>

  const assets = await prisma.jerseyAsset.findMany({
    where: { schoolId: school.id },
    orderBy: [{ type: 'asc' }, { colorLabel: 'asc' }],
  })

  const types = ['helmet', 'jersey', 'pants']

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Jerseys</h1>
        <p className="mt-2 text-muted-foreground">
          Manage jersey assets for the Jersey Room experience.
        </p>
      </div>

      <div className="space-y-6">
        {types.map((type) => {
          const typeAssets = assets.filter((a) => a.type === type)
          return (
            <Card key={type}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 capitalize">
                  <Shirt className="h-5 w-5 text-emerald" />
                  {type}s
                </CardTitle>
              </CardHeader>
              <CardContent>
                {typeAssets.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No {type} assets uploaded yet.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-4">
                    {typeAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="relative aspect-square overflow-hidden rounded-lg border border-border bg-muted"
                      >
                        <Image
                          src={asset.imageUrl}
                          alt={`${asset.type} - ${asset.colorLabel}`}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1 text-center">
                          <span className="text-xs text-white capitalize">
                            {asset.colorLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
