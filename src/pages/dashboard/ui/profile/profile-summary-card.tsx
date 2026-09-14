import {
  CalendarDays,
  Check,
  CircleCheck,
  IdCard,
  MapPin,
  Phone,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { useTranslation } from 'react-i18next'
import { getInitials, getPhotoSrc, type UserProfile } from '@/entities/user'
import { cn } from '@/shared/lib/cn'
import { formatUzPhone } from '@/shared/lib/phone'

// Muqova ustidagi nuqtali naqsh — rang tokendan olinadi, dark rejimda ham mos keladi.
const COVER_PATTERN: CSSProperties = {
  backgroundImage:
    'radial-gradient(color-mix(in srgb, var(--color-on-primary) 16%, transparent) 1px, transparent 1px)',
  backgroundSize: '16px 16px',
}

type DetailRow = {
  key: string
  icon: LucideIcon
  label: string
  value: string | undefined
  isNumeric?: boolean
}

/** Chap ustun: avatar, to'liq ism va asosiy shaxsiy rekvizitlar. */
export function ProfileSummaryCard({ profile }: { profile: UserProfile }) {
  const { t } = useTranslation()
  const [hasPhotoError, setHasPhotoError] = useState(false)
  const photoSrc = hasPhotoError ? null : getPhotoSrc(profile.photo)
  const initials = getInitials(profile.full_name)

  // Backend qaytarmagan maydonlar qatori umuman ko'rsatilmaydi
  const details = (
    [
      {
        key: 'phone',
        icon: Phone,
        label: t('dashboard.profile.summary.phone'),
        value: profile.phone && formatUzPhone(profile.phone),
      },
      {
        key: 'birthDate',
        icon: CalendarDays,
        label: t('dashboard.profile.summary.birthDate'),
        value: profile.birth_date,
      },
      {
        key: 'birthPlace',
        icon: MapPin,
        label: t('dashboard.profile.summary.birthPlace'),
        value: profile.birth_place,
      },
      {
        key: 'pnfl',
        icon: IdCard,
        label: t('dashboard.profile.summary.pnfl'),
        value: profile.pnfl ? String(profile.pnfl) : undefined,
        isNumeric: true,
      },
    ] satisfies DetailRow[]
  ).filter((row) => row.value)

  return (
    <section className="bg-surface shadow-card border-line overflow-hidden rounded-3xl border">
      <div className="bg-primary h-32 sm:h-36" style={COVER_PATTERN} aria-hidden="true" />

      <div className="px-5 pb-6 sm:px-7 sm:pb-8">
        <div className="-mt-14 flex justify-center">
          <div className="bg-surface shadow-panel relative rounded-2xl p-1.5">
            <div className="bg-surface-muted text-primary flex size-28 items-center justify-center overflow-hidden rounded-xl text-[32px] font-extrabold">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={t('dashboard.profile.summary.photoAlt')}
                  onError={() => setHasPhotoError(true)}
                  className="size-full object-cover"
                />
              ) : (
                (initials ?? <UserRound className="size-10" strokeWidth={2} aria-hidden="true" />)
              )}
            </div>
            <span className="bg-primary text-on-primary ring-surface absolute -right-1.5 -bottom-1.5 flex size-8 items-center justify-center rounded-lg ring-4">
              <Check className="size-4" strokeWidth={3} aria-hidden="true" />
            </span>
          </div>
        </div>

        <h2 className="text-heading mt-6 text-center text-[18px] leading-snug font-extrabold uppercase sm:text-[19px]">
          {profile.full_name}
        </h2>
        <div className="mt-3 flex justify-center">
          <span className="bg-primary-soft text-primary ring-primary/25 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13.5px] font-semibold ring-1">
            <Check className="size-4" strokeWidth={2.6} aria-hidden="true" />
            {t('dashboard.profile.summary.verified')}
          </span>
        </div>

        {details.length > 0 && (
          <dl className="border-line mt-7 space-y-3 border-t pt-7">
            {details.map(({ key, icon: Icon, label, value, isNumeric }) => (
              <div
                key={key}
                className="border-line flex items-center gap-3 rounded-xl border px-4 py-3.5"
              >
                <dt className="text-body flex min-w-0 items-center gap-3 text-[14px]">
                  <Icon className="text-primary size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
                  {label}
                </dt>
                <dd
                  className={cn(
                    'text-heading ml-auto text-right text-[14px] font-bold',
                    isNumeric && 'tracking-wide tabular-nums',
                  )}
                >
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="bg-primary-soft/60 text-primary ring-primary/20 mt-7 flex gap-3 rounded-xl p-4 ring-1">
          <CircleCheck className="mt-0.5 size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
          <p className="text-[13.5px] leading-[1.65]">{t('dashboard.profile.summary.registryNote')}</p>
        </div>
      </div>
    </section>
  )
}
