import { FingerprintPattern, ShieldCheck } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { FormHeader, InfoNote, TextField } from '@/shared/ui'
import { digitsOnly, latinLettersOnly } from '../model/normalize'
import type { PersonalData } from '../model/registration'
import { hasErrors, validatePersonal, type FieldErrors } from '../model/validation'
import { SubmitButton } from './step-actions'

type PersonalStepProps = {
  defaultValues: PersonalData
  onSubmit: (values: PersonalData) => void
}

export function PersonalStep({ defaultValues, onSubmit }: PersonalStepProps) {
  const { t } = useTranslation()
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState<FieldErrors<PersonalData>>({})

  const updateField = (field: keyof PersonalData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Foydalanuvchi maydonni tuzata boshlashi bilan eski xato yashiriladi
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const nextErrors = validatePersonal(values)
    setErrors(nextErrors)
    if (!hasErrors(nextErrors)) onSubmit(values)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader title={t('register.personal.title')} subtitle={t('register.personal.subtitle')} />

      <div className="mt-10 space-y-7">
        <TextField
          label={t('register.personal.pinfl.label')}
          icon={FingerprintPattern}
          hint={t('register.personal.pinfl.hint')}
          error={errors.pinfl && t(errors.pinfl)}
          placeholder="00000000000000"
          inputMode="numeric"
          autoComplete="off"
          maxLength={14}
          value={values.pinfl}
          onChange={(event) => updateField('pinfl', digitsOnly(event.target.value))}
        />

        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)] gap-4">
          <TextField
            label={t('register.personal.passportSeries.label')}
            error={errors.passportSeries && t(errors.passportSeries)}
            placeholder="AA"
            autoComplete="off"
            autoCapitalize="characters"
            maxLength={2}
            inputClassName="text-center"
            value={values.passportSeries}
            onChange={(event) =>
              updateField('passportSeries', latinLettersOnly(event.target.value))
            }
          />
          <TextField
            label={t('register.personal.passportNumber.label')}
            error={errors.passportNumber && t(errors.passportNumber)}
            placeholder="1234567"
            inputMode="numeric"
            autoComplete="off"
            maxLength={7}
            value={values.passportNumber}
            onChange={(event) => updateField('passportNumber', digitsOnly(event.target.value))}
          />
        </div>
      </div>

      <div className="mt-10">
        <SubmitButton>{t('register.personal.submit')}</SubmitButton>
        <p className="text-body mt-6 text-center text-[14px]">
          {t('register.personal.haveAccount')}{' '}
          <Link to={ROUTES.login} className="text-primary font-semibold hover:underline">
            {t('register.personal.signIn')}
          </Link>
        </p>
      </div>

      <InfoNote icon={ShieldCheck} className="mt-10 sm:mt-12">
        {t('register.personal.securityNote')}
      </InfoNote>
    </form>
  )
}
