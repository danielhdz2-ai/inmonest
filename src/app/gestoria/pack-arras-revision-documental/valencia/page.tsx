import PackArrasDocumentalCiudadLanding from '@/components/PackArrasDocumentalCiudadLanding'
import {
  PACK_ARRAS_DOCUMENTAL_CIUDADES,
  buildPackArrasDocumentalMetadata,
} from '@/lib/pack-arras-documental-ciudad-data'

const config = PACK_ARRAS_DOCUMENTAL_CIUDADES.valencia

export const metadata = buildPackArrasDocumentalMetadata(config)

export const revalidate = 86400

export default function PackArrasDocumentalValenciaPage() {
  return <PackArrasDocumentalCiudadLanding config={config} />
}
