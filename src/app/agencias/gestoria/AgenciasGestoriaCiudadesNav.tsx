import Link from 'next/link'
import {
  AGENCIAS_GESTORIA_CIUDADES,
  type AgenciaGestoriaCiudadSlug,
} from '@/lib/agencias-gestoria-ciudades'

type Props = {
  current?: AgenciaGestoriaCiudadSlug
  className?: string
}

export default function AgenciasGestoriaCiudadesNav({ current, className = '' }: Props) {
  return (
    <section className={`py-10 px-4 bg-white border-y border-gray-100 ${className}`}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Gestoría B2B por ciudad
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href="/agencias/gestoria"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              !current
                ? 'bg-gold-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Todas
          </Link>
          {AGENCIAS_GESTORIA_CIUDADES.map((c) => (
            <Link
              key={c.slug}
              href={`/agencias/gestoria/${c.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                current === c.slug
                  ? 'bg-gold-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {c.nombre}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
