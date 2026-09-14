import { useMutateRequest } from '@/shared/api'

const CHANGE_PASSWORD_ENDPOINT = '/account/change-password/'

export type ChangePasswordBody = {
  old_password: string
  new_password1: string
  new_password2: string
}

export function useChangePassword() {
  const { mutateAsync, isPending } = useMutateRequest<unknown, ChangePasswordBody>()

  const changePassword = (data: ChangePasswordBody) =>
    mutateAsync({ url: CHANGE_PASSWORD_ENDPOINT, method: 'PUT', data })

  return { changePassword, isPending }
}
