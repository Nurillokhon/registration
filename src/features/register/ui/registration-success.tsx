import { CircleCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import { ROUTES } from '@/shared/config'
import { buttonVariants, FormHeader } from '@/shared/ui'

export function RegistrationSuccess() {
  const { t } = useTranslation()

  return (
    <div>
      <span className="bg-primary-soft mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl">
        <CircleCheck className="text-primary size-8" strokeWidth={2.2} aria-hidden="true" />
      </span>
      <FormHeader title={t('register.success.title')} subtitle={t('register.success.text')} />
      <Link to={ROUTES.home} className={buttonVariants({ size: 'lg', className: 'mt-10 w-full' })}>
        {t('register.success.cta')}
      </Link>
    </div>
  )
}
