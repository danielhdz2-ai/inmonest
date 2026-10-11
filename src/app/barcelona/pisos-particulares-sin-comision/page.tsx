import PisosSinComisionCiudadLanding from '@/components/PisosSinComisionCiudadLanding'
import { buildPisosSinComisionMetadata } from '@/lib/pisos-sin-comision-ciudad'

export const metadata = buildPisosSinComisionMetadata('barcelona')

export default function PisosParticularesSinComisionBarcelonaPage() {
  return <PisosSinComisionCiudadLanding ciudad="barcelona" />
}
