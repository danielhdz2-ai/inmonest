import PackArrasVendedorCiudadLanding from '@/components/PackArrasVendedorCiudadLanding'
import {
  PACK_ARRAS_VENDEDOR_CIUDADES,
  buildPackArrasVendedorMetadata,
} from '@/lib/pack-arras-vendedor-ciudad-data'

const config = PACK_ARRAS_VENDEDOR_CIUDADES.vitoria

export const metadata = buildPackArrasVendedorMetadata(config)

export const revalidate = 86400

export default function PackArrasVendedorVitoriaPage() {
  return <PackArrasVendedorCiudadLanding config={config} />
}
