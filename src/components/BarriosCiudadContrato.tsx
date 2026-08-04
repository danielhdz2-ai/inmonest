import { getBarriosCiudad } from '@/lib/contrato-ciudad-barrios'

type Props = {
  ciudad: string
  ciudadSlug: string
  servicio: 'alquiler' | 'arras'
}

export default function BarriosCiudadContrato({ ciudad, ciudadSlug, servicio }: Props) {
  const barrios = getBarriosCiudad(ciudadSlug)
  const verbo = servicio === 'alquiler' ? 'alquiler' : 'compraventa / arras'

  return (
    <section>
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Zonas de {ciudad}</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        Barrios y áreas donde redactamos contratos de {verbo}
      </h2>
      <p className="text-gray-600 mb-6 max-w-3xl leading-relaxed">
        El marco legal es el mismo en toda la ciudad, pero cada barrio cambia renta, perfil de inquilino o ritmo de
        compraventa. Conocemos el mercado local de {ciudad}: adaptamos cláusulas (fianza, inventario, hipoteca,
        plazos) a tu zona concreta.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {barrios.map((b) => (
          <div key={b.nombre} className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gold-500/60 transition-colors">
            <h3 className="font-bold text-gray-900 mb-1">{b.nombre}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{b.nota}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
