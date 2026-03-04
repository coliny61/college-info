import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

const AUTH_ORBS = [
  { color: '#CC0000', size: 200, left: '10%', top: '20%', delay: '0s', duration: '10s' },
  { color: '#990000', size: 180, left: '75%', top: '15%', delay: '2s', duration: '12s' },
  { color: '#003015', size: 160, left: '60%', top: '70%', delay: '4s', duration: '9s' },
  { color: '#841617', size: 220, left: '20%', top: '65%', delay: '1s', duration: '11s' },
]

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4 overflow-hidden">
      {/* Floating school color orbs */}
      {AUTH_ORBS.map((orb, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-[100px] animate-float-slow"
          style={{
            backgroundColor: orb.color,
            width: `${orb.size}px`,
            height: `${orb.size}px`,
            left: orb.left,
            top: orb.top,
            opacity: 0.05,
            animationDelay: orb.delay,
            animationDuration: orb.duration,
          }}
        />
      ))}

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5 animate-in-up"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald shadow-lg shadow-emerald/20">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            College Info
          </span>
        </Link>
        <div className="animate-in-up delay-1">
          {children}
        </div>
      </div>
    </div>
  )
}
