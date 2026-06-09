import Image from 'next/image'
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
              className={`bg-white rounded-xl shadow-lg border-2 transition-all hover:shadow-2xl overflow-hidden flex flex-col ${
                servicio.popular
                  ? 'border-[#c9962a] transform hover:scale-[1.02]'
                  : 'border-gray-200 hover:border-[#c9962a]'
              }`}
            >
              <div className="relative h-40 w-full bg-gray-100">
                <Image
                  src={servicio.imagen}
                  alt={`${servicio.nombre} — gestoría inmobiliaria en ${ciudad}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[#a87a20] border border-[#c9962a]/20">
                  {servicio.categoria}
                </span>
                {servicio.popular && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-[#c9962a] text-white text-[10px] font-bold uppercase tracking-wide">
                    Popular
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{servicio.nombre}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1">{servicio.descripcion}</p>
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
