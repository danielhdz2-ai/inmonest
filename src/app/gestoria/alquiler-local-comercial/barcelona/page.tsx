import AlquilerLocalComercialCiudadLanding from '@/components/AlquilerLocalComercialCiudadLanding'
import {
  ALQUILER_LOCAL_COMERCIAL_CIUDADES,
  buildAlquilerLocalComercialMetadata,
} from '@/lib/alquiler-local-comercial-ciudad-data'

const config = ALQUILER_LOCAL_COMERCIAL_CIUDADES.barcelona

export const metadata = buildAlquilerLocalComercialMetadata(config)

export const revalidate = 86400

export default function AlquilerLocalComercialBarcelonaPage() {
  return <AlquilerLocalComercialCiudadLanding config={config} />
}
