import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/shared/lib/cn'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: 'primary' | 'soft' | 'ghost'
  size?: 'md' | 'sm'
}

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-hover',
  soft: 'bg-surface-accent text-heading hover:bg-surface-accent/70',
  ghost: 'text-body hover:text-heading',
} as const

const SIZES = {
  md: 'px-6 py-3 text-[15px]',
  sm: 'px-4 py-2 text-sm',
} as const

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors',
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  )
}
