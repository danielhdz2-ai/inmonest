import type { AgenciaGestoriaCiudadConfig } from '@/lib/agencias-gestoria-ciudades'

type Props = {
  ciudad: AgenciaGestoriaCiudadConfig
}

export default function AgenciasGestoriaMercadoLocal({ ciudad }: Props) {
  return (
    <section className="py-16 px-4 bg-[#fdfbf5] border-y border-gold-100">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-start">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
            Mercado inmobiliario · {ciudad.region}
          </p>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Gestoría para agencias en {ciudad.nombre}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{ciudad.mercadoLocal}</p>
          <p className="text-sm text-gray-700">
            <strong>Operativa habitual:</strong> {ciudad.operativaTipica}
          </p>
        </div>
        <div className="rounded-2xl border border-gold-200 bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">
            Zonas donde operan nuestras agencias
          </p>
          <div className="flex flex-wrap gap-2">
            {ciudad.zonas.map((zona) => (
              <span
                key={zona}
                className="px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700"
              >
                {zona}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            Contratos adaptados a la operativa de {ciudad.nombre}: arras, alquiler LAU, temporada,
            habitación y compraventa entre particulares.
          </p>
        </div>
      </div>
    </section>
  )
}
