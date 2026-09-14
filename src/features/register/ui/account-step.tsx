import { FileLock, Lock, Phone, RotateCcwKey } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { getApiErrorMessage } from '@/shared/api'
import { formatUzPhone, toApiPhone } from '@/shared/lib/phone'
import { FormAlert, FormHeader, InfoNote, PasswordField, TextField } from '@/shared/ui'
import { useUserRegister } from '../api'
import { toPassportNumber, type AccountData, type PersonalData } from '../model/registration'
import { hasErrors, validateAccount, type FieldErrors } from '../model/validation'
import { PasswordRequirements } from './password-requirements'
import { BackButton, SubmitButton } from './step-actions'

type AccountStepProps = {
  defaultValues: AccountData
  /** 1-qadam ma'lumotlari — ro'yxatdan o'tish so'roviga birga yuboriladi. */
  personalData: PersonalData
  onSubmit: (values: AccountData) => void
  /** Kiritilgan qiymatlar ortga qaytganda ham yo'qolmasligi uchun uzatiladi. */
  onBack: (values: AccountData) => void
}

export function AccountStep({ defaultValues, personalData, onSubmit, onBack }: AccountStepProps) {
  const { t } = useTranslation()
  const { registerUser, isPending } = useUserRegister()
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState<FieldErrors<AccountData>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const updateField = (field: keyof AccountData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setApiError(null)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const nextErrors = validateAccount(values)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setApiError(null)
    try {
      // Muvaffaqiyatli bo'lsa foydalanuvchi yaratiladi va telefonga SMS ketadi
      await registerUser({
        phone: toApiPhone(values.phone),
        pnfl: Number(personalData.pinfl),
        passport: toPassportNumber(personalData),
        password1: values.password,
        password2: values.confirmPassword,
      })
      onSubmit(values)
    } catch (error) {
      setApiError(getApiErrorMessage(error, t('register.errors.apiFallback')))
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader title={t('register.account.title')} subtitle={t('register.account.subtitle')} />

      <div className="mt-10 space-y-7">
        <TextField
          label={t('register.account.phone.label')}
          icon={Phone}
          error={errors.phone && t(errors.phone)}
          placeholder="+998 90 123 45 67"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => updateField('phone', formatUzPhone(event.target.value))}
        />
        <PasswordField
          label={t('register.account.password.label')}
          icon={Lock}
          error={errors.password && t(errors.password)}
          placeholder="••••••••"
          autoComplete="new-password"
          value={values.password}
          onChange={(event) => updateField('password', event.target.value)}
        />
        <PasswordField
          label={t('register.account.confirmPassword.label')}
          icon={RotateCcwKey}
          error={errors.confirmPassword && t(errors.confirmPassword)}
          placeholder="••••••••"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(event) => updateField('confirmPassword', event.target.value)}
        />
        <PasswordRequirements password={values.password} />
      </div>

      {apiError && <FormAlert className="mt-7">{apiError}</FormAlert>}

      <div className="mt-10">
        <SubmitButton isPending={isPending}>{t('register.account.submit')}</SubmitButton>
        <BackButton onClick={() => onBack(values)} />
      </div>

      <InfoNote icon={FileLock} className="mt-10 sm:mt-12">
        {t('register.account.securityNote')}
      </InfoNote>
    </form>
  )
}
