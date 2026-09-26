import { notFound } from 'next/navigation'
import AlquilerTemporadaCiudadLanding from '@/components/AlquilerTemporadaCiudadLanding'
import {
  ALQUILER_TEMPORADA_CIUDADES_LIST,
  getAlquilerTemporadaCiudad,
  buildAlquilerTemporadaCiudadMetadata,
} from '@/lib/alquiler-temporada-ciudad-data'

export function generateStaticParams() {
  return ALQUILER_TEMPORADA_CIUDADES_LIST.map(({ slug }) => ({ ciudad: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = getAlquilerTemporadaCiudad(ciudad)
  if (!config) return {}
  return buildAlquilerTemporadaCiudadMetadata(config)
}

export const revalidate = 86400

export default async function AlquilerTemporadaCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = getAlquilerTemporadaCiudad(ciudad)
  if (!config) notFound()
  return <AlquilerTemporadaCiudadLanding config={config} />
}
