import axios from 'axios'
import { API_URL, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, TOKEN_STORAGE_KEY } from '@/shared/config'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// So'rov yuborishdan oldin token va joriy tilni qo'shish.
// Til i18next instance'idan emas, localStorage'dan to'g'ridan-to'g'ri o'qiladi —
// bu shared/api'ni i18next module graf'idan mustaqil saqlaydi (aylanma bog'liqlik yo'q)
// va i18next hali init bo'lmagan bo'lsa ham (masalan juda erta so'rov ketsa) noto'g'ri
// qiymat qaytarish xavfini yo'qotadi. i18next-browser-languagedetector ham tilni
// aynan shu kalit ostida localStorage'ga xom (raw) qiymat sifatida saqlaydi.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? DEFAULT_LANGUAGE
  config.headers['Accept-Language'] = language

  return config
})

// Javobdagi xatolarni bir joyda ushlash
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
    }
    return Promise.reject(error)
  },
)
