import { cn } from '@/lib/cn'

type CardProps = {
  className?: string
  children: React.ReactNode
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg'
}

const paddingMap = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ className, children, hover = false, padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-2xl border border-gray-100 shadow-sm',
        hover && 'transition-all duration-200 hover:border-gold-400/40 hover:shadow-md',
        paddingMap[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
