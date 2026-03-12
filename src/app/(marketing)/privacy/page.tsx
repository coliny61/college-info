import type { Metadata } from 'next'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MarketingFooter } from '@/components/layout/marketing-footer'

export const metadata: Metadata = {
  title: 'Privacy Policy',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <div className="animate-in-up">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald mb-2">Legal</p>
          <h1 className="text-display text-4xl text-foreground">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 11, 2026</p>
        </div>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed animate-in-up delay-1">
          <section>
            <h2 className="text-display text-lg text-foreground mb-2">1. Information We Collect</h2>
            <p className="font-medium text-foreground/80 mb-1">Account Information</p>
            <p>
              When you create an account, we collect your email address, display name, and role
              (recruit, coach, or parent). Recruits may also provide athletic profile information
              including sport, position, graduation year, GPA, and physical measurements.
            </p>
            <p className="font-medium text-foreground/80 mt-3 mb-1">Usage Data</p>
            <p>
              We collect analytics data about how you interact with the platform, including pages
              visited, schools viewed, features used, and time spent. This data helps coaches
              understand recruit engagement and helps us improve the Service.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and maintain the Service</li>
              <li>To allow coaches to see which recruits are exploring their programs</li>
              <li>To personalize your experience (favorites, recommendations)</li>
              <li>To generate aggregate analytics (no individual data shared publicly)</li>
              <li>To communicate important updates about the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">3. Data Sharing</h2>
            <p>
              <strong className="text-foreground/80">With Coaches:</strong> When you visit a school&apos;s
              program page as a logged-in recruit, the coaching staff can see your profile information
              and engagement data for their school. This is a core feature of the platform.
            </p>
            <p className="mt-2">
              <strong className="text-foreground/80">Third Parties:</strong> We do not sell your personal
              data. We use Supabase for authentication and database hosting, and Vercel for application
              hosting. These providers have their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">4. Data Security</h2>
            <p>
              We use industry-standard security measures including encrypted connections (HTTPS),
              secure authentication via Supabase Auth, and role-based access controls. However,
              no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">5. Cookies &amp; Local Storage</h2>
            <p>
              We use cookies for authentication sessions and local storage for user preferences
              (such as recently viewed schools). These are essential for the Service to function
              and cannot be disabled.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Access your personal data through your profile page</li>
              <li>Update or correct your information at any time</li>
              <li>Request deletion of your account and associated data</li>
              <li>Opt out of non-essential communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">7. Children&apos;s Privacy</h2>
            <p>
              OVV is designed for use by high school student-athletes (typically ages 14+),
              their parents, and college coaching staff. We do not knowingly collect data from
              children under 13. If you believe a child under 13 has provided us with personal
              information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify users of
              significant changes via the platform.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">9. Contact</h2>
            <p>
              Questions about your privacy? Contact us at{' '}
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
