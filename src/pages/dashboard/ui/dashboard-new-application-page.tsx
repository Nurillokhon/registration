import { useTranslation } from 'react-i18next'
import { DashboardPlaceholderPage } from './dashboard-placeholder-page'

export function DashboardNewApplicationPage() {
  const { t } = useTranslation()
  return (
    <DashboardPlaceholderPage
      title={t('dashboard.pages.newApplication.title')}
      note={t('dashboard.pages.comingSoon')}
    />
  )
}
