import VentaCompletaCiudadLanding from '@/components/VentaCompletaCiudadLanding'
import { VENTA_COMPLETA_CIUDADES, buildVentaCompletaMetadata as buildMetadata } from '@/lib/venta-completa-ciudad-data'

const config = VENTA_COMPLETA_CIUDADES.murcia

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function VentaCompletaMurciaPage() {
  return <VentaCompletaCiudadLanding config={config} />
}
