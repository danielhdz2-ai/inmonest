import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS.palma

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaPalmaPage() {
  return <CiudadHubLandingPage config={config} />
}
