import Link from 'next/link'

export type EnlaceSeo = {
  href: string
  title: string
  description: string
  badge?: string
}

const ENLACES_HOME: EnlaceSeo[] = [
  {
    href: '/gestoria/cuanto-cuesta-contrato-alquiler',
    title: '¿Cuánto cuesta un contrato de alquiler?',
    description: 'Precios reales, comparativa y guía LAU 2026.',
    badge: 'Guía',
  },
  {
    href: '/bilbao/contrato-alquiler',
    title: 'Contrato alquiler Bilbao',
    description: 'LAU adaptado a normativa vasca. Desde 120€.',
    badge: 'Ciudad',
  },
  {
    href: '/malaga/contrato-alquiler',
    title: 'Contrato alquiler Málaga',
    description: 'Redacción profesional en 48h. Desde 120€.',
    badge: 'Ciudad',
  },
  {
    href: '/blog/vender-piso-sin-comisiones',
    title: 'Vender piso sin comisiones',
    description: 'Guía completa para vender entre particulares.',
    badge: 'Blog',
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
]

const ENLACES_GESTORIA: EnlaceSeo[] = [
  {
    href: '/gestoria/cuanto-cuesta-contrato-alquiler',
    title: 'Precio contrato alquiler 2026',
    description: 'Tabla comparativa y desglose de costes.',
    badge: 'Guía',
  },
  {
    href: '/blog/que-es-gestoria-inmobiliaria',
    title: '¿Qué es una gestoría inmobiliaria?',
    description: 'Cuándo la necesitas y qué incluye.',
    badge: 'Blog',
  },
  {
    href: '/bilbao/contrato-alquiler',
    title: 'Alquiler en Bilbao',
    description: 'Contrato LAU con normativa autonómica.',
    badge: 'Ciudad',
  },
  {
    href: '/malaga/contrato-alquiler',
    title: 'Alquiler en Málaga',
    description: 'Protección para propietarios e inquilinos.',
    badge: 'Ciudad',
  },
  {
    href: '/gestoria/due-diligence-precompra',
    title: 'Due diligence precompra',
    description: 'Revisión legal completa antes de comprar. 350€.',
    badge: 'Servicio',
  },
  {
    href: '/blog/vender-piso-sin-comisiones',
    title: 'Vender sin agencia',
    description: 'Estrategia para vender entre particulares.',
    badge: 'Blog',
  },
]

function EnlaceCard({ enlace }: { enlace: EnlaceSeo }) {
  return (
    <Link
      href={enlace.href}
      className="group flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-[#c9962a]/50 hover:shadow-md transition-all"
    >
      {enlace.badge && (
        <span className="mb-2 w-fit rounded-full bg-[#fef9e8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#a87a20] border border-[#f4c94a]/40">
          {enlace.badge}
        </span>
      )}
      <span className="font-semibold text-gray-900 group-hover:text-[#a87a20] transition-colors text-sm">
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
