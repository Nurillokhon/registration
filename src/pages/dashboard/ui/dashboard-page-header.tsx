import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'

type DashboardPageHeaderProps = {
  title: string
  subtitle?: string
  /** Sarlavha ustidagi "ortga" havolasi */
  back?: { to: string; label: string }
  /** O'ng tomondagi tugmalar (desktop'da), mobil'da sarlavha ostida */
  actions?: ReactNode
}

export function DashboardPageHeader({ title, subtitle, back, actions }: DashboardPageHeaderProps) {
  return (
    <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        {back && (
          <Link
            to={back.to}
            className="text-body hover:text-heading mb-3 flex w-fit items-center gap-2 text-[13.5px] font-semibold transition-colors"
          >
            <ArrowLeft className="size-4 shrink-0" strokeWidth={2.4} aria-hidden="true" />
            {back.label}
          </Link>
        )}
        <h1 className="text-heading text-[26px] leading-tight font-extrabold tracking-tight break-words sm:text-[32px]">
          {title}
        </h1>
        {subtitle && <p className="text-body mt-1.5 text-[14px] sm:text-[15px]">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </header>
  )
}
