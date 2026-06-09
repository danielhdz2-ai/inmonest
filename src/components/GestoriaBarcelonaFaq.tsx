import { GESTORIA_BARCELONA_FAQ } from '@/lib/gestoria-barcelona-faq'

export default function GestoriaBarcelonaFaq() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
          Preguntas frecuentes sobre gestoría inmobiliaria en Barcelona
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Respuestas específicas para el mercado barcelonés: normativa catalana, zona tensionada y compraventa entre particulares.
        </p>
        <div className="space-y-4">
          {GESTORIA_BARCELONA_FAQ.map((item) => (
            <details
              key={item.q}
              className="bg-gray-50 rounded-xl p-6 shadow-sm border border-gray-100 group"
            >
              <summary className="text-lg font-bold text-gray-900 cursor-pointer list-none flex justify-between items-start gap-4">
                {item.q}
                <span className="text-[#c9a84c] flex-shrink-0 group-open:rotate-45 transition-transform text-xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
