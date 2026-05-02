import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import AgenciasContent from './AgenciasContent'

export const metadata: Metadata = {
  title: 'Agencias Inmobiliarias | Publica Pisos Sin Comisión de Portal — Inmonest',
  description: 'Portal inmobiliario sin comisión para agencias. Sube tus inmuebles y llega a compradores e inquilinos reales en toda España. Sin cuotas de publicación.',
  alternates: { canonical: 'https://inmonest.com/agencias' },
  keywords: 'portal inmobiliario agencias, publicar pisos inmobiliaria, agencias inmobiliarias sin comision portal, portal pisos agencias',
  openGraph: {
    title: 'Publica pisos sin comisión de portal — Inmonest para Agencias',
    description: 'Portal inmobiliario 0% comisión para agencias. Llega a compradores e inquilinos reales en toda España.',
    url: 'https://inmonest.com/agencias',
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: 'https://inmonest.com/inmobiliaria8.jpg', width: 1200, height: 630, alt: 'Portal inmobiliario para agencias — Inmonest' }],
  },
}

export default function AgenciasPage() {
  return (
    <>
      <Navbar />
      <AgenciasContent />
    </>
  )
}
