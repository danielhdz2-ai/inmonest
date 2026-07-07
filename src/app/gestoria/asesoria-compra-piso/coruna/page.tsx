import AsesoriaCompraCiudadLanding from '@/components/AsesoriaCompraCiudadLanding'
import { ASESORIA_COMPRA_CIUDADES, buildAsesoriaCompraMetadata } from '@/lib/asesoria-compra-ciudad-data'

const config = ASESORIA_COMPRA_CIUDADES.coruna

export const metadata = buildAsesoriaCompraMetadata(config)

export const revalidate = 86400

export default function AsesoriaCompraCorunaPage() {
  return <AsesoriaCompraCiudadLanding config={config} />
}
