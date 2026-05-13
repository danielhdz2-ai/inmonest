import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContratoAlquilerCiudadPremium from '@/components/ContratoAlquilerCiudadPremium'
import { CONTRATO_ALQUILER_PREMIUM, getContratoAlquilerPremiumConfig } from '@/lib/contrato-alquiler-premium-config'

const BASE_URL = 'https://inmonest.com'

/** Rutas premium compartidas (misma UI que Bilbao). `bilbao` tiene además página estática dedicada. */
export function generateStaticParams() {
  return Object.keys(CONTRATO_ALQUILER_PREMIUM)
    .filter((slug) => slug !== 'bilbao')
    .map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad } = await params
  const cfg = getContratoAlquilerPremiumConfig(ciudad)
  if (!cfg) return {}

  return {
    title: cfg.meta.title,
    description: cfg.meta.description,
    keywords: cfg.meta.keywords,
    alternates: { canonical: `${BASE_URL}/${ciudad}/contrato-alquiler` },
    openGraph: {
      title: cfg.meta.ogTitle,
      description: cfg.meta.ogDescription,
      url: `${BASE_URL}/${ciudad}/contrato-alquiler`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [{ url: `${BASE_URL}/gestoria/gestoria7.jpg`, width: 1200, height: 630, alt: cfg.meta.ogImageAlt }],
    },
  }
}

export const revalidate = 3600

export default async function ContratoAlquilerPremiumCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const cfg = getContratoAlquilerPremiumConfig(ciudad)
  if (!cfg) notFound()

  return <ContratoAlquilerCiudadPremium config={cfg} />
}
