import Link from 'next/link'
import { listBarcelonaTemporadaBarrios } from '@/lib/barcelona-alquiler-temporada-barrios'

/** Enlaces internos desde /barcelona/alquiler-temporada hacia landings por barrio. */
export default function BarcelonaTemporadaBarriosHub() {
  const barrios = listBarcelonaTemporadaBarrios()

  return (
    <section className="rounded-2xl border border-gold-300 bg-gradient-to-br from-cream-50 to-white p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Barcelona por zonas</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Contrato de alquiler por temporada por barrio: meses sin confundir con LAU largo
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
        Además de la landing de Barcelona, publicamos guías por barrio con mercado local, distinción temporada /
        LAU / turismo y contratos <strong>personalizados</strong> con fechas y fianza claras. Elige tu zona:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {barrios.map((b) => (
          <Link
            key={b.slug}
            href={`/barcelona/alquiler-temporada/${b.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-gold-500 hover:shadow-md transition-all"
          >
            <h3 className="font-bold text-gray-900 group-hover:text-[#8a6420] mb-1">{b.nombre}</h3>
            <p className="text-xs text-gray-500 mb-2">{b.distrito}</p>
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed mb-2">{b.hero.subtitulo}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {b.destacados.etiquetas.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-amber-50 text-amber-900 border border-amber-100">
                  {tag}
                </span>
              ))}
            </div>
            <span className="inline-block mt-3 text-sm font-semibold text-gold-600">Ver contrato temporada →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
