import { TriangleAlert } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

/** Forma darajasidagi xato xabari — masalan, serverdan kelgan matn. */
export function FormAlert({ children, className }: { children: ReactNode; className?: string }) {
  return (
    // role="alert": xabar paydo bo'lishi bilan ekran o'quvchi uni o'qiydi
    <div
      role="alert"
      className={cn(
        'bg-danger/10 text-danger flex gap-3 rounded-xl px-4 py-3 text-[13px] leading-[1.5]',
        className,
      )}
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}
