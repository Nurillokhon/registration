import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useCurrentUser, type UserRole } from '@/entities/user'
import { ROUTES } from '@/shared/config'

type RequireAuthProps = {
  /** Sahifaga kira oladigan rollar. Berilmasa — faqat kirganlik tekshiriladi. */
  roles?: readonly UserRole[]
  children: ReactNode
}

/**
 * Rol useCurrentUser'dan olinadi: avval localStorage'dagi foydalanuvchi, token
 * bo'lsa profil so'rovi kelgach — serverdagi rol. Token yo'q, lekin
 * localStorage'da qo'lda yozilgan foydalanuvchi bo'lsa ham kiritiladi — dasturchi
 * rolga qarab dashboard'ni shu yo'l bilan sinab ko'radi (soxta token yozilsa,
 * birinchi so'rovning 401'i axios interceptor orqali /login'ga uloqtirardi).
 */
export function RequireAuth({ roles, children }: RequireAuthProps) {
  const { role, isLoading } = useCurrentUser()

  if (!role) {
    // Token bor, lekin saqlangan foydalanuvchi yo'q — rol profil so'rovidan kutiladi
    if (isLoading) return null
    return <Navigate to={ROUTES.login} replace />
  }

  // /dashboard barcha rollarga ochiq, shuning uchun bu yo'naltirish halqaga aylanmaydi
  if (roles && !roles.includes(role)) return <Navigate to={ROUTES.dashboard} replace />

  return children
}
