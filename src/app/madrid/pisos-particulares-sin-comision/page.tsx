import PisosSinComisionCiudadLanding from '@/components/PisosSinComisionCiudadLanding'
import { buildPisosSinComisionMetadata } from '@/lib/pisos-sin-comision-ciudad'

export const metadata = buildPisosSinComisionMetadata('madrid')

export default function PisosParticularesSinComisionMadridPage() {
  return <PisosSinComisionCiudadLanding ciudad="madrid" />
}
