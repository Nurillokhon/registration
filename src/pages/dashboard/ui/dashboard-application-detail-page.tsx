import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router'
import { parseCertificateId, useCertificate } from '@/entities/certificate'
import { useCurrentUser } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { ApplicationReview } from './application-review/application-review'
import { CertificateDetailSkeleton } from './certificate-detail/certificate-detail-skeleton'
import { CertificateLoadError } from './certificate-detail/certificate-load-error'
import { DashboardPageHeader } from './dashboard-page-header'
import { getBackPath } from './review-certificates/back-path'

/** Arizalar ro'yxatidan ochilgan arizani baholash sahifasi. */
export function DashboardApplicationDetailPage() {
  const { t } = useTranslation()
  const location = useLocation()
  const { role } = useCurrentUser()
  const certificateId = parseCertificateId(useParams().id)
  const { certificate, isLoading, error, refetch } = useCertificate(certificateId)
  const backTo = getBackPath(location.state, ROUTES.applications)

  if (certificate) {
    // key: navbatda keyingi arizaga o'tilganda panel holati (tanlangan amal, masshtab) tozalanadi
    return (
      <ApplicationReview
        key={certificate.id}
        certificate={certificate}
        isExpert={role === 'expert'}
        backTo={backTo}
      />
    )
  }

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader
        title={t('dashboard.certificates.detail.fallbackTitle')}
        back={{ to: backTo, label: t('dashboard.applications.back') }}
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
