import { useTranslation } from 'react-i18next'
import { DashboardPlaceholderPage } from './dashboard-placeholder-page'

export function DashboardCertificatesPage() {
  const { t } = useTranslation()
  return (
    <DashboardPlaceholderPage
      title={t('dashboard.pages.certificates.title')}
      note={t('dashboard.pages.comingSoon')}
    />
  )
}
