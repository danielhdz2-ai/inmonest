import { notFound } from 'next/navigation'
import DueDiligenceCiudadLanding from '@/components/DueDiligenceCiudadLanding'
import {
  DUE_DILIGENCE_CIUDADES,
  buildDueDiligenceMetadata,
} from '@/lib/due-diligence-ciudad-data'
import { gestoriaDueDiligenceDinamicaParams } from '@/lib/gestoria-ciudades-solo-ruta-dinamica'

export function generateStaticParams() {
  return gestoriaDueDiligenceDinamicaParams()
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = DUE_DILIGENCE_CIUDADES[ciudad]
  if (!config) return {}
  return buildDueDiligenceMetadata(config)
}

export const revalidate = 86400

export default async function DueDiligenceCiudadDinamicaPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = DUE_DILIGENCE_CIUDADES[ciudad]
  if (!config) notFound()
  return <DueDiligenceCiudadLanding config={config} />
}
