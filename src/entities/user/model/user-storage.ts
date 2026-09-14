import { USER_STORAGE_KEY } from '@/shared/config'
import { isUserRole, type CurrentUser } from './types'

// localStorage'dagi qiymat dasturchi tomonidan qo'lda yozilishi (rol
// preview'i uchun) yoki eskirgan formatda qolishi mumkin — shuning uchun har
// bir maydon alohida tekshiriladi, yarim to'liq obyekt hech qachon qaytarilmaydi.
function isCurrentUser(value: unknown): value is CurrentUser {
  if (typeof value !== 'object' || value === null) return false

  const candidate = value as Record<string, unknown>

  return (
    typeof candidate.phone === 'string' &&
    typeof candidate.full_name === 'string' &&
    (typeof candidate.photo === 'string' || candidate.photo === null) &&
    isUserRole(candidate.role)
  )
}

export function getStoredUser(): CurrentUser | null {
  const raw = localStorage.getItem(USER_STORAGE_KEY)
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    return isCurrentUser(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function setStoredUser(user: CurrentUser) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
}

export function clearStoredUser() {
  localStorage.removeItem(USER_STORAGE_KEY)
}
