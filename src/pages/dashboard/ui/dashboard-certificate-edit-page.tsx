import { useTranslation } from 'react-i18next'
import { generatePath, Navigate, useNavigate, useParams } from 'react-router'
import { canEditCertificate, parseCertificateId, useCertificate } from '@/entities/certificate'
import { EditCertificateForm } from '@/features/certificate-form'
import { ROUTES } from '@/shared/config'
import { CertificateLoadError } from './certificate-detail/certificate-load-error'
import { DashboardPageHeader } from './dashboard-page-header'

export function DashboardCertificateEditPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const certificateId = parseCertificateId(useParams().id)
  const { certificate, isLoading, error, refetch } = useCertificate(certificateId)
  const detailPath =
    certificateId === null
      ? ROUTES.certificates
      : generatePath(ROUTES.certificateDetail, { id: String(certificateId) })

  const renderContent = () => {
    if (isLoading) {
      return (
        <div
          aria-hidden="true"
          className="bg-surface shadow-card border-line h-[28rem] animate-pulse rounded-3xl border"
        />
      )
    }

    if (!certificate) return <CertificateLoadError error={error} onRetry={() => refetch()} />

    // Tahrirlash faqat NEW/PROBLEM holatda — boshqa holatda URL qo'lda ochilsa detal sahifasiga qaytariladi
    if (!canEditCertificate(certificate)) return <Navigate to={detailPath} replace />

    return <EditCertificateForm certificate={certificate} onUpdated={() => navigate(detailPath)} />
  }

  return (
    <div className="mx-auto max-w-4xl">
      <DashboardPageHeader
        title={t('dashboard.certificates.detail.editTitle')}
        subtitle={t('dashboard.certificates.detail.editSubtitle')}
        back={{ to: detailPath, label: t('dashboard.certificates.detail.backToCertificate') }}
      />
      <div className="mt-8">{renderContent()}</div>
    </div>
  )
}
