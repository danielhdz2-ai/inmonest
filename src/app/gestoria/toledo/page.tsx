import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS['toledo']

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaToledoPage() {
  return <CiudadHubLandingPage config={config} />
}
