import { CircleCheck, Clock } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'

export function CertificatePaymentBadge({ isPaid }: { isPaid: boolean }) {
  const { t } = useTranslation()
  const Icon = isPaid ? CircleCheck : Clock

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-semibold whitespace-nowrap',
        isPaid ? 'bg-primary-soft text-primary' : 'bg-surface-muted text-body',
      )}
    >
      <Icon className="size-3.5 shrink-0" strokeWidth={2.4} aria-hidden="true" />
      {isPaid ? t('dashboard.certificates.paid') : t('dashboard.certificates.unpaid')}
    </span>
  )
}
