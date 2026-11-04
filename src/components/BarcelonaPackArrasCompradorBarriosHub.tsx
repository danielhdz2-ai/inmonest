import Link from 'next/link'
import { listBarcelonaPackArrasDocumentalBarrios } from '@/lib/barcelona-pack-arras-documental-barrios'

export default function BarcelonaPackArrasCompradorBarriosHub() {
  const barrios = listBarcelonaPackArrasDocumentalBarrios()

  return (
    <section className="py-12 px-4 bg-cream-50 border-y border-gold-200/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
          Pack Arras Plus comprador por barrio en Barcelona
        </h2>
        <p className="text-center text-gray-600 text-sm mb-8 max-w-2xl mx-auto">
          Arras penitenciales + revisión documental (450 €) con contenido local por zona. Hub ciudad:{' '}
          <Link
            href="/gestoria/pack-arras-revision-documental/barcelona"
            className="text-gold-700 font-semibold hover:underline"
          >
            Pack Barcelona →
          </Link>
        </p>
        <ul className="flex flex-wrap justify-center gap-2">
          {barrios.map((b) => (
            <li key={b.slug}>
              <Link
                href={`/barcelona/pack-arras-comprador/${b.slug}`}
                className="text-sm font-semibold px-3 py-2 rounded-lg bg-white border border-gold-200 text-gold-900 hover:bg-gold-500/10 transition-colors"
              >
                {b.nombre} →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
