import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContratoAlquilerBarrioBarcelonaLanding from '@/components/ContratoAlquilerBarrioBarcelonaLanding'
import {
  BARCELONA_ALQUILER_BARRIO_SLUGS,
  getBarcelonaAlquilerBarrio,
} from '@/lib/barcelona-contrato-alquiler-barrios'
import { getCiudadImage } from '@/lib/gestoria-images'
import { withGestoriaIndexRobots } from '@/lib/gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'

export function generateStaticParams() {
  return BARCELONA_ALQUILER_BARRIO_SLUGS.map((barrio) => ({ barrio }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ barrio: string }>
}): Promise<Metadata> {
  const { barrio } = await params
  const cfg = getBarcelonaAlquilerBarrio(barrio)
  if (!cfg) return {}

  const path = `/barcelona/contrato-alquiler/${barrio}`

  return withGestoriaIndexRobots(path, {
    title: cfg.meta.title,
    description: cfg.meta.description,
    keywords: cfg.meta.keywords,
    alternates: { canonical: `${BASE_URL}${path}` },
    openGraph: {
      title: cfg.meta.ogTitle,
      description: cfg.meta.ogDescription,
      url: `${BASE_URL}${path}`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [
        {
          url: `${BASE_URL}${getCiudadImage('barcelona').src}`,
          width: 1200,
          height: 630,
          alt: `Contrato alquiler LAU ${cfg.nombre} Barcelona`,
        },
      ],
    },
  })
}

export const revalidate = 86400

export default async function ContratoAlquilerBarrioBarcelonaPage({
  params,
}: {
  params: Promise<{ barrio: string }>
}) {
  const { barrio } = await params
  const cfg = getBarcelonaAlquilerBarrio(barrio)
  if (!cfg) notFound()

  return <ContratoAlquilerBarrioBarcelonaLanding config={cfg} />
}
