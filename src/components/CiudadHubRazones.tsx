import type { CiudadHubRazon } from '@/lib/gestoria-ciudad-hub-data'

type CiudadHubRazonesProps = {
  ciudad: string
  razones: CiudadHubRazon[]
}

export default function CiudadHubRazones({ ciudad, razones }: CiudadHubRazonesProps) {
  return (
    <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          ¿Por qué necesitas asesoramiento en <span className="text-gold-500">{ciudad}</span>?
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Cada mercado tiene normativa y riesgos propios. Estas son las razones reales para no firmar a ciegas.
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {razones.map((r) => (
            <div key={r.titulo} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{r.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{r.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
