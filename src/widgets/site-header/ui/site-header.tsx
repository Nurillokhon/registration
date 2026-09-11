import { useTranslation } from 'react-i18next'
import { Button, Container, LanguageSwitcher } from '@/shared/ui'

export function SiteHeader() {
  const { t } = useTranslation()

  return (
    <header className="border-line/60 sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#" className="text-heading text-[17px] font-extrabold tracking-tight">
          {/* Brend nomi — tarjima qilinmaydi */}
          Digital Archivist
        </a>

        <nav className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#kirish"
            className="text-body hover:text-heading rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          >
            {t('header.login')}
          </a>
          <Button size="sm" className="rounded-lg px-5">
            {t('header.getStarted')}
          </Button>
        </nav>
      </Container>
    </header>
  )
}
