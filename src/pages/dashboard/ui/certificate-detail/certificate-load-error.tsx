import { useTranslation } from 'react-i18next'
import { getHttpStatus } from '@/shared/api'
import { LoadErrorState } from '../load-error-state'

type CertificateLoadErrorProps = {
  /** undefined — so'rov umuman ketmagan (URL'dagi id yaroqsiz) */
  error: unknown
  onRetry: () => void
}

export function CertificateLoadError({ error, onRetry }: CertificateLoadErrorProps) {
  const { t } = useTranslation()
  const status = getHttpStatus(error)

  // Yaroqsiz id, begona sertifikat (403) va mavjud bo'lmagan sertifikat (404) —
  // foydalanuvchi uchun bir xil "topilmadi"; qayta urinishdan foyda yo'q.
  if (!error || status === 403 || status === 404) {
    return (
      <LoadErrorState
        title={t('dashboard.certificates.detail.notFound.title')}
        text={t('dashboard.certificates.detail.notFound.text')}
      />
    )
  }

  return (
    <LoadErrorState
      title={t('dashboard.certificates.detail.loadErrorTitle')}
      text={t('dashboard.certificates.loadError.text')}
      retry={{ label: t('dashboard.certificates.loadError.retry'), onRetry }}
    />
  )
}
