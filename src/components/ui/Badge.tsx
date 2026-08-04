import { cn } from '@/lib/cn'

const variants = {
  gold: 'bg-gold-500/15 text-gold-700 border-gold-500/25',
  dark: 'bg-white/10 text-gold-300 border-gold-500/30',
  muted: 'bg-cream-100 text-forest-800 border-gold-500/20',
} as const

type BadgeProps = {
  variant?: keyof typeof variants
  className?: string
  children: React.ReactNode
}

export function Badge({ variant = 'gold', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
