import { cn } from '@/lib/cn'

type GestoriaCheckIconProps = {
  className?: string
  size?: 'sm' | 'md'
}

export function GestoriaCheckIcon({ className, size = 'sm' }: GestoriaCheckIconProps) {
  const dim = size === 'md' ? 'w-5 h-5' : 'w-4 h-4'
  return (
    <svg
      className={cn(dim, 'text-gold-500 shrink-0', className)}
      fill="currentColor"
      viewBox="0 0 20 20"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}
