import { History } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CertificateStatusBadge, useCertificateHistory } from '@/entities/certificate'

/** Holatlar tarixi — eng yuqorida backend qaytargan tartibda, vertikal timeline ko'rinishida. */
export function CertificateHistory({ certificateId }: { certificateId: number }) {
  const { t } = useTranslation()
  const { history, isLoading, isError } = useCertificateHistory(certificateId)

  const renderBody = () => {
    if (isLoading) {
      return (
        <div aria-hidden="true" className="mt-6 animate-pulse space-y-4">
          {[0, 1, 2].map((index) => (
            <div key={index} className="bg-surface-muted h-14 rounded-xl" />
          ))}
        </div>
      )
    }

    if (history.length === 0) {
      return (
        <p className="text-body mt-5 text-[14px]">
          {isError
            ? t('dashboard.certificates.detail.historyError')
            : t('dashboard.certificates.detail.historyEmpty')}
        </p>
      )
    }

    return (
      <ol className="mt-6">
        {history.map((item, index) => (
          <li key={item.id ?? index} className="relative flex gap-4 pb-6 last:pb-0">
            {index < history.length - 1 && (
              <span aria-hidden="true" className="bg-line absolute top-5 bottom-0 left-[7px] w-0.5" />
            )}
            <span
              aria-hidden="true"
              className="bg-primary ring-primary-soft relative mt-1.5 size-4 shrink-0 rounded-full ring-4"
            />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <CertificateStatusBadge status={item.status} />
                {item.created_at_str && (
                  <span className="text-neutral text-[12.5px] tabular-nums">{item.created_at_str}</span>
                )}
              </div>
              {item.sms_message && (
                <p className="text-body mt-2 text-[14px] leading-relaxed">{item.sms_message}</p>
              )}
              {item.expert && (
                <p className="text-neutral mt-1 text-[12.5px]">
                  {t('dashboard.certificates.detail.fields.expert')}: {item.expert}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    )
  }

  return (
    <section className="bg-surface shadow-card border-line rounded-3xl border p-5 sm:p-7">
      <h2 className="text-heading flex items-center gap-2 text-[18px] font-bold tracking-tight">
        <History className="text-primary size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
        {t('dashboard.certificates.detail.historyTitle')}
      </h2>
      {renderBody()}
    </section>
  )
}
