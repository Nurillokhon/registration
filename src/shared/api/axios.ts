import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { API_URL, DEFAULT_LANGUAGE, LANGUAGE_STORAGE_KEY, ROUTES } from '@/shared/config'
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
  type TokenPair,
} from './token-storage'

const REFRESH_ENDPOINT = '/account/refresh/'

// Ochiq (token talab qilmaydigan) endpointlar: bu yerdan kelgan 401 "token
// eskirdi" emas, "login yoki parol xato" degani — shuning uchun ularda refresh
// ham, login sahifasiga yo'naltirish ham bajarilmaydi.
const PUBLIC_AUTH_ENDPOINTS = [
  '/account/login/',
  '/account/user-register/',
  '/account/sms-verify/',
  '/account/reset-password/',
  '/account/reset-password-confirm/',
  REFRESH_ENDPOINT,
]

// Content-Type ataylab berilmagan: axios uni ma'lumot turiga qarab o'zi qo'yadi —
// oddiy obyektga application/json, FormData'ga esa multipart/form-data va unga
// boundary parametrini qo'shadi. Agar bu yerda json qattiq yozib qo'yilsa, fayl
// yuklashda (sertifikat yuklash) boundary tushib qolib, server so'rovni o'qiy olmaydi.
export const api = axios.create({
  baseURL: API_URL,
})

// Refresh so'rovi alohida, interceptorsiz instance orqali ketadi — aks holda
// refresh so'rovining o'zi 401 qaytarganda interceptor yana refresh chaqirib,
// cheksiz halqa hosil bo'lardi.
const refreshClient = axios.create({
  baseURL: API_URL,
})

// So'rov yuborishdan oldin token va joriy tilni qo'shish.
// Til i18next instance'idan emas, localStorage'dan to'g'ridan-to'g'ri o'qiladi —
// bu shared/api'ni i18next module graf'idan mustaqil saqlaydi (aylanma bog'liqlik yo'q)
// va i18next hali init bo'lmagan bo'lsa ham (masalan juda erta so'rov ketsa) noto'g'ri
// qiymat qaytarish xavfini yo'qotadi. i18next-browser-languagedetector ham tilni
// aynan shu kalit ostida localStorage'ga xom (raw) qiymat sifatida saqlaydi.
api.interceptors.request.use((config) => {
  const accessToken = getAccessToken()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  const language = localStorage.getItem(LANGUAGE_STORAGE_KEY) ?? DEFAULT_LANGUAGE
  config.headers['Accept-Language'] = language

  return config
})

// Bir vaqtning o'zida bir nechta so'rov 401 olsa, refresh faqat BIR marta
// yuboriladi — qolganlari shu promise'ni kutadi va yangi access tokenni oladi.
let refreshPromise: Promise<string> | null = null

function refreshAccessToken() {
  refreshPromise ??= requestNewTokens().finally(() => {
    refreshPromise = null
  })
  return refreshPromise
}

async function requestNewTokens() {
  const refresh = getRefreshToken()
  if (!refresh) throw new Error('Refresh token topilmadi')

  const { data } = await refreshClient.post<TokenPair>(REFRESH_ENDPOINT, { refresh })
  // Server yangi refresh ham qaytaradi (rotatsiya); qaytarmasa eskisi saqlanib qoladi.
  setTokens({ access: data.access, refresh: data.refresh || refresh })

  return data.access
}

function redirectToLogin() {
  clearTokens()
  // Login sahifasining o'zida yo'naltirish qilinmaydi — aks holda sahifa qayta
  // yuklanib, formadagi xato xabari ko'rinmay ketardi.
  if (window.location.pathname !== ROUTES.login) {
    window.location.assign(ROUTES.login)
  }
}

// Takroriy urinishni belgilash uchun — bir so'rov faqat bir marta qayta yuboriladi.
type RetriableConfig = InternalAxiosRequestConfig & { isRetry?: boolean }

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config = error.config as RetriableConfig | undefined
    const isUnauthorized = error.response?.status === 401
    const isPublicEndpoint = PUBLIC_AUTH_ENDPOINTS.some((endpoint) =>
      config?.url?.includes(endpoint),
    )

    if (!isUnauthorized || isPublicEndpoint) {
      return Promise.reject(error)
    }

    // Refresh token yo'q yoki bu allaqachon qayta yuborilgan so'rov — boshqa
    // urinib ko'rishdan foyda yo'q, foydalanuvchi qaytadan kirishi kerak.
    if (!config || config.isRetry || !getRefreshToken()) {
      redirectToLogin()
      return Promise.reject(error)
    }

    config.isRetry = true

    try {
      const accessToken = await refreshAccessToken()
      config.headers.Authorization = `Bearer ${accessToken}`
      return await api(config)
    } catch {
      // Refresh ham eskirgan (7 kun o'tgan) yoki bekor qilingan
      redirectToLogin()
      return Promise.reject(error)
    }
  },
)
