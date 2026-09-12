const COUNTRY_CODE = '998'
const COUNTRY_PREFIX = `+${COUNTRY_CODE}`
const LOCAL_NUMBER_LENGTH = 9
// 90 123 45 67 — operator kodi va abonent raqami guruhlari
const LOCAL_GROUP_SIZES = [2, 3, 2, 2]

function extractLocalDigits(value: string) {
  const digits = value.replace(/\D/g, '')
  // Mamlakat kodi faqat ko'rinib turgan "+998" prefiksidan yoki to'liq raqam
  // paste qilinganda olib tashlanadi. Boshqa holatda tegilmaydi: "99" mahalliy
  // operator kodi, shuning uchun mahalliy raqam ham 998 bilan boshlanishi mumkin.
  const hasCountryCode =
    value.trimStart().startsWith(COUNTRY_PREFIX) ||
    (digits.length > LOCAL_NUMBER_LENGTH && digits.startsWith(COUNTRY_CODE))
  const localDigits = hasCountryCode ? digits.slice(COUNTRY_CODE.length) : digits
  return localDigits.slice(0, LOCAL_NUMBER_LENGTH)
}

/** Kiritilgan qiymatni yozish davomida "+998 90 123 45 67" ko'rinishiga keltiradi. */
export function formatUzPhone(value: string) {
  const localDigits = extractLocalDigits(value)
  if (!localDigits) return ''

  const groups: string[] = []
  let start = 0
  for (const size of LOCAL_GROUP_SIZES) {
    const group = localDigits.slice(start, start + size)
    if (!group) break
    groups.push(group)
    start += size
  }

  return `${COUNTRY_PREFIX} ${groups.join(' ')}`
}

export function isValidUzPhone(value: string) {
  return extractLocalDigits(value).length === LOCAL_NUMBER_LENGTH
}
