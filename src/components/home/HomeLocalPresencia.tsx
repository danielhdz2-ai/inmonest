import Image from 'next/image'
import Link from 'next/link'
import { getCiudadImage } from '@/lib/gestoria-images'

const CIUDADES = [
  { nombre: 'Madrid', slug: 'madrid' },
  { nombre: 'Barcelona', slug: 'barcelona' },
  { nombre: 'Valencia', slug: 'valencia' },
  { nombre: 'Sevilla', slug: 'sevilla' },
  { nombre: 'Málaga', slug: 'malaga' },
  { nombre: 'Bilbao', slug: 'bilbao' },
  { nombre: 'Zaragoza', slug: 'zaragoza' },
  { nombre: 'Alicante', slug: 'alicante' },
] as const

export default function HomeLocalPresencia() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 border-y border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-10">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">
              Presencia local
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Gestoría por ciudad
            </h2>
            <p className="mt-3 text-gray-600 text-sm sm:text-base leading-relaxed">
              Landings con normativa autonómica, IRAV y contexto de mercado. Alquiler LAU y arras en las
              principales ciudades.
            </p>
          </div>
          <Link
            href="/contratos-inmobiliarios"
            className="text-sm font-semibold text-gold-700 hover:text-gold-900 shrink-0"
          >
            Ver hub de contratos por ciudad →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CIUDADES.map((ciudad) => {
            const img = getCiudadImage(ciudad.slug)
            return (
              <article
                key={ciudad.slug}
                className="group relative overflow-hidden rounded-2xl aspect-[4/3] border border-gray-200/80 shadow-sm hover:shadow-md transition-all"
              >
                <Image
                  src={img.src}
                  alt={`Gestoría inmobiliaria en ${ciudad.nombre}`}
                  fill
                  className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                  <h3 className="text-white font-bold text-sm sm:text-base">{ciudad.nombre}</h3>
                  <div className="mt-2 flex flex-wrap gap-1.5 opacity-95">
                    <Link
                      href={`/${ciudad.slug}/contrato-alquiler`}
                      className="text-[10px] sm:text-xs font-semibold bg-white/95 text-gray-900 px-2 py-1 rounded-full hover:bg-gold-100 transition-colors"
                    >
                      Alquiler LAU
                    </Link>
                    <Link
                      href={`/${ciudad.slug}/contrato-arras`}
                      className="text-[10px] sm:text-xs font-semibold bg-white/15 text-white border border-white/30 px-2 py-1 rounded-full hover:bg-white/25 transition-colors"
                    >
                      Arras
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
