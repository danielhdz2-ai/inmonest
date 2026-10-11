import ParticularesGestoriaCiudadLanding from '@/components/ParticularesGestoriaCiudadLanding'
import {
  getPisosSinComisionLandingProps,
  type PisosSinComisionCiudad,
} from '@/lib/pisos-sin-comision-ciudad'

export default function PisosSinComisionCiudadLanding({ ciudad }: { ciudad: PisosSinComisionCiudad }) {
  const props = getPisosSinComisionLandingProps(ciudad)
  return (
    <ParticularesGestoriaCiudadLanding
      {...props}
      variant="pisos-sin-comision"
    />
  )
}
