import { Eye } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router'
import { CertificateStatusBadge, type CertificateListItem } from '@/entities/certificate'

const HEAD_CELL_CLASS_NAME = 'px-5 py-3.5 font-bold'
const CELL_CLASS_NAME = 'text-body px-5 py-4'

type ReviewCertificatesTableProps = {
  certificates: readonly CertificateListItem[]
  getDetailPath: (id: number) => string
  /** Barcha arizalar ro'yxatida — qaysi ekspert tekshirgani ustuni */
  showExpert?: boolean
}

/** Admin/ekspert uchun sertifikatlar jadvali: qator detal sahifasiga olib boradi. */
export function ReviewCertificatesTable({
  certificates,
  getDetailPath,
  showExpert = false,
}: ReviewCertificatesTableProps) {
  const { t } = useTranslation()
  const location = useLocation()
  // Detal sahifasidagi "ortga" havolasi joriy tab/sahifa/qidiruvga qaytarishi uchun
  const linkState = { from: `${location.pathname}${location.search}` }

  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[980px] text-left text-[14px]">
          <thead>
            <tr className="border-line text-neutral border-b text-[12px] tracking-wide uppercase">
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.number')}
              </th>
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.candidate')}
              </th>
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.type')}
              </th>
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.language')}
              </th>
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.degree')}
              </th>
              {showExpert && (
                <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                  {t('dashboard.reviewCertificates.columns.expert')}
                </th>
              )}
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.createdAt')}
              </th>
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                {t('dashboard.reviewCertificates.columns.status')}
              </th>
              <th scope="col" className={HEAD_CELL_CLASS_NAME}>
                <span className="sr-only">{t('dashboard.reviewCertificates.columns.actions')}</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-line divide-y">
            {certificates.map((certificate) => (
              <tr key={certificate.id} className="hover:bg-surface-sky transition-colors">
                <td className="px-5 py-4">
                  <Link
                    to={getDetailPath(certificate.id)}
                    state={linkState}
                    className="text-heading hover:text-primary font-bold tabular-nums transition-colors"
                  >
                    {certificate.number}
                  </Link>
                </td>
                <td className={CELL_CLASS_NAME}>{certificate.full_name || '—'}</td>
                <td className={CELL_CLASS_NAME}>{certificate.type_name || '—'}</td>
                <td className={CELL_CLASS_NAME}>{certificate.language_name || '—'}</td>
                <td className={CELL_CLASS_NAME}>{certificate.degree_name || '—'}</td>
                {showExpert && (
                  <td className={`${CELL_CLASS_NAME} whitespace-nowrap tabular-nums`}>
                    {certificate.expert || '—'}
                  </td>
                )}
                <td className={`${CELL_CLASS_NAME} whitespace-nowrap tabular-nums`}>
                  {certificate.created_at_str || '—'}
                </td>
                <td className="px-5 py-4">
                  <CertificateStatusBadge status={certificate.status} />
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to={getDetailPath(certificate.id)}
                    state={linkState}
                    aria-label={`${t('dashboard.reviewCertificates.view')}: ${certificate.number}`}
                    className="text-primary hover:bg-primary-soft inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13.5px] font-semibold transition-colors"
                  >
                    <Eye className="size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
                    {t('dashboard.reviewCertificates.view')}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-line divide-y md:hidden">
        {certificates.map((certificate) => (
          <li key={certificate.id}>
            <Link
              to={getDetailPath(certificate.id)}
              state={linkState}
              className="hover:bg-surface-sky block px-5 py-4 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-heading min-w-0 truncate font-bold tabular-nums">
                  {certificate.number}
                </p>
                <CertificateStatusBadge status={certificate.status} />
              </div>
              <p className="text-heading mt-1 text-[14px] font-semibold">
                {certificate.full_name || '—'}
              </p>
              <p className="text-body mt-0.5 text-[13.5px]">
                {[certificate.type_name, certificate.language_name, certificate.degree_name]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
              <p className="text-neutral mt-2 text-[12.5px] tabular-nums">
                {[certificate.created_at_str, showExpert && certificate.expert]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
