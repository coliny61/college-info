import type { Metadata } from 'next'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MarketingFooter } from '@/components/layout/marketing-footer'
import { GraduationCap, Eye, Shirt, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description: 'OVV helps coaches showcase their programs and gives recruits the tools to explore schools — all from one platform.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <div className="animate-in-up">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald mb-2">About</p>
          <h1 className="text-display text-4xl text-foreground">
            The Official Virtual Visit
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            OVV gives college coaches a modern way to showcase their programs — and gives
            recruits the tools to explore schools before they ever set foot on campus.
          </p>
        </div>

        <div className="mt-12 space-y-8 animate-in-up delay-1">
          <section>
            <h2 className="text-display text-xl text-foreground mb-3">Why OVV?</h2>
            <p className="text-muted-foreground leading-relaxed">
              The recruiting process is overwhelming. Recruits juggle hundreds of schools,
              coaches spend hours repeating the same tours, and parents have no visibility.
              OVV changes that by putting every program&apos;s best content in one place —
              360° facility tours, coaching staff bios, academic pathways, jersey customization,
              and real engagement analytics.
            </p>
          </section>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Eye,
                title: 'Virtual Tours',
                desc: 'Immersive 360° panoramas of stadiums, practice facilities, weight rooms, and locker rooms.',
              },
              {
                icon: Shirt,
                title: 'Jersey Room',
                desc: 'Let recruits see themselves in your program by customizing jerseys with their name and number.',
              },
              {
                icon: GraduationCap,
                title: 'Academic Explorer',
                desc: 'Browse colleges, majors, 4-year pathways, and career outcomes — specific to each school.',
              },
              {
                icon: BarChart3,
                title: 'Coach Analytics',
                desc: 'Track which recruits are viewing your program, what they explore, and how engaged they are.',
              },
            ].map((feature) => (
              <div key={feature.title} className="glass-panel rounded-xl p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10">
                  <feature.icon className="h-5 w-5 text-emerald" />
                </div>
                <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          <section>
            <h2 className="text-display text-xl text-foreground mb-3">For Coaches</h2>
            <p className="text-muted-foreground leading-relaxed">
              Build your program&apos;s virtual visit in minutes. Upload your branding, add coaches
              and facilities, manage roster data, and generate invite links to share with
              recruits. See exactly who&apos;s visiting and what they&apos;re looking at — so you
              know who to call.
            </p>
          </section>

          <section>
            <h2 className="text-display text-xl text-foreground mb-3">For Recruits</h2>
            <p className="text-muted-foreground leading-relaxed">
              Browse every school in one place. Save favorites, compare academics, try on
              jerseys, and explore facilities — all before you visit. Your profile helps
              coaches understand what you&apos;re looking for so they can tailor their outreach.
            </p>
          </section>

          <section>
            <h2 className="text-display text-xl text-foreground mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              Questions or partnership inquiries? Reach out at{' '}
              <a href="mailto:hello@ovv.app" className="text-emerald hover:underline">
                hello@ovv.app
              </a>
            </p>
          </section>
        </div>
      </div>

      <MarketingFooter />
    </div>
  )
}
