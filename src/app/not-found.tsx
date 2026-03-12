import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GraduationCap, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
      {/* Floating orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 h-64 w-64 rounded-full bg-emerald/5 blur-3xl animate-float-slow" />
        <div
          className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-emerald/[0.03] blur-3xl animate-float-slow"
          style={{ animationDelay: '3s' }}
        />
      </div>

      <div className="relative animate-in-up">
        <div className="mb-6 flex items-center justify-center gap-2 text-emerald">
          <GraduationCap className="h-8 w-8" />
          <span className="text-display text-lg tracking-[0.15em]">OVV</span>
        </div>

        <h1 className="text-hero text-8xl text-foreground mb-2">404</h1>
        <p className="text-display text-xl text-muted-foreground mb-2">Page Not Found</p>
        <p className="max-w-md text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link href="/">
            <Button className="gap-2">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
