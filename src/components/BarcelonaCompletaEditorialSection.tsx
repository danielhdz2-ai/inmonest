import type { BarcelonaCompletaEditorial } from '@/lib/barcelona-completa-editorial'
import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'

type Props = {
  editorial: BarcelonaCompletaEditorial
  barrioNombre: string
}

export default function BarcelonaCompletaEditorialSection({ editorial, barrioNombre }: Props) {
  return (
    <section className="py-16 px-4 bg-cream-50 border-t border-gold-200/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{editorial.guiaTitulo}</h2>
        {editorial.intro.map((p) => (
          <p key={p.slice(0, 48)} className="text-gray-700 leading-relaxed mb-4">
            {p}
          </p>
        ))}

        <div className="mt-10 bg-white rounded-xl border border-gold-200/50 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{editorial.trámiteLocal.titulo}</h3>
          <p className="text-gray-600 leading-relaxed text-sm">{editorial.trámiteLocal.cuerpo}</p>
        </div>

        <div className="mt-10 grid md:grid-cols-1 gap-5">
          {editorial.casos.map((c) => (
            <article key={c.titulo} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-bold text-gray-900 mb-2">{c.titulo}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{c.cuerpo}</p>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-bold text-gray-900 mb-4">{editorial.normativa.titulo}</h3>
          <ul className="space-y-2">
            {editorial.normativa.items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                <GestoriaCheckIcon className="mt-0.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-sm text-gray-500 italic border-l-4 border-gold-400 pl-4">{editorial.caNota}</p>
        <p className="mt-4 text-xs text-gray-400">
          Contenido actualizado para {barrioNombre} · Barcelona · marzo 2026
        </p>
      </div>
    </section>
  )
}
