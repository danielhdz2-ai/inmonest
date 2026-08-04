import { cn } from '@/lib/cn'
import type { ComponentType } from 'react'

type TrustItem = {
  Icon: ComponentType<{ className?: string }>
  label: string
}

type TrustStripProps = {
  items: TrustItem[]
  variant?: 'cream' | 'gold'
  className?: string
}

export function TrustStrip({ items, variant = 'cream', className }: TrustStripProps) {
  const bg = variant === 'cream' ? 'bg-cream-100 border-gold-300/30' : 'bg-gold-700 border-gold-600/30'
  const iconCls = variant === 'cream' ? 'text-gold-500' : 'text-gold-200'
  const textCls = variant === 'cream' ? 'text-gray-600' : 'text-white/90'

  return (
    <section className={cn('border-y', bg, className)}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-sm">
        {items.map(({ Icon, label }) => (
          <span key={label} className={cn('flex items-center gap-2.5 font-medium tracking-tight', textCls)}>
            <Icon className={cn('w-4 h-4 shrink-0', iconCls)} />
            {label}
          </span>
        ))}
      </div>
    </section>
  )
}
