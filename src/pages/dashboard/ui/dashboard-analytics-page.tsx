import { useTranslation } from 'react-i18next'
import { DashboardPlaceholderPage } from './dashboard-placeholder-page'

export function DashboardAnalyticsPage() {
  const { t } = useTranslation()
  return (
    <DashboardPlaceholderPage
      title={t('dashboard.pages.analytics.title')}
      note={t('dashboard.pages.comingSoon')}
    />
  )
}
