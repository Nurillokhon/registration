import type { UserRole } from '@/entities/user'
import { getDashboardMenu } from '../model/menu'
import { SidebarBrand } from './sidebar-brand'
import { SidebarFooter } from './sidebar-footer'
import { SidebarNavSection } from './sidebar-nav-section'
import { SidebarRoleBadge } from './sidebar-role-badge'

type SidebarProps = {
  role: UserRole | null
  /** Mobil drawer'da band bosilganda drawer'ni yopish uchun. */
  onNavigate?: () => void
}

/** Sidebar mazmuni: brend, rol belgisi, menyu bo'limlari va pastki blok. Desktop va mobil drawer'da bir xil ishlatiladi. */
export function Sidebar({ role, onNavigate }: SidebarProps) {
  // Rol hali aniqlanmagan (yuklanmoqda yoki foydalanuvchi yo'q) bo'lsa, hech
  // qanday rolga tegishli bo'lmagan menyu ko'rsatilmaydi — noto'g'ri rol
  // bandlarini bir zumga chaqirib ko'rsatishning oldi olinadi.
  const menu = role ? getDashboardMenu(role) : null

  return (
    <div className="flex h-full flex-col gap-6 overflow-y-auto p-4">
      <SidebarBrand />
      <SidebarRoleBadge role={role} />

      {menu && (
        <nav className="flex flex-1 flex-col gap-6">
          <SidebarNavSection
            titleKey="dashboard.nav.sections.main"
            items={menu.main}
            onNavigate={onNavigate}
          />
          <SidebarNavSection
            titleKey="dashboard.nav.sections.settings"
            items={menu.settings}
            onNavigate={onNavigate}
          />
        </nav>
      )}

      <SidebarFooter />
    </div>
  )
}
