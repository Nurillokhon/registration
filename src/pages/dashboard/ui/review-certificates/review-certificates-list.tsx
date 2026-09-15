import { FileText, Search, SearchX } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router'
import { useCertificates } from '@/entities/certificate'
import { cn } from '@/shared/lib/cn'
import { useDebouncedValue } from '@/shared/lib/debounce'
import { Pagination } from '@/shared/ui'
import { CertificatesSkeleton } from '../certificates/certificates-states'
import { LoadErrorState } from '../load-error-state'
import { parseCertificateStatusTab, type CertificateStatusTab } from './certificate-status-tab'
import { CertificateStatusTabs } from './certificate-status-tabs'
import { ReviewCertificatesTable } from './review-certificates-table'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

function ReviewCertificatesEmptyState({ hasQuery }: { hasQuery: boolean }) {
  const { t } = useTranslation()
  const Icon = hasQuery ? SearchX : FileText

  return (
    <div className="bg-surface shadow-card border-line flex flex-col items-center rounded-3xl border px-6 py-14 text-center">
      <span className="bg-primary-soft text-primary flex size-14 items-center justify-center rounded-2xl">
        <Icon className="size-7" strokeWidth={2} aria-hidden="true" />
      </span>
      <h2 className="text-heading mt-5 text-[18px] font-bold">
        {hasQuery
          ? t('dashboard.certificates.noResults.title')
          : t('dashboard.reviewCertificates.empty.title')}
      </h2>
      <p className="text-body mt-2 max-w-sm text-[14px]">
        {hasQuery
          ? t('dashboard.certificates.noResults.text')
          : t('dashboard.reviewCertificates.empty.text')}
      </p>
    </div>
  )
}

type ReviewCertificatesListProps = {
  getDetailPath: (id: number) => string
  /** Berilsa — faqat shu ekspertga tegishli sertifikatlar so'raladi */
  expertId?: number
  counts?: Partial<Record<CertificateStatusTab, number>>
  showExpert?: boolean
}

/**
 * GET /main/certificates/ ro'yxati: holat tablari, qidiruv va sahifalash.
 * Qaysi sertifikatlar kelishini backend rolga qarab o'zi cheklaydi
 * (admin — barcha to'langanlar, ekspert — o'z tili va turi bo'yicha).
 */
export function ReviewCertificatesList({
  getDetailPath,
  expertId,
  counts,
  showExpert,
}: ReviewCertificatesListProps) {
  const { t } = useTranslation()
  // Tab, sahifa va qidiruv URL'da saqlanadi — detal sahifasidan qaytilganda joy yo'qolmaydi
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const query = searchParams.get('q') ?? ''
  const tab = parseCertificateStatusTab(searchParams.get('status'))
  const [searchInput, setSearchInput] = useState(query)
  const debouncedSearch = useDebouncedValue(searchInput.trim(), SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    if (debouncedSearch === query) return

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debouncedSearch) next.set('q', debouncedSearch)
        else next.delete('q')
        next.delete('page')
        return next
      },
      { replace: true },
    )
  }, [debouncedSearch, query, setSearchParams])

  const { certificates, count, isLoading, isFetching, isError, refetch } = useCertificates({
    expert: expertId,
    status: tab === 'all' ? undefined : tab,
    search: query || undefined,
    page,
    page_size: PAGE_SIZE,
  })
  const totalPages = Math.ceil(count / PAGE_SIZE)

  const changeTab = (nextTab: CertificateStatusTab) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (nextTab === 'all') next.delete('status')
        else next.set('status', nextTab)
        // Boshqa holatning natijalari birinchi sahifadan boshlanadi
        next.delete('page')
        return next
      },
      { replace: true },
    )
  }

  const goToPage = (nextPage: number) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('page', String(nextPage))
      return next
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderContent = () => {
    if (isLoading) return <CertificatesSkeleton />

    if (isError && certificates.length === 0) {
      return (
        <LoadErrorState
          title={t('dashboard.certificates.loadError.title')}
          text={t('dashboard.certificates.loadError.text')}
          retry={{
            label: t('dashboard.certificates.loadError.retry'),
            onRetry: () => refetch(),
          }}
        />
      )
    }

    if (certificates.length === 0) return <ReviewCertificatesEmptyState hasQuery={Boolean(query)} />

    return (
      <div className="bg-surface shadow-card border-line overflow-hidden rounded-3xl border">
        <div className={cn('transition-opacity', isFetching && 'opacity-60')}>
          <ReviewCertificatesTable
            certificates={certificates}
            getDetailPath={getDetailPath}
            showExpert={showExpert}
          />
        </div>
        {totalPages > 1 && (
          <div className="border-line border-t px-5 py-4">
            <Pagination page={page} totalPages={totalPages} onChange={goToPage} />
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <CertificateStatusTabs value={tab} onChange={changeTab} counts={counts} />

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          data-field-control
          className="bg-surface border-line focus-within:ring-primary flex h-12 items-center gap-3 rounded-xl border px-4 focus-within:ring-2 sm:w-full sm:max-w-md"
        >
          <Search className="text-neutral size-4.5 shrink-0" strokeWidth={2} aria-hidden="true" />
          <input
            type="search"
            aria-label={t('dashboard.reviewCertificates.searchLabel')}
            placeholder={t('dashboard.reviewCertificates.searchPlaceholder')}
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            className="text-heading placeholder:text-neutral/70 h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none"
          />
        </div>
        {!isLoading && count > 0 && (
          <p className="text-body text-[14px] tabular-nums">
            {t('dashboard.reviewCertificates.count', { count })}
          </p>
        )}
      </div>

      <div className="mt-6">{renderContent()}</div>
    </>
  )
}
