import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS.granada

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaGranadaPage() {
  return <CiudadHubLandingPage config={config} />
}
