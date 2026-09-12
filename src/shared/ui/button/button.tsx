import type { ComponentPropsWithoutRef } from 'react'
import { buttonVariants, type ButtonSize, type ButtonVariant } from './button-variants'

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return <button className={buttonVariants({ variant, size, className })} {...props} />
}
