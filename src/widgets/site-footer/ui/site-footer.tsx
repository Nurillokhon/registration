import { Globe, Share2, ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Container } from '@/shared/ui'

// Faqat kalitlar modul darajasida saqlanadi — matn t() bilan render paytida
// olinadi, shunda til o'zgarganda ro'yxat ham yangilanadi.
const LINK_GROUPS = [
  {
    id: 'platform',
    titleKey: 'footer.linkGroups.platform.title',
    links: [
      { id: 'terms', labelKey: 'footer.linkGroups.platform.links.terms' },
      { id: 'privacy', labelKey: 'footer.linkGroups.platform.links.privacy' },
    ],
  },
  {
    id: 'support',
    titleKey: 'footer.linkGroups.support.title',
    links: [
      { id: 'verificationApi', labelKey: 'footer.linkGroups.support.links.verificationApi' },
      { id: 'contactSupport', labelKey: 'footer.linkGroups.support.links.contactSupport' },
      { id: 'institutionalLogin', labelKey: 'footer.linkGroups.support.links.institutionalLogin' },
    ],
  },
] as const

const META_ICONS = [Share2, Globe, ShieldCheck]

export function SiteFooter() {
  const { t } = useTranslation()

  return (
    <footer className="bg-surface-shell">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            {/* Brend nomi — tarjima qilinmaydi */}
            <p className="text-heading text-[15px] font-extrabold">Digital Archivist</p>
            <p className="text-body mt-3 max-w-[38ch] text-[12.5px] leading-[1.7]">
              {t('footer.description')}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:justify-items-end">
            {LINK_GROUPS.map(({ id, titleKey, links }) => (
              <div key={id}>
                <p className="text-primary text-[11px] font-bold tracking-[0.14em] uppercase">
                  {t(titleKey)}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {links.map(({ id: linkId, labelKey }) => (
                    <li key={linkId}>
                      <a
                        href="#"
                        className="text-body hover:text-primary text-[13px] transition-colors"
                      >
                        {t(labelKey)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-line mt-12 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <p className="text-neutral text-[12px]">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-4">
            {META_ICONS.map((Icon, i) => (
              <Icon
                key={i}
                className="text-neutral size-4"
                strokeWidth={2}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </Container>
    </footer>
  )
}
