export type PersonalData = {
  /** JShShIR — 14 xonali shaxsiy identifikatsiya raqami */
  pinfl: string
  passportSeries: string
  passportNumber: string
}

export type AccountData = {
  /** Email yoki telefon raqami */
  login: string
  password: string
  confirmPassword: string
}

export const EMPTY_PERSONAL_DATA: PersonalData = {
  pinfl: '',
  passportSeries: '',
  passportNumber: '',
}

export const EMPTY_ACCOUNT_DATA: AccountData = {
  login: '',
  password: '',
  confirmPassword: '',
}

export const CODE_LENGTH = 6

export function createEmptyCode() {
  return Array.from({ length: CODE_LENGTH }, () => '')
}
