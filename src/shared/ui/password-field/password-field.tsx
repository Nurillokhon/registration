import { Eye, EyeOff } from 'lucide-react'
import { useState, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../text-field'

type PasswordFieldProps = Omit<ComponentProps<typeof TextField>, 'type' | 'endAdornment'>

/** Parolni ko'rsatish/yashirish tugmasi bor TextField. */
export function PasswordField(props: PasswordFieldProps) {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const ToggleIcon = isVisible ? EyeOff : Eye

  return (
    <TextField
      {...props}
      type={isVisible ? 'text' : 'password'}
      endAdornment={
        <button
          type="button"
          aria-label={t('common.passwordField.toggle')}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((visible) => !visible)}
          className="text-heading hover:text-primary -mr-2 flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors"
        >
          <ToggleIcon className="size-[18px]" strokeWidth={2} aria-hidden="true" />
        </button>
      }
    />
  )
}
