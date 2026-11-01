import Link from 'next/link'
import { GESTORIA_CIUDAD_RANKING } from '@/lib/gestoria-ciudad-ranking-content'

type Props = {
  ciudadSlug: string
  ciudadNombre: string
}

export default function GestoriaCiudadRankingSection({ ciudadSlug, ciudadNombre }: Props) {
  const config = GESTORIA_CIUDAD_RANKING[ciudadSlug]
  if (!config) return null

  return (
    <section className="py-12 px-4 bg-slate-50 border-y border-gray-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Guía: gestoría inmobiliaria en {ciudadNombre} (particulares)
        </h2>
        <div className="space-y-8">
          {config.sections.map((block) => (
            <div key={block.h3}>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{block.h3}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{block.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          {config.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-semibold hover:underline ${link.className ?? 'text-gold-800'}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
