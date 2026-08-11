import AlquilerLocalComercialCiudadLanding from '@/components/AlquilerLocalComercialCiudadLanding'
import {
  ALQUILER_LOCAL_COMERCIAL_CIUDADES,
  buildAlquilerLocalComercialMetadata,
} from '@/lib/alquiler-local-comercial-ciudad-data'

const config = ALQUILER_LOCAL_COMERCIAL_CIUDADES.valencia

export const metadata = buildAlquilerLocalComercialMetadata(config)

export const revalidate = 86400

export default function AlquilerLocalComercialValenciaPage() {
  return <AlquilerLocalComercialCiudadLanding config={config} />
}
