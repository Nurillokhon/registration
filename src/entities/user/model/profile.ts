import { API_URL } from '@/shared/config'

/** "NURILLOXON XABIBULLA ..." → "NX". Ism bo'sh bo'lsa null (chaqiruvchi ikonka ko'rsatadi). */
export function getInitials(fullName: string) {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return null
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
}

export type Gender = 'male' | 'female'

// Reestr jinsni bitta belgi bilan qaytaradi — raqamli ("1"/"2") yoki harfli
// ("M"/"F") kod bo'lishi mumkin, shuning uchun ikkala variant ham qamrab olingan.
const GENDER_CODES: Record<string, Gender> = {
  '1': 'male',
  m: 'male',
  '2': 'female',
  f: 'female',
  w: 'female',
}

/** Noma'lum kod kelsa null — UI xom qiymatni ko'rsatadi. */
export function getGender(sex: string): Gender | null {
  return GENDER_CODES[sex.trim().toLowerCase()] ?? null
}

const ABSOLUTE_SRC_PATTERN = /^(https?:|data:|blob:)/

/**
 * Surat uch xil ko'rinishda kelishi mumkin: to'liq URL, backend'dagi nisbiy
 * media yo'li yoki reestrdan kelgan prefikssiz base64 JPEG. Base64'da nuqta
 * belgisi bo'lmaydi — yo'lni undan shu orqali ajratamiz.
 */
export function getPhotoSrc(photo: string | null | undefined) {
  if (!photo) return null
  if (ABSOLUTE_SRC_PATTERN.test(photo)) return photo
  if (photo.startsWith('/') || photo.includes('.')) return new URL(photo, `${API_URL}/`).href
  return `data:image/jpeg;base64,${photo}`
}
