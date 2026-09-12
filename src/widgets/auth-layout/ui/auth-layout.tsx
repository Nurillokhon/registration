import type { ReactNode } from 'react'
import { Container } from '@/shared/ui'
import { AuthBackdrop } from './auth-backdrop'

/**
 * Kirish va ro'yxatdan o'tish sahifalarining umumiy <main> qismi: dekorativ fon
 * ustida markazlashgan oq karta. Header/footer'ni sahifa o'zi qo'shadi —
 * widget boshqa widget'larni import qilmasligi uchun.
 */
export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-surface-sky relative flex-1 overflow-hidden">
      <AuthBackdrop />
      <Container className="relative flex justify-center pt-6 pb-12 sm:pb-16">
        <div className="bg-surface shadow-panel w-full max-w-[576px] rounded-[28px] px-5 py-8 sm:px-12 sm:py-12">
          {children}
        </div>
      </Container>
    </main>
  )
}
