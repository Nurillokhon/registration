import { UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CertificateDetail } from '@/entities/certificate'
import { getPhotoSrc } from '@/entities/user'

export function ReviewCandidateCard({ certificate }: { certificate: CertificateDetail }) {
  const { t } = useTranslation()
  const photoSrc = getPhotoSrc(certificate.photo)

  const rows = [
    { key: 'pnfl', label: t('dashboard.review.candidate.pnfl'), value: certificate.pnfl },
    { key: 'passport', label: t('dashboard.review.candidate.passport'), value: certificate.passport },
  ]

  return (
    <section className="bg-surface shadow-card border-line rounded-2xl border p-5 sm:p-6">
      <h2 className="border-line text-heading flex items-center gap-3 border-b pb-4 text-[18px] font-bold tracking-tight">
        <span className="bg-primary text-on-primary flex size-9 shrink-0 items-center justify-center rounded-full">
          <UserRound className="size-5" strokeWidth={2.2} aria-hidden="true" />
        </span>
        {t('dashboard.review.candidate.title')}
      </h2>

      <div className="mt-5 flex flex-col gap-5 sm:flex-row">
        <div className="bg-surface-muted border-line flex aspect-4/5 w-full max-w-44 shrink-0 items-center justify-center overflow-hidden rounded-2xl border">
          {photoSrc ? (
            <img src={photoSrc} alt="" className="size-full object-cover" />
          ) : (
            <UserRound className="text-neutral size-12" strokeWidth={1.6} aria-hidden="true" />
          )}
        </div>

        <dl className="grid min-w-0 flex-1 content-start gap-x-6 gap-y-4 sm:grid-cols-2">
          <div className="min-w-0 sm:col-span-2">
            <dt className="text-body text-[13px]">{t('dashboard.review.candidate.fullName')}</dt>
            <dd className="text-heading mt-0.5 text-[16px] font-semibold break-words">
              {certificate.full_name || '—'}
            </dd>
          </div>
          {rows.map(({ key, label, value }) => (
            <div key={key} className="min-w-0">
              <dt className="text-body text-[13px]">{label}</dt>
              <dd className="text-heading mt-0.5 font-mono text-[15px] break-words">{value || '—'}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
