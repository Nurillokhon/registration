export type PersonalData = {
  /** JShShIR — 14 xonali shaxsiy identifikatsiya raqami */
  pinfl: string
  passportSeries: string
  passportNumber: string
}

export type AccountData = {
  /** "+998 90 123 45 67" ko'rinishida; API'ga bo'shliqsiz yuboriladi */
  phone: string
  password: string
  confirmPassword: string
}

export const EMPTY_PERSONAL_DATA: PersonalData = {
  pinfl: '',
  passportSeries: '',
  passportNumber: '',
}

export const EMPTY_ACCOUNT_DATA: AccountData = {
  phone: '',
  password: '',
  confirmPassword: '',
}

export const CODE_LENGTH = 6

export function createEmptyCode() {
  return Array.from({ length: CODE_LENGTH }, () => '')
}

/** Seriya va raqam API uchun bitta satrga birlashtiriladi: AE + 2538891 → "AE2538891". */
export function toPassportNumber({ passportSeries, passportNumber }: PersonalData) {
  return `${passportSeries}${passportNumber}`
}
