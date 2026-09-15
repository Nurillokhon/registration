import { useTranslation } from 'react-i18next'
import { generatePath, useParams } from 'react-router'
import { parseExpertId } from '@/entities/expert'
import { ROUTES } from '@/shared/config'
import { ReviewCertificateDetail } from './review-certificates/review-certificate-detail'

/** Admin: ekspert tekshirgan yoki kutayotgan arizaning to'liq ma'lumotlari. */
export function DashboardExpertCertificatePage() {
  const { t } = useTranslation()
  const expertId = parseExpertId(useParams().expertId)

  const back =
    expertId === null
      ? { to: ROUTES.experts, label: t('dashboard.experts.detail.back') }
      : {
          to: generatePath(ROUTES.expertDetail, { id: String(expertId) }),
          label: t('dashboard.experts.certificate.back'),
        }

  return <ReviewCertificateDetail back={back} />
}
