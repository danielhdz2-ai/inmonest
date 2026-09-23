import VentaCompletaCiudadLanding from '@/components/VentaCompletaCiudadLanding'
import {
  VENTA_COMPLETA_CIUDADES,
  buildVentaCompletaMetadata,
} from '@/lib/venta-completa-ciudad-data'

const config = VENTA_COMPLETA_CIUDADES['san-sebastian']

export const metadata = buildVentaCompletaMetadata(config)

export const revalidate = 86400

export default function VentaCompletaSanSebastianPage() {
  return <VentaCompletaCiudadLanding config={config} />
}
