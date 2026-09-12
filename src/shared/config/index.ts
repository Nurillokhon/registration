// Backend: https://api.ilmiymarkaz.uz — endpointlar prefikssiz, root'da turadi
// (masalan /account/login/), hujjatlar esa /swagger/ manzilida.
export const API_URL = import.meta.env.VITE_API_URL ?? 'https://api.ilmiymarkaz.uz'

// JWT juftligi: access 30 daqiqa, refresh 7 kun yashaydi. Access eskirganda
// POST /account/refresh/ orqali yangisi olinadi (shared/api/axios.ts).
export const ACCESS_TOKEN_STORAGE_KEY = 'access_token'
export const REFRESH_TOKEN_STORAGE_KEY = 'refresh_token'

// Qo'llab-quvvatlanadigan tillar. Tartib muhim emas, lekin birinchisi standart bo'lishi shart emas —
// standart til alohida DEFAULT_LANGUAGE orqali belgilanadi.
export const SUPPORTED_LANGUAGES = ['uz', 'ru'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

// Standart va fallback til
export const DEFAULT_LANGUAGE: Language = 'uz'

export const LANGUAGE_STORAGE_KEY = 'lang'

export { ROUTES } from './routes'
