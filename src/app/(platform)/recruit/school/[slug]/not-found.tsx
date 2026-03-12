import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

export default function SchoolNotFound() {
  return (
    <div className="mx-auto max-w-6xl flex flex-col items-center justify-center py-20 text-center animate-in-up">
      <h1 className="text-display text-3xl text-foreground mb-2">School Not Found</h1>
      <p className="max-w-md text-sm text-muted-foreground mb-8">
        This school doesn&apos;t exist on our platform yet. Browse all available schools below.
      </p>
      <Link href="/recruit/schools">
        <Button className="gap-2">
          <Search className="h-4 w-4" /> Browse Schools
        </Button>
      </Link>
    </div>
  )
}
