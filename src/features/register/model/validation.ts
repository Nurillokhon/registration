import { CODE_LENGTH, type AccountData, type PersonalData } from './registration'

// Xato matni emas, tarjima kaliti qaytariladi — matn render paytida t() bilan
// olinadi, shunda til almashganda ko'rsatilgan xato ham tarjima bo'ladi.
export type ErrorKey =
  | 'register.errors.required'
  | 'register.errors.pinfl'
  | 'register.errors.passportSeries'
  | 'register.errors.passportNumber'
  | 'register.errors.login'
  | 'register.errors.passwordWeak'
  | 'register.errors.passwordMismatch'
  | 'register.errors.code'

export type FieldErrors<T> = Partial<Record<keyof T, ErrorKey>>

const PINFL_PATTERN = /^\d{14}$/
const PASSPORT_SERIES_PATTERN = /^[A-Z]{2}$/
const PASSPORT_NUMBER_PATTERN = /^\d{7}$/
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// 998 kodi bilan yoki usiz 9 xonali raqam (bo'shliq, tire, qavslar olib tashlangandan keyin)
const UZ_PHONE_PATTERN = /^(\+?998)?\d{9}$/
const PHONE_SEPARATORS = /[\s()-]/g

export const PASSWORD_RULES = [
  {
    id: 'minLength',
    labelKey: 'register.account.requirements.minLength',
    test: (password: string) => password.length >= 8,
  },
  {
    id: 'upperAndDigit',
    labelKey: 'register.account.requirements.upperAndDigit',
    test: (password: string) => /\p{Lu}/u.test(password) && /\d/.test(password),
  },
] as const

export function hasErrors(errors: Partial<Record<string, ErrorKey>>) {
  return Object.values(errors).some(Boolean)
}

function validatePattern(value: string, pattern: RegExp, errorKey: ErrorKey) {
  if (!value) return 'register.errors.required'
  return pattern.test(value) ? undefined : errorKey
}

function validateLogin(login: string): ErrorKey | undefined {
  const value = login.trim()
  if (!value) return 'register.errors.required'

  const isEmail = EMAIL_PATTERN.test(value)
  const isPhone = UZ_PHONE_PATTERN.test(value.replace(PHONE_SEPARATORS, ''))
  return isEmail || isPhone ? undefined : 'register.errors.login'
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
    login: validateLogin(data.login),
    password: validatePassword(data.password),
    confirmPassword: validateConfirmPassword(data.confirmPassword, data.password),
  }
}

export function validateCode(code: readonly string[]): ErrorKey | undefined {
  const isComplete = code.length === CODE_LENGTH && code.every((digit) => /^\d$/.test(digit))
  return isComplete ? undefined : 'register.errors.code'
}
