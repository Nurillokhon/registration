import { ArrowRight, KeyRound, LoaderCircle, Lock, Phone } from 'lucide-react'
import { useState, type FormEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router'
import { isUserRole, setStoredUser } from '@/entities/user'
import { getApiErrorMessage, setTokens } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { formatUzPhone, toApiPhone } from '@/shared/lib/phone'
import {
  Button,
  FormAlert,
  FormHeader,
  InfoNote,
  PasswordField,
  TextField,
} from '@/shared/ui'
import { useLogin } from '../api'
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
  const { login, isPending } = useLogin()
  const [values, setValues] = useState<LoginData>(EMPTY_LOGIN_DATA)
  const [errors, setErrors] = useState<LoginErrors>({})
  const [apiError, setApiError] = useState<string | null>(null)

  const updateField = (field: keyof LoginData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Foydalanuvchi maydonni tuzata boshlashi bilan eski xato yashiriladi
    setErrors((prev) => ({ ...prev, [field]: undefined }))
    setApiError(null)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) return

    setApiError(null)
    try {
      const { access, refresh, user } = await login({
        phone: toApiPhone(values.phone),
        password: values.password,
      })
      // Ilovada bo'limi yo'q rol kelsa kirish to'xtatiladi — tokenlar saqlanmaydi,
      // aks holda RequireAuth foydalanuvchini hech qaysi bo'limga kiritmay qolardi.
      if (!isUserRole(user.role)) {
        setApiError(t('login.errors.apiFallback'))
        return
      }
      setTokens({ access, refresh })
      // Foydalanuvchi ham saqlanadi — dashboard sidebar'i rolni profil so'rovi
      // kelguncha kutmasdan ko'rsatadi.
      setStoredUser(user)
      navigate(ROUTES.dashboard)
    } catch (error) {
      // Backend faol bo'lmagan (SMS tasdiqlanmagan) foydalanuvchiga ham aynan
      // "Foydalanuvchi topilmadi yoki parol noto'g'ri!" deb javob beradi —
      // kim ro'yxatdan o'tganini oshkor qilmaslik uchun. Shuning uchun xabar
      // qanday kelsa, shundayligicha ko'rsatiladi.
      setApiError(getApiErrorMessage(error, t('login.errors.apiFallback')))
    }
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

      {apiError && <FormAlert className="mt-7">{apiError}</FormAlert>}

      <div className="mt-10">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={isPending}
          className="w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {t('login.submit')}
          {isPending ? (
            <LoaderCircle
              className="size-5 shrink-0 animate-spin"
              strokeWidth={2.4}
              aria-hidden="true"
            />
          ) : (
            <ArrowRight className="size-5 shrink-0" strokeWidth={2.4} aria-hidden="true" />
          )}
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
