import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  BarChart3,
  Edit3,
  Shirt,
  Compass,
  ArrowRight,
  ChevronRight,
  Eye,
  Users,
  Zap,
  Shield,
  Check,
  GraduationCap,
} from 'lucide-react'

const SCHOOL_COLORS = [
  { name: 'Texas Tech', short: 'TTU', primary: '#CC0000', secondary: '#000000' },
  { name: 'USC', short: 'USC', primary: '#990000', secondary: '#FFC72C' },
  { name: 'Baylor', short: 'BU', primary: '#003015', secondary: '#FFB81C' },
  { name: 'Oklahoma', short: 'OU', primary: '#841617', secondary: '#FDF9D8' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden scroll-smooth">
      {/* Nav */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald">
              <GraduationCap className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              College Info
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="#features" className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors sm:block">
              Features
            </Link>
            <Link href="#for-coaches" className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors sm:block">
              For Coaches
            </Link>
            <Link href="#pricing" className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors sm:block">
              Pricing
            </Link>
            <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen px-6 pt-16">
        {/* Floating school-color orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {SCHOOL_COLORS.map((s, i) => (
            <div
              key={s.name}
              className={`absolute rounded-full blur-[100px] animate-float-slow opacity-[0.07]`}
              style={{
                backgroundColor: s.primary,
                width: `${280 + i * 40}px`,
                height: `${280 + i * 40}px`,
                left: `${10 + i * 22}%`,
                top: `${15 + (i % 2) * 30}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${8 + i * 2}s`,
              }}
            />
          ))}
          {/* Central emerald glow */}
          <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald/[0.06] blur-[150px]" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center pt-24 sm:pt-32 lg:pt-40">
          {/* Badge */}
          <div className="animate-in-up mb-8 flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1.5">
            <Zap className="h-3.5 w-3.5 text-emerald" />
            <span className="text-xs font-medium text-emerald">
              The future of college recruiting
            </span>
          </div>

          <h1 className="animate-in-up delay-1 max-w-4xl text-center text-5xl font-black tracking-tight text-foreground sm:text-6xl lg:text-8xl">
            Where recruits
            <br />
            <span className="relative">
              <span className="relative z-10 bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-clip-text text-transparent">
                find their fit
              </span>
            </span>
          </h1>

          <p className="animate-in-up delay-2 mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Coaches showcase programs with virtual tours, jersey builders, and rich profiles.
            Recruits explore for free. Analytics show you who&apos;s truly interested.
          </p>

          <div className="animate-in-up delay-3 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-12 gap-2 px-8 text-base">
                Start Exploring
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/recruit">
              <Button size="lg" variant="outline" className="h-12 gap-2 px-8 text-base">
                View Demo
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* School showcase */}
          <div className="animate-in-up delay-4 mt-20 flex items-center gap-4">
            <span className="text-xs text-muted-foreground/60">Trusted by</span>
            <div className="flex gap-3">
              {SCHOOL_COLORS.map((school) => (
                <div
                  key={school.name}
                  className="flex items-center gap-2"
                >
                  <div
                    className="h-7 w-7 rounded-full shadow-lg transition-transform hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${school.primary}, ${school.secondary})`,
                    }}
                  />
                  <span className="hidden text-xs font-bold text-muted-foreground/50 sm:inline">
                    {school.short}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="animate-in-up delay-5 relative mt-16 w-full max-w-3xl overflow-hidden rounded-2xl border border-border">
            <div className="bg-yard-lines absolute inset-0 pointer-events-none" />
            <div className="relative grid grid-cols-3 gap-px bg-border">
              {[
                { value: '5+', label: 'Programs' },
                { value: '200+', label: 'Recruits' },
                { value: '10k+', label: 'Page Views' },
              ].map((stat) => (
                <div key={stat.label} className="bg-card px-6 py-5 text-center">
                  <p className="text-2xl font-black text-foreground text-scoreboard sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid */}
      <section id="features" className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald">
              Platform
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Built for the modern recruiting experience
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Large feature card — Analytics */}
            <div className="animate-in-up sm:col-span-2 lg:col-span-2 relative overflow-hidden rounded-2xl border border-border bg-card p-8 lg:p-10">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-emerald/[0.07] blur-[60px]" />
              <div className="bg-yard-lines absolute inset-0 pointer-events-none opacity-50" />
              <div className="relative">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                  <BarChart3 className="h-6 w-6 text-emerald" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  Real-Time Analytics
                </h3>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  See exactly which recruits are viewing your program, which sections
                  they spend time on, and how they engage. Know who&apos;s interested
                  before they ever reach out.
                </p>
                <div className="mt-8 flex gap-6">
                  {[
                    { icon: Eye, label: 'Page views' },
                    { icon: Users, label: 'Recruit identity' },
                    { icon: BarChart3, label: 'Section heatmaps' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="h-4 w-4 text-emerald" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Jersey Room */}
            <div className="animate-in-up delay-1 group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/20">
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full opacity-[0.08] transition-opacity group-hover:opacity-[0.15]"
                style={{ background: 'linear-gradient(135deg, #CC0000, #FFC72C, #003015, #841617)' }}
              />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                <Shirt className="h-6 w-6 text-emerald" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Jersey Room
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Recruits mix and match helmets, jerseys, and pants in your school
                colors. Download and share their dream uniform.
              </p>
            </div>

            {/* Tour */}
            <div className="animate-in-up delay-2 group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/20">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                <Compass className="h-6 w-6 text-emerald" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                360° Virtual Tours
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Panoramic stadium, weight room, and locker room tours with
                interactive hotspots. Explore from anywhere.
              </p>
            </div>

            {/* CMS */}
            <div className="animate-in-up delay-3 sm:col-span-2 group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-colors hover:border-white/20">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                <Edit3 className="h-6 w-6 text-emerald" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                Full Program CMS
              </h3>
              <p className="mt-3 max-w-lg text-sm text-muted-foreground">
                Edit your school profile, manage coaching staff,
                update facilities — all from one dashboard. Generate invite links
                to bring recruits directly to your page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Coaches */}
      <section id="for-coaches" className="px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="animate-in-up">
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald">
                For Coaches
              </span>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
                Stop guessing.
                <br />
                Start knowing.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Every recruit who views your page is tracked. You see their name,
                which sections they explored, how long they stayed, and whether
                they came back. No more wondering if that recruit is really interested.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'See recruit name and email on every view',
                  'Track time spent on academics, athletics, tour, and jersey',
                  'Export engagement data as CSV for your recruiting board',
                  'Generate invite links to share with prospects',
                ].map((item, i) => (
                  <div key={item} className={`flex items-start gap-3 animate-in-right delay-${i + 2}`}>
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/10">
                      <Check className="h-3 w-3 text-emerald" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/register" className="mt-10 inline-block">
                <Button size="lg" className="gap-2">
                  Create Your Program
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Mock analytics card */}
            <div className="animate-in-up delay-2 relative">
              <div className="absolute -inset-4 rounded-3xl bg-emerald/[0.04] blur-xl" />
              <div className="relative rounded-2xl border border-border bg-card p-6 shadow-2xl shadow-black/20">
                <div className="mb-4 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-foreground">
                    Recruit Engagement
                  </h4>
                  <span className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs text-emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                    Live
                  </span>
                </div>
                <div className="space-y-2.5">
                  {[
                    { name: 'Marcus Johnson', sections: ['Academics', 'Athletics', 'Tour'], time: '14m 32s', active: true },
                    { name: 'Tyler Williams', sections: ['Overview', 'Jersey Room'], time: '8m 15s', active: true },
                    { name: 'James Carter', sections: ['Academics', 'Athletics'], time: '6m 44s', active: false },
                    { name: 'Devon Brooks', sections: ['Tour', 'Jersey Room', 'Athletics'], time: '22m 08s', active: false },
                  ].map((recruit, i) => (
                    <div
                      key={recruit.name}
                      className={`flex items-center justify-between rounded-lg border border-border/50 bg-background/50 p-3 animate-in-up delay-${i + 3}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`h-2 w-2 rounded-full ${recruit.active ? 'bg-emerald animate-pulse' : 'bg-muted-foreground/30'}`} />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {recruit.name}
                          </p>
                          <div className="flex gap-1 mt-0.5">
                            {recruit.sections.map((s) => (
                              <span
                                key={s}
                                className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground text-scoreboard">
                        {recruit.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16 text-center animate-in-up">
            <span className="text-sm font-semibold uppercase tracking-wider text-emerald">
              Pricing
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground sm:text-5xl">
              Free for recruits. Simple for coaches.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Recruits browse every school for free, always. Coaches unlock
              analytics and CMS tools.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                name: 'Starter',
                price: '$0',
                period: '/mo',
                desc: 'One school profile with basic tools.',
                features: [
                  '1 school profile',
                  'Basic page views',
                  'Jersey Room',
                  'Virtual tours',
                ],
                cta: 'Get Started',
                highlight: false,
              },
              {
                name: 'Pro',
                price: '$49',
                period: '/mo',
                desc: 'Full analytics and recruit tracking.',
                features: [
                  'Everything in Starter',
                  'Recruit identity on views',
                  'Section engagement tracking',
                  'Invite link generator',
                  'CSV data export',
                  'Priority support',
                ],
                cta: 'Start Free Trial',
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                desc: 'For conferences and athletics departments.',
                features: [
                  'Everything in Pro',
                  'Unlimited profiles',
                  'Custom branding',
                  'API access',
                  'SSO & SAML',
                  'Dedicated CSM',
                ],
                cta: 'Contact Sales',
                highlight: false,
              },
            ].map((tier, i) => (
              <div
                key={tier.name}
                className={`animate-in-up delay-${i + 1} relative rounded-2xl border p-8 transition-colors ${
                  tier.highlight
                    ? 'border-emerald bg-gradient-to-b from-emerald/[0.08] to-transparent shadow-2xl shadow-emerald/10'
                    : 'border-border bg-card hover:border-white/15'
                }`}
              >
                {tier.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald px-3 py-0.5 text-xs font-semibold text-white shadow-lg shadow-emerald/20">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-bold text-foreground">{tier.name}</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-black text-foreground text-scoreboard">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground">{tier.period}</span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{tier.desc}</p>
                <ul className="mt-6 space-y-3">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                      <Check className="h-4 w-4 shrink-0 text-emerald" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <Button
                    className="w-full"
                    variant={tier.highlight ? 'default' : 'outline'}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-emerald/20 p-12 text-center sm:p-16">
          {/* Background orbs */}
          <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-emerald/[0.06] blur-[80px] animate-float-slow" />
          <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-emerald/[0.04] blur-[80px] animate-float-slow" style={{ animationDelay: '3s' }} />
          <div className="relative">
            <h2 className="text-3xl font-black text-foreground sm:text-4xl">
              Ready to see who&apos;s watching?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
              Set up your school profile in minutes. Start tracking recruit
              engagement today.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button size="lg" className="h-12 gap-2 px-8">
                  Create Your Program
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/recruit">
                <Button size="lg" variant="ghost" className="h-12 gap-2 px-8">
                  <Shield className="h-4 w-4" />
                  Explore as a Recruit
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} College Info
            </span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Sign Up
            </Link>
            <Link href="/recruit" className="hover:text-foreground transition-colors">
              Demo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
