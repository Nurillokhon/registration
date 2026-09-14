import { useTranslation } from 'react-i18next'
import type { UserRole } from '@/entities/user'

// ThemeSwitcher/LanguageSwitcher'dagi bir xil naqsh: dinamik shablon-string
// o'rniga aniq literal xarita, shunda typed t() compile-time'da tekshiraveradi.
const ROLE_LABEL_KEYS = {
  admin: 'dashboard.roleBadge.roles.admin',
  expert: 'dashboard.roleBadge.roles.expert',
  candidate: 'dashboard.roleBadge.roles.candidate',
} as const satisfies Record<UserRole, string>

type SidebarRoleBadgeProps = {
  role: UserRole | null
}

/** "Boshqaruv Holati:" bloki — joriy foydalanuvchi roli ADMIN/EKSPERT/NOMZOD ko'rinishida. */
export function SidebarRoleBadge({ role }: SidebarRoleBadgeProps) {
  const { t } = useTranslation()

  return (
    <div className="bg-surface-muted rounded-xl px-3.5 py-3">
      <p className="text-neutral text-[11px] font-semibold tracking-wide">
        {t('dashboard.roleBadge.label')}
      </p>
      <p className="text-primary mt-1 text-[13px] font-extrabold tracking-wide">
        {role ? t(ROLE_LABEL_KEYS[role]) : t('dashboard.roleBadge.unknown')}
      </p>
    </div>
  )
}
