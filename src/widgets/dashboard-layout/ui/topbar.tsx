import { Bell, Menu, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CurrentUser } from '@/entities/user'
import { LanguageSwitcher, ThemeSwitcher } from '@/shared/ui'
import { UserChip } from './user-chip'

type TopbarProps = {
  user: CurrentUser | null
  onOpenSidebar: () => void
}

/** Yuqori panel: mobil hamburger, qidiruv (hozircha funksiyasiz), til/mavzu almashtirgichlar, bildirishnoma va foydalanuvchi chipi. */
export function Topbar({ user, onOpenSidebar }: TopbarProps) {
  const { t } = useTranslation()

  return (
    <header className="border-line bg-surface sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label={t('dashboard.topbar.openMenu')}
        className="text-heading hover:bg-surface-muted flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors lg:hidden"
      >
        <Menu className="size-5" strokeWidth={2} aria-hidden="true" />
      </button>

      <div className="bg-surface-muted flex h-10 min-w-0 max-w-md flex-1 items-center gap-2 rounded-lg px-3">
        <Search className="text-neutral size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
        <input
          type="search"
          aria-label={t('dashboard.topbar.searchPlaceholder')}
          placeholder={t('dashboard.topbar.searchPlaceholder')}
          className="text-heading placeholder:text-neutral/70 h-full min-w-0 flex-1 bg-transparent text-[13.5px] outline-none"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <button
          type="button"
          aria-label={t('dashboard.topbar.notifications')}
          className="text-heading hover:bg-surface-muted flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
        >
          <Bell className="size-[18px]" strokeWidth={2} aria-hidden="true" />
        </button>
        <div className="border-line ml-1 border-l pl-2.5 sm:pl-3">
          <UserChip user={user} />
        </div>
      </div>
    </header>
  )
}
