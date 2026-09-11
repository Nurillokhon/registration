import 'i18next'
import type uz from './locales/uz.json'

/**
 * i18next uchun typed resurslar. `uz.json` manba (source of truth) sifatida olinadi —
 * shu tufayli t('...') chaqiruvida autocomplete va compile-time xato tekshiruvi ishlaydi.
 * ru.json bilan kalitlar 1:1 mos kelishi kerak (runtime'da tekshirilmaydi, faqat uz tipga qarab).
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    resources: {
      translation: typeof uz
    }
  }
}
