import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS['san-sebastian']

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaSanSebastianPage() {
  return <CiudadHubLandingPage config={config} />
}
