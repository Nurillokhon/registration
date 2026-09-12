// Input'ga yozilayotgan qiymatni darhol tozalash uchun — foydalanuvchi
// noto'g'ri belgi kirita olmaydi, validatsiya esa faqat uzunlikni tekshiradi.

export function digitsOnly(value: string) {
  return value.replace(/\D/g, '')
}

/** Pasport seriyasi: faqat lotin bosh harflari. */
export function latinLettersOnly(value: string) {
  return value.toUpperCase().replace(/[^A-Z]/g, '')
}
