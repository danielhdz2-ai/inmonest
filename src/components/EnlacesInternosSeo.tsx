import Link from 'next/link'
import { GESTORIA_ENLACES_INDEXACION } from '@/lib/gestoria-indexar-urls'

export type EnlaceSeo = {
  href: string
  title: string
  description: string
  badge?: string
}

const ENLACES_HOME: EnlaceSeo[] = [
  {
    href: '/contratos-inmobiliarios',
    title: 'Contratos inmobiliarios',
    description: 'Redacción profesional para particulares. Desde 61€ en 48h.',
    badge: 'Captación',
  },
  {
    href: '/calculadora-gastos-alquiler',
    title: 'Calculadora gastos de alquiler',
    description: 'Coste mensual real gratis: renta + suministros.',
    badge: 'Gratis',
  },
  {
    href: '/gestoria/cuanto-cuesta-contrato-alquiler',
    title: '¿Cuánto cuesta un contrato de alquiler?',
    description: 'Desde 145€ online vs notario. Comparativa 2026.',
    badge: 'Guía',
  },
  {
    href: '/valencia/contrato-alquiler',
    title: 'Contrato alquiler Valencia',
    description: 'LAU desde 145€. Fianza Generalitat. Entrega 48h.',
    badge: 'Ciudad',
  },
  {
    href: '/bilbao/alquiler-particulares',
    title: 'Alquiler particulares Bilbao',
    description: 'Pisos sin comisión de agencia. Trato directo.',
    badge: 'Ciudad',
  },
  {
    href: '/malaga/alquiler-particulares',
    title: 'Alquiler particulares Málaga',
    description: 'Sin intermediarios. Contrato LAU opcional.',
    badge: 'Ciudad',
  },
  {
    href: '/bilbao/contrato-alquiler',
    title: 'Contrato alquiler Bilbao',
    description: 'LAU adaptado a normativa vasca. Desde 145€.',
    badge: 'Ciudad',
  },
  {
    href: '/blog/detectar-contrato-arras-fraudulento',
    title: 'Detectar arras fraudulentas',
    description: 'Señales de alerta antes de firmar.',
    badge: 'Blog',
  },
  {
    href: '/gestoria/prestamo-particulares',
    title: 'Préstamo entre particulares',
    description: 'Contrato legal con registro en Hacienda.',
    badge: 'Servicio',
  },
  {
    href: '/gestoria/alquiler-local-comercial/madrid',
    title: 'Local comercial Madrid',
    description: 'Contrato LAU empresarial desde 145€.',
    badge: 'Nuevo',
  },
  {
    href: '/gestoria/asesoria-compra-piso/valencia',
    title: 'Compra piso Valencia',
    description: '687€ fijos. Sin comisión de agencia.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/ciudades',
    title: 'Gestoría por ciudad',
    description: 'Todas las landings locales activas.',
    badge: 'Hub',
  },
]

const ENLACES_GESTORIA: EnlaceSeo[] = [...GESTORIA_ENLACES_INDEXACION]

function EnlaceCard({ enlace }: { enlace: EnlaceSeo }) {
  return (
    <Link
      href={enlace.href}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-gold-500/50 hover:shadow-md transition-all"
    >
      {enlace.badge && (
        <span className="mb-2 w-fit rounded-full bg-cream-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-gold-700 border border-gold-300/40">
          {enlace.badge}
        </span>
      )}
      <span className="font-semibold text-gray-900 group-hover:text-gold-700 transition-colors text-sm">
        {enlace.title}
      </span>
      <span className="mt-1 text-xs text-gray-500 leading-relaxed">{enlace.description}</span>
    </Link>
  )
}

type Props = {
  variant: 'home' | 'gestoria'
}

export default function EnlacesInternosSeo({ variant }: Props) {
  const enlaces = variant === 'home' ? ENLACES_HOME : ENLACES_GESTORIA
  const title =
    variant === 'home'
      ? 'Guías y servicios destacados'
      : 'Recursos útiles para tu operación'
  const subtitle =
    variant === 'home'
      ? 'Contratos, guías y landings con más demanda en España'
      : 'Artículos y landings que complementan nuestros servicios legales'

  return (
    <section className={variant === 'home' ? 'bg-white py-12' : 'bg-gray-50 py-12'}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900 mb-1">{title}</h2>
        <p className="text-gray-600 text-sm mb-6">{subtitle}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {enlaces.map((enlace) => (
            <EnlaceCard key={enlace.href} enlace={enlace} />
          ))}
        </div>
      </div>
    </section>
  )
}
