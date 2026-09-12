import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type InfoNoteProps = {
  icon: LucideIcon
  children: ReactNode
  className?: string
}

/** Ikonkali izoh bloki — masalan, forma pastidagi xavfsizlik haqidagi eslatma. */
export function InfoNote({ icon: Icon, children, className }: InfoNoteProps) {
  return (
    <div className={cn('bg-surface-shell flex gap-4 rounded-2xl p-5 sm:py-6', className)}>
      <Icon className="text-primary mt-0.5 size-5 shrink-0" strokeWidth={2.1} aria-hidden="true" />
      <p className="text-body text-[13.5px] leading-[1.7] sm:text-[14px]">{children}</p>
    </div>
  )
}
