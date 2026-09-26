import { notFound } from 'next/navigation'
import AlquilerLocalComercialCiudadLanding from '@/components/AlquilerLocalComercialCiudadLanding'
import {
  ALQUILER_LOCAL_COMERCIAL_CIUDADES,
  buildAlquilerLocalComercialMetadata,
} from '@/lib/alquiler-local-comercial-ciudad-data'
import { gestoriaCiudadesSoloRutaDinamicaParams } from '@/lib/gestoria-ciudades-solo-ruta-dinamica'

export function generateStaticParams() {
  return gestoriaCiudadesSoloRutaDinamicaParams()
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = ALQUILER_LOCAL_COMERCIAL_CIUDADES[ciudad]
  if (!config) return {}
  return buildAlquilerLocalComercialMetadata(config)
}

export const revalidate = 86400

export default async function AlquilerLocalComercialCiudadDinamicaPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = ALQUILER_LOCAL_COMERCIAL_CIUDADES[ciudad]
  if (!config) notFound()
  return <AlquilerLocalComercialCiudadLanding config={config} />
}
