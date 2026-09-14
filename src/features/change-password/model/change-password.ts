export type ChangePasswordData = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const EMPTY_CHANGE_PASSWORD_DATA: ChangePasswordData = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
}

// Xato matni emas, tarjima kaliti — til almashganda ko'rsatilgan xato ham tarjima bo'ladi.
type ChangePasswordErrorKey =
  | 'dashboard.profile.security.errors.required'
  | 'dashboard.profile.security.errors.sameAsOld'
  | 'dashboard.profile.security.errors.mismatch'

export type ChangePasswordErrors = Partial<Record<keyof ChangePasswordData, ChangePasswordErrorKey>>

const REQUIRED = 'dashboard.profile.security.errors.required'

// Parol murakkabligi bu yerda tekshirilmaydi — qoidalar backend'da, uning
// xabari FormAlert orqali ko'rsatiladi.
export function validateChangePassword({
  oldPassword,
  newPassword,
  confirmPassword,
}: ChangePasswordData): ChangePasswordErrors {
  return {
    oldPassword: oldPassword ? undefined : REQUIRED,
    newPassword: !newPassword
      ? REQUIRED
      : newPassword === oldPassword
        ? 'dashboard.profile.security.errors.sameAsOld'
        : undefined,
    confirmPassword: !confirmPassword
      ? REQUIRED
      : confirmPassword === newPassword
        ? undefined
        : 'dashboard.profile.security.errors.mismatch',
  }
}

export function hasErrors(errors: ChangePasswordErrors) {
  return Object.values(errors).some(Boolean)
}
