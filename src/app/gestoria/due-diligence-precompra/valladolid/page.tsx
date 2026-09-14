import DueDiligenceCiudadLanding from '@/components/DueDiligenceCiudadLanding'
import { DUE_DILIGENCE_CIUDADES, buildDueDiligenceMetadata as buildMetadata } from '@/lib/due-diligence-ciudad-data'

const config = DUE_DILIGENCE_CIUDADES.valladolid

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function DueDiligenceValladolidPage() {
  return <DueDiligenceCiudadLanding config={config} />
}
