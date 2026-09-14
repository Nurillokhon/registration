import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet, useLocation } from 'react-router'
import { useCurrentUser } from '@/entities/user'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'

/**
 * Dashboard qobig'i: desktop'da doim ko'ringan yon panel, mobil'da esa
 * hamburger orqali ochiladigan drawer. Sahifa mazmuni <Outlet /> orqali keladi.
 */
export function DashboardLayout() {
  const { user, role } = useCurrentUser()
  const { t } = useTranslation()
  const location = useLocation()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  // Effect ichida setState chaqirish o'rniga render paytida moslashtirish
  // (React'ning tavsiya qilgan "adjust state during render" naqshi) —
  // shunda marshrut o'zgarganda drawer qo'shimcha effekt-render bosqichisiz,
  // xuddi shu renderning o'zida yopiq holatga qaytadi.
  const [lastPathname, setLastPathname] = useState(location.pathname)
  if (location.pathname !== lastPathname) {
    setLastPathname(location.pathname)
    setIsDrawerOpen(false)
  }

  // Escape bosilganda ham drawer yopilishi kerak (overlay bosilgandagi kabi).
  useEffect(() => {
    if (!isDrawerOpen) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsDrawerOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isDrawerOpen])

  return (
    <div className="bg-surface-shell min-h-svh lg:flex">
      {/* Desktop (lg+): sidebar kontent yonida, fiksirlangan. */}
      <aside className="border-line bg-surface fixed inset-y-0 left-0 z-30 hidden w-72 border-r lg:block">
        <Sidebar role={role} />
      </aside>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* bg-surface-shell/xx + blur — SiteHeader'dagi shisha-effekt bilan
              bir xil naqsh: hardcoded qora rang o'rniga tema tokenidan olingan
              yarim-shaffof qatlam, shu tufayl light/dark ikkalasida ham
              mos (light'da xira, dark'da to'q) ko'rinishda ishlaydi. */}
          <button
            type="button"
            aria-label={t('dashboard.topbar.closeMenu')}
            onClick={() => setIsDrawerOpen(false)}
            className="bg-surface-shell/70 absolute inset-0 backdrop-blur-sm"
          />
          <aside className="bg-surface shadow-panel relative z-10 flex h-full w-72 max-w-[85vw] flex-col">
            <Sidebar role={role} onNavigate={() => setIsDrawerOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-72">
        <Topbar user={user} onOpenSidebar={() => setIsDrawerOpen(true)} />
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
