import { Hero } from '@/widgets/hero'
import { SiteFooter } from '@/widgets/site-footer'
import { SiteHeader } from '@/widgets/site-header'
import { SupportedCertificates } from '@/widgets/supported-certificates'
import { VerificationSystem } from '@/widgets/verification-system'

export function HomePage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <VerificationSystem />
        <SupportedCertificates />
      </main>
      <SiteFooter />
    </div>
  )
}
