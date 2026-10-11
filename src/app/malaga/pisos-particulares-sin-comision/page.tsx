import PisosSinComisionCiudadLanding from '@/components/PisosSinComisionCiudadLanding'
import { buildPisosSinComisionMetadata } from '@/lib/pisos-sin-comision-ciudad'

export const metadata = buildPisosSinComisionMetadata('malaga')

export default function PisosParticularesSinComisionMalagaPage() {
  return <PisosSinComisionCiudadLanding ciudad="malaga" />
}
