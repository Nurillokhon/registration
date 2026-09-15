/** Lug'at elementi (swagger: Type, Degree, Status). Type'da name null bo'lishi mumkin. */
export type DictionaryItem = {
  id: number
  name: string | null
}

/** swagger: Language */
export type LanguageItem = DictionaryItem & {
  code: string
}

/** Select maydoni uchun variantlar — qiymat id satr ko'rinishida, nomi bo'lmasa "#id". */
export function toSelectOptions(items: readonly DictionaryItem[]) {
  return items.map((item) => ({ value: String(item.id), label: item.name || `#${item.id}` }))
}
