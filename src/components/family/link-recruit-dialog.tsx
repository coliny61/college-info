'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { linkToRecruit } from '@/app/(platform)/parent/actions'
import { Link2, Check } from 'lucide-react'
import { toast } from 'sonner'

export function LinkRecruitDialog() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!code.trim()) {
      setError('Please enter a family code.')
      return
    }

    startTransition(async () => {
      const result = await linkToRecruit(code.trim().toUpperCase())

      if (result.error) {
        setError(result.error)
        return
      }

      toast.success(`Linked to ${result.recruitName}!`)
      setOpen(false)
      router.refresh()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Link2 className="h-4 w-4" />
          Link Your Recruit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Link Your Recruit</DialogTitle>
          <DialogDescription>
            Enter the family code your recruit generated from their profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="e.g., MJ-7X4K"
              value={code}
              onChange={(e) => { setCode(e.target.value); setError('') }}
              className="text-center text-lg font-mono tracking-wider"
              autoFocus
            />
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
          </div>
          <div className="flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="gap-2">
              {isPending ? 'Linking...' : <><Check className="h-4 w-4" /> Link</>}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
