import { Scale, Zap, Shield, BadgeCheck } from '@/components/ui/Icons'

const ITEMS = [
  { icon: Scale, label: 'Redactados por expertos' },
  { icon: Zap, label: 'Entrega en 48 h' },
  { icon: BadgeCheck, label: 'Desde 61 €' },
  { icon: Shield, label: 'Pago seguro Stripe' },
] as const

export default function HomeTrustStrip() {
  return (
    <section className="bg-cream-100 border-y border-gold-300/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-sm text-gray-600">
        {ITEMS.map(({ icon: Icon, label }) => (
          <span key={label} className="flex items-center gap-2.5">
            <Icon className="w-4 h-4 text-gold-500 shrink-0" />
            <span className="font-medium tracking-tight">{label}</span>
          </span>
        ))}
      </div>
    </section>
  )
}
