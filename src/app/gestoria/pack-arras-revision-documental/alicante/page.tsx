import PackArrasDocumentalCiudadLanding from '@/components/PackArrasDocumentalCiudadLanding'
import { PACK_ARRAS_DOCUMENTAL_CIUDADES, buildPackArrasDocumentalMetadata as buildMetadata } from '@/lib/pack-arras-documental-ciudad-data'

const config = PACK_ARRAS_DOCUMENTAL_CIUDADES.alicante

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function PackArrasDocumentalAlicantePage() {
  return <PackArrasDocumentalCiudadLanding config={config} />
}
