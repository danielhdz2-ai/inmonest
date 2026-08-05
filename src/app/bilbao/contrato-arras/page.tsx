import type { Metadata } from 'next'
import ContratoArrasCiudadPremium from '@/components/ContratoArrasCiudadPremium'
import { CONTRATO_ARRAS_PREMIUM } from '@/lib/contrato-arras-premium-config'
import { getCiudadImage } from '@/lib/gestoria-images'

const BASE_URL = 'https://inmonest.com'
const cfg = CONTRATO_ARRAS_PREMIUM.bilbao
const ciudadImage = getCiudadImage('bilbao')

export const metadata: Metadata = {
  title: cfg.meta.title,
  description: cfg.meta.description,
  keywords: cfg.meta.keywords,
  alternates: {
    canonical: `${BASE_URL}/bilbao/contrato-arras`,
  },
  openGraph: {
    title: cfg.meta.ogTitle,
    description: cfg.meta.ogDescription,
    url: `${BASE_URL}/bilbao/contrato-arras`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}${ciudadImage.src}`, width: 1200, height: 630, alt: cfg.meta.ogImageAlt }],
  },
}

export const revalidate = 86400  // 24 horas (antes: 1h - optimizado para reducir CPU)

export default function ContratoArrasBilbaoPage() {
  return <ContratoArrasCiudadPremium config={cfg} />
}
