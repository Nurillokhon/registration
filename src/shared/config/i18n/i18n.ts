import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES } from '@/shared/config'
import uz from './locales/uz.json'
import ru from './locales/ru.json'

// Resurslar backend/lazy-loading'siz, to'g'ridan-to'g'ri bundle ichida statik import qilinadi.
const resources = {
  uz: { translation: uz },
  ru: { translation: ru },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS: 'translation',
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: SUPPORTED_LANGUAGES,
    // 'ru-RU' kabi brauzer tillarini 'ru' ga qisqartiradi
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
      // Aniqlangan tilni ('ru-RU' kabi) localStorage'ga yozishdan oldin ham
      // asosiy til kodiga ('ru') qisqartiradi — o'qishdagi `languageOnly`
      // bilan bir xil, lekin saqlashda ham toza qiymat qoladi.
      convertDetectedLanguage: (lng) => lng.split('-')[0],
    },
    interpolation: {
      // React JSX chiqishni o'zi xavfsizlantiradi, i18next qayta escape qilmasin
      escapeValue: false,
    },
  })
// Eslatma: `resources` berilgani uchun i18next init'ni avtomatik sinxron yakunlaydi
// (backend/lazy-loading bo'lmagani sababli setTimeout bilan kechiktirilmaydi) —
// birinchi renderda tarjimasiz "yalang'och" kalitlar ko'rinib ketishining oldi olinadi.

// <html lang="..."> atributini joriy til bilan sinxronda ushlab turish.
// React tashqarisida, DOM'ga to'g'ridan-to'g'ri yozamiz — Provider yoki effektga hojat yo'q.
const syncHtmlLang = (lng: string) => {
  document.documentElement.lang = lng
}

i18n.on('languageChanged', syncHtmlLang)
// Boshlang'ich yuklanishda ham darhol o'rnatib qo'yamiz
syncHtmlLang(i18n.resolvedLanguage ?? DEFAULT_LANGUAGE)

export { i18n }
