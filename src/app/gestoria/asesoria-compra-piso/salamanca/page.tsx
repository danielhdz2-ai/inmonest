import AsesoriaCompraCiudadLanding from '@/components/AsesoriaCompraCiudadLanding'
import { ASESORIA_COMPRA_CIUDADES, buildAsesoriaCompraMetadata as buildMetadata } from '@/lib/asesoria-compra-ciudad-data'

const config = ASESORIA_COMPRA_CIUDADES.salamanca

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function AsesoriaCompraSalamancaPage() {
  return <AsesoriaCompraCiudadLanding config={config} />
}
