import { notFound } from 'next/navigation'
import PrestamoParticularesCiudadLanding from '@/components/PrestamoParticularesCiudadLanding'
import {
  PRESTAMO_PARTICULARES_CIUDADES,
  buildPrestamoParticularesMetadata,
} from '@/lib/prestamo-particulares-ciudad-data'
import { gestoriaCiudadesSoloRutaDinamicaParams } from '@/lib/gestoria-ciudades-solo-ruta-dinamica'

export function generateStaticParams() {
  return gestoriaCiudadesSoloRutaDinamicaParams()
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = PRESTAMO_PARTICULARES_CIUDADES[ciudad]
  if (!config) return {}
  return buildPrestamoParticularesMetadata(config)
}

export const revalidate = 86400

export default async function PrestamoParticularesCiudadDinamicaPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = PRESTAMO_PARTICULARES_CIUDADES[ciudad]
  if (!config) notFound()
  return <PrestamoParticularesCiudadLanding config={config} />
}
