import AsesoriaCompraCiudadLanding from '@/components/AsesoriaCompraCiudadLanding'
import { ASESORIA_COMPRA_CIUDADES, buildAsesoriaCompraMetadata } from '@/lib/asesoria-compra-ciudad-data'

const config = ASESORIA_COMPRA_CIUDADES.mallorca

export const metadata = buildAsesoriaCompraMetadata(config)

export const revalidate = 86400

export default function AsesoriaCompraMallorcaPage() {
  return <AsesoriaCompraCiudadLanding config={config} />
}
