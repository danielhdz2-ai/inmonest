import { notFound } from 'next/navigation'
import RevisionCorreccionArrasCiudadLanding from '@/components/RevisionCorreccionArrasCiudadLanding'
import {
  REVISION_CORRECCION_ARRAS_CIUDADES_LIST,
  getRevisionCorreccionArrasCiudad,
  buildRevisionCorreccionArrasMetadata,
} from '@/lib/revision-correccion-arras-ciudad-data'

export function generateStaticParams() {
  return REVISION_CORRECCION_ARRAS_CIUDADES_LIST.map(({ slug }) => ({ ciudad: slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  const config = getRevisionCorreccionArrasCiudad(ciudad)
  if (!config) return {}
  return buildRevisionCorreccionArrasMetadata(config)
}

export const revalidate = 86400

export default async function RevisionCorreccionArrasCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const config = getRevisionCorreccionArrasCiudad(ciudad)
  if (!config) notFound()
  return <RevisionCorreccionArrasCiudadLanding config={config} />
}
