import type { Metadata } from 'next'
import ContratoAlquilerCiudadPremium from '@/components/ContratoAlquilerCiudadPremium'
import { CONTRATO_ALQUILER_PREMIUM } from '@/lib/contrato-alquiler-premium-config'
import { getCiudadImage } from '@/lib/gestoria-images'

const BASE_URL = 'https://inmonest.com'
const cfg = CONTRATO_ALQUILER_PREMIUM.granada
const ciudadImage = getCiudadImage('granada')

export const metadata: Metadata = {
  title: cfg.meta.title,
  description: cfg.meta.description,
  keywords: cfg.meta.keywords,
  alternates: {
    canonical: `${BASE_URL}/granada/contrato-alquiler`,
  },
  openGraph: {
    title: cfg.meta.ogTitle,
    description: cfg.meta.ogDescription,
    url: `${BASE_URL}/granada/contrato-alquiler`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}${ciudadImage.src}`, width: 1200, height: 630, alt: cfg.meta.ogImageAlt }],
  },
}

export const revalidate = 86400

export default function ContratoAlquilerGranadaPage() {
  return <ContratoAlquilerCiudadPremium config={cfg} />
}
