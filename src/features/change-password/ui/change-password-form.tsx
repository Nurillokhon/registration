import { CircleCheck, KeyRound, LoaderCircle, Lock, RotateCcwKey } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { getApiErrorMessage } from '@/shared/api'
import { Button, FormAlert, PasswordField } from '@/shared/ui'
import { useChangePassword } from '../api'
import {
  EMPTY_CHANGE_PASSWORD_DATA,
  hasErrors,
  validateChangePassword,
  type ChangePasswordData,
  type ChangePasswordErrors,
} from '../model/change-password'

export function ChangePasswordForm() {
  const { t } = useTranslation()
  const { changePassword, isPending } = useChangePassword()
  const [values, setValues] = useState(EMPTY_CHANGE_PASSWORD_DATA)
  const [errors, setErrors] = useState<ChangePasswordErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const updateField = (field: keyof ChangePasswordData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setApiError(null)
    setIsSuccess(false)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const nextErrors = validateChangePassword(values)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setApiError(null)
    try {
      await changePassword({
        old_password: values.oldPassword,
        new_password1: values.newPassword,
        new_password2: values.confirmPassword,
      })
      // Parollar brauzer xotirasida qolib ketmasin — muvaffaqiyatdan so'ng forma tozalanadi
      setValues(EMPTY_CHANGE_PASSWORD_DATA)
      setIsSuccess(true)
    } catch (error) {
      setApiError(getApiErrorMessage(error, t('dashboard.profile.security.errors.apiFallback')))
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="max-w-xl">
      <div className="space-y-6">
        <PasswordField
          label={t('dashboard.profile.security.oldPassword')}
          icon={Lock}
          error={errors.oldPassword && t(errors.oldPassword)}
          placeholder="••••••••"
          autoComplete="current-password"
          value={values.oldPassword}
          onChange={(event) => updateField('oldPassword', event.target.value)}
        />
        <PasswordField
          label={t('dashboard.profile.security.newPassword')}
          icon={KeyRound}
          error={errors.newPassword && t(errors.newPassword)}
          placeholder="••••••••"
          autoComplete="new-password"
          value={values.newPassword}
          onChange={(event) => updateField('newPassword', event.target.value)}
        />
        <PasswordField
          label={t('dashboard.profile.security.confirmPassword')}
          icon={RotateCcwKey}
          error={errors.confirmPassword && t(errors.confirmPassword)}
          placeholder="••••••••"
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={(event) => updateField('confirmPassword', event.target.value)}
        />
      </div>

      {apiError && <FormAlert className="mt-6">{apiError}</FormAlert>}

      {isSuccess && (
        <p
          role="status"
          className="bg-primary-soft text-primary mt-6 flex gap-3 rounded-xl px-4 py-3 text-[13px] font-medium"
        >
          <CircleCheck className="mt-0.5 size-4 shrink-0" strokeWidth={2.2} aria-hidden="true" />
          {t('dashboard.profile.security.success')}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="mt-8 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isPending && (
          <LoaderCircle className="size-4 shrink-0 animate-spin" strokeWidth={2.4} aria-hidden="true" />
        )}
        {t('dashboard.profile.security.submit')}
      </Button>
    </form>
  )
}
