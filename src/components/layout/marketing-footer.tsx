import Link from 'next/link'

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-8 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} OVV — Official Virtual Visit
        </p>
        <div className="flex items-center gap-6">
          <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  )
}
