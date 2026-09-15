import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router'
import { parseCertificateId, useCertificate } from '@/entities/certificate'
import { CertificateDetailSkeleton } from '../certificate-detail/certificate-detail-skeleton'
import { CertificateDetailView } from '../certificate-detail/certificate-detail-view'
import { CertificateLoadError } from '../certificate-detail/certificate-load-error'
import { DashboardPageHeader } from '../dashboard-page-header'
import { getBackPath } from './back-path'

type ReviewCertificateDetailProps = {
  /** State'da manzil kelmasa (sahifa to'g'ridan-to'g'ri ochilsa) shu yerga qaytiladi */
  back: { to: string; label: string }
}

/** Admin/ekspert: arizaning to'liq ma'lumotlari, nomzod kartochkasi va holatlar tarixi. */
export function ReviewCertificateDetail({ back: fallbackBack }: ReviewCertificateDetailProps) {
  const { t } = useTranslation()
  const location = useLocation()
  const certificateId = parseCertificateId(useParams().id)
  const { certificate, isLoading, error, refetch } = useCertificate(certificateId)
  const back = { ...fallbackBack, to: getBackPath(location.state, fallbackBack.to) }

  if (certificate) return <CertificateDetailView certificate={certificate} back={back} showCandidate />

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader title={t('dashboard.certificates.detail.fallbackTitle')} back={back} />
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
