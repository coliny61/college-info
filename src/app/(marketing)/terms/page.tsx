import type { Metadata } from 'next'
import { MarketingNav } from '@/components/layout/marketing-nav'
import { MarketingFooter } from '@/components/layout/marketing-footer'

export const metadata: Metadata = {
  title: 'Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <MarketingNav />

      <div className="mx-auto max-w-3xl px-6 pt-28 pb-16">
        <div className="animate-in-up">
          <p className="text-[10px] uppercase tracking-[0.25em] text-emerald mb-2">Legal</p>
          <h1 className="text-display text-4xl text-foreground">Terms of Service</h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated: March 11, 2026</p>
        </div>

        <div className="mt-10 space-y-8 text-sm text-muted-foreground leading-relaxed animate-in-up delay-1">
          <section>
            <h2 className="text-display text-lg text-foreground mb-2">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the OVV (&ldquo;Official Virtual Visit&rdquo;) platform at
              college-info-nine.vercel.app (the &ldquo;Service&rdquo;), you agree to be bound by
              these Terms of Service. If you do not agree, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">2. Description of Service</h2>
            <p>
              OVV is a college recruiting platform that allows coaches to showcase athletic
              programs and recruits to explore schools. The Service includes virtual facility
              tours, jersey customization, academic information, and engagement analytics.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">3. User Accounts</h2>
            <p>
              You must provide accurate information when creating an account. You are responsible
              for maintaining the security of your account credentials. You may not share your
              account or impersonate others.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">4. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              <li>Use the Service for any unlawful purpose</li>
              <li>Upload harmful, offensive, or misleading content</li>
              <li>Attempt to access other users&apos; accounts or data</li>
              <li>Interfere with the operation of the Service</li>
              <li>Use automated tools to scrape data without permission</li>
            </ul>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">5. Content</h2>
            <p>
              Coaches and program administrators retain ownership of content they upload.
              By uploading content, you grant OVV a license to display it on the platform.
              OVV does not claim ownership of user-submitted content.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">6. Privacy</h2>
            <p>
              Your use of the Service is also governed by our{' '}
              <a href="/privacy" className="text-emerald hover:underline">Privacy Policy</a>.
              By using OVV, you consent to the collection and use of information as described
              in that policy.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">7. Disclaimer</h2>
            <p>
              The Service is provided &ldquo;as is&rdquo; without warranties of any kind.
              OVV does not guarantee the accuracy of school information, and academic or
              athletic data may change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">8. Changes to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Service after
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-display text-lg text-foreground mb-2">9. Contact</h2>
            <p>
              Questions about these Terms? Contact us at{' '}
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
