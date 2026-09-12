import { LoginForm } from '@/features/login'
import { AuthLayout } from '@/widgets/auth-layout'
import { SiteFooter } from '@/widgets/site-footer'
import { SiteHeader } from '@/widgets/site-header'

export function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteHeader />
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
      <SiteFooter />
    </div>
  )
}
