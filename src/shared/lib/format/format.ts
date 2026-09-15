// API sanalari "YYYY-MM-DD" ko'rinishida keladi. new Date() orqali o'tkazilsa, satr
// UTC deb talqin qilinib, ayrim vaqt zonalarida bir kun oldingi sana chiqishi
// mumkin — shuning uchun satr to'g'ridan-to'g'ri qismlarga ajratiladi.
export function formatApiDate(value: string | null | undefined) {
  if (!value) return undefined

  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value)
  return match ? `${match[3]}.${match[2]}.${match[1]}` : value
}

// Summa backend'dan decimal satr ("150000.00") bo'lib keladi — "150 000" ko'rinishiga keltiriladi.
export function formatAmount(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === '') return undefined

  const amount = Number(value)
  if (!Number.isFinite(amount)) return String(value)

  return new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(amount)
}
