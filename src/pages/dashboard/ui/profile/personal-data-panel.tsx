import { Check, Info, Lock } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { getGender, type UserProfile } from '@/entities/user'
import { PanelHeader } from './panel-header'

/** "Shaxsiy ma'lumotlar" tabi: reestrdan kelgan, tahrirlab bo'lmaydigan maydonlar. */
export function PersonalDataPanel({ profile }: { profile: UserProfile }) {
  const { t } = useTranslation()
  const gender = getGender(profile.sex)

  // Backend qaytarmagan maydonlar ("—" bilan to'ldirilmasdan) tushirib qoldiriladi
  const fields = [
    { key: 'firstName', label: t('dashboard.profile.personal.fields.firstName'), value: profile.fname },
    { key: 'middleName', label: t('dashboard.profile.personal.fields.middleName'), value: profile.mname },
    { key: 'lastName', label: t('dashboard.profile.personal.fields.lastName'), value: profile.sname },
    {
      key: 'nationality',
      label: t('dashboard.profile.personal.fields.nationality'),
      value: profile.nationality,
    },
    {
      key: 'gender',
      label: t('dashboard.profile.personal.fields.gender'),
      value: gender ? t(`dashboard.profile.gender.${gender}`) : profile.sex,
    },
    {
      key: 'birthCountry',
      label: t('dashboard.profile.personal.fields.birthCountry'),
      value: profile.birth_country,
    },
    { key: 'passport', label: t('dashboard.profile.personal.fields.passport'), value: profile.passport },
  ].filter((field) => field.value)

  return (
    <div>
      <PanelHeader
        title={t('dashboard.profile.personal.title')}
        subtitle={t('dashboard.profile.personal.subtitle')}
        aside={
          <span className="bg-surface-muted text-heading inline-flex shrink-0 items-center gap-2 self-start rounded-lg px-3 py-1.5 text-[13.5px] font-medium">
            <Lock className="size-4" strokeWidth={2} aria-hidden="true" />
            {t('dashboard.profile.personal.protected')}
          </span>
        }
      />

      <dl className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {fields.map(({ key, label, value }) => (
          <div key={key}>
            <dt className="text-neutral text-[12.5px] font-bold tracking-[0.08em] uppercase">{label}</dt>
            <dd className="border-line bg-surface-sky mt-2.5 flex h-14 items-center gap-3 rounded-xl border px-4">
              <span className="text-heading min-w-0 flex-1 truncate text-[15.5px] font-medium uppercase">
                {value}
              </span>
              <Check className="text-primary size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
            </dd>
          </div>
        ))}
      </dl>

      <div className="border-line bg-surface-sky mt-10 flex gap-4 rounded-2xl border p-5 sm:p-6">
        <span className="bg-gold/10 text-gold ring-gold/30 flex size-9 shrink-0 items-center justify-center rounded-lg ring-1">
          <Info className="size-[18px]" strokeWidth={2.2} aria-hidden="true" />
        </span>
        <div className="min-w-0">
          <p className="text-heading text-[14.5px] font-bold">
            {t('dashboard.profile.personal.noteTitle')}
          </p>
          <p className="text-body mt-1.5 text-[14px] leading-[1.75]">
            <Trans
              i18nKey="dashboard.profile.personal.note"
              components={{ b: <strong className="text-heading font-semibold" /> }}
            />
          </p>
        </div>
      </div>
    </div>
  )
}
