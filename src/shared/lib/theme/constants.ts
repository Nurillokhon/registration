// Foydalanuvchi tanlashi mumkin bo'lgan uch rejim: aniq yorug'/qorong'i yoki
// tizim (OS) sozlamasiga ergashish. Tartib ThemeSwitcher'da tugmalar
// chiqadigan tartibga ham mos keladi.
export const THEME_MODES = ['light', 'dark', 'system'] as const

export type ThemeMode = (typeof THEME_MODES)[number]

// 'system' rejimi hisoblanganidan keyingi haqiqiy rang sxemasi — <html>'ga
// aynan shu qiymat asosida .dark klassi qo'yiladi/olib tashlanadi.
export type ResolvedTheme = 'light' | 'dark'

// localStorage kaliti. index.html'dagi bloklovchi skriptda ham AYNAN shu
// satr ishlatiladi (flash bo'lmasligi uchun ikkalasi sinxron bo'lishi shart) —
// shu tokenni o'zgartirsangiz, index.html'ni ham yangilang.
export const THEME_STORAGE_KEY = 'theme'

export const DEFAULT_THEME_MODE: ThemeMode = 'system'
