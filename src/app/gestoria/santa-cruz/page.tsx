import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS['santa-cruz']

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaSantaCruzPage() {
  return <CiudadHubLandingPage config={config} />
}
