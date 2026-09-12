import type { ResolvedTheme, ThemeMode } from './constants'

/** OS'ning joriy rang sxemasini o'qiydi. matchMedia mavjud bo'lmasa light'ga tushadi. */
export function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined' || !window.matchMedia) return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/** 'system' rejimini haqiqiy light/dark qiymatiga aylantiradi. */
export function resolveTheme(mode: ThemeMode): ResolvedTheme {
  return mode === 'system' ? getSystemTheme() : mode
}

/** <html> elementiga .dark klassini qo'yadi/olib tashlaydi va color-scheme'ni sozlaydi. */
export function applyResolvedTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.style.colorScheme = resolved
}
