import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

/** Sahifa bo'ylab bir xil gorizontal chegara. */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto w-full max-w-[1180px] px-6 lg:px-10', className)}>
      {children}
    </div>
  )
}
