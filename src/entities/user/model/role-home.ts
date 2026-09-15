import { ROUTES } from '@/shared/config'
import type { UserRole } from './types'

// Har bir rolning kirgandan keyingi birinchi sahifasi — sidebar menyusidagi
// birinchi band (widgets/dashboard-layout/model/menu.ts) va router ruxsatlari
// (app/providers/router-provider.tsx) bilan mos bo'lishi kerak.
const ROLE_HOME_ROUTES: Record<UserRole, string> = {
  candidate: ROUTES.certificates,
  expert: ROUTES.dashboard,
  admin: ROUTES.dashboard,
}

/** Rolga ruxsat berilgan bosh sahifa yo'li. */
export function getRoleHomeRoute(role: UserRole): string {
  return ROLE_HOME_ROUTES[role]
}
