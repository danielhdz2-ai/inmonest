import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ContratoArrasCiudadPremium from '@/components/ContratoArrasCiudadPremium'
import { CONTRATO_ARRAS_PREMIUM, getContratoArrasPremiumConfig } from '@/lib/contrato-arras-premium-config'

const BASE_URL = 'https://inmonest.com'

/** Rutas premium compartidas (misma UI que Bilbao). `bilbao` tiene además página estática dedicada. */
export function generateStaticParams() {
  return Object.keys(CONTRATO_ARRAS_PREMIUM)
    .filter((slug) => slug !== 'bilbao')
    .map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad } = await params
  const cfg = getContratoArrasPremiumConfig(ciudad)
  if (!cfg) return {}

  return {
    title: cfg.meta.title,
    description: cfg.meta.description,
    keywords: cfg.meta.keywords,
    alternates: { canonical: `${BASE_URL}/${ciudad}/contrato-arras` },
    openGraph: {
      title: cfg.meta.ogTitle,
      description: cfg.meta.ogDescription,
      url: `${BASE_URL}/${ciudad}/contrato-arras`,
      type: 'website',
      siteName: 'Inmonest',
      locale: 'es_ES',
      images: [{ url: `${BASE_URL}/gestoria/gestoria7.jpg`, width: 1200, height: 630, alt: cfg.meta.ogImageAlt }],
    },
  }
}

export const revalidate = 86400  // 24 horas (antes: 1h - optimizado para reducir CPU)

export default async function ContratoArrasPremiumCiudadPage({
  params,
}: {
  params: Promise<{ ciudad: string }>
}) {
  const { ciudad } = await params
  const cfg = getContratoArrasPremiumConfig(ciudad)
  if (!cfg) notFound()

  return <ContratoArrasCiudadPremium config={cfg} />
}
