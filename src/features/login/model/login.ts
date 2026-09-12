import { isValidUzPhone } from '@/shared/lib/phone'

export type LoginData = {
  /** "+998 90 123 45 67" ko'rinishida formatlangan telefon raqami */
  phone: string
  password: string
}

export const EMPTY_LOGIN_DATA: LoginData = {
  phone: '',
  password: '',
}

// Xato matni emas, tarjima kaliti — til almashganda ko'rsatilgan xato ham tarjima bo'ladi.
type LoginErrorKey = 'login.errors.required' | 'login.errors.phone'

export type LoginErrors = Partial<Record<keyof LoginData, LoginErrorKey>>

function validatePhone(phone: string): LoginErrorKey | undefined {
  if (!phone) return 'login.errors.required'
  return isValidUzPhone(phone) ? undefined : 'login.errors.phone'
}

export function validateLogin({ phone, password }: LoginData): LoginErrors {
  return {
    phone: validatePhone(phone),
    // Kirishda faqat bo'sh emasligi tekshiriladi — parol talablari ro'yxatdan o'tishda qo'yiladi
    password: password ? undefined : 'login.errors.required',
  }
}

export function hasErrors(errors: LoginErrors) {
  return Object.values(errors).some(Boolean)
}
