import AlquilerHabitacionCiudadLanding from '@/components/AlquilerHabitacionCiudadLanding'
import {
  ALQUILER_HABITACION_CIUDADES,
  buildAlquilerHabitacionMetadata,
} from '@/lib/alquiler-habitacion-ciudad-data'

const config = ALQUILER_HABITACION_CIUDADES.alicante

export const metadata = buildAlquilerHabitacionMetadata(config)

export const revalidate = 86400

export default function ContratoAlquilerHabitacionAlicantePage() {
  return <AlquilerHabitacionCiudadLanding config={config} />
}
