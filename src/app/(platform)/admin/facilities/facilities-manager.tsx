'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2, MapPin } from 'lucide-react'
import { createFacility, deleteFacility } from '@/app/(platform)/admin/actions'

interface Facility {
  id: string
  name: string
  type: string
  description: string
  panoramaUrl: string | null
  hotspots: Array<{ id: string; label: string }>
}

export function FacilitiesManager({ facilities }: { facilities: Facility[] }) {
  const [open, setOpen] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createFacility(formData)
    setOpen(false)
  }

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1 h-4 w-4" /> Add Facility
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Facility</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input name="name" placeholder="Facility name" required />
            <Input name="type" placeholder="Type (stadium, practice, weight-room, locker-room)" required />
            <textarea
              name="description"
              placeholder="Description"
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
            <Button type="submit">Add</Button>
          </form>
        </DialogContent>
      </Dialog>

      {facilities.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No facilities yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {facilities.map((facility) => (
            <Card key={facility.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{facility.name}</p>
                    <Badge variant="outline" className="capitalize text-xs">
                      {facility.type.replace('-', ' ')}
                    </Badge>
                    {facility.panoramaUrl && (
                      <Badge variant="outline" className="text-xs">360°</Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {facility.description}
                  </p>
                  {facility.hotspots.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {facility.hotspots.length} hotspot{facility.hotspots.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                <form action={() => deleteFacility(facility.id)}>
                  <Button variant="ghost" size="icon" type="submit">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
