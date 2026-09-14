import { ArrowRight, FileCheck2, FilePlus2, FileText, TriangleAlert, type LucideIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'
import type { UserProfile } from '@/entities/user'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib/cn'
import { buttonVariants } from '@/shared/ui'
import { PanelHeader } from './panel-header'

type StatKey = 'total' | 'new' | 'approved' | 'problem'

const STATS: ReadonlyArray<{
  key: StatKey
  field: keyof Pick<
    UserProfile,
    'my_certificates' | 'new_certificates' | 'approved_certificates' | 'problem_certificates'
  >
  icon: LucideIcon
  toneClassName: string
}> = [
  { key: 'total', field: 'my_certificates', icon: FileText, toneClassName: 'bg-primary-soft text-primary' },
  { key: 'new', field: 'new_certificates', icon: FilePlus2, toneClassName: 'bg-secondary/10 text-secondary' },
  {
    key: 'approved',
    field: 'approved_certificates',
    icon: FileCheck2,
    toneClassName: 'bg-primary-soft text-primary',
  },
  {
    key: 'problem',
    field: 'problem_certificates',
    icon: TriangleAlert,
    toneClassName: 'bg-danger/10 text-danger',
  },
]

/** "Mening sertifikatlarim" tabi: profil javobidagi sertifikat hisoblagichlari. */
export function CertificatesPanel({ profile }: { profile: UserProfile }) {
  const { t } = useTranslation()

  return (
    <div>
      <PanelHeader
        title={t('dashboard.profile.certificates.title')}
        subtitle={t('dashboard.profile.certificates.subtitle')}
      />

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {STATS.map(({ key, field, icon: Icon, toneClassName }) => (
          <li key={key} className="border-line bg-surface-sky flex items-center gap-4 rounded-2xl border p-5">
            <span className={cn('flex size-12 shrink-0 items-center justify-center rounded-xl', toneClassName)}>
              <Icon className="size-[22px]" strokeWidth={2} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-body text-[13.5px]">{t(`dashboard.profile.certificates.${key}`)}</p>
              <p className="text-heading mt-0.5 text-[26px] leading-tight font-extrabold tabular-nums">
                {/* Swagger'da string deb berilgan — son yoki bo'sh qiymat kelsa ham 0 ko'rsatiladi */}
                {Number(profile[field]) || 0}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <Link
        to={ROUTES.dashboardCertificates}
        className={buttonVariants({ variant: 'soft', className: 'mt-8' })}
      >
        {t('dashboard.profile.certificates.viewAll')}
        <ArrowRight className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
      </Link>
    </div>
  )
}
