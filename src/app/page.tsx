import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  BarChart3,
  Edit3,
  Shirt,
  Compass,
  ArrowRight,
  ChevronDown,
  Eye,
  Users,
  Check,
  GraduationCap,
  Trophy,
  Shield,
  Clock,
  Download,
  MapPin,
} from 'lucide-react'

const SCHOOL_COLORS = [
  { name: 'Texas Tech', short: 'TTU', conference: 'Big 12', primary: '#CC0000', secondary: '#000000' },
  { name: 'USC', short: 'USC', conference: 'Big Ten', primary: '#990000', secondary: '#FFC72C' },
  { name: 'Baylor', short: 'BU', conference: 'Big 12', primary: '#003015', secondary: '#FFB81C' },
  { name: 'Oklahoma', short: 'OU', conference: 'SEC', primary: '#841617', secondary: '#FDF9D8' },
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
            <span className="text-display text-lg tracking-normal text-foreground">
              OVV
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="#features" className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors sm:block">
              Features
            </Link>
            <Link href="#for-coaches" className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors sm:block">
              Coaches
            </Link>
            <Link href="#pricing" className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors sm:block">
              Pricing
            </Link>
            <div className="mx-2 hidden h-4 w-px bg-border sm:block" />
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider">
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="text-xs uppercase tracking-wider">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16 bg-noise">
        {/* Diagonal gradient slashes */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-1/4 top-0 h-full w-1/2 opacity-[0.04] animate-drift"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, #10B981 50%, transparent 60%)',
            }}
          />
          <div
            className="absolute -right-1/4 top-0 h-full w-1/2 opacity-[0.03] animate-drift"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, #10B981 50%, transparent 60%)',
              animationDelay: '4s',
            }}
          />
          {/* Subtle bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-in-up mb-10 flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-4 py-1.5">
            <Trophy className="h-3 w-3 text-emerald" />
            <span className="text-xs font-medium uppercase tracking-widest text-emerald">
              College Football Recruiting
            </span>
          </div>

          {/* Hero text — massive Oswald */}
          <h1 className="animate-in-up delay-1 text-hero text-[clamp(3rem,10vw,9rem)] text-foreground leading-[0.9]">
            The Official
          </h1>
          <h1 className="animate-in-up delay-2 text-hero text-[clamp(3rem,10vw,9rem)] leading-[0.9]">
            <span className="bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-clip-text text-transparent">
              Virtual Visit
            </span>
          </h1>

          <p className="animate-in-up delay-3 mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            The recruiting platform built for D1 football. Coaches build immersive program
            profiles with virtual tours, jersey rooms, and real-time recruit analytics.
            Recruits explore every program for free.
          </p>

          <div className="animate-in-up delay-4 mt-12 flex flex-col items-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                Create Your Program
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/schools/texas-tech">
              <Button size="lg" variant="outline" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                Preview a School
              </Button>
            </Link>
          </div>

          {/* School program badges — more prominent */}
          <div className="animate-in-up delay-5 mt-20 flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50">
              Active Programs
            </span>
            <div className="flex flex-wrap justify-center gap-3">
              {SCHOOL_COLORS.map((school) => (
                <div
                  key={school.name}
                  className="flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] group"
                >
                  <div
                    className="h-6 w-6 rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${school.primary}, ${school.secondary})`,
                    }}
                  />
                  <span className="text-xs font-display uppercase tracking-wider text-foreground/70 group-hover:text-foreground transition-colors">
                    {school.short}
                  </span>
                  <span className="text-[10px] text-muted-foreground/40 hidden sm:inline">
                    {school.conference}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 animate-bounce-down">
            <ChevronDown className="h-5 w-5 text-muted-foreground/30" />
          </div>
        </div>
      </section>

      {/* ═══ STAT STRIP ═══ */}
      <section className="relative border-y border-border">
        <div className="bg-yard-lines absolute inset-0 pointer-events-none opacity-40" />
        <div className="relative mx-auto max-w-5xl stat-strip py-10 px-6">
          {[
            { value: '4', label: 'D1 Programs' },
            { value: '3', label: 'Conferences' },
            { value: '36', label: 'Jersey Combos' },
            { value: '16', label: '360° Tours' },
          ].map((stat) => (
            <div key={stat.label} className="py-2">
              <p className="text-scoreboard text-5xl font-bold text-foreground sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FEATURES — Alternating Panels ═══ */}
      <section id="features" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              The Experience
            </span>
            <h2 className="text-display mt-3 text-4xl text-foreground sm:text-5xl">
              Everything a recruit
              <br />
              needs to see
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Virtual tours, jersey customization, program analytics, and detailed academics
              — all in one place coaches control and recruits explore for free.
            </p>
          </div>
        </div>

        {/* Feature 1: Analytics — text left, visual right */}
        <div className="relative py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald/[0.02] to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10">
                  <BarChart3 className="h-7 w-7 text-emerald" />
                </div>
                <h3 className="text-display text-3xl text-foreground">
                  Real-Time Analytics
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
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

              {/* Mock analytics panel */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-emerald/[0.03] blur-xl" />
                <div className="relative glass-panel rounded-2xl p-6 shadow-2xl shadow-black/20">
                  <div className="mb-4 flex items-center justify-between">
                    <h4 className="text-display text-sm text-foreground tracking-normal">
                      Recruit Engagement
                    </h4>
                    <span className="flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-0.5 text-xs text-emerald">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                      Live
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { name: 'Marcus Johnson', pos: 'QB · 2027', sections: ['Football', 'Academics', 'Tour'], time: '14m 32s', active: true },
                      { name: 'Tyler Williams', pos: 'WR · 2027', sections: ['Jersey Room', 'Campus'], time: '8m 15s', active: true },
                      { name: 'James Carter', pos: 'LB · 2028', sections: ['Academics', 'Football'], time: '6m 44s', active: false },
                      { name: 'Devon Brooks', pos: 'RB · 2027', sections: ['Tour', 'Jersey Room', 'Football'], time: '22m 08s', active: false },
                    ].map((recruit) => (
                      <div
                        key={recruit.name}
                        className="flex items-center justify-between rounded-lg border border-white/[0.04] bg-background/50 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`h-2 w-2 rounded-full ${recruit.active ? 'bg-emerald animate-pulse' : 'bg-muted-foreground/30'}`} />
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-foreground">
                                {recruit.name}
                              </p>
                              <span className="text-[10px] text-muted-foreground/60">{recruit.pos}</span>
                            </div>
                            <div className="flex gap-1 mt-0.5">
                              {recruit.sections.map((s) => (
                                <span
                                  key={s}
                                  className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                >
                                  {s}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <span className="text-scoreboard text-xs text-muted-foreground">
                          {recruit.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider mx-auto max-w-4xl" />

        {/* Feature 2: Jersey Room — visual left, text right */}
        <div className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* Visual — school color orbs */}
              <div className="relative flex items-center justify-center py-12">
                <div className="absolute inset-0 flex items-center justify-center">
                  {SCHOOL_COLORS.map((s, i) => (
                    <div
                      key={s.short}
                      className="absolute rounded-full blur-[60px] animate-float-slow"
                      style={{
                        backgroundColor: s.primary,
                        width: '120px',
                        height: '120px',
                        opacity: 0.15,
                        left: `${20 + i * 18}%`,
                        top: `${25 + (i % 2) * 30}%`,
                        animationDelay: `${i * 2}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="relative glass-panel rounded-2xl p-10 text-center">
                  <Shirt className="mx-auto h-16 w-16 text-muted-foreground/30" />
                  <p className="text-display mt-4 text-2xl text-foreground">Mix. Match. Share.</p>
                  <p className="mt-2 text-sm text-muted-foreground">Your dream uniform in seconds</p>
                </div>
              </div>

              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10">
                  <Shirt className="h-7 w-7 text-emerald" />
                </div>
                <h3 className="text-display text-3xl text-foreground">
                  Jersey Room
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Recruits mix and match helmets, jerseys, and pants in your school
                  colors. Download and share their dream uniform. Coaches see which
                  colorways resonate most.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider mx-auto max-w-4xl" />

        {/* Feature 3: Tours + CMS — text left, feature list right */}
        <div className="relative py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-emerald/10">
                  <Compass className="h-7 w-7 text-emerald" />
                </div>
                <h3 className="text-display text-3xl text-foreground">
                  Virtual Tours & CMS
                </h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Panoramic stadium, weight room, and locker room tours with
                  interactive hotspots. Full CMS to manage your school profile,
                  coaching staff, facilities — all from one dashboard.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Compass, label: '360° Stadium Tours', desc: 'Panoramic facility walkthroughs' },
                  { icon: Edit3, label: 'Program CMS', desc: 'Coaches manage everything' },
                  { icon: Shield, label: 'Coaching Staff', desc: 'Bios, records, history' },
                  { icon: MapPin, label: 'Campus Experience', desc: 'Facilities and campus life' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="glass-panel rounded-xl p-5 transition-colors hover:bg-white/[0.05]"
                  >
                    <item.icon className="h-5 w-5 text-emerald" />
                    <p className="mt-3 text-sm font-medium text-foreground">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOR COACHES ═══ */}
      <section id="for-coaches" className="relative py-32 bg-noise">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/[0.02] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
                For Coaches
              </span>
              <h2 className="text-display mt-4 text-4xl text-foreground sm:text-5xl leading-[1.1]">
                Know who&apos;s
                <br />
                interested.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Every recruit who views your program is identified. See their name,
                position, graduation year, which sections they explored, and whether
                they came back — before you ever make a call.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  'Full recruit identity — name, position, class year',
                  'Section-by-section time tracking (football, academics, tour, jersey)',
                  'Export visit data to CSV for your recruiting board',
                  'Generate branded invite links for prospect outreach',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/10">
                      <Check className="h-3 w-3 text-emerald" />
                    </div>
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link href="/register" className="mt-10 inline-block">
                <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                  Create Your Program
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Visual — large stat callout */}
            <div className="flex flex-col items-center gap-6">
              <div className="glass-panel w-full rounded-2xl p-10 text-center">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Average Time on Page</p>
                <p className="text-scoreboard mt-2 text-7xl font-bold text-emerald">14:32</p>
                <p className="mt-2 text-sm text-muted-foreground">minutes per recruit visit</p>
              </div>
              <div className="grid w-full grid-cols-2 gap-3">
                <div className="glass-panel rounded-xl p-6 text-center">
                  <p className="text-scoreboard text-4xl font-bold text-foreground">89%</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Return Rate</p>
                </div>
                <div className="glass-panel rounded-xl p-6 text-center">
                  <p className="text-scoreboard text-4xl font-bold text-foreground">4.2</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Avg Sections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-20 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              Pricing
            </span>
            <h2 className="text-display mt-3 text-4xl text-foreground sm:text-5xl">
              Free for recruits.
              <br />
              Built for coaches.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Recruits explore every school for free, always. Coaches choose the plan
              that fits their program.
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
            {/* Self-Service */}
            <div className="relative overflow-hidden rounded-2xl border border-border glass-panel p-8 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:shadow-xl hover:shadow-black/20">
              <h3 className="text-display text-lg text-foreground tracking-normal">Self-Service</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-scoreboard text-5xl font-bold text-foreground">$99</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                or <span className="font-semibold text-foreground">$990/yr</span> billed annually
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Build and manage your own school profile.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '1 school profile',
                  'Jersey Room',
                  'Virtual tours & panoramas',
                  'Basic page view analytics',
                  'Invite link generator',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-emerald" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block">
                <Button className="w-full uppercase tracking-wider text-xs" variant="outline">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Pro — Done-for-You */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald bg-gradient-to-b from-emerald/[0.06] to-transparent p-8 shadow-2xl shadow-emerald/10 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald/20">
                Recommended
              </div>
              <h3 className="text-display text-lg text-foreground tracking-normal">Pro</h3>

              {/* Setup fee */}
              <div className="mt-4 rounded-lg bg-white/[0.04] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">One-time setup</p>
                <p className="text-scoreboard text-2xl font-bold text-foreground">$2,500</p>
                <p className="text-xs text-muted-foreground">We build your entire virtual visit</p>
              </div>

              {/* Annual subscription */}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-scoreboard text-5xl font-bold text-foreground">$2,400</span>
                <span className="text-muted-foreground">/yr</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                2-yr: <span className="text-foreground font-medium">$2,160/yr</span> &middot; 3-yr: <span className="text-foreground font-medium">$1,920/yr</span>
              </p>

              <p className="mt-3 text-sm text-muted-foreground">
                Done-for-you build with full analytics suite.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Everything in Self-Service',
                  'Done-for-you profile build',
                  'Full recruit identity on views',
                  'Section engagement tracking',
                  'Visit insights & jersey preferences',
                  'CSV data export',
                  'Priority support',
                  'Dedicated onboarding manager',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-emerald" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block">
                <Button className="w-full uppercase tracking-wider text-xs">
                  Schedule a Demo
                </Button>
              </Link>
            </div>
          </div>

          {/* Conference upsell */}
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Managing multiple programs?{' '}
            <a href="mailto:hello@officialvirtualvisit.com" className="font-medium text-emerald hover:underline">
              Contact us
            </a>{' '}
            for conference pricing.
          </p>
        </div>
      </section>

      {/* ═══ TESTIMONIALS — Pull Quotes ═══ */}
      <section className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              From the Sideline
            </span>
            <h2 className="text-display mt-3 text-4xl text-foreground sm:text-5xl">
              Coaches and recruits
            </h2>
          </div>

          <div className="space-y-16">
            {[
              {
                quote:
                  'We can see exactly which recruits spent time on our program — who looked at academics, who hit the jersey room, who came back twice. That changes how we prioritize outreach.',
                name: 'Coach Williams',
                role: 'Defensive Coordinator · Texas Tech',
              },
              {
                quote:
                  'I could explore every school on my list without making a single phone call. The virtual tours and program details were better than most official visits I\'ve been on.',
                name: 'Marcus J.',
                role: 'QB · Class of 2027',
              },
              {
                quote:
                  "The jersey room is what got me. I spent an hour mixing helmets, jerseys, and pants for every school on my list. It made the decision feel real.",
                name: 'Tyler W.',
                role: 'WR · Class of 2027',
              },
            ].map((t, i) => (
              <div key={t.name} className={i % 2 === 1 ? 'text-right' : ''}>
                <div className="section-divider mb-8" />
                <blockquote className={`font-display text-2xl font-medium leading-relaxed text-foreground sm:text-3xl ${i % 2 === 1 ? 'ml-auto' : ''} max-w-3xl`}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section id="faq" className="px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <div className="mb-20 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald">
              Questions
            </span>
            <h2 className="text-display mt-3 text-4xl text-foreground sm:text-5xl">
              How it works
            </h2>
          </div>

          <Accordion type="single" collapsible>
            <AccordionItem value="free">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">Is OVV free for recruits?</AccordionTrigger>
              <AccordionContent>
                Always. Recruits browse every program profile, take virtual tours, customize jerseys, and explore academics — completely free. Coaches invest in the platform to build and track their recruiting presence.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="data">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">What can coaches see about who visits?</AccordionTrigger>
              <AccordionContent>
                Coaches see which recruits viewed their program, their position and class year, which sections they explored (football, academics, campus tour, jersey room), total time spent, and whether they returned. It&apos;s the data you need to prioritize outreach.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="setup">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">What does the done-for-you setup include?</AccordionTrigger>
              <AccordionContent>
                Our Pro tier includes full setup: we photograph your facilities, create 360° tours, build your jersey assets, write your program copy, and configure your analytics dashboard. Your team gets a complete virtual visit experience without lifting a finger.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="invites">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">How do coaches share their program?</AccordionTrigger>
              <AccordionContent>
                Coaches generate branded invite links from their dashboard. Share links via email, text, or social media. When a recruit clicks through, they land directly on your program page, and every interaction is tracked back to that invite.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sports">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">Is OVV only for football?</AccordionTrigger>
              <AccordionContent>
                Yes — by design. OVV is purpose-built for college football recruiting. Every feature, from coaching staff profiles to jersey rooms to visit analytics, is designed specifically for football programs and football recruits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative px-6 py-32 bg-noise">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/[0.03] via-emerald/[0.01] to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-display text-4xl text-foreground sm:text-6xl">
            Ready to See
            <br />
            <span className="bg-gradient-to-r from-emerald via-emerald-light to-emerald bg-clip-text text-transparent">
              Who&apos;s Watching?
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Build your program&apos;s virtual visit. Start seeing which recruits
            are genuinely interested — by name, position, and engagement.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                Create Your Program
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/schools/texas-tech">
              <Button size="lg" variant="ghost" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                Preview a School
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-emerald">
              <GraduationCap className="h-3 w-3 text-white" />
            </div>
            <span className="font-display text-sm uppercase tracking-wider text-muted-foreground">
              &copy; {new Date().getFullYear()} OVV
            </span>
          </div>
          <div className="flex gap-6 text-xs uppercase tracking-wider text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Sign Up
            </Link>
            <Link href="/schools/texas-tech" className="hover:text-foreground transition-colors">
              Preview
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
