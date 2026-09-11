import { useTranslation } from 'react-i18next'

const AVATARS = [
  { initials: 'AK', tone: 'bg-primary' },
  { initials: 'MR', tone: 'bg-secondary' },
  { initials: 'NS', tone: 'bg-neutral' },
]

// Foydalanuvchilar soni — "10,000" ko'rinishida (ming ajratkichi bilan)
// oldindan formatlab beramiz, chunki loyihada i18next number-formatting
// sozlanmagan va {{count}} xom raqam sifatida chiqib ketardi.
const TRUST_USER_COUNT = (10_000).toLocaleString('en-US')

export function TrustBadge() {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-3">
      <div className="flex -space-x-2">
        {AVATARS.map(({ initials, tone }) => (
          <span
            key={initials}
            aria-hidden="true"
            className={`${tone} ring-surface flex size-8 items-center justify-center rounded-full text-[11px] font-bold text-white ring-2`}
          >
            {initials}
          </span>
        ))}
      </div>
      <p className="text-body text-sm">{t('hero.trustBadge', { count: TRUST_USER_COUNT })}</p>
    </div>
  )
}
