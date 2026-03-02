import Link from 'next/link'
import { GraduationCap } from 'lucide-react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald">
            <GraduationCap className="h-5 w-5 text-white" />
          </div>
          <span className="text-2xl font-bold text-foreground">
            College Info
          </span>
        </Link>
        {children}
      </div>
    </div>
  )
}
