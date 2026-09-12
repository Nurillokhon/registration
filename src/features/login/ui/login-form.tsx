import { ArrowRight, KeyRound, Lock, Phone } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import { ROUTES } from '@/shared/config'
import { formatUzPhone } from '@/shared/lib/phone'
import { Button, FormHeader, InfoNote, PasswordField, TextField } from '@/shared/ui'
import {
  EMPTY_LOGIN_DATA,
  hasErrors,
  validateLogin,
  type LoginData,
  type LoginErrors,
} from '../model/login'

export function LoginForm() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [values, setValues] = useState<LoginData>(EMPTY_LOGIN_DATA)
  const [errors, setErrors] = useState<LoginErrors>({})

  const updateField = (field: keyof LoginData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Foydalanuvchi maydonni tuzata boshlashi bilan eski xato yashiriladi
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    // TODO: backend tayyor bo'lganda shu yerda kirish so'rovi yuboriladi.
    // Hozircha muvaffaqiyatli kirishdan keyingi yo'naltirish imitatsiya qilinadi.
    navigate(ROUTES.home)
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormHeader title={t('login.title')} subtitle={t('login.subtitle')} />

      <div className="mt-10 space-y-7">
        <TextField
          label={t('login.phone.label')}
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
          label={t('login.password.label')}
          icon={Lock}
          error={errors.password && t(errors.password)}
          placeholder="••••••••"
          autoComplete="current-password"
          value={values.password}
          onChange={(event) => updateField('password', event.target.value)}
        />
      </div>

      <div className="mt-10">
        <Button type="submit" variant="gradient" size="lg" className="w-full">
          {t('login.submit')}
          <ArrowRight className="size-5 shrink-0" strokeWidth={2.4} aria-hidden="true" />
        </Button>
        <p className="text-body mt-6 text-center text-[14px]">
          {t('login.noAccount')}{' '}
          <Link to={ROUTES.register} className="text-primary font-semibold hover:underline">
            {t('login.signUp')}
          </Link>
        </p>
      </div>

      <InfoNote icon={KeyRound} className="mt-10 sm:mt-12">
        {t('login.securityNote')}
      </InfoNote>
    </form>
  )
}
