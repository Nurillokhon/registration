import type { ReactNode } from 'react'
import { ThemeProvider as ThemeStateProvider } from '@/shared/lib/theme'

/**
 * shared/lib/theme'dagi ThemeProvider'ni I18nProvider/QueryProvider bilan bir
 * xil naqsh bo'yicha qayta eksport qiladi — app/providers qatlamida barcha
 * provayderlar bitta joydan, aniq <XProvider> ko'rinishida import qilinadi.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeStateProvider>{children}</ThemeStateProvider>
}
