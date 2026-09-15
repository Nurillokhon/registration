import { useTranslation } from 'react-i18next'
import { generatePath } from 'react-router'
import { getCertificateFileUrl, type CertificateDetail } from '@/entities/certificate'
import { ROUTES } from '@/shared/config'
import { useUpdateCertificate } from '../api'
import { toCertificateFormValues } from '../model/certificate-form'
import { CertificateForm } from './certificate-form'

type EditCertificateFormProps = {
  certificate: CertificateDetail
  onUpdated: () => void
  /** "Bekor qilish" manzili — berilmasa nomzodning sertifikat sahifasi */
  cancelTo?: string
}

export function EditCertificateForm({ certificate, onUpdated, cancelTo }: EditCertificateFormProps) {
  const { t } = useTranslation()
  const { updateCertificate, isPending } = useUpdateCertificate(certificate.id)

  return (
    <CertificateForm
      mode="edit"
      defaultValues={toCertificateFormValues(certificate)}
      currentFileUrl={getCertificateFileUrl(certificate.file)}
      submitLabel={t('dashboard.certificateForm.submitEdit')}
      cancelTo={cancelTo ?? generatePath(ROUTES.certificateDetail, { id: String(certificate.id) })}
      isPending={isPending}
      onSubmit={async (data) => {
        await updateCertificate(data)
        onUpdated()
      }}
    />
  )
}
