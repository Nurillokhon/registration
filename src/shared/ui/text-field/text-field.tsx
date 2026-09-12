import type { LucideIcon } from 'lucide-react'
import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type TextFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'id'> & {
  label: string
  icon?: LucideIcon
  hint?: string
  error?: string
  /** Input'ning o'ng tomonidagi element (masalan, parolni ko'rsatish tugmasi). */
  endAdornment?: ReactNode
  inputClassName?: string
}

/** Yorliq, ikonka, izoh va xato matni bilan to'ldirilgan (filled) matn maydoni. */
export function TextField({
  label,
  icon: Icon,
  hint,
  error,
  endAdornment,
  className,
  inputClassName,
  ...inputProps
}: TextFieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <div className={className}>
      <label htmlFor={id} className="text-heading block px-1 text-[13.5px] font-semibold">
        {label}
      </label>

      {/* Fokus halqasi input'ga emas, butun o'ramga chiziladi — ikonka va
          o'ngdagi tugma ham halqa ichida qoladi. data-field-control ichki
          input'ning global :focus-visible outline'ini o'chiradi (index.css). */}
      <div
        data-field-control
        className={cn(
          'bg-surface-muted focus-within:ring-primary mt-2.5 flex h-[60px] items-center gap-3 rounded-xl px-4 ring-1 transition-shadow focus-within:ring-2',
          error ? 'ring-danger' : 'ring-transparent',
        )}
      >
        {Icon && (
          <Icon className="text-heading size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
        )}
        <input
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'text-heading placeholder:text-neutral/60 h-full min-w-0 flex-1 bg-transparent text-[16px] outline-none',
            inputClassName,
          )}
          {...inputProps}
        />
        {endAdornment}
      </div>

      {message && (
        <p
          id={messageId}
          className={cn(
            'mt-2 px-1',
            error ? 'text-danger text-[12px] font-medium' : 'text-neutral text-[11.5px]',
          )}
        >
          {message}
        </p>
      )}
    </div>
  )
}
