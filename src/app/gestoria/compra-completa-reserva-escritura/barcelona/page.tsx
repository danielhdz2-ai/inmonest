import CompraCompletaCiudadLanding from '@/components/CompraCompletaCiudadLanding'
import { COMPRA_COMPLETA_CIUDADES, buildCompraCompletaMetadata } from '@/lib/compra-completa-ciudad-data'

const config = COMPRA_COMPLETA_CIUDADES.barcelona

export const metadata = buildCompraCompletaMetadata(config)

export const revalidate = 86400

export default function CompraCompletaBarcelonaPage() {
  return <CompraCompletaCiudadLanding config={config} />
}
