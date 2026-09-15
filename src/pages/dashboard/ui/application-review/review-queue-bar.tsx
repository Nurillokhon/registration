import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { Button } from '@/shared/ui'

const OUTLINE_CLASS_NAME =
  'border-primary/40 text-primary hover:bg-primary-soft inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

type ReviewQueueBarProps = {
  backTo: string
  /** Faqat ekspertda — navbat bo'ylab yurish va ko'rsatkichlar */
  queue?: {
    onPrevious: () => void
    onNext: () => void
    isNavigating: boolean
    reviewed?: number
    remaining?: number
  }
}

function QueueStat({ value, label, className }: { value?: number; label: string; className: string }) {
  return (
    <div className="text-center">
      <dd className={`text-[18px] leading-none font-bold tabular-nums ${className}`}>{value ?? '—'}</dd>
      <dt className="text-body mt-1.5 text-[12px]">{label}</dt>
    </div>
  )
}

export function ReviewQueueBar({ backTo, queue }: ReviewQueueBarProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-surface shadow-card border-line flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-2">
        {queue && (
          <button
            type="button"
            onClick={queue.onPrevious}
            disabled={queue.isNavigating}
            className={OUTLINE_CLASS_NAME}
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
            {t('dashboard.review.queue.previous')}
          </button>
        )}
        <Link to={backTo} className={OUTLINE_CLASS_NAME}>
          {t('dashboard.review.queue.backToList')}
        </Link>
      </div>

      {queue && (
        <>
          {/* dt/dd tartibi vizual joylashuv uchun almashtirilgan — son yuqorida turadi */}
          <dl className="flex items-center gap-6 px-2">
            <QueueStat value={queue.reviewed} label={t('dashboard.review.queue.reviewed')} className="text-primary" />
            <QueueStat value={queue.remaining} label={t('dashboard.review.queue.remaining')} className="text-gold" />
          </dl>

          <Button type="button" size="sm" onClick={queue.onNext} disabled={queue.isNavigating}>
            {t('dashboard.review.queue.next')}
            {queue.isNavigating ? (
              <LoaderCircle className="size-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden="true" />
            ) : (
              <ArrowRight className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
            )}
          </Button>
        </>
      )}
    </div>
  )
}
