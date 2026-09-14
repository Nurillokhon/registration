// Ro'yxat runtime tekshiruv (isUserRole) uchun ham, tip uchun ham bitta
// manbadan olinadi — ikkalasi alohida yozilsa, biri yangilanib ikkinchisi
// unutilib qolishi mumkin edi.
export const USER_ROLES = ['candidate', 'expert', 'admin'] as const

export type UserRole = (typeof USER_ROLES)[number]

export type CurrentUser = {
  phone: string
  photo: string | null
  full_name: string
  role: UserRole
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole)
}
