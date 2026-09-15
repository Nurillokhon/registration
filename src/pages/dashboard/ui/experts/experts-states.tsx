import { SearchX, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function ExpertsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-surface shadow-card border-line animate-pulse overflow-hidden rounded-3xl border"
    >
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="border-line flex items-center gap-4 border-b px-5 py-5 last:border-b-0"
        >
          <div className="bg-surface-muted size-10 shrink-0 rounded-full" />
          <div className="bg-surface-muted h-4 w-40 rounded" />
          <div className="bg-surface-muted hidden h-4 flex-1 rounded sm:block" />
          <div className="bg-surface-muted ml-auto h-6 w-16 rounded-full" />
        </div>
      ))}
    </div>
  )
}

/** Ekspert umuman yo'q yoki qidiruv natija bermagan holat. */
export function ExpertsEmptyState({ hasQuery }: { hasQuery: boolean }) {
  const { t } = useTranslation()
  const Icon = hasQuery ? SearchX : Users

  return (
    <div className="bg-surface shadow-card border-line flex flex-col items-center rounded-3xl border px-6 py-14 text-center">
      <span className="bg-primary-soft text-primary flex size-14 items-center justify-center rounded-2xl">
        <Icon className="size-7" strokeWidth={2} aria-hidden="true" />
      </span>
      <h2 className="text-heading mt-5 text-[18px] font-bold">
        {hasQuery ? t('dashboard.experts.noResults.title') : t('dashboard.experts.empty.title')}
      </h2>
      <p className="text-body mt-2 max-w-sm text-[14px]">
        {hasQuery ? t('dashboard.experts.noResults.text') : t('dashboard.experts.empty.text')}
      </p>
    </div>
  )
}
