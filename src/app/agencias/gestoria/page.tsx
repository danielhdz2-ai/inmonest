import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import AgenciasGestoriaContent from './AgenciasGestoriaContent'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Packs de contratos para agencias — 110€ · Entrega 4–5 h',
  description:
    'Packs anuales de gestoría para agencias y agentes independientes. Contratos profesionales redactados por gestor, entrega en 4–5 horas y firma electrónica FIRMACERT incluida. Desde 110 €/contrato.',
  alternates: { canonical: `${BASE_URL}/agencias/gestoria` },
  keywords:
    'contratos agencias inmobiliarias, gestoría para inmobiliarias, pack contratos arras alquiler, firma electrónica contratos agencia, agente independiente contratos',
  openGraph: {
    title: 'Packs de contratos para agencias inmobiliarias | Inmonest',
    description:
      'Contratos profesionales desde 110 €. Entrega en 4–5 h. FirmaCert eIDAS incluida. Para agencias y agentes independientes.',
    url: `${BASE_URL}/agencias/gestoria`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria10.jpg`, width: 1200, height: 630, alt: 'Gestoría B2B para agencias' }],
  },
}

export default function AgenciasGestoriaPage() {
  return (
    <>
      <Navbar />
      <AgenciasGestoriaContent />
    </>
  )
}
