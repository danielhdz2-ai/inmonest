import { cn } from '@/lib/cn'
import { Badge } from './Badge'

type SectionProps = {
  eyebrow?: string
  title: string
  description?: string
  badgeVariant?: 'gold' | 'dark' | 'muted'
  align?: 'left' | 'center'
  className?: string
  containerClassName?: string
  children?: React.ReactNode
}

export function Section({
  eyebrow,
  title,
  description,
  badgeVariant = 'gold',
  align = 'center',
  className,
  containerClassName,
  children,
}: SectionProps) {
  return (
    <section className={cn(className)}>
      <div className={cn('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8', containerClassName)}>
        <div
          className={cn(
            'mb-10',
            align === 'center' && 'text-center',
            align === 'left' && 'text-left'
          )}
        >
          {eyebrow && (
            <Badge variant={badgeVariant} className="mb-4">
              {eyebrow}
            </Badge>
          )}
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h2>
          {description && (
            <p
              className={cn(
                'mt-3 text-gray-500 text-base leading-relaxed max-w-2xl',
                align === 'center' && 'mx-auto'
              )}
            >
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  )
}
