import Link from 'next/link'
import GestoriaUrlsIndexacion from '@/components/GestoriaUrlsIndexacion'
import InventarioSeoBarcelonaSection from '@/components/InventarioSeoBarcelonaSection'
import InventarioSeoBarcelonaEnServicio from '@/components/InventarioSeoBarcelonaEnServicio'
import BarcelonaSeoInventarioPanel from '@/components/BarcelonaSeoInventarioPanel'
import { buildBarcelonaSeoInventario } from '@/lib/barcelona-seo-inventario'
import {
  LANDINGS_GENERICAS,
  LANDINGS_POR_CIUDAD,
  contarLandingsPorCiudad,
  filterCiudadesLandingActiva,
  getLandingPrecioDisplay,
  getNombreCiudad,
} from '@/lib/gestoria-ciudades-inventario'

export default function InventarioSeoAdminContent() {
  const totalPorCiudad = contarLandingsPorCiudad()
  const inventarioBarcelona = buildBarcelonaSeoInventario()

  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <p className="text-xs font-bold text-gold-600 uppercase tracking-widest mb-2">Administración</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Inventario SEO · Landings por ciudad</h1>
        <p className="text-gray-600 mt-2 max-w-2xl text-sm leading-relaxed">
          Herramienta interna: URLs activas, desglose Barcelona por barrio y pendientes GSC. No indexable.
        </p>
      </header>

      <div className="flex flex-wrap gap-3 mb-8">
        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-800">
          {totalPorCiudad} páginas activas (España)
        </span>
        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white border border-gray-200 text-sm font-semibold text-gray-800">
          {LANDINGS_POR_CIUDAD.length} tipos de servicio
        </span>
        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gold-500/15 border border-gold-300 text-sm font-semibold text-[#8a6420]">
          {inventarioBarcelona.totalUrls} URLs Barcelona
        </span>
      </div>

      <div id="barcelona" className="scroll-mt-6">
        <InventarioSeoBarcelonaSection inventario={inventarioBarcelona} />
      </div>

      <div id="barcelona-gsc" className="scroll-mt-6">
        <BarcelonaSeoInventarioPanel inventario={inventarioBarcelona} />
      </div>

      <div className="mt-10 space-y-8">
        {LANDINGS_POR_CIUDAD.map((servicio) => (
          <div
            key={servicio.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <h2 className="text-lg font-bold text-gray-900">{servicio.nombre}</h2>
              {getLandingPrecioDisplay(servicio) ? (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gold-500/15 text-[#8a6420] border border-gold-500/25">
                  {getLandingPrecioDisplay(servicio)}
                </span>
              ) : null}
              <span className="text-xs text-gray-500">
                {servicio.ciudades.length} ciudad{servicio.ciudades.length !== 1 ? 'es' : ''}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {filterCiudadesLandingActiva(servicio.id, servicio.ciudades).map((slug) => (
                <Link
                  key={slug}
                  href={servicio.href(slug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gold-200 text-sm font-medium text-gold-800 hover:bg-cream-100 transition-colors"
                >
                  {getNombreCiudad(slug)}
                  <span className="text-gold-600 text-xs">↗</span>
                </Link>
              ))}
            </div>

            <InventarioSeoBarcelonaEnServicio
              barcelona={inventarioBarcelona.porServicioId[servicio.id]}
            />
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Landing pages genéricas</h2>
          <span className="text-sm font-semibold text-gray-500">
            {LANDINGS_GENERICAS.length} sin variante local
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LANDINGS_GENERICAS.map((page) => (
            <Link
              key={page.slug}
              href={page.href ?? `/gestoria/${page.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-gray-200 hover:border-gold-500 hover:bg-cream-50 transition-colors"
            >
              <div className="min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{page.nombre}</p>
                <p className="text-xs text-gray-500 truncate">{page.href ?? `/gestoria/${page.slug}`}</p>
              </div>
              <span className="text-xs font-bold text-gold-500 shrink-0">
                {getLandingPrecioDisplay(page)}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <GestoriaUrlsIndexacion />
    </div>
  )
}
