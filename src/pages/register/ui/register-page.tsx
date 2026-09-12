import { RegistrationWizard } from '@/features/register'
import { AuthLayout } from '@/widgets/auth-layout'
import { SiteFooter } from '@/widgets/site-footer'
import { SiteHeader } from '@/widgets/site-header'

export function RegisterPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <AuthLayout>
        <RegistrationWizard />
      </AuthLayout>
      <SiteFooter />
    </div>
  )
}
