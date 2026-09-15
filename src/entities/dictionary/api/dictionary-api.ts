import { useGetRequest, type Paginated } from '@/shared/api'
import type { DictionaryItem, LanguageItem } from '../model/types'

const ENDPOINTS = {
  language: '/dictionary/language/',
  type: '/dictionary/type/',
  degree: '/dictionary/degree/',
} as const

// Lug'atlar kamdan-kam o'zgaradi — sahifalar orasida o'tganda qayta so'ralmasin
const DICTIONARY_STALE_TIME = 30 * 60 * 1000

// Sahifalangan lug'at bitta so'rovda to'liq olinadi — select ichida sahifalash kerak emas
const FULL_PAGE_PARAMS = { page_size: 1000 }

const EMPTY_LANGUAGES: LanguageItem[] = []
const EMPTY_ITEMS: DictionaryItem[] = []

// swagger: language va type sahifalanmagan massiv qaytaradi
export function useLanguages() {
  const { data, isLoading } = useGetRequest<LanguageItem[]>({
    url: ENDPOINTS.language,
    options: { staleTime: DICTIONARY_STALE_TIME },
  })

  return { languages: data ?? EMPTY_LANGUAGES, isLoading }
}

export function useCertificateTypes() {
  const { data, isLoading } = useGetRequest<DictionaryItem[]>({
    url: ENDPOINTS.type,
    options: { staleTime: DICTIONARY_STALE_TIME },
  })

  return { types: data ?? EMPTY_ITEMS, isLoading }
}

// swagger: degree sahifalangan javob qaytaradi
export function useDegrees() {
  const { data, isLoading } = useGetRequest<Paginated<DictionaryItem>>({
    url: ENDPOINTS.degree,
    params: FULL_PAGE_PARAMS,
    options: { staleTime: DICTIONARY_STALE_TIME },
  })

  return { degrees: data?.results ?? EMPTY_ITEMS, isLoading }
}
