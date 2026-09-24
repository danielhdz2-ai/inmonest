import GestoriaTramiteOnlineNote from '@/components/GestoriaTramiteOnlineNote'
import { getContratoAlquilerPasosDetallados } from '@/lib/contrato-alquiler-premium-config'

type Props = {
  ciudad: string
  precio: string
}

export default function ContratoAlquilerProcesoDetalladoSection({ ciudad, precio }: Props) {
  const pasos = getContratoAlquilerPasosDetallados(precio)

  return (
    <section className="py-14 sm:py-16 px-4 bg-white border-y border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
          Cómo trabajamos contigo en {ciudad}
        </h2>
        <GestoriaTramiteOnlineNote variant="banner" className="mb-6 max-w-2xl mx-auto" />
        <p className="text-center text-gray-600 mb-10 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          Desde la primera consulta hasta la entrega del PDF firmable. Atención personalizada en cada fase, sin
          desplazarte a ninguna oficina.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {pasos.map((paso) => (
            <div key={paso.num} className="text-center">
              <div className="w-12 h-12 bg-forest-800 text-gold-500 rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                {paso.num}
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{paso.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{paso.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
