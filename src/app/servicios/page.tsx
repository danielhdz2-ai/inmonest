import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ServiciosHubContent from '@/components/ServiciosHubContent'
import { GESTORIA_PRECIO_MIN } from '@/lib/gestoria-catalogo'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Servicios de contratos inmobiliarios — Arras, alquiler y packs',
  description:
    'Catálogo de servicios Inmonest: arras, alquiler LAU, revisiones y packs con precio cerrado desde ' +
    GESTORIA_PRECIO_MIN +
    '€. Consulta cada servicio y contrata online.',
  alternates: { canonical: `${BASE_URL}/servicios` },
  openGraph: {
    title: 'Servicios de contratos inmobiliarios | Inmonest',
    description: 'Consulta el catálogo de contratos y packs. Desde ' + GESTORIA_PRECIO_MIN + '€.',
    url: `${BASE_URL}/servicios`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/sofainmonest.png` }],
  },
}

export const revalidate = 86400

export default function ServiciosPage() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <ServiciosHubContent />
    </>
  )
}
