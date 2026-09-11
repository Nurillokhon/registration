import { lazy, Suspense, type ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './query-client'

// Devtools faqat dev'da. Lazy import production graf'iga umuman kirmasligini kafolatlaydi.
const Devtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    )
  : null

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {Devtools && (
        <Suspense fallback={null}>
          <Devtools initialIsOpen={false} />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}
