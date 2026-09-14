import type { CurrentUser } from '@/entities/user'
import { useMutateRequest } from '@/shared/api'

// Ro'yxatdan o'tish 3 qadamli: har biri oldingisisiz ishlamaydi.
// 1) shaxsni tasdiqlash → 2) foydalanuvchi yaratish va SMS → 3) SMS kodini tasdiqlash
const ENDPOINTS = {
  checkPersonalization: '/account/check-personalization/',
  userRegister: '/account/user-register/',
  smsVerify: '/account/sms-verify/',
} as const

export type CheckPersonalizationBody = {
  /** 14 xonali JShShIR — API integer kutadi */
  pnfl: number
  /** Seriya va raqam birga: "AE2538891" */
  passport: string
}

export type UserRegisterBody = {
  /** "+998901234567" — bo'shliqsiz */
  phone: string
  pnfl: number
  passport: string
  password1: string
  password2: string
}

export type SmsVerifyBody = {
  phone: string
  code: string
}

/** Backend'ning umumiy javobi: {"status": 1, "message": "..."} */
export type StatusResponse = {
  status: number
  message: string
}

/**
 * SMS tasdiqlangach foydalanuvchi darhol tizimga kirgan hisoblanadi.
 * `user` tipi entities/user'dan olinadi — login javobi bilan bir xil shakl.
 */
export type SmsVerifyResponse = {
  status: number
  access: string
  refresh: string
  user: CurrentUser
}

/** 1-qadam: PNFL va pasportni davlat xizmatida tekshiradi. */
export function useCheckPersonalization() {
  const { mutateAsync, isPending } = useMutateRequest<StatusResponse, CheckPersonalizationBody>()

  const checkPersonalization = (data: CheckPersonalizationBody) =>
    mutateAsync({ url: ENDPOINTS.checkPersonalization, method: 'POST', data })

  return { checkPersonalization, isPending }
}

/** 2-qadam: foydalanuvchini yaratadi (is_active=false) va telefonga 6 xonali kod yuboradi. */
export function useUserRegister() {
  const { mutateAsync, isPending } = useMutateRequest<StatusResponse, UserRegisterBody>()

  const registerUser = (data: UserRegisterBody) =>
    mutateAsync({ url: ENDPOINTS.userRegister, method: 'POST', data })

  return { registerUser, isPending }
}

/** 3-qadam: kodni tasdiqlaydi, javobda JWT tokenlari qaytadi. */
export function useSmsVerify() {
  const { mutateAsync, isPending } = useMutateRequest<SmsVerifyResponse, SmsVerifyBody>()

  const verifySms = (data: SmsVerifyBody) =>
    mutateAsync({ url: ENDPOINTS.smsVerify, method: 'POST', data })

  return { verifySms, isPending }
}
