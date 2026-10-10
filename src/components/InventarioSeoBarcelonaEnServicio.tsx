import Link from 'next/link'
import type { BarcelonaSeoServicioBloque } from '@/lib/barcelona-seo-inventario'

type Props = {
  barcelona: BarcelonaSeoServicioBloque | undefined
}

/** Bloque compacto bajo el chip Barcelona en cada fila del inventario nacional. */
export default function InventarioSeoBarcelonaEnServicio({ barcelona }: Props) {
  if (!barcelona) return null

  const { conteo, enlaces } = barcelona
  const barrioEnlaces = enlaces.filter((e) => e.tipo === 'barrio')
  const ciudadEnlaces = enlaces.filter((e) => e.tipo === 'ciudad')

  return (
    <div className="mt-4 pt-4 border-t border-dashed border-gold-300/50">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Barcelona</span>
        <span className="text-xs px-2 py-0.5 rounded-full bg-gold-500/10 text-[#8a6420] font-semibold border border-gold-500/20">
          {conteo.totalBarcelona} landing{conteo.totalBarcelona !== 1 ? 's' : ''} en BCN
        </span>
        {conteo.landingsBarrio > 0 ? (
          <span className="text-xs text-gray-600">
            {conteo.landingsCiudad} ciudad + {conteo.landingsBarrio} barrio
            {conteo.landingsBarrio !== 1 ? 's' : ''}
          </span>
        ) : (
          <span className="text-xs text-gray-600">solo variante ciudad</span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {ciudadEnlaces.map((e) => (
          <Link
            key={e.path}
            href={e.path}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-800 hover:border-gold-400 transition-colors"
          >
            Hub Barcelona →
          </Link>
        ))}
        {barrioEnlaces.map((e) => (
          <Link
            key={e.path}
            href={e.path}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-cream-50 border border-gold-200 text-xs font-medium text-gold-900 hover:bg-gold-500/10 transition-colors"
          >
            {e.label.replace(' (barrio)', '')}
          </Link>
        ))}
      </div>
    </div>
  )
}
