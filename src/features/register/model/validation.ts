import { isValidUzPhone } from '@/shared/lib/phone'
import { CODE_LENGTH, type AccountData, type PersonalData } from './registration'

// Xato matni emas, tarjima kaliti qaytariladi — matn render paytida t() bilan
// olinadi, shunda til almashganda ko'rsatilgan xato ham tarjima bo'ladi.
export type ErrorKey =
  | 'register.errors.required'
  | 'register.errors.pinfl'
  | 'register.errors.passportSeries'
  | 'register.errors.passportNumber'
  | 'register.errors.phone'
  | 'register.errors.passwordWeak'
  | 'register.errors.passwordMismatch'
  | 'register.errors.code'

export type FieldErrors<T> = Partial<Record<keyof T, ErrorKey>>

const PINFL_PATTERN = /^\d{14}$/
const PASSPORT_SERIES_PATTERN = /^[A-Z]{2}$/
const PASSPORT_NUMBER_PATTERN = /^\d{7}$/
const ONLY_DIGITS_PATTERN = /^\d+$/

// Backend talabi (POST /account/user-register/): kamida 5 belgi va faqat
// raqamlardan iborat bo'lmasin. Talablar ro'yxati foydalanuvchiga shu
// qoidalarni ko'rsatadi, shuning uchun ikkalasi bitta manbadan olinadi.
export const PASSWORD_RULES = [
  {
    id: 'minLength',
    labelKey: 'register.account.requirements.minLength',
    test: (password: string) => password.length >= 5,
  },
  {
    id: 'notOnlyDigits',
    labelKey: 'register.account.requirements.notOnlyDigits',
    test: (password: string) => password.length > 0 && !ONLY_DIGITS_PATTERN.test(password),
  },
] as const

export function hasErrors(errors: Partial<Record<string, ErrorKey>>) {
  return Object.values(errors).some(Boolean)
}

function validatePattern(value: string, pattern: RegExp, errorKey: ErrorKey) {
  if (!value) return 'register.errors.required'
  return pattern.test(value) ? undefined : errorKey
}

function validatePhone(phone: string): ErrorKey | undefined {
  if (!phone) return 'register.errors.required'
  return isValidUzPhone(phone) ? undefined : 'register.errors.phone'
}

function validatePassword(password: string): ErrorKey | undefined {
  if (!password) return 'register.errors.required'
  const meetsAllRules = PASSWORD_RULES.every((rule) => rule.test(password))
  return meetsAllRules ? undefined : 'register.errors.passwordWeak'
}

function validateConfirmPassword(confirmPassword: string, password: string): ErrorKey | undefined {
  if (!confirmPassword) return 'register.errors.required'
  return confirmPassword === password ? undefined : 'register.errors.passwordMismatch'
}

export function validatePersonal(data: PersonalData): FieldErrors<PersonalData> {
  return {
    pinfl: validatePattern(data.pinfl, PINFL_PATTERN, 'register.errors.pinfl'),
    passportSeries: validatePattern(
      data.passportSeries,
      PASSPORT_SERIES_PATTERN,
      'register.errors.passportSeries',
    ),
    passportNumber: validatePattern(
      data.passportNumber,
      PASSPORT_NUMBER_PATTERN,
      'register.errors.passportNumber',
    ),
  }
}

export function validateAccount(data: AccountData): FieldErrors<AccountData> {
  return {
    phone: validatePhone(data.phone),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(data.confirmPassword, data.password),
  }
}

export function validateCode(code: readonly string[]): ErrorKey | undefined {
  const isComplete = code.length === CODE_LENGTH && code.every((digit) => /^\d$/.test(digit))
  return isComplete ? undefined : 'register.errors.code'
}
