import { Check } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type StepperProps = {
  /** Ro'yxat uchun ekran o'quvchi yorlig'i. */
  label: string
  steps: readonly string[]
  /** 0 dan boshlanadi; steps.length ga teng bo'lsa — barcha bosqichlar tugagan. */
  currentStep: number
  className?: string
}

/** Gorizontal bosqichlar ko'rsatkichi: tugagan (✓), joriy va keyingi bosqichlar. */
export function Stepper({ label, steps, currentStep, className }: StepperProps) {
  const lastIndex = steps.length - 1
  const progress = lastIndex > 0 ? (Math.min(currentStep, lastIndex) / lastIndex) * 100 : 0

  return (
    <ol aria-label={label} className={cn('relative flex justify-between', className)}>
      {/* Chiziq kataklar ortidan o'tadi: li'lar positioned va DOM'da keyin
          kelgani uchun ular chiziq ustida chiziladi. */}
      <span
        aria-hidden="true"
        className="bg-surface-accent absolute inset-x-0 top-5 h-0.5 -translate-y-1/2"
      />
      <span
        aria-hidden="true"
        className="bg-primary absolute top-5 left-0 h-0.5 -translate-y-1/2 transition-[width] duration-300"
        style={{ width: `${progress}%` }}
      />

      {steps.map((stepLabel, index) => {
        const isComplete = index < currentStep
        const isCurrent = index === currentStep
        const isUpcoming = index > currentStep

        return (
          <li
            key={stepLabel}
            aria-current={isCurrent ? 'step' : undefined}
            className="relative flex flex-col items-center"
          >
            <span
              className={cn(
                'flex size-10 items-center justify-center rounded-xl text-[15px] font-bold transition-colors',
                isUpcoming
                  ? 'bg-surface-accent text-heading'
                  : 'bg-primary text-on-primary shadow-primary/25 shadow-md',
              )}
            >
              {isComplete ? (
                <Check className="size-[18px]" strokeWidth={2.6} aria-hidden="true" />
              ) : (
                index + 1
              )}
            </span>
            <span
              className={cn(
                'mt-3 text-[11px] tracking-[0.1em] uppercase',
                isUpcoming ? 'text-body font-medium' : 'text-primary font-bold',
              )}
            >
              {stepLabel}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
