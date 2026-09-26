import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS.castellon

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaCastellonPage() {
  return <CiudadHubLandingPage config={config} />
}
