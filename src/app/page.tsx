import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, GraduationCap } from 'lucide-react'

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
            <Link href="#how-it-works" className="hidden text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors sm:block">
              How It Works
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
              <Button size="sm" className="text-xs uppercase tracking-wider">Sign Up</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute -left-1/4 top-0 h-full w-1/2 opacity-[0.04] animate-drift"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, #10B981 50%, transparent 60%)',
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
          <h1 className="animate-in-up text-hero text-[clamp(3.5rem,11vw,10rem)] text-foreground leading-[0.85]">
            The Official
          </h1>
          <h1 className="animate-in-up delay-1 text-hero text-[clamp(3.5rem,11vw,10rem)] text-foreground leading-[0.85]">
            Virtual Visit
          </h1>

          <p className="animate-in-up delay-2 mx-auto mt-10 max-w-xl text-lg text-muted-foreground">
            Recruits tour your facilities, explore your program, and build their
            dream jersey — while you see exactly who&apos;s looking and what
            they care about.
          </p>

          <div className="animate-in-up delay-3 mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                Set Up Your Program
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/schools/texas-tech">
              <Button size="lg" variant="outline" className="h-13 px-10 text-sm uppercase tracking-wider font-semibold">
                Preview Texas Tech
              </Button>
            </Link>
          </div>

          {/* School badges */}
          <div className="animate-in-up delay-4 mt-20 flex flex-wrap justify-center gap-3">
            {SCHOOL_COLORS.map((school) => (
              <div
                key={school.name}
                className="flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-4 py-2"
              >
                <div
                  className="h-5 w-5 rounded-full"
                  style={{
                    background: `linear-gradient(135deg, ${school.primary}, ${school.secondary})`,
                  }}
                />
                <span className="text-xs font-display uppercase tracking-wider text-foreground/60">
                  {school.short}
                </span>
                <span className="text-[10px] text-muted-foreground/30 hidden sm:inline">
                  {school.conference}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ WHAT RECRUITS GET ═══ */}
      <section id="how-it-works" className="py-32">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-display text-3xl text-foreground sm:text-4xl">
            What recruits see
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Each school gets a complete program page — built by coaches,
            explored by recruits for free.
          </p>

          <div className="mt-20 space-y-28">
            {/* 360° Tours — text left, panorama grid right */}
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-display text-xl text-foreground tracking-wide">
                  360° Facility Tours
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Panoramic walkthroughs of your stadium, weight room, locker room,
                  and practice facility. Recruits drag to look around and tap
                  hotspots for details — the next best thing to being on campus.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { src: '/panoramas/texas-tech-stadium.jpg', label: 'Jones AT&T Stadium' },
                  { src: '/panoramas/texas-tech-weight-room.jpg', label: 'Weight Room' },
                  { src: '/panoramas/texas-tech-locker-room.jpg', label: 'Locker Room' },
                  { src: '/panoramas/texas-tech-practice.jpg', label: 'Practice Facility' },
                ].map((p) => (
                  <div key={p.label} className="group relative aspect-[16/10] overflow-hidden rounded-lg">
                    <Image
                      src={p.src}
                      alt={p.label}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-white/80">
                        {p.label}
                      </span>
                      <span className="rounded-sm bg-white/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                        360°
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Jersey Room — combos left, text right */}
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div className="order-2 lg:order-1 flex items-end justify-center gap-2 sm:gap-6 py-4">
                {[
                  { variant: 'home', opacity: '' },
                  { variant: 'away', opacity: 'opacity-70' },
                  { variant: 'alternate', opacity: 'opacity-40' },
                ].map((combo) => (
                  <div key={combo.variant} className={`flex flex-col items-center ${combo.opacity}`}>
                    <div className="relative h-20 w-20 sm:h-24 sm:w-24">
                      <Image src={`/jersey/texas-tech/helmet-${combo.variant}.png`} alt="Helmet" fill className="object-contain" />
                    </div>
                    <div className="relative -mt-1 h-28 w-28 sm:h-32 sm:w-32">
                      <Image src={`/jersey/texas-tech/jersey-${combo.variant}.png`} alt="Jersey" fill className="object-contain" />
                    </div>
                    <div className="relative -mt-1 h-24 w-24 sm:h-28 sm:w-28">
                      <Image src={`/jersey/texas-tech/pants-${combo.variant}.png`} alt="Pants" fill className="object-contain" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-display text-xl text-foreground tracking-wide">
                  Jersey Room
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Recruits mix and match helmets, jerseys, and pants in your school
                  colors. They download their combination and share it. Coaches see
                  which colorways get the most attention.
                </p>
              </div>
            </div>

            {/* Program Profile — text left, mini preview right */}
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <h3 className="text-display text-xl text-foreground tracking-wide">
                  Full Program Profile
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Coaching staff bios with career records and previous stops.
                  Academics broken down by college and major. NIL details, notable
                  alumni, campus life — everything a recruit researches before
                  committing, organized in one place coaches control.
                </p>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">Head Coach</p>
                  <p className="mt-1 font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                    Joey McGuire
                  </p>
                  <p className="text-[10px] uppercase tracking-wider" style={{ color: '#CC0000' }}>
                    Texas Tech &middot; Big 12
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <div>
                      <p className="text-scoreboard text-lg font-bold text-foreground">22-16</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Record</p>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div>
                      <p className="text-scoreboard text-lg font-bold text-foreground">12</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">To NFL</p>
                    </div>
                    <div className="h-6 w-px bg-border" />
                    <div>
                      <p className="text-scoreboard text-lg font-bold text-foreground">3yr</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">Tenure</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: '40,773', label: 'Enrollment' },
                    { value: '$4.3M', label: 'NIL Budget' },
                    { value: '12', label: 'NFL Alumni' },
                  ].map((s) => (
                    <div key={s.label} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-center">
                      <p className="text-scoreboard text-sm font-bold text-foreground">{s.value}</p>
                      <p className="text-[9px] uppercase tracking-wider text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT COACHES GET ═══ */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/[0.02] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-display text-3xl text-foreground sm:text-4xl">
                What coaches see
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                Every recruit who views your program is identified — name, position,
                graduation year. You see which sections they explored, how long they
                stayed, whether they came back, and what jersey combo they built.
                When a quarterback from Houston spends 14 minutes on your page and
                returns twice, you know before you ever pick up the phone.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-xl border border-border">
                {[
                  { value: '14:32', label: 'Avg time on page' },
                  { value: '89%', label: 'Return within 7 days' },
                  { value: '4.2', label: 'Sections per visit' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-card/50 p-4 sm:p-5 text-center">
                    <p className="text-scoreboard text-2xl font-bold text-foreground sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <Link href="/register" className="mt-10 inline-block">
                <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                  Set Up Your Program
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Prospect feed preview */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  Prospect Feed
                </p>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse" />
                  Live
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { name: 'Marcus Johnson', pos: 'QB · 2027', sections: ['Football', 'Academics', 'Tour'], time: '14:32', active: true },
                  { name: 'Tyler Williams', pos: 'WR · 2027', sections: ['Jersey Room', 'Campus'], time: '8:15', active: true },
                  { name: 'James Carter', pos: 'LB · 2028', sections: ['Academics', 'Football'], time: '6:44', active: false },
                  { name: 'Devon Brooks', pos: 'RB · 2027', sections: ['Tour', 'Jersey Room'], time: '22:08', active: false },
                ].map((r) => (
                  <div
                    key={r.name}
                    className="flex items-center justify-between rounded-lg bg-background/50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 shrink-0 rounded-full ${r.active ? 'bg-emerald animate-pulse' : 'bg-muted-foreground/30'}`} />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-foreground">{r.name}</p>
                          <span className="text-[10px] text-muted-foreground/50">{r.pos}</span>
                        </div>
                        <div className="mt-0.5 flex gap-1">
                          {r.sections.map((s) => (
                            <span key={s} className="rounded bg-white/[0.04] px-1.5 py-0.5 text-[9px] text-muted-foreground/60">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-scoreboard text-xs text-muted-foreground">{r.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="px-6 py-32">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-display text-3xl text-foreground sm:text-4xl">
            Pricing
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Free for recruits, always. Two plans for coaches.
          </p>

          <div className="mt-16 grid gap-16 sm:grid-cols-2 sm:gap-12">
            <div>
              <h3 className="text-display text-lg text-foreground tracking-normal">
                Self-Service
              </h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-scoreboard text-4xl font-bold text-foreground">$99</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                or $990/yr billed annually
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Build and manage your own program page. Includes one school
                profile, Jersey Room, virtual tours, basic page-view analytics,
                and an invite link generator.
              </p>
              <Link href="/register" className="mt-6 inline-block">
                <Button variant="outline" className="uppercase tracking-wider text-xs">
                  Sign Up
                </Button>
              </Link>
            </div>

            <div>
              <h3 className="text-display text-lg text-foreground tracking-normal">
                Pro
              </h3>
              <div className="mt-3">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  One-time setup
                </p>
                <span className="text-scoreboard text-2xl font-bold text-foreground">$2,500</span>
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-scoreboard text-4xl font-bold text-foreground">$2,400</span>
                <span className="text-muted-foreground">/yr</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                2-yr: $2,160/yr &middot; 3-yr: $1,920/yr
              </p>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Everything in Self-Service, plus we build your profile for you.
                Full recruit identity on every view, section engagement tracking,
                jersey preference data, CSV export, and priority support.
              </p>
              <Link href="/register" className="mt-6 inline-block">
                <Button className="uppercase tracking-wider text-xs">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-16 text-sm text-muted-foreground">
            Multiple programs?{' '}
            <a href="mailto:hello@officialvirtualvisit.com" className="font-medium text-emerald hover:underline">
              Ask about conference pricing
            </a>
          </p>
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
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs uppercase tracking-wider text-muted-foreground">
            <Link href="/login" className="hover:text-foreground transition-colors">
              Log In
            </Link>
            <Link href="/register" className="hover:text-foreground transition-colors">
              Sign Up
            </Link>
            <Link href="/schools/texas-tech" className="hover:text-foreground transition-colors">
              Preview
            </Link>
            <Link href="/about" className="hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
