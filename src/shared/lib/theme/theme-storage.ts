import { THEME_MODES, THEME_STORAGE_KEY, type ThemeMode } from './constants'

/**
 * Saqlangan rejimni localStorage'dan o'qiydi. Xavfsiz try/catch bilan —
 * xususiy (private/incognito) rejimda yoki xotira to'lganda localStorage
 * xatolik tashlashi mumkin, bu holatda shunchaki null qaytariladi va
 * DEFAULT_THEME_MODE ishlatiladi.
 */
export function readStoredThemeMode(): ThemeMode | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    return (THEME_MODES as readonly string[]).includes(stored ?? '') ? (stored as ThemeMode) : null
  } catch {
    return null
  }
}

/** Foydalanuvchi tanlovini localStorage'ga yozadi. Xatolik jim yutiladi. */
export function writeStoredThemeMode(mode: ThemeMode) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    // Saqlab bo'lmadi — tanlov shu sessiyada ishlayveradi, keyingi tashrifda
    // qayta 'system'ga tushadi. Kritik emas, shuning uchun foydalanuvchiga
    // xato ko'rsatilmaydi.
  }
}
