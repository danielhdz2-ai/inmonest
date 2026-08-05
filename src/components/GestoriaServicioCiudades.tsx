import { CiudadServicioCard } from '@/components/ui/CiudadServicioCard'
import {
  getCiudadSectionMeta,
  getCiudadesParaServicio,
} from '@/lib/gestoria-servicio-template'

type GestoriaServicioCiudadesProps = {
  servicio: string
}

export default function GestoriaServicioCiudades({ servicio }: GestoriaServicioCiudadesProps) {
  const ciudades = getCiudadesParaServicio(servicio)
  if (ciudades.length === 0) return null

  const { title, subtitle } = getCiudadSectionMeta(servicio)

  return (
    <section className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-12 bg-gray-50 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3 text-gray-900">{title}</h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">{subtitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {ciudades.map((ciudad) => (
            <CiudadServicioCard
              key={ciudad.slug}
              href={ciudad.href}
              nombre={ciudad.nombre}
              imageSrc={ciudad.imageSrc}
              imageAlt={ciudad.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
