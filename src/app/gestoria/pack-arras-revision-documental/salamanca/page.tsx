import PackArrasDocumentalCiudadLanding from '@/components/PackArrasDocumentalCiudadLanding'
import { PACK_ARRAS_DOCUMENTAL_CIUDADES, buildPackArrasDocumentalMetadata as buildMetadata } from '@/lib/pack-arras-documental-ciudad-data'

const config = PACK_ARRAS_DOCUMENTAL_CIUDADES.salamanca

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function PackArrasDocumentalSalamancaPage() {
  return <PackArrasDocumentalCiudadLanding config={config} />
}
