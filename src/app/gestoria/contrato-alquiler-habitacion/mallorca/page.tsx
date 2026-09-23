import AlquilerHabitacionCiudadLanding from '@/components/AlquilerHabitacionCiudadLanding'
import {
  ALQUILER_HABITACION_CIUDADES,
  buildAlquilerHabitacionMetadata,
} from '@/lib/alquiler-habitacion-ciudad-data'

const config = ALQUILER_HABITACION_CIUDADES.mallorca

export const metadata = buildAlquilerHabitacionMetadata(config)

export const revalidate = 86400

export default function ContratoAlquilerHabitacionMallorcaPage() {
  return <AlquilerHabitacionCiudadLanding config={config} />
}
