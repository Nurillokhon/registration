import { AtSign, FileLock, Lock, RotateCcwKey } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { FormHeader, InfoNote, PasswordField, TextField } from '@/shared/ui'
import type { AccountData } from '../model/registration'
import { hasErrors, validateAccount, type FieldErrors } from '../model/validation'
import { PasswordRequirements } from './password-requirements'
import { BackButton, SubmitButton } from './step-actions'

type AccountStepProps = {
  defaultValues: AccountData
  onSubmit: (values: AccountData) => void
  /** Kiritilgan qiymatlar ortga qaytganda ham yo'qolmasligi uchun uzatiladi. */
  onBack: (values: AccountData) => void
}

export function AccountStep({ defaultValues, onSubmit, onBack }: AccountStepProps) {
  const { t } = useTranslation()
  const [values, setValues] = useState(defaultValues)
  const [errors, setErrors] = useState<FieldErrors<AccountData>>({})

  const updateField = (field: keyof AccountData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const nextErrors = validateAccount(values)
    setErrors(nextErrors)
    if (!hasErrors(nextErrors)) onSubmit(values)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader title={t('register.account.title')} subtitle={t('register.account.subtitle')} />

      <div className="mt-10 space-y-7">
        <TextField
          label={t('register.account.login.label')}
          icon={AtSign}
          error={errors.login && t(errors.login)}
          placeholder={t('register.account.login.placeholder')}
          type="text"
          inputMode="email"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          value={values.login}
          onChange={(event) => updateField('login', event.target.value)}
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

      <div className="mt-10">
        <SubmitButton>{t('register.account.submit')}</SubmitButton>
        <BackButton onClick={() => onBack(values)} />
      </div>

      <InfoNote icon={FileLock} className="mt-10 sm:mt-12">
        {t('register.account.securityNote')}
      </InfoNote>
    </form>
  )
}
