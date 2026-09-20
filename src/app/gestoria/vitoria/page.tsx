import CiudadHubLandingPage from '@/components/CiudadHubLandingPage'
import { CIUDAD_HUBS, buildCiudadHubMetadata } from '@/lib/gestoria-ciudad-hub-data'

const config = CIUDAD_HUBS.vitoria

export const metadata = buildCiudadHubMetadata(config)

export default function GestoriaVitoriaPage() {
  return <CiudadHubLandingPage config={config} />
}
