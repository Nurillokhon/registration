import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { getStoredUser } from '@/entities/user'
import { getAccessToken } from '@/shared/api'
import { ROUTES } from '@/shared/config'

/**
 * Hozircha real login backend orqali ishlamaydi, shuning uchun "kirgan" holati
 * ikki xil manbadan tekshiriladi: (1) haqiqiy access token BOR, YOKI (2) token
 * yo'q, lekin localStorage'da qo'lda yozilgan foydalanuvchi bor. Ikkinchi holat
 * ataylab qo'shilgan — dasturchi rolga qarab dashboard'ni ko'rish uchun
 * localStorage'ga foydalanuvchini qo'lda yozadi (token esa yo'q). Agar bu
 * yerda faqat tokenni tekshirsak, aynan shu "seed" holatida foydalanuvchi
 * /login'ga qaytarilib qolar edi; agar o'rniga soxta token yozib qo'yilsa,
 * birinchi so'rovning o'zi 401 qaytarib, axios interceptor (shared/api/axios.ts)
 * foydalanuvchini avtomatik /login'ga uloqtirar edi.
 */
export function RequireAuth({ children }: { children: ReactNode }) {
  const isAuthenticated = Boolean(getAccessToken()) || Boolean(getStoredUser())

  if (!isAuthenticated) return <Navigate to={ROUTES.login} replace />

  return children
}
