import PackArrasVendedorCiudadLanding from '@/components/PackArrasVendedorCiudadLanding'
import { PACK_ARRAS_VENDEDOR_CIUDADES, buildPackArrasVendedorMetadata as buildMetadata } from '@/lib/pack-arras-vendedor-ciudad-data'

const config = PACK_ARRAS_VENDEDOR_CIUDADES.pamplona

export const metadata = buildMetadata(config)

export const revalidate = 86400

export default function PackArrasVendedorPamplonaPage() {
  return <PackArrasVendedorCiudadLanding config={config} />
}
