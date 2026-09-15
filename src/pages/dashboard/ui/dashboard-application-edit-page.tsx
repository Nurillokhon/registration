import { useTranslation } from 'react-i18next'
import { generatePath, Navigate, useLocation, useNavigate, useParams } from 'react-router'
import { canEditCertificate, parseCertificateId, useCertificate } from '@/entities/certificate'
import { EditCertificateForm } from '@/features/certificate-form'
import { ROUTES } from '@/shared/config'
import { CertificateLoadError } from './certificate-detail/certificate-load-error'
import { DashboardPageHeader } from './dashboard-page-header'

/** Ekspert/admin: arizani PATCH /main/certificate/<id>/ orqali tahrirlash. */
export function DashboardApplicationEditPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const certificateId = parseCertificateId(useParams().id)
  const { certificate, isLoading, error, refetch } = useCertificate(certificateId)
  const detailPath =
    certificateId === null
      ? ROUTES.applications
      : generatePath(ROUTES.applicationDetail, { id: String(certificateId) })

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

    // Backend tahrirlashga faqat new/problem holatda ruxsat beradi
    if (!canEditCertificate(certificate)) {
      return <Navigate to={detailPath} replace state={location.state} />
    }

    return (
      <EditCertificateForm
        certificate={certificate}
        cancelTo={detailPath}
        // Ro'yxatga qaytish manzili (state) baholash sahifasida ham saqlanib qolsin
        onUpdated={() => navigate(detailPath, { state: location.state })}
      />
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <DashboardPageHeader
        title={t('dashboard.review.edit.title')}
        subtitle={t('dashboard.review.edit.subtitle')}
        back={{ to: detailPath, label: t('dashboard.review.edit.back') }}
      />
      <div className="mt-8">{renderContent()}</div>
    </div>
  )
}
