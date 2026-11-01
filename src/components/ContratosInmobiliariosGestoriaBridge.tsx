import Link from 'next/link'
import { COMPRA_COMPLETA_CIUDADES } from '@/lib/compra-completa-ciudad-data'

type Props = {
  ciudadNombre: string
  ciudadSlug: string
  enlaceGestoria: string
}

const VENTA_SLUGS = new Set([
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'salamanca',
  'valladolid',
  'alicante',
  'bilbao',
  'zaragoza',
  'coruna',
  'pamplona',
  'murcia',
  'granada',
  'mallorca',
  'asturias',
  'santander',
  'vitoria',
  'san-sebastian',
])

export default function ContratosInmobiliariosGestoriaBridge({
  ciudadNombre,
  ciudadSlug,
  enlaceGestoria,
}: Props) {
  const hasCompra = Boolean(COMPRA_COMPLETA_CIUDADES[ciudadSlug])
  const hasVenta = VENTA_SLUGS.has(ciudadSlug)
  const hubLabel =
    enlaceGestoria === `/gestoria/${ciudadSlug}`
      ? `Gestoría inmobiliaria ${ciudadNombre}`
      : `Gestoría en ${ciudadNombre}`

  return (
    <section className="border-b border-gold-200/40 bg-cream-50 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          ¿Necesitas gestoría inmobiliaria en {ciudadNombre}, no solo el contrato?
        </h2>
        <p className="text-sm text-gray-600 mb-5 max-w-2xl leading-relaxed">
          Inmonest redacta contratos y te acompaña con gestor dedicado: alquiler LAU desde 145 €, arras, revisión de
          borradores y packs venta/compra completa 687 € hasta escritura — sin comisión de agencia.
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <Link
            href={enlaceGestoria}
            className="rounded-full bg-gold-500 px-5 py-2 font-bold text-gray-900 hover:bg-gold-400"
          >
            {hubLabel}
          </Link>
          <Link href="/gestoria/solicitar/contrato-alquiler" className="rounded-full border border-gray-300 px-4 py-2 font-semibold hover:border-gold-400">
            LAU 145 €
          </Link>
          <Link href="/gestoria/arras-penitenciales" className="rounded-full border border-gray-300 px-4 py-2 font-semibold hover:border-gold-400">
            Arras 145 €
          </Link>
          {hasVenta ? (
            <Link
              href={`/gestoria/venta-completa-reserva-escritura/${ciudadSlug}`}
              className="rounded-full border border-gray-300 px-4 py-2 font-semibold hover:border-gold-400"
            >
              Venta completa 687 €
            </Link>
          ) : null}
          {hasCompra ? (
            <Link
              href={`/gestoria/compra-completa-reserva-escritura/${ciudadSlug}`}
              className="rounded-full border border-emerald-400 px-4 py-2 font-semibold text-emerald-900 hover:bg-emerald-50"
            >
              Compra completa 687 €
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}
