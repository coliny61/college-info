import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ArrowRight, Check, GraduationCap } from 'lucide-react'

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
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-display text-3xl text-foreground sm:text-4xl">
            What recruits see
          </h2>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Each school gets a complete program page — built by coaches,
            explored by recruits for free.
          </p>

          <div className="mt-16 space-y-16">
            <div>
              <h3 className="text-display text-xl text-foreground tracking-wide">
                360° Facility Tours
              </h3>
              <p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">
                Panoramic walkthroughs of your stadium, weight room, locker room,
                and practice facility. Recruits drag to look around and tap
                hotspots for details — the next best thing to being on campus.
              </p>
            </div>

            <div className="section-divider" />

            <div>
              <h3 className="text-display text-xl text-foreground tracking-wide">
                Jersey Room
              </h3>
              <p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">
                Recruits mix and match helmets, jerseys, and pants in your school
                colors. They download their combination and share it. Coaches see
                which colorways get the most attention.
              </p>
            </div>

            <div className="section-divider" />

            <div>
              <h3 className="text-display text-xl text-foreground tracking-wide">
                Full Program Profile
              </h3>
              <p className="mt-3 max-w-lg text-muted-foreground leading-relaxed">
                Coaching staff bios with career records and previous stops.
                Academics broken down by college and major. NIL details, notable
                alumni, campus life — everything a recruit researches before
                committing, organized in one place coaches control.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT COACHES GET ═══ */}
      <section className="relative py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald/[0.02] via-transparent to-transparent" />
        <div className="relative mx-auto max-w-4xl px-6">
          <h2 className="text-display text-3xl text-foreground sm:text-4xl">
            What coaches see
          </h2>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Every recruit who views your program is identified — name, position,
            graduation year. You see which sections they explored, how long they
            stayed, whether they came back, and what jersey combo they built.
            When a quarterback from Houston spends 14 minutes on your page and
            returns twice, you know before you ever pick up the phone.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-border">
            {[
              { value: '14:32', label: 'Avg time on page' },
              { value: '89%', label: 'Return within 7 days' },
              { value: '4.2', label: 'Sections per visit' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/50 p-6 text-center">
                <p className="text-scoreboard text-3xl font-bold text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <Link href="/register" className="mt-12 inline-block">
            <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
              Set Up Your Program
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="px-6 py-32">
        <div className="mx-auto max-w-5xl">
          <div className="mb-16">
            <h2 className="text-display text-3xl text-foreground sm:text-4xl">
              Pricing
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Recruits explore every school for free. Coaches choose the plan
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
                Build and manage your own program page.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  '1 school profile',
                  'Jersey Room',
                  'Virtual tours & panoramas',
                  'Basic page-view analytics',
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
                  Sign Up
                </Button>
              </Link>
            </div>

            {/* Pro */}
            <div className="relative overflow-hidden rounded-2xl border border-emerald bg-gradient-to-b from-emerald/[0.06] to-transparent p-8 shadow-2xl shadow-emerald/10 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg shadow-emerald/20">
                Recommended
              </div>
              <h3 className="text-display text-lg text-foreground tracking-normal">Pro</h3>

              <div className="mt-4 rounded-lg bg-white/[0.04] px-3 py-2">
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">One-time setup</p>
                <p className="text-scoreboard text-2xl font-bold text-foreground">$2,500</p>
                <p className="text-xs text-muted-foreground">We build your entire virtual visit</p>
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-scoreboard text-5xl font-bold text-foreground">$2,400</span>
                <span className="text-muted-foreground">/yr</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                2-yr: <span className="text-foreground font-medium">$2,160/yr</span> &middot; 3-yr: <span className="text-foreground font-medium">$1,920/yr</span>
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  'Everything in Self-Service',
                  'Done-for-you profile build',
                  'Full recruit identity on views',
                  'Section engagement tracking',
                  'Jersey preference data',
                  'CSV data export',
                  'Priority support',
                ].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 shrink-0 text-emerald" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="mt-8 block">
                <Button className="w-full uppercase tracking-wider text-xs">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-muted-foreground">
            Managing multiple programs?{' '}
            <a href="mailto:hello@officialvirtualvisit.com" className="font-medium text-emerald hover:underline">
              Ask about conference pricing
            </a>
          </p>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="px-6 py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-display mb-12 text-3xl text-foreground sm:text-4xl">
            Common questions
          </h2>

          <Accordion type="single" collapsible>
            <AccordionItem value="free">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">Is OVV free for recruits?</AccordionTrigger>
              <AccordionContent>
                Always. Recruits browse every program, take virtual tours, build jerseys, and explore academics — completely free. Coaches pay to build and manage their program page.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="data">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">What data do coaches get?</AccordionTrigger>
              <AccordionContent>
                Name, position, class year, which sections they explored, total time on page, return visits, and jersey preferences. Enough to personalize outreach before the first conversation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="setup">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">What does the Pro setup include?</AccordionTrigger>
              <AccordionContent>
                We photograph your facilities, create 360° tours, build jersey assets, write program copy, and configure analytics. Your staff gets a complete virtual visit without lifting a finger.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="invites">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">How do coaches share their page?</AccordionTrigger>
              <AccordionContent>
                Generate invite links from your dashboard. Share via email, text, or social. When a recruit clicks through, they land on your program page and every interaction is tracked.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="sports">
              <AccordionTrigger className="text-left font-display uppercase tracking-wide">Is this only for football?</AccordionTrigger>
              <AccordionContent>
                Yes. OVV is purpose-built for college football recruiting. Every feature — coaching staff pages, jersey rooms, visit analytics — is designed for football programs.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative px-6 py-32">
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-display text-3xl text-foreground sm:text-5xl leading-[1.1]">
            Your program.
            <br />
            Their first impression.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            Build your virtual visit. See who&apos;s interested — by name,
            position, and what they spent time on.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/register">
              <Button size="lg" className="h-13 gap-2 px-10 text-sm uppercase tracking-wider font-semibold">
                Set Up Your Program
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/schools/texas-tech">
              <Button size="lg" variant="ghost" className="h-13 px-10 text-sm uppercase tracking-wider font-semibold">
                Preview Texas Tech
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
