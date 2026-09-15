import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'

type PaginationProps = {
  /** 1 dan boshlanadi */
  page: number
  totalPages: number
  onChange: (page: number) => void
  className?: string
}

const BUTTON_CLASS_NAME =
  'border-line text-heading hover:bg-surface-muted inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-[14px] font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50'

/** Oldingi/keyingi tugmalari va "2 / 10" ko'rsatkichi. Bitta sahifa bo'lsa chizilmaydi. */
export function Pagination({ page, totalPages, onChange, className }: PaginationProps) {
  const { t } = useTranslation()

  if (totalPages <= 1) return null

  return (
    <nav
      aria-label={t('common.pagination.label')}
      className={cn('flex items-center justify-between gap-3', className)}
    >
      <button
        type="button"
        className={BUTTON_CLASS_NAME}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
      >
        <ChevronLeft className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
        {t('common.pagination.previous')}
      </button>
      <p className="text-body text-[14px] tabular-nums" aria-live="polite">
        {t('common.pagination.pageOf', { page, total: totalPages })}
      </p>
      <button
        type="button"
        className={BUTTON_CLASS_NAME}
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        {t('common.pagination.next')}
        <ChevronRight className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
      </button>
    </nav>
  )
}
