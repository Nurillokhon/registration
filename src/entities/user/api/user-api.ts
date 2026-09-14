import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { clearTokens, getAccessToken, useGetRequest } from '@/shared/api'
import { clearStoredUser, getStoredUser, setStoredUser } from '../model/user-storage'
import { isUserRole, type CurrentUser, type UserProfile, type UserRole } from '../model/types'

const PROFILE_ENDPOINT = '/account/user-profile/'

// Profil javobi CurrentUser'dan boshqa shaklda (swagger'da phone yo'q, role
// esa oddiy string) — to'g'ridan-to'g'ri saqlansa, getStoredUser uni yaroqsiz
// deb tashlab yuborar, noma'lum rol esa menyu/marshrut lug'atlarida topilmay
// ilovani yiqitar edi. Ilovada bo'limi yo'q rol kelsa null qaytadi.
function toCurrentUser(profile: UserProfile): CurrentUser | null {
  if (!isUserRole(profile.role)) return null

  return {
    phone: profile.phone ?? getStoredUser()?.phone ?? '',
    photo: profile.photo ?? null,
    full_name: profile.full_name,
    role: profile.role,
  }
}

/**
 * Profil sahifasi uchun to'liq profil. useCurrentUser bilan bir xil so'rov
 * kaliti ishlatiladi — kesh umumiy, topbar allaqachon yuklagan bo'lsa sahifa
 * ochilganda qayta so'rov ketmaydi.
 */
export function useUserProfile() {
  const hasToken = Boolean(getAccessToken())

  const { data, isLoading, isFetching, refetch } = useGetRequest<UserProfile>({
    url: PROFILE_ENDPOINT,
    options: {
      enabled: hasToken,
    },
  })

  return {
    profile: data,
    isLoading: hasToken && isLoading,
    isFetching,
    refetch,
  }
}

// Hozircha haqiqiy login ishlamaydi — token yo'q bo'lsa so'rov umuman
// yuborilmaydi, buning o'rniga localStorage'dagi (agar bo'lsa) qiymat
// ko'rsatiladi. Shu tufayl UI backend'siz ham ishlab turaveradi.
export function useCurrentUser() {
  const hasToken = Boolean(getAccessToken())
  const storedUser = getStoredUser()

  const { data, isLoading, isError } = useGetRequest<UserProfile>({
    url: PROFILE_ENDPOINT,
    options: {
      enabled: hasToken,
    },
  })

  const profileUser = data ? toCurrentUser(data) : null

  useEffect(() => {
    const nextUser = data ? toCurrentUser(data) : null
    if (nextUser) setStoredUser(nextUser)
  }, [data])

  const user = profileUser ?? storedUser
  const role: UserRole | null = user?.role ?? null

  return {
    user,
    role,
    isLoading: hasToken && isLoading,
    isError,
  }
}

export function useLogout() {
  const queryClient = useQueryClient()

  function logout() {
    clearTokens()
    clearStoredUser()
    // Navigatsiya bu yerda amalga oshirilmaydi — u UI qatlamiga tegishli.
    queryClient.clear()
  }

  return { logout }
}
