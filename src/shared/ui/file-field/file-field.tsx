import { FileUp, Paperclip, X } from 'lucide-react'
import { useId, useRef } from 'react'
import { cn } from '@/shared/lib/cn'

type FileFieldProps = {
  label: string
  /** Bo'sh holatdagi chaqiruv matni ("Faylni tanlang"). */
  chooseLabel: string
  /** Tanlangan faylni olib tashlash tugmasining ekran o'quvchi uchun nomi. */
  removeLabel: string
  file: File | null
  onChange: (file: File | null) => void
  accept?: string
  hint?: string
  error?: string
  className?: string
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** Bitta fayl tanlash maydoni: bo'sh holatda punktir zona, tanlangach — fayl nomi va hajmi. */
export function FileField({
  label,
  chooseLabel,
  removeLabel,
  file,
  onChange,
  accept,
  hint,
  error,
  className,
}: FileFieldProps) {
  const id = useId()
  const labelId = `${id}-label`
  const messageId = `${id}-message`
  const message = error ?? hint
  const inputRef = useRef<HTMLInputElement>(null)

  const handleRemove = () => {
    // Input qiymati ham tozalanadi — aks holda xuddi shu faylni qayta tanlaganda onChange ishlamaydi
    if (inputRef.current) inputRef.current.value = ''
    onChange(null)
  }

  return (
    <div className={className}>
      <span id={labelId} className="text-heading block px-1 text-[13.5px] font-semibold">
        {label}
      </span>

      {file && (
        <div
          className={cn(
            'bg-surface-muted mt-2.5 flex items-center gap-3 rounded-xl px-4 py-3.5 ring-1',
            error ? 'ring-danger' : 'ring-transparent',
          )}
        >
          <span className="bg-primary-soft text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
            <Paperclip className="size-[18px]" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-heading truncate text-[14px] font-semibold">{file.name}</p>
            <p className="text-neutral text-[12px] tabular-nums">{formatFileSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label={removeLabel}
            className="text-body hover:text-danger rounded-lg p-2 transition-colors"
          >
            <X className="size-[18px]" strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Input fayl tanlangach ham DOM'da qoladi — ref orqali uni tozalash uchun */}
      <label
        className={cn(
          'hover:border-primary focus-within:ring-primary mt-2.5 flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-7 text-center transition-colors focus-within:ring-2',
          error ? 'border-danger' : 'border-line',
          file && 'hidden',
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          aria-labelledby={labelId}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          className="sr-only"
          onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        />
        <FileUp className="text-primary size-7" strokeWidth={2} aria-hidden="true" />
        <span className="text-primary text-[14px] font-bold">{chooseLabel}</span>
      </label>

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
