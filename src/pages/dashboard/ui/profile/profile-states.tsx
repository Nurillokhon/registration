import { CloudAlert, RefreshCw } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'

/** Birinchi yuklanish paytidagi skelet — yakuniy layout bilan bir xil to'r. */
export function ProfileSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="mt-8 grid animate-pulse items-start gap-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] xl:gap-8"
    >
      <div className="bg-surface shadow-card border-line overflow-hidden rounded-3xl border">
        <div className="bg-surface-muted h-36" />
        <div className="space-y-4 p-7">
          <div className="bg-surface-muted mx-auto h-5 w-3/4 rounded" />
          <div className="bg-surface-muted mx-auto h-5 w-1/2 rounded" />
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className="bg-surface-muted h-12 rounded-xl" />
          ))}
        </div>
      </div>
      <div className="bg-surface shadow-card border-line rounded-3xl border p-8">
        <div className="bg-surface-muted h-6 w-1/3 rounded" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="bg-surface-muted h-14 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function ProfileErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useTranslation()

  return (
    <div
      role="alert"
      className="bg-surface shadow-card border-line mt-8 flex flex-col items-center rounded-3xl border px-6 py-14 text-center"
    >
      <span className="bg-danger/10 text-danger flex size-14 items-center justify-center rounded-2xl">
        <CloudAlert className="size-7" strokeWidth={2} aria-hidden="true" />
      </span>
      <h2 className="text-heading mt-5 text-[18px] font-bold">{t('dashboard.profile.loadError.title')}</h2>
      <p className="text-body mt-2 max-w-sm text-[14px]">{t('dashboard.profile.loadError.text')}</p>
      <Button variant="soft" onClick={onRetry} className="mt-6">
        <RefreshCw className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
        {t('dashboard.profile.loadError.retry')}
      </Button>
    </div>
  )
}
