import { useTranslation } from 'react-i18next'
import { DashboardPlaceholderPage } from './dashboard-placeholder-page'

export function DashboardApplicationsPage() {
  const { t } = useTranslation()
  return (
    <DashboardPlaceholderPage
      title={t('dashboard.pages.applications.title')}
      note={t('dashboard.pages.comingSoon')}
    />
  )
}
