import Link from 'next/link'

type Props = {
  barrioNombre: string
  modo: 'venta' | 'compra'
}

const BLOG_COMPRA = [
  { href: '/blog/servicio-completo-compra-vivienda', label: 'Servicio completo de compra (blog)' },
  { href: '/blog/errores-comprar-piso-entre-particulares-2026', label: 'Errores al comprar entre particulares' },
  { href: '/blog/due-diligence-compra-vivienda', label: 'Due diligence pre-compra' },
  { href: '/blog/detectar-contrato-arras-fraudulento', label: 'Detectar arras fraudulentas' },
] as const

const BLOG_VENTA = [
  { href: '/blog/errores-comprar-piso-entre-particulares-2026', label: 'Qué exige el comprador (due diligence)' },
  { href: '/blog/detectar-contrato-arras-fraudulento', label: 'Red flags en contratos de arras' },
] as const

export default function BarcelonaCompletaRecursosSection({ barrioNombre, modo }: Props) {
  const links = modo === 'compra' ? BLOG_COMPRA : BLOG_VENTA
  const hubPath =
    modo === 'venta'
      ? '/gestoria/venta-completa-reserva-escritura/barcelona'
      : '/gestoria/compra-completa-reserva-escritura/barcelona'

  return (
    <section className="py-12 px-4 bg-slate-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg font-bold text-gray-900 mb-2 text-center">
          Recursos para {modo === 'venta' ? 'vender' : 'comprar'} en {barrioNombre}
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Artículos y servicios relacionados con compraventa entre particulares en Barcelona.
        </p>
        <ul className="grid sm:grid-cols-2 gap-2 mb-6">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="block rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gold-800 hover:border-gold-400 transition-colors"
              >
                {l.label} →
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-center text-sm">
          <Link href={hubPath} className="text-gold-700 font-semibold hover:underline">
            Hub {modo} completa Barcelona (gestoría) →
          </Link>
        </p>
      </div>
    </section>
  )
}
