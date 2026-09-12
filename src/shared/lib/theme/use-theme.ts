import { useContext } from 'react'
import { ThemeContext } from './context'

/** Joriy mavzu rejimini o'qish/o'zgartirish uchun hook — faqat ThemeProvider ichida ishlaydi. */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme faqat ThemeProvider ichida chaqirilishi kerak')
  return ctx
}
