import { FilePlus2, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router'
import { useCertificates } from '@/entities/certificate'
import { ROUTES } from '@/shared/config'
import { cn } from '@/shared/lib/cn'
import { useDebouncedValue } from '@/shared/lib/debounce'
import { buttonVariants, Pagination } from '@/shared/ui'
import { CertificatesEmptyState, CertificatesSkeleton } from './certificates/certificates-states'
import { CertificatesTable } from './certificates/certificates-table'
import { DashboardPageHeader } from './dashboard-page-header'
import { LoadErrorState } from './load-error-state'

const PAGE_SIZE = 10
const SEARCH_DEBOUNCE_MS = 400

export function DashboardCertificatesPage() {
  const { t } = useTranslation()
  // Sahifa va qidiruv URL'da saqlanadi — detal sahifasidan "ortga" qaytilganda joy yo'qolmaydi
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number(searchParams.get('page')) || 1)
  const query = searchParams.get('q') ?? ''
  const [searchInput, setSearchInput] = useState(query)
  const debouncedSearch = useDebouncedValue(searchInput.trim(), SEARCH_DEBOUNCE_MS)

  useEffect(() => {
    if (debouncedSearch === query) return

    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        if (debouncedSearch) next.set('q', debouncedSearch)
        else next.delete('q')
        // Yangi qidiruv natijalari birinchi sahifadan boshlanadi
        next.delete('page')
        return next
      },
      { replace: true },
    )
  }, [debouncedSearch, query, setSearchParams])

  const { certificates, count, isLoading, isFetching, isError, refetch } = useCertificates({
    search: query || undefined,
    page,
    page_size: PAGE_SIZE,
  })
  const totalPages = Math.ceil(count / PAGE_SIZE)

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
          retry={{ label: t('dashboard.certificates.loadError.retry'), onRetry: () => refetch() }}
        />
      )
    }

    if (certificates.length === 0) return <CertificatesEmptyState hasQuery={Boolean(query)} />

    return (
      <div className="bg-surface shadow-card border-line overflow-hidden rounded-3xl border">
        <div className={cn('transition-opacity', isFetching && 'opacity-60')}>
          <CertificatesTable certificates={certificates} />
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
    <div className="mx-auto max-w-7xl">
      <DashboardPageHeader
        title={t('dashboard.pages.certificates.title')}
        subtitle={t('dashboard.certificates.subtitle')}
        actions={
          <Link to={ROUTES.newApplication} className={buttonVariants()}>
            <FilePlus2 className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
            {t('dashboard.certificates.newApplication')}
          </Link>
        }
      />

      <div
        data-field-control
        className="bg-surface border-line focus-within:ring-primary mt-8 flex h-12 items-center gap-3 rounded-xl border px-4 focus-within:ring-2 sm:max-w-md"
      >
        <Search className="text-neutral size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
        <input
          type="search"
          aria-label={t('dashboard.certificates.searchLabel')}
          placeholder={t('dashboard.certificates.searchPlaceholder')}
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="text-heading placeholder:text-neutral/70 h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none"
        />
      </div>

      <div className="mt-6">{renderContent()}</div>
    </div>
  )
}
