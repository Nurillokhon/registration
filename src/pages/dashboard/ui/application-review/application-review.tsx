import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { generatePath, useLocation, useNavigate } from 'react-router'
import {
  canEditCertificate,
  CertificateStatusBadge,
  getCertificateFileUrl,
  type CertificateDetail,
} from '@/entities/certificate'
import { useExpertStatistics } from '@/entities/expert'
import {
  readAutoNext,
  ReviewActionsPanel,
  useCertificateQueue,
  writeAutoNext,
  type QueueDirection,
} from '@/features/certificate-review'
import { getApiErrorMessage, getHttpStatus } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { ReviewCandidateCard } from './review-candidate-card'
import { ReviewDetailsCard } from './review-details-card'
import { ReviewFilePreview } from './review-file-preview'
import { ReviewQueueBar } from './review-queue-bar'
import { ReviewStatusSidebar } from './review-status-sidebar'

type ApplicationReviewProps = {
  certificate: CertificateDetail
  /** Navbat (oldingi/keyingi), ko'rsatkichlar va avtomatik rejim faqat ekspert uchun */
  isExpert: boolean
  backTo: string
}

/** Arizani baholash sahifasi: status qo'yish, tafsilotlar, ariza beruvchi, fayl va holat tarixi. */
export function ApplicationReview({ certificate, isExpert, backTo }: ApplicationReviewProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { fetchNeighbor, isPending: isNavigating } = useCertificateQueue(certificate.id)
  // Ekspert uchun javobda faqat uning o'z ko'rsatkichlari keladi
  const { experts } = useExpertStatistics({ enabled: isExpert })
  const stats = isExpert ? experts[0] : undefined
  const [autoNext, setAutoNext] = useState(readAutoNext)
  const [queueMessage, setQueueMessage] = useState<string | null>(null)

  const changeAutoNext = (value: boolean) => {
    setAutoNext(value)
    writeAutoNext(value)
  }

  const goToNeighbor = async (direction: QueueDirection) => {
    setQueueMessage(null)
    try {
      const neighbor = await fetchNeighbor(direction)
      // Navbat aylanma — boshqa ariza bo'lmasa backend joriysining o'zini qaytaradi
      if (!neighbor?.id || neighbor.id === certificate.id) {
        setQueueMessage(t('dashboard.review.queue.empty'))
        return
      }
      // Ro'yxatga qaytish manzili (state) keyingi arizada ham saqlanadi
      navigate(generatePath(ROUTES.applicationDetail, { id: String(neighbor.id) }), {
        state: location.state,
      })
    } catch (error) {
      setQueueMessage(
        getHttpStatus(error) === 404
          ? t('dashboard.review.queue.empty')
          : getApiErrorMessage(error, t('dashboard.review.queue.error')),
      )
    }
  }

  const editTo = canEditCertificate(certificate)
    ? generatePath(ROUTES.applicationEdit, { id: String(certificate.id) })
    : undefined

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-heading min-w-0 text-[24px] leading-tight font-extrabold tracking-tight break-words sm:text-[28px]">
          {t('dashboard.review.title', { number: certificate.number })}
        </h1>
        <CertificateStatusBadge status={certificate.status} className="px-3.5 py-1.5 text-[13px]" />
      </header>

      <div className="mt-5">
        <ReviewQueueBar
          backTo={backTo}
          queue={
            isExpert
              ? {
                  onPrevious: () => void goToNeighbor('previous'),
                  onNext: () => void goToNeighbor('next'),
                  isNavigating,
                  reviewed: stats?.total_reviewed,
                  remaining: stats?.pending_reviews,
                }
              : undefined
          }
        />
        {queueMessage && (
          <p role="status" className="text-body mt-3 text-[13.5px]">
            {queueMessage}
          </p>
        )}
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <div className="min-w-0 space-y-6">
          <ReviewActionsPanel
            certificate={certificate}
            autoNext={isExpert ? { value: autoNext, onChange: changeAutoNext } : undefined}
            onStatusUpdated={() => {
              if (isExpert && autoNext) void goToNeighbor('next')
            }}
          />
          <ReviewDetailsCard certificate={certificate} editTo={editTo} linkState={location.state} />
          <ReviewCandidateCard certificate={certificate} />
          <ReviewFilePreview fileUrl={getCertificateFileUrl(certificate.file)} />
        </div>

        <ReviewStatusSidebar certificate={certificate} />
      </div>
    </div>
  )
}
