import CompraCompletaCiudadLanding from '@/components/CompraCompletaCiudadLanding'
import { COMPRA_COMPLETA_CIUDADES, buildCompraCompletaMetadata } from '@/lib/compra-completa-ciudad-data'

const config = COMPRA_COMPLETA_CIUDADES.madrid

export const metadata = buildCompraCompletaMetadata(config)

export const revalidate = 86400

export default function CompraCompletaMadridPage() {
  return <CompraCompletaCiudadLanding config={config} />
}
