import { createContext } from 'react'
import type { ResolvedTheme, ThemeMode } from './constants'

export type ThemeContextValue = {
  /** Foydalanuvchi tanlagan rejim — 'system' ham shu yerda alohida qiymat. */
  mode: ThemeMode
  /** 'system' hisoblanganidan keyingi haqiqiy rang sxemasi — UI shu bo'yicha chiziladi. */
  resolvedTheme: ResolvedTheme
  setMode: (mode: ThemeMode) => void
}

// Alohida faylda — react-refresh/only-export-components qoidasi bitta faylda
// komponent va komponent-bo'lmagan narsa birga eksport qilinishini yoqtirmaydi,
// shuning uchun context/hook/provider har biri o'z faylida.
export const ThemeContext = createContext<ThemeContextValue | null>(null)
