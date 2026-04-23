import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import AnalizadorClient from './AnalizadorClient'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Analizador de Mercado Inmobiliario — Precios por ciudad',
  description: 'Descubre el precio medio por m² de compra y alquiler en las principales ciudades de España. Temperatura del mercado, evolución de precios y datos actualizados.',
  alternates: { canonical: `${BASE_URL}/analizador-mercado` },
  openGraph: {
    title: 'Analizador de Mercado Inmobiliario — Inmonest',
    description: 'Precio medio del m² en toda España. Venta, alquiler, temperatura del mercado y evolución histórica de precios.',
    url: `${BASE_URL}/analizador-mercado`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function AnalizadorMercadoPage() {
  return (
    <>
      <Navbar />
      <AnalizadorClient />
      <WhatsAppButton />
    </>
  )
}
