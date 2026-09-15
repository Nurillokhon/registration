import { AxiosError } from 'axios'

/**
 * Backend xatolarni {"status": 0, "message": "..."} ko'rinishida qaytaradi
 * (masalan "SMS kod noto'g'ri! Qolgan urinishlar: 4"). Xabar foydalanuvchi
 * tilida kelgani uchun uni to'g'ridan-to'g'ri ko'rsatamiz.
 */
type ApiErrorPayload = {
  status?: number
  message?: string
  detail?: string
}

function getPayload(error: unknown) {
  if (error instanceof AxiosError) {
    return error.response?.data as ApiErrorPayload | undefined
  }
  return undefined
}

// DRF serializer xatolari {"number": ["Bu maydon majburiy."]} ko'rinishida keladi —
// umumiy message bo'lmasa, birinchi maydon xatosi ko'rsatiladi.
function getFirstFieldError(payload: object | undefined) {
  if (!payload) return undefined

  for (const value of Object.values(payload)) {
    if (Array.isArray(value) && typeof value[0] === 'string') return value[0]
  }
  return undefined
}

export function getApiErrorMessage(error: unknown, fallbackMessage: string) {
  const payload = getPayload(error)
  return payload?.message || payload?.detail || getFirstFieldError(payload) || fallbackMessage
}

/** Javob tanasidagi "status" maydoni — HTTP kodi emas (masalan 2: "allaqachon tasdiqlangan"). */
export function getApiPayloadStatus(error: unknown) {
  return getPayload(error)?.status
}

/** HTTP kodi — masalan 429 (urinishlar tugadi) yoki 503 (tashqi xizmat ishlamayapti). */
export function getHttpStatus(error: unknown) {
  return error instanceof AxiosError ? error.response?.status : undefined
}
