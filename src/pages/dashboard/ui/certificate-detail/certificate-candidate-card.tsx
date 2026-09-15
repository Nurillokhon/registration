import { UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CertificateDetail } from '@/entities/certificate'
import { getInitials, getPhotoSrc } from '@/entities/user'

/** Admin/ekspert uchun — sertifikat egasi (nomzod) haqidagi ma'lumotlar. */
export function CertificateCandidateCard({ certificate }: { certificate: CertificateDetail }) {
  const { t } = useTranslation()
  const photoSrc = getPhotoSrc(certificate.photo)
  const initials = getInitials(certificate.full_name ?? '')

  const rows = [
    { key: 'pnfl', label: t('dashboard.reviewCertificates.candidate.pnfl'), value: certificate.pnfl },
    {
      key: 'passport',
      label: t('dashboard.reviewCertificates.candidate.passport'),
      value: certificate.passport,
    },
  ].filter((row) => row.value)

  return (
    <section className="bg-surface shadow-card border-line rounded-3xl border p-5 sm:p-7">
      <h2 className="text-heading flex items-center gap-2 text-[18px] font-bold tracking-tight">
        <UserRound className="text-primary size-5 shrink-0" strokeWidth={2} aria-hidden="true" />
        {t('dashboard.reviewCertificates.candidate.title')}
      </h2>

      <div className="mt-5 flex items-center gap-4">
        {photoSrc ? (
          <img
            src={photoSrc}
            alt=""
            className="border-line size-16 shrink-0 rounded-2xl border object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="bg-primary-soft text-primary flex size-16 shrink-0 items-center justify-center rounded-2xl text-[18px] font-bold"
          >
            {initials ?? <UserRound className="size-7" strokeWidth={2} />}
          </span>
        )}
        <div className="min-w-0">
          <p className="text-body text-[12.5px]">{t('dashboard.reviewCertificates.candidate.fullName')}</p>
          <p className="text-heading mt-0.5 text-[15px] font-bold break-words">
            {certificate.full_name || '—'}
          </p>
        </div>
      </div>

      {rows.length > 0 && (
        <dl className="mt-5 grid gap-3">
          {rows.map(({ key, label, value }) => (
            <div key={key} className="border-line rounded-xl border px-4 py-3">
              <dt className="text-body text-[12.5px]">{label}</dt>
              <dd className="text-heading mt-1 text-[14px] font-semibold break-words tabular-nums">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  )
}
