import { useEffect, useState, type ReactNode } from 'react'
import { DEFAULT_THEME_MODE, type ResolvedTheme, type ThemeMode } from './constants'
import { ThemeContext } from './context'
import { applyResolvedTheme, getSystemTheme } from './resolve-theme'
import { readStoredThemeMode, writeStoredThemeMode } from './theme-storage'

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Boshlang'ich holat index.html'dagi bloklovchi skript qo'ygan .dark klassi
  // bilan bir xil manbadan (localStorage + OS) sinxron hisoblanadi — shunda
  // React birinchi render'da mavjud DOM holatiga zid narsa chizmaydi.
  const [mode, setMode] = useState<ThemeMode>(() => readStoredThemeMode() ?? DEFAULT_THEME_MODE)
  // OS mavzusi alohida state — faqat matchMedia 'change' hodisasi orqali
  // yangilanadi (haqiqiy tashqi tizimga obuna, setState effekt tanasida emas).
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() => getSystemTheme())

  // resolvedTheme — render vaqtida hisoblanadigan hosila qiymat, alohida
  // state emas: shu tufayli 'mode' o'zgarganda effekt ichida qo'shimcha
  // setState (kaskadli render) kerak bo'lmaydi.
  const resolvedTheme: ResolvedTheme = mode === 'system' ? systemTheme : mode

  // DOM va localStorage — Reactdan tashqari tizimlar, shuning uchun bu yerda
  // sinxronlash effekt orqali to'g'ri (setState emas, faqat side-effect).
  useEffect(() => {
    applyResolvedTheme(resolvedTheme)
    writeStoredThemeMode(mode)
  }, [resolvedTheme, mode])

  // 'system' rejimida foydalanuvchi OS mavzusini almashtirsa, jonli moslashamiz.
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const handleSystemChange = () => setSystemTheme(getSystemTheme())

    media.addEventListener('change', handleSystemChange)
    return () => media.removeEventListener('change', handleSystemChange)
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, resolvedTheme, setMode }}>{children}</ThemeContext.Provider>
  )
}
