import AlquilerHabitacionCiudadLanding from '@/components/AlquilerHabitacionCiudadLanding'
import { ALQUILER_HABITACION_CIUDADES, buildAlquilerHabitacionMetadata as buildMetadata } from '@/lib/alquiler-habitacion-ciudad-data'

const config = ALQUILER_HABITACION_CIUDADES.santander

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function ContratoAlquilerHabitacionSantanderPage() {
  return <AlquilerHabitacionCiudadLanding config={config} />
}
