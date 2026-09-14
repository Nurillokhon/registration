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

/**
 * GET /account/user-profile/ javobi (swagger: UserProfile). Ism, familiya va
 * boshqa rekvizitlar davlat reestridan import qilinadi — foydalanuvchi ularni
 * o'zgartira olmaydi.
 */
export type UserProfile = {
  id: number
  full_name: string
  /** Ism */
  fname: string
  /** Familiya */
  sname: string
  /** Otasining ismi */
  mname: string
  /** "1999-09-02" */
  birth_date: string
  birth_place: string
  birth_country: string
  nationality: string
  /** Bitta belgili reestr kodi — entities/user'dagi getGender() orqali o'qiladi */
  sex: string
  photo: string | null
  role: UserRole
  // Swagger'da string deb berilgan (SerializerMethodField), amalda son kelishi mumkin
  my_certificates: number | string
  new_certificates: number | string
  problem_certificates: number | string
  approved_certificates: number | string
  // Swagger sxemasida yo'q, lekin login javobidagi user'da phone bor — kelmasa
  // UI bu qatorlarni shunchaki ko'rsatmaydi.
  phone?: string
  pnfl?: string | number
  passport?: string
}

export function isUserRole(value: unknown): value is UserRole {
  return typeof value === 'string' && USER_ROLES.includes(value as UserRole)
}
