import PisosSinComisionCiudadLanding from '@/components/PisosSinComisionCiudadLanding'
import { buildPisosSinComisionMetadata } from '@/lib/pisos-sin-comision-ciudad'

export const metadata = buildPisosSinComisionMetadata('sevilla')

export default function PisosParticularesSinComisionSevillaPage() {
  return <PisosSinComisionCiudadLanding ciudad="sevilla" />
}
