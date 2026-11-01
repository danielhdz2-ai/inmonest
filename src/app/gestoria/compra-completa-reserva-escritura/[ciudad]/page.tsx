import { notFound } from 'next/navigation'
import CompraCompletaCiudadLanding from '@/components/CompraCompletaCiudadLanding'
import {
  COMPRA_COMPLETA_CIUDADES,
  buildCompraCompletaMetadata,
} from '@/lib/compra-completa-ciudad-data'

export function generateStaticParams() {
  return Object.keys(COMPRA_COMPLETA_CIUDADES).map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = COMPRA_COMPLETA_CIUDADES[ciudad]
  if (!config) return {}
  return buildCompraCompletaMetadata(config)
}

export const revalidate = 86400

export default async function CompraCompletaCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = COMPRA_COMPLETA_CIUDADES[ciudad]
  if (!config) notFound()
  return <CompraCompletaCiudadLanding config={config} />
}
