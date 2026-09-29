import Link from 'next/link'
import { listBarcelonaAlquilerBarrios } from '@/lib/barcelona-contrato-alquiler-barrios'

/** Enlaces internos desde /barcelona/contrato-alquiler hacia landings por barrio. */
export default function BarcelonaAlquilerBarriosHub() {
  const barrios = listBarcelonaAlquilerBarrios()

  return (
    <section className="rounded-2xl border border-gold-300 bg-gradient-to-br from-cream-50 to-white p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Barcelona por zonas</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Contrato LAU por barrio: contenido local para propietarios e inquilinos
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
        Además de la landing de Barcelona, hemos publicado guías por barrio con mercado, normativa (LAU, Ley de
        Vivienda, INCASÒL, zona tensionada) y contratos <strong>personalizados y jurídicamente blindados</strong>.
        Elige tu zona:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {barrios.map((b) => (
          <Link
            key={b.slug}
            href={`/barcelona/contrato-alquiler/${b.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-gold-500 hover:shadow-md transition-all"
          >
            <h3 className="font-bold text-gray-900 group-hover:text-[#8a6420] mb-1">{b.nombre}</h3>
            <p className="text-xs text-gray-500 mb-2">{b.distrito}</p>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{b.hero.anguloPropietario}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-gold-600">Ver contrato LAU →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
