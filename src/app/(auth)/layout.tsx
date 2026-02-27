import Link from 'next/link'

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
          className="mb-8 block text-center text-2xl font-bold text-foreground"
        >
          College Info
        </Link>
        {children}
      </div>
    </div>
  )
}
