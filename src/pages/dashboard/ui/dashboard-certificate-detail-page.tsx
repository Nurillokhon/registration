import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'
import { parseCertificateId, useCertificate } from '@/entities/certificate'
import { ROUTES } from '@/shared/config'
import { CertificateDetailSkeleton } from './certificate-detail/certificate-detail-skeleton'
import { CertificateDetailView } from './certificate-detail/certificate-detail-view'
import { CertificateLoadError } from './certificate-detail/certificate-load-error'
import { DashboardPageHeader } from './dashboard-page-header'

export function DashboardCertificateDetailPage() {
  const { t } = useTranslation()
  const certificateId = parseCertificateId(useParams().id)
  const { certificate, isLoading, error, refetch } = useCertificate(certificateId)

  if (certificate) return <CertificateDetailView certificate={certificate} />

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader
        title={t('dashboard.certificates.detail.fallbackTitle')}
        back={{ to: ROUTES.certificates, label: t('dashboard.certificates.detail.back') }}
      />
      {isLoading ? (
        <CertificateDetailSkeleton />
      ) : (
        <div className="mt-8">
          <CertificateLoadError error={error} onRetry={() => refetch()} />
        </div>
      )}
    </div>
  )
}
