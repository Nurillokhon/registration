import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui'

/** Bosqichning asosiy (gradientli) "davom etish" tugmasi. */
export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <Button type="submit" variant="gradient" size="lg" className="w-full">
      {children}
      <ArrowRight className="size-5 shrink-0" strokeWidth={2.4} aria-hidden="true" />
    </Button>
  )
}

export function BackButton({ onClick }: { onClick: () => void }) {
  const { t } = useTranslation()

  return (
    <button
      type="button"
      onClick={onClick}
      className="text-primary mx-auto mt-6 flex items-center gap-2 text-[14px] font-bold hover:underline"
    >
      <ArrowLeft className="size-4" strokeWidth={2.4} aria-hidden="true" />
      {t('register.back')}
    </button>
  )
}
