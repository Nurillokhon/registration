import { useTranslation } from 'react-i18next'
import { SUPPORTED_LANGUAGES, type Language } from '@/shared/config'
import { cn } from '@/shared/lib/cn'

// Har bir tilning tugma aria-label kaliti — dinamik shablon-string o'rniga
// aniq literal xarita, shunda typed t() compile-time'da tekshiraveradi.
const LANGUAGE_ARIA_LABEL_KEYS = {
  uz: 'common.languageSwitcher.uz',
  ru: 'common.languageSwitcher.ru',
} as const satisfies Record<Language, string>

/** Ixcham uz/ru til almashtirgich toggle — SiteHeader'ning o'ng qismida ishlatiladi. */
export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const activeLanguage = i18n.resolvedLanguage ?? i18n.language

  return (
    <div
      role="group"
      aria-label={t('common.languageSwitcher.label')}
      className="bg-surface-muted flex items-center gap-0.5 rounded-lg p-0.5"
    >
      {SUPPORTED_LANGUAGES.map((lng) => {
        const isActive = activeLanguage === lng

        return (
          <button
            key={lng}
            type="button"
            aria-pressed={isActive}
            aria-label={t(LANGUAGE_ARIA_LABEL_KEYS[lng])}
            onClick={() => i18n.changeLanguage(lng)}
            className={cn(
              'rounded-md px-2 py-1 text-[11px] font-bold uppercase transition-colors',
              isActive
                ? 'bg-surface text-heading shadow-card'
                : 'text-body hover:text-heading',
            )}
          >
            {lng}
          </button>
        )
      })}
    </div>
  )
}
