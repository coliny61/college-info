import type { Metadata } from 'next'
import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export const metadata: Metadata = { title: 'Welcome' }

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen bg-background overflow-hidden">
      {/* Left branding panel — desktop only */}
      <div className="hidden lg:flex lg:w-[45%] relative items-end justify-start p-12 bg-noise">
        {/* Emerald gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald/20 via-emerald/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

        {/* Diagonal slash accent */}
        <div
          className="absolute top-0 right-0 h-full w-1/2 opacity-[0.03] animate-drift"
          style={{
            background: 'linear-gradient(135deg, transparent 40%, #10B981 50%, transparent 60%)',
          }}
        />

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald shadow-lg shadow-emerald/30">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
          </Link>
          <h1 className="text-hero text-[clamp(3rem,5vw,5rem)] text-foreground leading-[0.9]">
            Official
            <br />
            Virtual
            <br />
            <span className="bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-clip-text text-transparent">
              Visit
            </span>
          </h1>
          <p className="mt-6 max-w-sm text-sm text-muted-foreground leading-relaxed">
            The recruiting platform that helps coaches showcase programs
            and gives recruits the tools to explore schools.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">
        {/* Mobile header */}
        <Link
          href="/"
          className="mb-8 flex items-center gap-2.5 lg:hidden animate-in-up"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald shadow-lg shadow-emerald/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-display text-2xl text-foreground tracking-normal">
            OVV
          </span>
        </Link>

        <div className="w-full max-w-md animate-in-up delay-1">
          {children}
        </div>
      </div>
    </div>
  )
}
