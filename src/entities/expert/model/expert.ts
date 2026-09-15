import type { ExpertStatistics } from './types'

/** Ism kelmasa telefon raqami ko'rsatiladi. */
export function getExpertName(expert: Pick<ExpertStatistics, 'full_name' | 'phone'>) {
  return expert.full_name?.trim() || expert.phone
}

/** URL'dagi :id parametri — musbat butun son bo'lmasa null. */
export function parseExpertId(value: string | undefined) {
  const id = Number(value)
  return Number.isInteger(id) && id > 0 ? id : null
}
