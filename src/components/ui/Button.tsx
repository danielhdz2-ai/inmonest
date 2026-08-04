import Link from 'next/link'
import { cn } from '@/lib/cn'

const variants = {
  primary:
    'bg-gold-500 text-white hover:bg-gold-600 shadow-sm shadow-gold-500/25',
  secondary:
    'bg-black text-white hover:bg-neutral-900',
  outline:
    'border border-gold-500/40 text-gold-700 hover:bg-cream-100 bg-white',
  ghost:
    'border border-white/25 text-white/90 hover:bg-white/10',
  dark:
    'bg-black text-white hover:bg-neutral-900',
} as const

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
} as const

type ButtonVariant = keyof typeof variants
type ButtonSize = keyof typeof sizes

type BaseProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = BaseProps &
  React.ComponentProps<typeof Link> & { href: string }

export type ButtonProps = ButtonAsButton | ButtonAsLink

const base =
  'inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 disabled:opacity-50 disabled:pointer-events-none'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)

  if ('href' in props && props.href) {
    const { href, ...linkProps } = props
    return (
      <Link href={href} className={classes} {...linkProps}>
        {children}
      </Link>
    )
  }

  const buttonProps = props as ButtonAsButton
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  )
}
