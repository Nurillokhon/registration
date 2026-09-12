import { Monitor, Moon, Sun } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { THEME_MODES, useTheme, type ThemeMode } from '@/shared/lib/theme'
import { cn } from '@/shared/lib/cn'

// Har bir rejimning ikonkasi va aria-label kaliti — LanguageSwitcher'dagi
// LANGUAGE_ARIA_LABEL_KEYS bilan bir xil naqsh: `as const satisfies` tufayli
// ariaLabelKey literal string sifatida qoladi va typed t() compile-time'da
// noto'g'ri kalitni ushlab qoladi.
const THEME_MODE_CONFIG = {
  light: { icon: Sun, ariaLabelKey: 'common.themeSwitcher.light' },
  dark: { icon: Moon, ariaLabelKey: 'common.themeSwitcher.dark' },
  system: { icon: Monitor, ariaLabelKey: 'common.themeSwitcher.system' },
} as const satisfies Record<ThemeMode, { icon: typeof Sun; ariaLabelKey: string }>

/** Ixcham light/dark/system almashtirgich — SiteHeader'da LanguageSwitcher yonida. */
export function ThemeSwitcher() {
  const { t } = useTranslation()
  const { mode, setMode } = useTheme()

  return (
    <div
      role="group"
      aria-label={t('common.themeSwitcher.label')}
      className="bg-surface-muted flex items-center gap-0.5 rounded-lg p-0.5"
    >
      {THEME_MODES.map((themeMode) => {
        const { icon: Icon, ariaLabelKey } = THEME_MODE_CONFIG[themeMode]
        const isActive = mode === themeMode

        return (
          <button
            key={themeMode}
            type="button"
            aria-pressed={isActive}
            aria-label={t(ariaLabelKey)}
            onClick={() => setMode(themeMode)}
            className={cn(
              // Mobilda ixchamroq (p-1, kichikroq ikonka) — 375px'da header
              // sig'ishi uchun; sm'dan boshlab asl o'lchamga qaytadi.
              'rounded-md p-1 transition-colors sm:p-1.5',
              isActive ? 'bg-surface text-heading shadow-card' : 'text-body hover:text-heading',
            )}
          >
            <Icon className="size-3 sm:size-3.5" strokeWidth={2.4} aria-hidden="true" />
          </button>
        )
      })}
    </div>
  )
}
