import type { Metadata } from 'next'
import ContratoAlquilerCiudadPremium from '@/components/ContratoAlquilerCiudadPremium'
import { CONTRATO_ALQUILER_PREMIUM } from '@/lib/contrato-alquiler-premium-config'

const BASE_URL = 'https://inmonest.com'
const cfg = CONTRATO_ALQUILER_PREMIUM.bilbao

export const metadata: Metadata = {
  title: cfg.meta.title,
  description: cfg.meta.description,
  keywords: cfg.meta.keywords,
  alternates: {
    canonical: `${BASE_URL}/bilbao/contrato-alquiler`,
  },
  openGraph: {
    title: cfg.meta.ogTitle,
    description: cfg.meta.ogDescription,
    url: `${BASE_URL}/bilbao/contrato-alquiler`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria7.jpg`, width: 1200, height: 630, alt: cfg.meta.ogImageAlt }],
  },
}

export const revalidate = 86400  // 24 horas (antes: 1h - optimizado para reducir CPU)

export default function ContratoAlquilerBilbaoPage() {
  return <ContratoAlquilerCiudadPremium config={cfg} />
}
