const AUTO_NEXT_STORAGE_KEY = 'certificate-review:auto-next'

// Brauzer xotirasi yopiq bo'lsa (private rejim) sozlama shunchaki eslab qolinmaydi
export function readAutoNext() {
  try {
    return localStorage.getItem(AUTO_NEXT_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeAutoNext(value: boolean) {
  try {
    localStorage.setItem(AUTO_NEXT_STORAGE_KEY, value ? '1' : '0')
  } catch {
    // saqlanmasa ham joriy sahifada ishlayveradi
  }
}
