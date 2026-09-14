import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router'
import { cn } from '@/shared/lib/cn'
import type { DashboardMenuItem } from '../model/menu'

type SidebarNavSectionProps = {
  titleKey: 'dashboard.nav.sections.main' | 'dashboard.nav.sections.settings'
  items: DashboardMenuItem[]
  onNavigate?: () => void
}

/** Bo'lim sarlavhasi + bandlar ro'yxati; faol band NavLink orqali avtomatik ajratiladi. */
export function SidebarNavSection({ titleKey, items, onNavigate }: SidebarNavSectionProps) {
  const { t } = useTranslation()

  if (items.length === 0) return null

  return (
    <div>
      <p className="text-neutral px-3 text-[11px] font-bold tracking-[0.08em] uppercase">
        {t(titleKey)}
      </p>
      <ul className="mt-2 space-y-1">
        {items.map(({ key, to, end, icon: Icon, labelKey, badgeCount }) => (
          <li key={key}>
            <NavLink
              to={to}
              end={end}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors',
                  isActive
                    ? 'bg-primary-soft text-primary'
                    : 'text-body hover:bg-surface-muted hover:text-heading',
                )
              }
            >
              <Icon className="size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate">{t(labelKey)}</span>
              {/* Hisoblagich manbai hali yo'q — badgeCount hech qayerda
                  to'ldirilmagani uchun bu blok amalda hech qachon chiqmaydi,
                  lekin turi tayyor turibdi. */}
              {badgeCount !== undefined && (
                <span className="bg-primary text-on-primary rounded-full px-2 py-0.5 text-[11px] font-bold">
                  {badgeCount}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}
