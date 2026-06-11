import DueDiligenceCiudadLanding from '@/components/DueDiligenceCiudadLanding'
import { DUE_DILIGENCE_CIUDADES, buildDueDiligenceMetadata } from '@/lib/due-diligence-ciudad-data'

const config = DUE_DILIGENCE_CIUDADES.malaga

export const metadata = buildDueDiligenceMetadata(config)

export const revalidate = 86400

export default function DueDiligenceMalagaPage() {
  return <DueDiligenceCiudadLanding config={config} />
}
