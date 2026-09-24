import Link from 'next/link'
import {
  LANDINGS_POR_CIUDAD,
  filterCiudadesLandingActiva,
  getLandingPrecioDisplay,
  getNombreCiudad,
  type LandingPorCiudad,
} from '@/lib/gestoria-ciudades-inventario'

type Props = {
  /** Id en LANDINGS_POR_CIUDAD, p. ej. `contrato-arras` */
  landingId: string
  /** Resalta la ciudad actual (mismo estilo, sin ocultarla) */
  currentCiudadSlug?: string
  className?: string
  /** Sustituir título del bloque (por defecto el del inventario) */
  tituloOverride?: string
}

function getLanding(landingId: string): LandingPorCiudad | undefined {
  return LANDINGS_POR_CIUDAD.find((l) => l.id === landingId)
}

export default function GestoriaLandingCiudadesGrid({
  landingId,
  currentCiudadSlug,
  className = '',
  tituloOverride,
}: Props) {
  const landing = getLanding(landingId)
  if (!landing) return null

  const ciudades = filterCiudadesLandingActiva(landing.id, landing.ciudades)
  const precio = getLandingPrecioDisplay(landing)
  const titulo = tituloOverride ?? landing.nombre

  return (
    <section
      className={`py-12 px-4 sm:px-6 border-t border-gray-200 bg-gray-50/60 ${className}`}
      aria-labelledby={`landing-ciudades-${landingId}`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl border border-gray-200 bg-gray-50/50 p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <h2 id={`landing-ciudades-${landingId}`} className="text-lg font-bold text-gray-900">
              {titulo}
            </h2>
            {precio ? (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500/15 text-[#8a6420] border border-gold-500/25">
                {precio}
              </span>
            ) : null}
            <span className="text-xs text-gray-500">
              {ciudades.length} ciudad{ciudades.length !== 1 ? 'es' : ''}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-5 max-w-2xl">
            Contrato personalizado por ciudad — mismo servicio online, contenido adaptado a {titulo.includes('Arras') ? 'tu mercado local' : 'cada mercado'}.
          </p>
          <div className="flex flex-wrap gap-2">
            {ciudades.map((slug) => {
              const isCurrent = currentCiudadSlug === slug
              return (
                <Link
                  key={slug}
                  href={landing.href(slug)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-colors shadow-sm ${
                    isCurrent
                      ? 'bg-gold-500/15 border-gold-400 text-gold-900'
                      : 'bg-white border-gold-200 text-gold-800 hover:bg-cream-100 hover:border-gold-300'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
                  {getNombreCiudad(slug)}
                  {isCurrent ? (
                    <span className="text-[10px] font-bold uppercase text-gold-700">Aquí</span>
                  ) : (
                    <span className="text-gold-600 text-xs">→</span>
                  )}
                </Link>
              )
            })}
          </div>
          <p className="mt-5 text-xs text-gray-500">
            <Link href="/gestoria/ciudades" className="text-gold-700 font-semibold hover:underline">
              Ver inventario completo de landings por ciudad
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
