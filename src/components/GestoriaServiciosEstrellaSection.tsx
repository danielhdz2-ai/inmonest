import Link from 'next/link'

/** Enlaces a landings con tracción GSC (actualizar trimestralmente). */
const ESTRELLA = [
  {
    href: '/gestoria/cuanto-cuesta-contrato-alquiler',
    label: 'Precio contrato de alquiler LAU',
    hint: 'Desde 145 € · 48 h',
  },
  {
    href: '/gestoria/arras-penitenciales',
    label: 'Contrato de arras penitenciales',
    hint: '145 €',
  },
  {
    href: '/gestoria/contrato-alquiler',
    label: 'Contrato alquiler vivienda LAU',
    hint: '145 €',
  },
  {
    href: '/gestoria/pack-due-diligence-precompra',
    label: 'Due diligence pre-compra',
    hint: '350 €',
  },
  {
    href: '/blog/detectar-contrato-arras-fraudulento',
    label: 'Detectar arras fraudulentas (guía)',
    hint: 'Blog',
  },
  {
    href: '/gestoria/contrato-alquiler-habitacion/barcelona',
    label: 'Alquiler habitación Barcelona',
    hint: '145 €',
  },
] as const

type Props = {
  ciudadSlug?: string
  ciudadNombre?: string
}

export default function GestoriaServiciosEstrellaSection({ ciudadSlug, ciudadNombre }: Props) {
  const ciudadLinks =
    ciudadSlug && ciudadNombre
      ? [
          { href: `/gestoria/${ciudadSlug}`, label: `Hub gestoría ${ciudadNombre}`, hint: 'Todos los servicios' },
          {
            href: `/gestoria/venta-completa-reserva-escritura/${ciudadSlug}`,
            label: `Venta completa ${ciudadNombre}`,
            hint: '687 €',
          },
          {
            href: `/gestoria/compra-completa-reserva-escritura/${ciudadSlug}`,
            label: `Compra completa ${ciudadNombre}`,
            hint: '687 €',
          },
        ]
      : []

  return (
    <section className="py-12 px-4 bg-white border-t border-gray-100">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">Servicios más buscados</h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Acceso directo a contratos y packs con gestor — contrata online o habla con Daniel por WhatsApp.
        </p>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[...ciudadLinks, ...ESTRELLA].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex flex-col rounded-xl border border-gray-200 bg-slate-50 px-4 py-3 hover:border-gold-400 transition-colors h-full"
              >
                <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                <span className="text-xs text-gold-700 mt-1">{item.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
