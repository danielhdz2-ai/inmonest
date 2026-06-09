import Link from 'next/link'
import { SERVICIOS_DESTACADOS_CIUDAD } from '@/lib/gestoria-servicios-destacados'

type EnlaceCiudad = {
  slug: string
  href: string
  label: string
}

type CiudadHubServiciosGridProps = {
  ciudad: string
  subtitulo?: string
  enlacesCiudad?: EnlaceCiudad[]
}

export default function CiudadHubServiciosGrid({
  ciudad,
  subtitulo = 'Precios reales de nuestra gestoría para particulares. Sin comisiones de agencia.',
  enlacesCiudad,
}: CiudadHubServiciosGridProps) {
  return (
    <section className="bg-gray-50 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
          Contratos y servicios en {ciudad}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">{subtitulo}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICIOS_DESTACADOS_CIUDAD.map((servicio) => (
            <div
              key={servicio.slug}
              className={`bg-white rounded-xl p-6 shadow-lg border-2 transition-all hover:shadow-2xl ${
                servicio.popular
                  ? 'border-[#c9962a] transform hover:scale-[1.02]'
                  : 'border-gray-200 hover:border-[#c9962a]'
              }`}
            >
              {servicio.popular && (
                <div className="inline-block px-2 py-0.5 rounded-full bg-yellow-500 text-white text-[10px] font-bold mb-2">
                  ⭐ POPULAR
                </div>
              )}
              <div className="text-4xl mb-3">{servicio.icono}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{servicio.nombre}</h3>
              <p className="text-gray-600 text-sm mb-4">{servicio.descripcion}</p>
              <div className="text-2xl font-bold text-[#c9962a] mb-1">{servicio.precio}€</div>
              <p className="text-xs text-gray-500 mb-3">IVA incluido</p>
              <Link
                href={`/gestoria/solicitar/${servicio.slug}`}
                className="block text-center py-2 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white text-sm font-semibold transition"
              >
                Solicitar
              </Link>
              {enlacesCiudad
                ?.filter((e) => e.slug === servicio.slug)
                .map((e) => (
                  <Link
                    key={e.href}
                    href={e.href}
                    className="block text-center mt-2 text-sm text-[#c9962a] hover:underline font-medium"
                  >
                    {e.label}
                  </Link>
                ))}
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/gestoria"
            className="inline-block px-8 py-3 rounded-lg border-2 border-[#c9962a] text-[#c9962a] font-semibold hover:bg-[#c9962a] hover:text-white transition"
          >
            Ver todos los servicios y precios →
          </Link>
        </div>
      </div>
    </section>
  )
}
