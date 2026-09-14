import { useTranslation } from 'react-i18next'
import { DashboardPlaceholderPage } from './dashboard-placeholder-page'

export function DashboardReviewsPage() {
  const { t } = useTranslation()
  return (
    <DashboardPlaceholderPage
      title={t('dashboard.pages.reviews.title')}
      note={t('dashboard.pages.comingSoon')}
    />
  )
}
