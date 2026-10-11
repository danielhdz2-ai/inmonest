import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { ArrowRight, FileText, Scale, LineChart } from '@/components/ui/Icons'

const LINKS = [
  {
    icon: FileText,
    title: 'Contrato de alquiler LAU',
    description: 'Vivienda habitual, Ley de Vivienda 2026, fianza e IRAV. 145 € IVA incl., entrega 48 h.',
    href: '/gestoria/contrato-alquiler',
    label: 'Ver contrato alquiler',
  },
  {
    icon: Scale,
    title: 'Arras y compraventa',
    description: 'Señal penitencial, confirmatoria y packs con revisión registral. Precio cerrado online.',
    href: '/gestoria/arras-penitenciales',
    label: 'Contratos de arras',
  },
  {
    icon: LineChart,
    title: 'Calculadoras y guías',
    description: 'Gastos de alquiler, compraventa y artículos sobre LAU, arras e IRAV 2026.',
    href: '/calculadora-gastos-alquiler',
    label: 'Calculadora alquiler',
  },
] as const

export default function HomeDiscoverGrid() {
  return (
    <Section
      className="py-16 bg-white"
      eyebrow="Explorar"
      title="Gestoría inmobiliaria Inmonest"
      description="Contratos redactados por expertos, sin comisiones de intermediación."
      align="left"
    >
      <div className="grid sm:grid-cols-3 gap-5">
        {LINKS.map(({ icon: Icon, title, description, href, label }) => (
          <Link key={href} href={href} className="group block h-full">
            <Card hover padding="lg" className="h-full flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-cream-100 border border-gold-500/20 flex items-center justify-center mb-5">
                <Icon className="w-5 h-5 text-gold-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed flex-1">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 group-hover:text-gold-700 transition-colors">
                {label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  )
}
