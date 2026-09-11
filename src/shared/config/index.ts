export const API_URL = import.meta.env.VITE_API_URL ?? '/api'

export const TOKEN_STORAGE_KEY = 'token'

// Qo'llab-quvvatlanadigan tillar. Tartib muhim emas, lekin birinchisi standart bo'lishi shart emas —
// standart til alohida DEFAULT_LANGUAGE orqali belgilanadi.
export const SUPPORTED_LANGUAGES = ['uz', 'ru'] as const

export type Language = (typeof SUPPORTED_LANGUAGES)[number]

// Standart va fallback til
export const DEFAULT_LANGUAGE: Language = 'uz'

export const LANGUAGE_STORAGE_KEY = 'lang'
