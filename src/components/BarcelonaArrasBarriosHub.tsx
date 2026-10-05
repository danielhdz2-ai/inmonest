import Link from 'next/link'
import { listBarcelonaArrasBarrios } from '@/lib/barcelona-contrato-arras-barrios'

/** Enlaces internos desde /barcelona/contrato-arras hacia landings por barrio. */
export default function BarcelonaArrasBarriosHub() {
  const barrios = listBarcelonaArrasBarrios()

  return (
    <section className="rounded-2xl border border-gold-300 bg-gradient-to-br from-cream-50 to-white p-8">
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Barcelona por zonas</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Contrato de arras por barrio: SEO local para compradores y vendedores
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6 max-w-3xl">
        Además de la landing de Barcelona, publicamos guías por barrio con mercado de compraventa, ITP en Cataluña,
        condición de hipoteca y arras penitenciales <strong>personalizadas</strong> (145 €, 48 h). Elige tu zona:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {barrios.map((b) => (
          <Link
            key={b.slug}
            href={`/barcelona/contrato-arras/${b.slug}`}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:border-gold-500 hover:shadow-md transition-all"
          >
            <h3 className="font-bold text-gray-900 group-hover:text-[#8a6420] mb-1">{b.nombre}</h3>
            <p className="text-xs text-gray-500 mb-2">{b.distrito}</p>
            <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">{b.hero.anguloComprador}</p>
            <span className="inline-block mt-3 text-sm font-semibold text-gold-600">Ver contrato de arras →</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
