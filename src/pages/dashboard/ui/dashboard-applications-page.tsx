import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router'
import { ROUTES } from '@/shared/config'
import { DashboardPageHeader } from './dashboard-page-header'
import { ReviewCertificatesList } from './review-certificates/review-certificates-list'

function getDetailPath(id: number) {
  return generatePath(ROUTES.applicationDetail, { id: String(id) })
}

/** Admin — barcha to'langan arizalar, ekspert — o'z tili va turi bo'yicha (backend cheklaydi). */
export function DashboardApplicationsPage() {
  const { t } = useTranslation()

  return (
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader
        title={t('dashboard.pages.applications.title')}
        subtitle={t('dashboard.applications.subtitle')}
      />
      <div className="mt-8">
        <ReviewCertificatesList getDetailPath={getDetailPath} showExpert />
      </div>
    </div>
  )
}
