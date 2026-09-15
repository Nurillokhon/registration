import { useTranslation } from 'react-i18next'
import { ROUTES } from '@/shared/config'
import { useCreateCertificate, type CertificateCreateResponse } from '../api'
import { EMPTY_CERTIFICATE_FORM } from '../model/certificate-form'
import { CertificateForm } from './certificate-form'

type CreateCertificateFormProps = {
  /** Ariza yaratilgach — javobda to'lov uchun invoice va pay_url keladi */
  onCreated: (result: CertificateCreateResponse) => void
}

export function CreateCertificateForm({ onCreated }: CreateCertificateFormProps) {
  const { t } = useTranslation()
  const { createCertificate, isPending } = useCreateCertificate()

  return (
    <CertificateForm
      mode="create"
      defaultValues={EMPTY_CERTIFICATE_FORM}
      submitLabel={t('dashboard.certificateForm.submitCreate')}
      cancelTo={ROUTES.certificates}
      isPending={isPending}
      onSubmit={async (data) => {
        onCreated(await createCertificate(data))
      }}
    />
  )
}
