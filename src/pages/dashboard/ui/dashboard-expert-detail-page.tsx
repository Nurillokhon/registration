import { useTranslation } from 'react-i18next'
import { generatePath, useParams } from 'react-router'
import { getExpertName, parseExpertId, useExpertStatistics } from '@/entities/expert'
import { ROUTES } from '@/shared/config'
import { CertificatesSkeleton } from './certificates/certificates-states'
import { DashboardPageHeader } from './dashboard-page-header'
import { TagList } from './experts/experts-table'
import { LoadErrorState } from './load-error-state'
import { ReviewCertificatesList } from './review-certificates/review-certificates-list'

export function DashboardExpertDetailPage() {
  const { t } = useTranslation()
  const expertId = parseExpertId(useParams().id)
  // Alohida "bitta ekspert" endpointi yo'q — ro'yxatdan topiladi (ro'yxat sahifasidan kelinsa keshda bor)
  const { experts, isLoading, isError, refetch } = useExpertStatistics()
  const expert = experts.find((item) => item.id === expertId)
  const back = { to: ROUTES.experts, label: t('dashboard.experts.detail.back') }

  if (expert) {
    const tags = [...expert.language, ...expert.type]
    const getDetailPath = (id: number) =>
      generatePath(ROUTES.expertCertificate, { expertId: String(expert.id), id: String(id) })

    return (
      <div className="mx-auto max-w-7xl">
        <DashboardPageHeader
          title={getExpertName(expert)}
          subtitle={[expert.full_name && expert.phone, expert.passport, expert.pnfl]
            .filter(Boolean)
            .join(' · ')}
          back={back}
        />
        {tags.length > 0 && (
          <div className="mt-4">
            <TagList items={tags} />
          </div>
        )}

        <section className="mt-8">
          <h2 className="text-heading mb-4 text-[18px] font-bold">
            {t('dashboard.reviewCertificates.title')}
          </h2>
          <ReviewCertificatesList
            expertId={expert.id}
            getDetailPath={getDetailPath}
            // Sonlar ekspert statistikasidan — "Hammasi" uchun mos ko'rsatkich yo'q
            counts={{
              new: expert.pending_reviews,
              approved: expert.approved_certificates,
              problem: expert.problem_certificates,
              rejected: expert.rejected_certificates,
            }}
          />
        </section>
      </div>
    )
  }

  const renderState = () => {
    if (isLoading) return <CertificatesSkeleton />

    if (isError) {
      return (
        <LoadErrorState
          title={t('dashboard.experts.loadError.title')}
          text={t('dashboard.experts.loadError.text')}
          retry={{ label: t('dashboard.experts.loadError.retry'), onRetry: () => refetch() }}
        />
      )
    }

    return (
      <LoadErrorState
        title={t('dashboard.experts.detail.notFound.title')}
        text={t('dashboard.experts.detail.notFound.text')}
      />
    )
  }

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader title={t('dashboard.experts.detail.fallbackTitle')} back={back} />
      <div className="mt-8">{renderState()}</div>
    </div>
  )
}
