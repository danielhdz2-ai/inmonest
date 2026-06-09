type ZonaMercado = {
  nombre: string
  rango: string
  perfil: string
}

type CiudadHubMercadoProps = {
  ciudad: string
  zonas: ZonaMercado[]
  compraventa: React.ReactNode
  particularidades: string[]
}

export default function CiudadHubMercado({
  ciudad,
  zonas,
  compraventa,
  particularidades,
}: CiudadHubMercadoProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
        El mercado de alquiler y compraventa en <span className="text-[#c9962a]">{ciudad}</span> (2026)
      </h2>
      <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mt-2 mb-4">
            Zonas más demandadas para alquilar en {ciudad}
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {zonas.map((z) => (
              <li key={z.nombre}>
                <strong>{z.nombre}:</strong> {z.rango}, {z.perfil}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Precios de compraventa</h3>
          {compraventa}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            Particularidades del mercado en {ciudad}
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {particularidades.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
