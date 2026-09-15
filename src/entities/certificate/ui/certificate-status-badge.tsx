import type { TFunction } from 'i18next'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'
import { getStatusTone, normalizeStatus, type StatusTone } from '../model/certificate'

const TONE_CLASS_NAMES: Record<StatusTone, string> = {
  info: 'bg-secondary/10 text-secondary',
  success: 'bg-primary-soft text-primary',
  warning: 'bg-gold/15 text-heading',
  danger: 'bg-danger/10 text-danger',
  neutral: 'bg-surface-muted text-body',
}

const DOT_CLASS_NAMES: Record<StatusTone, string> = {
  info: 'bg-secondary',
  success: 'bg-primary',
  warning: 'bg-gold',
  danger: 'bg-danger',
  neutral: 'bg-neutral',
}

// Ma'lum kodlar tarjima qilinadi, qolgani backend qaytargan matnicha ko'rsatiladi
function getStatusLabel(status: string | null | undefined, t: TFunction) {
  const normalized = normalizeStatus(status)

  if (normalized === 'NEW') return t('dashboard.certificates.status.new')
  if (normalized === 'PROBLEM') return t('dashboard.certificates.status.problem')
  return status?.trim() || t('dashboard.certificates.status.unknown')
}

type CertificateStatusBadgeProps = {
  status: string | null | undefined
  className?: string
}

export function CertificateStatusBadge({ status, className }: CertificateStatusBadgeProps) {
  const { t } = useTranslation()
  const tone = getStatusTone(status)

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap',
        TONE_CLASS_NAMES[tone],
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', DOT_CLASS_NAMES[tone])} aria-hidden="true" />
      {getStatusLabel(status, t)}
    </span>
  )
}
