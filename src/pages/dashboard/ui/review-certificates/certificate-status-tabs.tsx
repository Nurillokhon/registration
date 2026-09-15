import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'
import { CERTIFICATE_STATUS_TABS, type CertificateStatusTab } from './certificate-status-tab'

type CertificateStatusTabsProps = {
  value: CertificateStatusTab
  onChange: (value: CertificateStatusTab) => void
  /** Tab yonidagi son (masalan ekspert statistikasidan); berilmagan tabda son chiqmaydi */
  counts?: Partial<Record<CertificateStatusTab, number>>
}

export function CertificateStatusTabs({ value, onChange, counts }: CertificateStatusTabsProps) {
  const { t } = useTranslation()

  return (
    <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {CERTIFICATE_STATUS_TABS.map((tab) => {
        const isActive = tab.value === value
        const count = counts?.[tab.value]

        return (
          <button
            key={tab.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              'inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-[14px] font-semibold transition-colors',
              isActive
                ? 'border-primary bg-primary-soft text-primary'
                : 'border-line bg-surface text-body hover:bg-surface-muted hover:text-heading',
            )}
          >
            {t(tab.labelKey)}
            {count !== undefined && (
              <span
                className={cn(
                  'rounded-full px-2 py-0.5 text-[12px] font-bold tabular-nums',
                  isActive ? 'bg-primary text-on-primary' : 'bg-surface-muted text-body',
                )}
              >
                {count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
