import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import AgenciasGestoriaContent from './AgenciasGestoriaContent'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría B2B para APIs, autónomos y agencias — 110€ · 4–5 h',
  description:
    'Contratos inmobiliarios para APIs, agentes autónomos y agencias. Packs anuales o contrato suelto a 110 €. Arras, alquiler LAU, FirmaCert eIDAS. Tecnocasa, Inmo Sants, Interhouse confían en Inmonest.',
  alternates: { canonical: `${BASE_URL}/agencias/gestoria` },
  keywords: [
    'gestoría inmobiliaria B2B',
    'contratos agencias inmobiliarias',
    'contrato suelto agencia 110 euros',
    'gestoría para APIs inmobiliarias',
    'agente autónomo inmobiliario contratos',
    'pack contratos arras alquiler agencia',
    'contrato alquiler LAU agencia',
    'firma electrónica contratos inmobiliaria',
    'Tecnocasa contratos gestoría',
    'Inmo Sants gestoría',
    'contratos inmobiliarios empresa',
    'gestoría franquicia inmobiliaria',
  ].join(', '),
  openGraph: {
    title: 'Gestoría B2B para APIs, autónomos y agencias | Inmonest',
    description:
      'Contratos profesionales desde 110 €. Pack anual o suelto. Entrega 4–5 h. FirmaCert incluida. Agencias como Tecnocasa e Inmo Sants ya operan con nosotros.',
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
