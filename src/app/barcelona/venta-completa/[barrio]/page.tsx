import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BarcelonaCompletaBarrioLanding from '@/components/BarcelonaCompletaBarrioLanding'
import {
  BARCELONA_VENTA_COMPLETA_SLUGS,
  getBarcelonaVentaCompletaBarrio,
  listBarcelonaVentaCompletaBarrios,
} from '@/lib/barcelona-venta-completa-barrios'
import { withGestoriaIndexRobots } from '@/lib/gestoria-indexacion-tier'

const BASE_URL = 'https://inmonest.com'

export function generateStaticParams() {
  return BARCELONA_VENTA_COMPLETA_SLUGS.map((barrio) => ({ barrio }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ barrio: string }>
}): Promise<Metadata> {
  const { barrio } = await params
  const cfg = getBarcelonaVentaCompletaBarrio(barrio)
  if (!cfg) return {}

  const path = `/barcelona/venta-completa/${barrio}`

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
          url: `${BASE_URL}${cfg.heroImage}`,
          width: 1200,
          height: 630,
          alt: `Venta completa hasta escritura en ${cfg.nombre}, Barcelona`,
        },
      ],
    },
  })
}

export default async function BarcelonaVentaCompletaBarrioPage({
  params,
}: {
  params: Promise<{ barrio: string }>
}) {
  const { barrio } = await params
  const config = getBarcelonaVentaCompletaBarrio(barrio)
  if (!config) notFound()

  const otrosBarrios = listBarcelonaVentaCompletaBarrios().map((b) => ({
    slug: b.slug,
    nombre: b.nombre,
    href: `/barcelona/venta-completa/${b.slug}`,
  }))

  return <BarcelonaCompletaBarrioLanding modo="venta" config={config} otrosBarrios={otrosBarrios} />
}
