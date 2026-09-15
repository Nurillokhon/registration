import { History } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CertificateStatusBadge,
  useCertificateHistory,
  type CertificateDetail,
} from '@/entities/certificate'
import { cn } from '@/shared/lib/cn'

// Tarix eng yangisidan boshlab keladi — odatda oxirgi bir nechta amal yetarli
const RECENT_LIMIT = 3

export function ReviewStatusSidebar({ certificate }: { certificate: CertificateDetail }) {
  const { t } = useTranslation()
  const { history, isLoading, isError } = useCertificateHistory(certificate.id)
  const [showAll, setShowAll] = useState(false)
  const items = showAll ? history : history.slice(0, RECENT_LIMIT)
  const canToggle = history.length > RECENT_LIMIT

  const renderHistory = () => {
    if (isLoading) {
      return (
        <div aria-hidden="true" className="mt-3 animate-pulse space-y-2.5">
          {[0, 1].map((index) => (
            <div key={index} className="bg-surface-muted h-16 rounded-xl" />
          ))}
        </div>
      )
    }

    if (items.length === 0) {
      return (
        <p className="text-body mt-3 text-[13.5px]">
          {isError
            ? t('dashboard.certificates.detail.historyError')
            : t('dashboard.certificates.detail.historyEmpty')}
        </p>
      )
    }

    return (
      <ul className="mt-3 space-y-2.5">
        {items.map((item, index) => (
          <li key={item.id ?? index} className="border-line rounded-xl border px-4 py-3">
            <CertificateStatusBadge status={item.status} />
            {item.sms_message && (
              <p className="text-body mt-2 text-[13px] leading-relaxed">{item.sms_message}</p>
            )}
            <p className="text-neutral mt-1.5 text-[12px] tabular-nums">
              {[item.created_at_str, item.expert].filter(Boolean).join(' · ')}
            </p>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <aside className="bg-surface shadow-card border-line rounded-2xl border p-5 sm:p-6 lg:sticky lg:top-24">
      <div className="border-line flex items-center justify-between gap-3 border-b pb-4">
        <h2 className="text-heading text-[18px] font-bold tracking-tight">{t('dashboard.review.status.title')}</h2>
        {canToggle && (
          <button
            type="button"
            aria-pressed={showAll}
            aria-label={showAll ? t('dashboard.review.status.showLess') : t('dashboard.review.status.showAll')}
            onClick={() => setShowAll((prev) => !prev)}
            className={cn(
              'hover:bg-surface-muted flex size-9 items-center justify-center rounded-lg transition-colors',
              showAll ? 'text-primary' : 'text-body',
            )}
          >
            <History className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        )}
      </div>

      <dl className="mt-4 space-y-4">
        <div>
          <dt className="text-body text-[13px]">{t('dashboard.review.status.current')}</dt>
          <dd className="mt-1.5">
            <CertificateStatusBadge status={certificate.status} />
          </dd>
        </div>
        <div>
          <dt className="text-body text-[13px]">{t('dashboard.review.status.submitted')}</dt>
          <dd className="text-heading mt-0.5 text-[15px] tabular-nums">{certificate.created_at_str || '—'}</dd>
        </div>
        <div>
          <dt className="text-body text-[13px]">{t('dashboard.review.status.updated')}</dt>
          <dd className="text-heading mt-0.5 text-[15px] tabular-nums">{certificate.updated_at_str || '—'}</dd>
        </div>
      </dl>

      <div className="border-line mt-5 border-t pt-5">
        <h3 className="text-body text-[13.5px] font-semibold">{t('dashboard.review.status.recent')}</h3>
        {renderHistory()}
      </div>
    </aside>
  )
}
