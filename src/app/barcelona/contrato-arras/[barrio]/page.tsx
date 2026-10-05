import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContratoArrasBarrioBarcelonaLanding from '@/components/ContratoArrasBarrioBarcelonaLanding'
import {
  BARCELONA_ARRAS_BARRIO_SLUGS,
  getBarcelonaArrasBarrio,
} from '@/lib/barcelona-contrato-arras-barrios'
import { getCiudadImage } from '@/lib/gestoria-images'
import { withGestoriaIndexRobots } from '@/lib/gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'

export function generateStaticParams() {
  return BARCELONA_ARRAS_BARRIO_SLUGS.map((barrio) => ({ barrio }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ barrio: string }>
}): Promise<Metadata> {
  const { barrio } = await params
  const cfg = getBarcelonaArrasBarrio(barrio)
  if (!cfg) return {}

  const path = `/barcelona/contrato-arras/${barrio}`

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
          alt: `Contrato de arras ${cfg.nombre} Barcelona`,
        },
      ],
    },
  })
}

export const revalidate = 86400

export default async function ContratoArrasBarrioBarcelonaPage({
  params,
}: {
  params: Promise<{ barrio: string }>
}) {
  const { barrio } = await params
  const cfg = getBarcelonaArrasBarrio(barrio)
  if (!cfg) notFound()

  return <ContratoArrasBarrioBarcelonaLanding config={cfg} />
}
