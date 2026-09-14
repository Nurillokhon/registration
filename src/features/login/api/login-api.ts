import type { CurrentUser } from '@/entities/user'
import { useMutateRequest } from '@/shared/api'

const LOGIN_ENDPOINT = '/account/login/'

export type LoginBody = {
  /** "+998901234567" — bo'shliqsiz */
  phone: string
  password: string
}

/**
 * Javob sms-verify bilan bir xil shaklda: tokenlar va foydalanuvchi.
 * `user` tipi entities/user'dan olinadi — rol ro'yxati bitta manbada tursin.
 */
export type LoginResponse = {
  status: number
  access: string
  refresh: string
  user: CurrentUser
}

export function useLogin() {
  const { mutateAsync, isPending } = useMutateRequest<LoginResponse, LoginBody>()

  const login = (data: LoginBody) => mutateAsync({ url: LOGIN_ENDPOINT, method: 'POST', data })

  return { login, isPending }
}
