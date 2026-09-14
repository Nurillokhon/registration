import {
  BarChart3,
  ClipboardList,
  FileCheck2,
  FilePlus2,
  History,
  LayoutDashboard,
  ListChecks,
  Users,
  UserRound,
  type LucideIcon,
} from 'lucide-react'
import type { UserRole } from '@/entities/user'
import { ROUTES } from '@/shared/config'

// Har bir menyu bandi uchun literal tarjima kaliti — dinamik shablon-string
// o'rniga aniq union, shunda typed t() compile-time'da noto'g'ri kalitni
// ushlab qoladi (ThemeSwitcher'dagi bir xil naqsh).
type NavItemKey =
  | 'dashboard'
  | 'certificates'
  | 'newApplication'
  | 'applications'
  | 'reviews'
  | 'experts'
  | 'forms'
  | 'analytics'
  | 'profile'

export type DashboardMenuItem = {
  key: NavItemKey
  to: string
  /** Faqat /dashboard indeks bandi uchun — bola marshrutlarda faol bo'lib qolmasin. */
  end?: boolean
  icon: LucideIcon
  labelKey: `dashboard.nav.items.${NavItemKey}`
  // Hozircha hisoblagich ma'lumot manbai yo'q, shuning uchun bu maydon hech
  // qayerda to'ldirilmaydi — faqat kelajakda badge qo'shish uchun tayyor joy.
  badgeCount?: number
}

const NAV_ITEM_CONFIG: Record<NavItemKey, Omit<DashboardMenuItem, 'key' | 'labelKey'>> = {
  dashboard: { to: ROUTES.dashboard, end: true, icon: LayoutDashboard },
  certificates: { to: ROUTES.dashboardCertificates, icon: FileCheck2 },
  newApplication: { to: ROUTES.dashboardApplicationsNew, icon: FilePlus2 },
  applications: { to: ROUTES.dashboardApplications, icon: ClipboardList },
  reviews: { to: ROUTES.dashboardReviews, icon: History },
  experts: { to: ROUTES.dashboardExperts, icon: Users },
  forms: { to: ROUTES.dashboardForms, icon: ListChecks },
  analytics: { to: ROUTES.dashboardAnalytics, icon: BarChart3 },
  profile: { to: ROUTES.dashboardProfile, icon: UserRound },
}

function buildItem(key: NavItemKey): DashboardMenuItem {
  return { key, labelKey: `dashboard.nav.items.${key}`, ...NAV_ITEM_CONFIG[key] }
}

// Har bir rol uchun "ASOSIY BO'LIMLAR" bo'limidagi bandlar tartib bilan.
const ROLE_MAIN_ITEM_KEYS: Record<UserRole, readonly NavItemKey[]> = {
  candidate: ['dashboard', 'certificates', 'newApplication'],
  expert: ['dashboard', 'applications', 'reviews'],
  admin: ['dashboard', 'experts', 'applications', 'forms'],
}

// "TAHLIL & SOZLAMALAR" bo'limi — faqat admin'da Tahlil va Hisobotlar qo'shiladi.
const ROLE_SETTINGS_ITEM_KEYS: Record<UserRole, readonly NavItemKey[]> = {
  candidate: ['profile'],
  expert: ['profile'],
  admin: ['analytics', 'profile'],
}

export type DashboardMenu = {
  main: DashboardMenuItem[]
  settings: DashboardMenuItem[]
}

/** Berilgan rol uchun sidebar bandlarini (bo'limlarga ajratilgan) qaytaradi. */
export function getDashboardMenu(role: UserRole): DashboardMenu {
  return {
    main: ROLE_MAIN_ITEM_KEYS[role].map(buildItem),
    settings: ROLE_SETTINGS_ITEM_KEYS[role].map(buildItem),
  }
}
