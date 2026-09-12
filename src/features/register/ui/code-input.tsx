import { useRef, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/lib/cn'
import { digitsOnly } from '../model/normalize'

type CodeInputProps = {
  value: readonly string[]
  onChange: (value: string[]) => void
  label: string
  isInvalid?: boolean
  describedBy?: string
}

/**
 * Har bir raqam uchun alohida katak: yozilganda keyingisiga o'tadi, bo'sh katakda
 * Backspace oldingisiga qaytadi, butun kodni paste/SMS autofill qilish ham ishlaydi.
 */
export function CodeInput({ value, onChange, label, isInvalid = false, describedBy }: CodeInputProps) {
  const { t } = useTranslation()
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  const focusCell = (index: number) => {
    const clampedIndex = Math.min(Math.max(index, 0), value.length - 1)
    inputsRef.current[clampedIndex]?.focus()
  }

  const handleChange = (index: number, rawValue: string) => {
    const next = [...value]
    const digits = digitsOnly(rawValue)

    if (!digits) {
      // Katak tozalandi — harf kabi raqam bo'lmagan belgilar esa e'tiborsiz qoladi
      if (rawValue === '') {
        next[index] = ''
        onChange(next)
      }
      return
    }

    // Bir nechta raqam kelsa (paste yoki autofill) — joriy katakdan boshlab to'ldiriladi
    const digitsToPlace = Array.from(digits.slice(0, value.length - index))
    digitsToPlace.forEach((digit, offset) => {
      next[index + offset] = digit
    })
    onChange(next)
    focusCell(index + digitsToPlace.length)
  }

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      event.preventDefault()
      const next = [...value]
      next[index - 1] = ''
      onChange(next)
      focusCell(index - 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      focusCell(index - 1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      focusCell(index + 1)
    }
  }

  return (
    // data-field-control: kataklar o'z ring'ini chizadi, global outline kerak emas (index.css)
    <fieldset data-field-control aria-describedby={describedBy}>
      <legend className="sr-only">{label}</legend>
      <div className="grid grid-cols-6 gap-2 sm:gap-3">
        {value.map((digit, index) => (
          <input
            // Kataklar soni o'zgarmas va qayta tartiblanmaydi — index kalit sifatida xavfsiz
            key={index}
            ref={(element) => {
              inputsRef.current[index] = element
            }}
            type="text"
            inputMode="numeric"
            autoComplete={index === 0 ? 'one-time-code' : 'off'}
            aria-label={t('register.verify.digitLabel', { index: index + 1 })}
            aria-invalid={isInvalid || undefined}
            value={digit}
            // Butun matn belgilanadi — yangi raqam eskisini to'g'ridan-to'g'ri almashtiradi
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            className={cn(
              'bg-surface-muted text-heading focus:ring-primary h-14 w-full min-w-0 rounded-xl text-center text-[22px] font-bold ring-1 transition-shadow outline-none focus:ring-2 sm:h-16',
              isInvalid ? 'ring-danger' : 'ring-transparent',
            )}
          />
        ))}
      </div>
    </fieldset>
  )
}
