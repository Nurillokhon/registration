import type { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { i18n } from '@/shared/config/i18n'

/**
 * i18n instance shared/config/i18n/i18n.ts'da import qilinishi bilanoq
 * sinxron init qilinadi (resurslar bundle ichida statik berilgani uchun i18next
 * kutish/backend bosqichini o'tkazib yuboradi).
 * Provider shart emas — react-i18next default holatda global singleton instance'ni
 * o'zi topib ishlatadi. Baribir Provider'dan foydalanamiz, chunki: (1) loyihada
 * QueryProvider kabi explicit <XProvider> naqshi bor, shunga mos keladi; (2) kelajakda
 * testlarda yoki SSR/mock stsenariylarida boshqa i18n instance almashtirish osonlashadi;
 * (3) instance aniq ko'rinib turadi — "qayerdan kelyapti" degan savol qolmaydi.
 */
export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
