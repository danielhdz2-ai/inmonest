import Link from 'next/link'
import type { AgenciaGestoriaCiudadSlug } from '@/lib/agencias-gestoria-ciudades'
import { gestoriaAgenciasCiudadPath } from '@/lib/agencias-gestoria-ciudades'

type Props = {
  ciudadSlug: AgenciaGestoriaCiudadSlug
  ciudadNombre: string
}

export default function GestoriaCiudadAgenciasBanner({ ciudadSlug, ciudadNombre }: Props) {
  return (
    <section className="py-10 px-4 bg-indigo-950 text-white">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="flex-1">
          <p className="text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">
            ¿Eres agencia, API o autónomo inmobiliario?
          </p>
          <h2 className="text-xl font-bold mb-2">
            Contratos para agencias en {ciudadNombre} desde 110 €
          </h2>
          <p className="text-indigo-200 text-sm leading-relaxed">
            Packs anuales o contrato suelto. Arras, alquiler LAU y compraventa con entrega en 4–5 h
            y FirmaCert incluida. Tarifa B2B, no precio particular.
          </p>
        </div>
        <Link
          href={gestoriaAgenciasCiudadPath(ciudadSlug)}
          className="flex-shrink-0 inline-flex justify-center px-6 py-3.5 bg-gold-500 text-white font-bold rounded-full text-sm hover:bg-gold-600 transition-colors"
        >
          Contratos para agencias →
        </Link>
      </div>
    </section>
  )
}
