import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { ArrowRight, Building2, FileText, LineChart } from '@/components/ui/Icons'

const LINKS = [
  {
    icon: Building2,
    title: 'Publicar anuncio',
    description: 'Anuncio gratuito entre particulares. Sin comisiones ni intermediarios.',
    href: '/publicar-anuncio',
    label: 'Publicar gratis',
  },
  {
    icon: FileText,
    title: 'Gestoría online',
    description: 'Contratos de arras, alquiler LAU y revisión legal. Entrega en 48 h.',
    href: '/gestoria',
    label: 'Ver contratos',
  },
  {
    icon: LineChart,
    title: 'Analizador de mercado',
    description: 'Precio del m² y tendencias en las principales ciudades de España.',
    href: '/analizador-mercado',
    label: 'Consultar datos',
  },
] as const

export default function HomeDiscoverGrid() {
  return (
    <Section
      className="py-16 bg-white"
      eyebrow="Explorar"
      title="Todo lo que ofrece Inmonest"
      description="Portal inmobiliario entre particulares y gestoría jurídica en un solo lugar."
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
