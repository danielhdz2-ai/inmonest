import type { AgenciaCasoExito } from '@/lib/agencias-gestoria-trust'
import { AGENCIAS_CASOS_EXITO } from '@/lib/agencias-gestoria-trust'

type Props = {
  casos?: AgenciaCasoExito[]
  titulo?: string
  subtitulo?: string
}

export default function AgenciasCasosSection({
  casos = AGENCIAS_CASOS_EXITO,
  titulo = 'Agencias que ya operan con nosotros',
  subtitulo = 'No solo sellos legales: inmobiliarias, APIs y autónomos que contratan contratos cada mes y ahorran horas de gestión.',
}: Props) {
  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
            Casos reales
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{titulo}</h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">{subtitulo}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {casos.map((caso) => (
            <article
              key={caso.id}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-bold text-gray-900">{caso.agencia}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {caso.ciudad} · {caso.volumen}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wide text-gold-700 bg-gold-50 border border-gold-200 px-2 py-1 rounded-full shrink-0">
                  {caso.tipo}
                </span>
              </div>

              <div className="rounded-xl bg-[#fdfbf5] border border-gold-100 px-4 py-3 mb-4">
                <p className="text-2xl font-black text-gold-600">{caso.cifra}</p>
                <p className="text-xs text-gray-600 mt-0.5">{caso.cifraLabel}</p>
                {caso.pack && (
                  <p className="text-[10px] text-gray-400 mt-1">{caso.pack}</p>
                )}
              </div>

              <blockquote className="text-sm text-gray-700 leading-relaxed flex-1 italic border-l-2 border-gold-300 pl-4">
                &ldquo;{caso.quote}&rdquo;
              </blockquote>

              <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
                <span className="font-semibold text-gray-700">{caso.persona}</span>
                {caso.rol && <> · {caso.rol}</>}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
