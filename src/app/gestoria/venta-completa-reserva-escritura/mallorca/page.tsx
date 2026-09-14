import VentaCompletaCiudadLanding from '@/components/VentaCompletaCiudadLanding'
import { VENTA_COMPLETA_CIUDADES, buildVentaCompletaMetadata as buildMetadata } from '@/lib/venta-completa-ciudad-data'

const config = VENTA_COMPLETA_CIUDADES.mallorca

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function VentaCompletaMallorcaPage() {
  return <VentaCompletaCiudadLanding config={config} />
}
