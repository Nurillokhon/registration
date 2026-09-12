import { CircleCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'
import { PASSWORD_RULES } from '../model/validation'

/** Parol talablari — har bir shart parol yozilayotgan paytda jonli belgilanadi. */
export function PasswordRequirements({ password }: { password: string }) {
  const { t } = useTranslation()

  return (
    <div className="bg-surface-muted rounded-xl p-4">
      <p className="text-heading text-[11px] font-bold tracking-[0.08em] uppercase">
        {t('register.account.requirements.title')}
      </p>
      <ul className="mt-2.5 grid gap-2 sm:grid-cols-2">
        {PASSWORD_RULES.map(({ id, labelKey, test }) => {
          const isMet = test(password)

          return (
            <li
              key={id}
              className={cn(
                'flex items-center gap-2 text-[12px] transition-colors',
                isMet ? 'text-heading' : 'text-body',
              )}
            >
              <CircleCheck
                className={cn('size-3.5 shrink-0', isMet ? 'text-primary' : 'text-neutral/60')}
                strokeWidth={2.2}
                aria-hidden="true"
              />
              {t(labelKey)}
              {/* Holat faqat rang bilan emas, ekran o'quvchi uchun matn bilan ham beriladi */}
              <span className="sr-only">
                {isMet
                  ? t('register.account.requirements.met')
                  : t('register.account.requirements.notMet')}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
