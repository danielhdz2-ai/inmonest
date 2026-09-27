import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS['cordoba']

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaCordobaPage() {
  return <CiudadHubLandingPage config={config} />
}
