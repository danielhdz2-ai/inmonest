'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import FiltersSidebar from './FiltersSidebar'
import ResultsHeader from './ResultsHeader'
import ListingCard from './ListingCard'
import ListingCardList from './ListingCardList'
import type { Listing, VistaOption } from '@/types/listings'
import Link from 'next/link'

const MapSearchView = dynamic(() => import('./MapSearchView'), { ssr: false })

interface CurrentParams {
  ciudad: string
  operacion: string
  soloParticulares: boolean
  soloBancarias?: boolean
  soloAgencias?: boolean
  ordenar: string
  vista: string
  precioMin?: number
  precioMax?: number
  habitaciones?: number
  banosMin?: number
  areaMin?: number
  areaMax?: number
  // Filtros pro
  estado?: string
  caract?: string
  planta?: string
  energia?: string
  multimedia?: string
  fechaPub?: string
}

interface SearchResultsProps {
  listings: Listing[]
  total: number
  pagina: number
  totalPaginas: number
  vista: VistaOption
  currentParams: CurrentParams
  activeFilterCount: number
}

export default function SearchResults({
  listings,
  total,
  pagina,
  totalPaginas,
  vista,
  currentParams,
  activeFilterCount,
}: SearchResultsProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  function buildHref(overrides: Record<string, string>) {
    const p = new URLSearchParams()
    if (currentParams.ciudad) p.set('ciudad', currentParams.ciudad)
    if (currentParams.operacion) p.set('operacion', currentParams.operacion)
    if (currentParams.soloParticulares) p.set('solo_particulares', 'true')
    if (currentParams.soloBancarias) p.set('solo_bancarias', 'true')
    if (currentParams.soloAgencias)  p.set('solo_agencias', 'true')
    if (currentParams.ordenar && currentParams.ordenar !== 'relevancia') p.set('ordenar', currentParams.ordenar)
    if (currentParams.vista && currentParams.vista !== 'lista') p.set('vista', currentParams.vista)
    if (currentParams.precioMin) p.set('precio_min', String(currentParams.precioMin))
    if (currentParams.precioMax) p.set('precio_max', String(currentParams.precioMax))
    if (currentParams.habitaciones != null) p.set('hab', String(currentParams.habitaciones))
    if (currentParams.banosMin) p.set('banos', String(currentParams.banosMin))
    if (currentParams.areaMin) p.set('area_min', String(currentParams.areaMin))
    if (currentParams.areaMax) p.set('area_max', String(currentParams.areaMax))
    if (currentParams.estado) p.set('estado', currentParams.estado)
    if (currentParams.caract) p.set('caract', currentParams.caract)
    if (currentParams.planta) p.set('planta', currentParams.planta)
    if (currentParams.energia) p.set('energia', currentParams.energia)
    if (currentParams.multimedia) p.set('multimedia', currentParams.multimedia)
    if (currentParams.fechaPub) p.set('fecha_pub', currentParams.fechaPub)
    Object.entries(overrides).forEach(([k, v]) => {
      if (v) p.set(k, v)
      else p.delete(k)
    })
    return `/pisos?${p.toString()}`
  }

  return (
    <div className={`flex gap-6 items-start ${vista === 'mapa' ? 'overflow-hidden' : ''}`}>
      {/* Sidebar filtros — oculto en vista mapa (el chat IA reemplaza su función) */}
      {vista !== 'mapa' && <FiltersSidebar isOpen={filtersOpen} onClose={() => setFiltersOpen(false)} />}

      {/* Columna principal */}
      <div className="flex-1 min-w-0">
        {/* Header resultados */}
        <ResultsHeader
          total={total}
          onOpenFilters={() => setFiltersOpen(true)}
          activeFilterCount={activeFilterCount}
        />

        {/* Listado / Mapa */}
        {listings.length > 0 ? (
          vista === 'mapa' ? (
            <MapSearchView
              listings={listings}
              total={total}
              ciudad={currentParams.ciudad}
              searchQuery={(() => {
                const p = new URLSearchParams()
                if (currentParams.ciudad) p.set('ciudad', currentParams.ciudad)
                if (currentParams.operacion) p.set('operacion', currentParams.operacion)
                if (currentParams.soloParticulares) p.set('solo_particulares', 'true')
                if (currentParams.soloBancarias) p.set('solo_bancarias', 'true')
                if (currentParams.soloAgencias)  p.set('solo_agencias', 'true')
                if (currentParams.precioMin) p.set('precio_min', String(currentParams.precioMin))
                if (currentParams.precioMax) p.set('precio_max', String(currentParams.precioMax))
                if (currentParams.habitaciones != null) p.set('hab', String(currentParams.habitaciones))
                if (currentParams.banosMin) p.set('banos', String(currentParams.banosMin))
                if (currentParams.areaMin) p.set('area_min', String(currentParams.areaMin))
                if (currentParams.areaMax) p.set('area_max', String(currentParams.areaMax))
                if (currentParams.estado) p.set('estado', currentParams.estado)
                if (currentParams.caract) p.set('caract', currentParams.caract)
                if (currentParams.planta) p.set('planta', currentParams.planta)
                if (currentParams.energia) p.set('energia', currentParams.energia)
                if (currentParams.multimedia) p.set('multimedia', currentParams.multimedia)
                if (currentParams.fechaPub) p.set('fecha_pub', currentParams.fechaPub)
                return p.toString()
              })()}
            />
          ) : vista === 'lista' ? (
            <div className="flex flex-col gap-3">
              {listings.map((listing, index) => (
                <>
                  <ListingCardList key={listing.id} listing={listing} />
                  
                  {/* Banner gestoría después del piso #6 (solo en página 1) */}
                  {index === 5 && pagina === 1 && (
                    <div className="bg-gradient-to-r from-[#1a0d00] to-[#2e1900] rounded-2xl p-6 sm:p-8 my-4 shadow-lg">
                      <div className="max-w-4xl mx-auto text-center">
                        <div className="text-5xl mb-4">🏠📄</div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                          ¿Vas a comprar o vender un piso?
                        </h2>
                        <p className="text-white/90 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
                          Gestoría inmobiliaria especializada te acompaña en todo el proceso. <strong>Contratos profesionales, documentación completa, asesoramiento experto.</strong> Desde 61€.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <Link
                            href="/gestoria"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-semibold hover:bg-[#a87a20] transition-colors shadow-xl"
                          >
                            Ver servicios de gestoría →
                          </Link>
                          <Link
                            href="/gestoria/venta-completa-reserva-escritura"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/40 text-white font-medium hover:bg-white/10 transition-colors"
                          >
                            Venta completa 687€
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {listings.map((listing, index) => (
                <>
                  <ListingCard key={listing.id} listing={listing} />
                  
                  {/* Banner gestoría después del piso #6 (solo en página 1) */}
                  {index === 5 && pagina === 1 && (
                    <div className="col-span-full bg-gradient-to-r from-[#1a0d00] to-[#2e1900] rounded-2xl p-6 sm:p-8 my-4 shadow-lg">
                      <div className="max-w-4xl mx-auto text-center">
                        <div className="text-5xl mb-4">🏠📄</div>
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-white">
                          ¿Vas a comprar o vender un piso?
                        </h2>
                        <p className="text-white/90 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
                          Gestoría inmobiliaria especializada te acompaña en todo el proceso. <strong>Contratos profesionales, documentación completa, asesoramiento experto.</strong> Desde 61€.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <Link
                            href="/gestoria"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white text-lg font-semibold hover:bg-[#a87a20] transition-colors shadow-xl"
                          >
                            Ver servicios de gestoría →
                          </Link>
                          <Link
                            href="/gestoria/venta-completa-reserva-escritura"
                            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/40 text-white font-medium hover:bg-white/10 transition-colors"
                          >
                            Venta completa 687€
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-lg font-semibold text-gray-700">No encontramos anuncios</h2>
            <p className="text-gray-500 mt-1 text-sm">Prueba con otra ciudad o amplía los filtros</p>
            <Link
              href="/pisos"
              className="mt-5 inline-block px-5 py-2.5 bg-gold-500 text-white rounded-full text-sm font-semibold hover:bg-gold-600 transition-colors"
            >
              Ver todos los anuncios
            </Link>
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="mt-8 flex justify-center items-center gap-2">
            {pagina > 1 && (
              <Link
                href={buildHref({ pagina: String(pagina - 1) })}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                ← Anterior
              </Link>
            )}
            <span className="px-4 py-2 rounded-lg bg-gold-500 text-white text-sm font-semibold">
              {pagina} / {totalPaginas}
            </span>
            {pagina < totalPaginas && (
              <Link
                href={buildHref({ pagina: String(pagina + 1) })}
                className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Siguiente →
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
