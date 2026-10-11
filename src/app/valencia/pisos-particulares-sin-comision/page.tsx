import PisosSinComisionCiudadLanding from '@/components/PisosSinComisionCiudadLanding'
import { buildPisosSinComisionMetadata } from '@/lib/pisos-sin-comision-ciudad'

export const metadata = buildPisosSinComisionMetadata('valencia')

export default function PisosParticularesSinComisionValenciaPage() {
  return <PisosSinComisionCiudadLanding ciudad="valencia" />
}
