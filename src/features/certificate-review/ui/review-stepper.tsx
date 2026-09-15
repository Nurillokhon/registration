import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'

/** Ixcham gorizontal bosqichlar: to'lov → qabul qilingan → status. `currentStep` 3 bo'lsa hammasi tugagan. */
export function ReviewStepper({ currentStep }: { currentStep: number }) {
  const { t } = useTranslation()
  const steps = [
    t('dashboard.review.steps.awaitingPayment'),
    t('dashboard.review.steps.accepted'),
    t('dashboard.review.steps.setStatus'),
  ]

  return (
    <ol aria-label={t('dashboard.review.steps.label')} className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {steps.map((label, index) => {
        const isComplete = index < currentStep
        const isCurrent = index === currentStep

        return (
          <li
            key={label}
            aria-current={isCurrent ? 'step' : undefined}
            className="flex items-center gap-3"
          >
            {index > 0 && (
              <span
                aria-hidden="true"
                className={cn(
                  'hidden h-px w-8 sm:block xl:w-16',
                  index <= currentStep ? 'bg-primary' : 'bg-line',
                )}
              />
            )}
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold',
                  isComplete || isCurrent ? 'bg-primary text-on-primary' : 'bg-surface-muted text-body',
                )}
              >
                {isComplete ? (
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  'text-[13.5px] whitespace-nowrap',
                  isCurrent ? 'text-heading font-semibold' : isComplete ? 'text-heading' : 'text-body',
                )}
              >
                {label}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}
