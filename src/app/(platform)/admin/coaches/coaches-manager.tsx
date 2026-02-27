'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus, Trash2 } from 'lucide-react'
import { createCoach, deleteCoach } from '@/app/(platform)/admin/actions'

interface Coach {
  id: string
  name: string
  title: string
  bio: string
  yearsAtSchool: number
}

export function CoachesManager({ coaches }: { coaches: Coach[] }) {
  const [open, setOpen] = useState(false)

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createCoach(formData)
    setOpen(false)
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
          <p className="text-muted-foreground">No coaches yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {coaches.map((coach) => (
            <Card key={coach.id}>
              <CardContent className="flex items-start justify-between p-4">
                <div>
                  <p className="font-medium text-foreground">{coach.name}</p>
                  <p className="text-sm text-emerald">{coach.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {coach.bio}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {coach.yearsAtSchool} years
                  </p>
                </div>
                <form action={() => deleteCoach(coach.id)}>
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
