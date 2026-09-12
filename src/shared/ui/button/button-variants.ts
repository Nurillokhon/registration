import { cn } from '@/shared/lib/cn'

const VARIANTS = {
  // text-white emas — text-on-primary: dark rejimda --color-primary ochroq
  // bo'lib qolgani uchun oq matn kontrasti yetarli bo'lmay qoladi, shu tufayli
  // bu token har mavzuda mos rangga (light'da oq, dark'da deyarli qora) o'zgaradi.
  primary: 'bg-primary text-on-primary hover:bg-primary-hover',
  soft: 'bg-surface-accent text-heading hover:bg-surface-accent/70',
  ghost: 'text-body hover:text-heading',
  // bg-linear-to-r background-image beradi, shuning uchun hover holati fon
  // rangi orqali emas, gradientning to'xtash nuqtasi orqali beriladi.
  gradient:
    'from-primary-hover to-primary hover:to-primary-hover text-on-primary shadow-primary/25 bg-linear-to-r shadow-xl',
} as const

// Radius va shrift qalinligi ham o'lchamga kiritilgan: cn() Tailwind
// konfliktlarini birlashtirmaydi, shuning uchun className'da rounded-lg bilan
// rounded-2xl (yoki font-semibold bilan font-bold) birga kelsa, qaysi biri
// g'olib chiqishi kafolatlanmaydi — har o'lcham ulardan faqat bittasini beradi.
const SIZES = {
  lg: 'rounded-2xl px-8 py-5 text-[17px] font-bold',
  md: 'rounded-lg px-6 py-3 text-[15px] font-semibold',
  sm: 'rounded-lg px-4 py-2 text-sm font-semibold',
} as const

export type ButtonVariant = keyof typeof VARIANTS
export type ButtonSize = keyof typeof SIZES

type ButtonVariantsOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

/** Button ko'rinishini <Link>/<a> kabi boshqa elementlarga ham berish uchun. */
export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonVariantsOptions = {}) {
  return cn(
    'inline-flex items-center justify-center gap-2 transition-colors',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}
