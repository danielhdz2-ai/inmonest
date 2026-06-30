import { getLocalRegulations } from '@/lib/local-regulations-data'

type LocalRegulationsBlockProps = {
  ciudad: string
  region: string
  servicio?: 'compra' | 'due-diligence' | 'arras'
}

export default function LocalRegulationsBlock({
  ciudad,
  region,
  servicio = 'compra',
}: LocalRegulationsBlockProps) {
  const bloques = getLocalRegulations(region)
  const servicioLabel =
    servicio === 'due-diligence'
      ? 'due diligence'
      : servicio === 'arras'
        ? 'contrato de arras'
        : 'compra de vivienda'

  return (
    <section className="py-14 px-4 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          Normativa local en {ciudad}
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Qué revisamos en tu {servicioLabel} según la normativa de {region}.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {bloques.map((bloque) => (
            <div
              key={bloque.titulo}
              className="bg-slate-50 border border-gray-200 rounded-xl p-6"
            >
              <h3 className="font-bold text-gray-900 mb-4">{bloque.titulo}</h3>
              <ul className="space-y-2">
                {bloque.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-[#c9962a] mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
