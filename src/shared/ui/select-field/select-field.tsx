import { ChevronDown, type LucideIcon } from 'lucide-react'
import { useId, type ComponentPropsWithoutRef } from 'react'
import { cn } from '@/shared/lib/cn'

export type SelectOption = {
  value: string
  label: string
}

type SelectFieldProps = Omit<ComponentPropsWithoutRef<'select'>, 'id' | 'children'> & {
  label: string
  options: readonly SelectOption[]
  /** Hech narsa tanlanmagan holatdagi matn ("Tanlang"). */
  placeholder?: string
  icon?: LucideIcon
  hint?: string
  error?: string
}

/** TextField bilan bir xil ko'rinishdagi tanlash maydoni — brauzerning native <select>'i ustida. */
export function SelectField({
  label,
  options,
  placeholder,
  icon: Icon,
  hint,
  error,
  className,
  ...selectProps
}: SelectFieldProps) {
  const id = useId()
  const messageId = `${id}-message`
  const message = error ?? hint

  return (
    <div className={className}>
      <label htmlFor={id} className="text-heading block px-1 text-[13.5px] font-semibold">
        {label}
      </label>

      <div
        data-field-control
        className={cn(
          'bg-surface-muted focus-within:ring-primary relative mt-2.5 flex h-[60px] items-center gap-3 rounded-xl px-4 ring-1 transition-shadow focus-within:ring-2',
          error ? 'ring-danger' : 'ring-transparent',
        )}
      >
        {Icon && (
          <Icon className="text-heading size-[18px] shrink-0" strokeWidth={2} aria-hidden="true" />
        )}
        {/* appearance-none: brauzer strelkasi o'rniga mavzuga mos ikonka chiziladi */}
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            'text-heading [&>option]:text-heading h-full min-w-0 flex-1 cursor-pointer appearance-none bg-transparent pr-7 text-[16px] outline-none',
            !selectProps.value && 'text-neutral/70',
          )}
          {...selectProps}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="text-body pointer-events-none absolute right-4 size-[18px]"
          strokeWidth={2}
          aria-hidden="true"
        />
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
