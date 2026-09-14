import { UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { getInitials, type CurrentUser } from '@/entities/user'

type UserChipProps = {
  user: CurrentUser | null
}

/** Topbar'ning o'ng qismidagi foydalanuvchi bloki: ism/telefon + bosh harflardan avatar. */
export function UserChip({ user }: UserChipProps) {
  const { t } = useTranslation()
  const initials = user ? getInitials(user.full_name) : null
  const displayName = user?.full_name ?? t('dashboard.topbar.anonymousName')
  const displayPhone = user?.phone ?? t('dashboard.topbar.anonymousPhone')

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="bg-primary-soft text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold">
        {initials ?? <UserRound className="size-[18px]" strokeWidth={2} aria-hidden="true" />}
      </span>
      {/* sm'dan pastda matn butunlay yashiriladi — 375px'da chip faqat avatar
          bo'lib qoladi, uzun ism/telefon layout'ni gorizontal siqmaydi. */}
      <div className="hidden min-w-0 sm:block">
        <p className="text-heading truncate text-[13px] font-semibold">{displayName}</p>
        <p className="text-neutral truncate text-[11.5px]">{displayPhone}</p>
      </div>
    </div>
  )
}
