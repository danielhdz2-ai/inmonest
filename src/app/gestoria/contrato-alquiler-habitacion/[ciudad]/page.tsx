import { notFound } from 'next/navigation'
import AlquilerHabitacionCiudadLanding from '@/components/AlquilerHabitacionCiudadLanding'
import {
  ALQUILER_HABITACION_CIUDADES,
  buildAlquilerHabitacionMetadata,
} from '@/lib/alquiler-habitacion-ciudad-data'
import { gestoriaCiudadesSoloRutaDinamicaParams } from '@/lib/gestoria-ciudades-solo-ruta-dinamica'

export function generateStaticParams() {
  return gestoriaCiudadesSoloRutaDinamicaParams()
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = ALQUILER_HABITACION_CIUDADES[ciudad]
  if (!config) return {}
  return buildAlquilerHabitacionMetadata(config)
}

export const revalidate = 86400

export default async function AlquilerHabitacionCiudadDinamicaPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = ALQUILER_HABITACION_CIUDADES[ciudad]
  if (!config) notFound()
  return <AlquilerHabitacionCiudadLanding config={config} />
}
