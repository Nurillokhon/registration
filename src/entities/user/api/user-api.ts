import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { clearTokens, getAccessToken, useGetRequest } from '@/shared/api'
import { clearStoredUser, getStoredUser, setStoredUser } from '../model/user-storage'
import type { CurrentUser, UserRole } from '../model/types'

const PROFILE_ENDPOINT = '/account/user-profile/'

// Hozircha haqiqiy login ishlamaydi — token yo'q bo'lsa so'rov umuman
// yuborilmaydi, buning o'rniga localStorage'dagi (agar bo'lsa) qiymat
// ko'rsatiladi. Shu tufayl UI backend'siz ham ishlab turaveradi.
export function useCurrentUser() {
  const hasToken = Boolean(getAccessToken())
  const storedUser = getStoredUser()

  const { data, isLoading, isError } = useGetRequest<CurrentUser>({
    url: PROFILE_ENDPOINT,
    options: {
      enabled: hasToken,
    },
  })

  useEffect(() => {
    if (data) setStoredUser(data)
  }, [data])

  const user = data ?? storedUser
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
