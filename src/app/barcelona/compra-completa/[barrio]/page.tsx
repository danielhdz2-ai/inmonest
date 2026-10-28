import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BarcelonaCompletaBarrioLanding from '@/components/BarcelonaCompletaBarrioLanding'
import {
  BARCELONA_COMPRA_COMPLETA_SLUGS,
  getBarcelonaCompraCompletaBarrio,
  listBarcelonaCompraCompletaBarrios,
} from '@/lib/barcelona-compra-completa-barrios'
import { withGestoriaIndexRobots } from '@/lib/gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'

export function generateStaticParams() {
  return BARCELONA_COMPRA_COMPLETA_SLUGS.map((barrio) => ({ barrio }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ barrio: string }>
}): Promise<Metadata> {
  const { barrio } = await params
  const cfg = getBarcelonaCompraCompletaBarrio(barrio)
  if (!cfg) return {}

  const path = `/barcelona/compra-completa/${barrio}`

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
    },
  })
}

export default async function BarcelonaCompraCompletaBarrioPage({
  params,
}: {
  params: Promise<{ barrio: string }>
}) {
  const { barrio } = await params
  const config = getBarcelonaCompraCompletaBarrio(barrio)
  if (!config) notFound()

  const otrosBarrios = listBarcelonaCompraCompletaBarrios().map((b) => ({
    slug: b.slug,
    nombre: b.nombre,
    href: `/barcelona/compra-completa/${b.slug}`,
  }))

  return <BarcelonaCompletaBarrioLanding modo="compra" config={config} otrosBarrios={otrosBarrios} />
}
