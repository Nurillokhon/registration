import { FileCheck2, PenLine, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/shared/ui'
import { ArchiveVisual } from './archive-visual'

// Faqat kalitlar/ikonka modul darajasida saqlanadi — matn t() bilan render
// paytida olinadi, shunda til o'zgarganda ro'yxat ham yangilanadi.
const CAPABILITIES = [
  {
    id: 'officialVerification',
    icon: PenLine,
    titleKey: 'verificationSystem.capabilities.officialVerification.title',
    textKey: 'verificationSystem.capabilities.officialVerification.text',
  },
  {
    id: 'fastResults',
    icon: Zap,
    titleKey: 'verificationSystem.capabilities.fastResults.title',
    textKey: 'verificationSystem.capabilities.fastResults.text',
  },
  {
    id: 'legalStatus',
    icon: FileCheck2,
    titleKey: 'verificationSystem.capabilities.legalStatus.title',
    textKey: 'verificationSystem.capabilities.legalStatus.text',
  },
] as const

export function VerificationSystem() {
  const { t } = useTranslation()

  return (
    <section className="bg-surface-muted">
      <Container className="grid gap-14 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div>
          <h2 className="text-heading max-w-[18ch] text-[30px] leading-[1.15] font-extrabold tracking-[-0.02em] sm:text-[34px]">
            {t('verificationSystem.title')}
          </h2>
          <p className="text-body mt-5 max-w-[52ch] text-[15px] leading-[1.7]">
            {t('verificationSystem.description')}
          </p>

          <ul className="mt-9 space-y-3">
            {CAPABILITIES.map(({ id, icon: Icon, titleKey, textKey }) => (
              <li key={id} className="bg-surface shadow-card flex gap-4 rounded-xl p-5">
                <span className="bg-primary-soft flex size-10 shrink-0 items-center justify-center rounded-lg">
                  <Icon className="text-primary size-5" strokeWidth={2.1} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-heading text-[15px] font-bold">{t(titleKey)}</h3>
                  <p className="text-body mt-1 text-[13.5px] leading-[1.6]">{t(textKey)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-5 self-center">
          <div className="shadow-panel h-65 overflow-hidden rounded-2xl sm:h-75 lg:mt-14">
            <ArchiveVisual variant="grid" />
          </div>
          <div className="shadow-panel h-75 overflow-hidden rounded-2xl sm:h-85">
            <ArchiveVisual variant="scan" />
          </div>
        </div>
      </Container>
    </section>
  )
}
