import { ACCESS_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from '@/shared/config'

export type TokenPair = {
  access: string
  refresh: string
}

// Tokenlar bilan ishlash bitta joyda: login/registratsiya so'rovlari ham,
// axios interceptor'i ham shu funksiyalardan foydalanadi.

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY)
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY)
}

export function setTokens({ access, refresh }: TokenPair) {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, access)
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refresh)
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY)
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY)
}
