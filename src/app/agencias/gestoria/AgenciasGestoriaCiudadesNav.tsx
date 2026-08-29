import Link from 'next/link'
import {
  AGENCIAS_GESTORIA_CIUDADES,
  gestoriaAgenciasCiudadPath,
  type AgenciaGestoriaCiudadSlug,
} from '@/lib/agencias-gestoria-ciudades'

type Props = {
  current?: AgenciaGestoriaCiudadSlug
  urlTree?: 'agencias' | 'gestoria'
  className?: string
}

export default function AgenciasGestoriaCiudadesNav({
  current,
  urlTree = 'agencias',
  className = '',
}: Props) {
  function ciudadHref(slug: AgenciaGestoriaCiudadSlug) {
    return gestoriaAgenciasCiudadPath(slug)
  }

  const hubHref = '/agencias/gestoria'

  return (
    <section className={`py-10 px-4 bg-white border-y border-gray-100 ${className}`}>
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Contratos para agencias por ciudad
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <Link
            href={hubHref}
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
              href={ciudadHref(c.slug)}
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
