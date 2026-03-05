'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Edit3, Users, MapPin, Shirt, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  updateSchoolProfile,
  createCoach,
  deleteCoach,
  createFacility,
  deleteFacility,
} from '@/app/(platform)/admin/actions'

interface ProgramManagerProps {
  school: {
    id: string
    name: string
    description: string
    colorPrimary: string
    colorSecondary: string
    colorAccent: string
  }
  coaches: Array<{
    id: string
    name: string
    title: string
    bio: string
    yearsAtSchool: number
  }>
  facilities: Array<{
    id: string
    name: string
    type: string
    description: string
    panoramaUrl: string | null
    hotspots: Array<{ id: string; label: string }>
  }>
  jerseyAssets: Array<{
    id: string
    type: string
    colorLabel: string
    imageUrl: string
  }>
}

export function ProgramManager({ school, coaches, facilities, jerseyAssets }: ProgramManagerProps) {
  return (
    <Tabs defaultValue="profile">
      <TabsList className="w-full">
        <TabsTrigger value="profile" className="flex items-center gap-1.5">
          <Edit3 className="h-3.5 w-3.5" />
          Profile
        </TabsTrigger>
        <TabsTrigger value="coaches" className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          Coaches
        </TabsTrigger>
        <TabsTrigger value="facilities" className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          Facilities
        </TabsTrigger>
        <TabsTrigger value="jerseys" className="flex items-center gap-1.5">
          <Shirt className="h-3.5 w-3.5" />
          Jerseys
        </TabsTrigger>
      </TabsList>

      <TabsContent value="profile" className="mt-6">
        <ProfileTab school={school} />
      </TabsContent>

      <TabsContent value="coaches" className="mt-6">
        <CoachesTab coaches={coaches} />
      </TabsContent>

      <TabsContent value="facilities" className="mt-6">
        <FacilitiesTab facilities={facilities} />
      </TabsContent>

      <TabsContent value="jerseys" className="mt-6">
        <JerseysTab assets={jerseyAssets} />
      </TabsContent>
    </Tabs>
  )
}

/* ── Profile Tab ── */

function ProfileTab({ school }: { school: ProgramManagerProps['school'] }) {
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData(e.currentTarget)
    await updateSchoolProfile(formData)
    setSaving(false)
    toast.success('School profile updated')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              School Name
            </label>
            <Input id="name" name="name" defaultValue={school.name} />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={school.description}
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { id: 'colorPrimary', label: 'Primary', value: school.colorPrimary },
              { id: 'colorSecondary', label: 'Secondary', value: school.colorSecondary },
              { id: 'colorAccent', label: 'Accent', value: school.colorAccent },
            ].map((color) => (
              <div key={color.id} className="space-y-2">
                <label htmlFor={color.id} className="text-sm font-medium">
                  {color.label}
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id={color.id}
                    name={color.id}
                    defaultValue={color.value}
                    className="h-10 w-10 cursor-pointer rounded border border-input"
                  />
                  <Input defaultValue={color.value} className="flex-1" readOnly />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Preview</p>
            <div
              className="h-3 rounded-full"
              style={{
                background: `linear-gradient(to right, ${school.colorPrimary}, ${school.colorSecondary}, ${school.colorAccent})`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  )
}

/* ── Coaches Tab ── */

function CoachesTab({ coaches }: { coaches: ProgramManagerProps['coaches'] }) {
  const [open, setOpen] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createCoach(formData)
    setOpen(false)
    toast.success('Coach added')
  }

  const handleDelete = async (coachId: string) => {
    await deleteCoach(coachId)
    toast.success('Coach deleted')
  }

  return (
    <div className="space-y-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-1 h-4 w-4" /> Add Coach
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Coach</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input name="name" placeholder="Name" required />
            <Input name="title" placeholder="Title (e.g. Head Coach)" required />
            <textarea
              name="bio"
              placeholder="Bio"
              rows={3}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            />
            <Input name="yearsAtSchool" type="number" placeholder="Years at school" defaultValue="0" />
            <Button type="submit">Add</Button>
          </form>
        </DialogContent>
      </Dialog>

      {coaches.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <Users className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No coaches yet. Add your first coach above.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {coaches.map((coach) => (
            <Card key={coach.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div>
                  <p className="font-medium text-foreground">{coach.name}</p>
                  <p className="text-sm text-emerald">{coach.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{coach.bio}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{coach.yearsAtSchool} years</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Coach</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {coach.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(coach.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Facilities Tab ── */

function FacilitiesTab({ facilities }: { facilities: ProgramManagerProps['facilities'] }) {
  const [open, setOpen] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createFacility(formData)
    setOpen(false)
    toast.success('Facility added')
  }

  const handleDelete = async (facilityId: string) => {
    await deleteFacility(facilityId)
    toast.success('Facility deleted')
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
          <MapPin className="mx-auto h-10 w-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No facilities yet. Add your first facility above.</p>
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
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{facility.description}</p>
                  {facility.hotspots.length > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {facility.hotspots.length} hotspot{facility.hotspots.length !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Facility</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete {facility.name}? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(facility.id)}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Jerseys Tab ── */

function JerseysTab({ assets }: { assets: ProgramManagerProps['jerseyAssets'] }) {
  const types = ['helmet', 'jersey', 'pants']

  return (
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
                        <span className="text-xs text-white capitalize">{asset.colorLabel}</span>
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
  )
}
