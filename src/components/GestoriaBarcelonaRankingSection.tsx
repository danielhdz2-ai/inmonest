import Link from 'next/link'
import { GESTORIA_BARCELONA_RANKING_SECTIONS } from '@/lib/gestoria-barcelona-ranking-content'

export default function GestoriaBarcelonaRankingSection() {
  return (
    <section className="py-12 px-4 bg-slate-50 border-y border-gray-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Guía: gestoría inmobiliaria en Barcelona (particulares)
        </h2>
        <div className="space-y-8">
          {GESTORIA_BARCELONA_RANKING_SECTIONS.map((block) => (
            <div key={block.h3}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{block.h3}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Link href="/gestoria/solicitar/contrato-alquiler?ciudad=barcelona" className="font-semibold text-gold-800 hover:underline">
            Contratar LAU Barcelona
          </Link>
          <Link href="/barcelona/venta-completa/eixample" className="font-semibold text-gold-800 hover:underline">
            Venta completa Eixample
          </Link>
          <Link href="/barcelona/compra-completa/eixample" className="font-semibold text-emerald-800 hover:underline">
            Compra completa Eixample
          </Link>
          <Link href="/contratos-inmobiliarios/barcelona" className="font-semibold text-gray-700 hover:underline">
            Contratos inmobiliarios Barcelona
          </Link>
        </div>
      </div>
    </section>
  )
}
