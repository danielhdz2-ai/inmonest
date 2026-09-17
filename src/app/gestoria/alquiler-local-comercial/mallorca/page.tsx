import AlquilerLocalComercialCiudadLanding from '@/components/AlquilerLocalComercialCiudadLanding'
import { ALQUILER_LOCAL_COMERCIAL_CIUDADES, buildAlquilerLocalComercialMetadata as buildMetadata } from '@/lib/alquiler-local-comercial-ciudad-data'

const config = ALQUILER_LOCAL_COMERCIAL_CIUDADES.mallorca

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function AlquilerLocalComercialMallorcaPage() {
  return <AlquilerLocalComercialCiudadLanding config={config} />
}
