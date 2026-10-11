import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ServiciosHubContent from '@/components/ServiciosHubContent'
import FirmaCertIncluidaSection from '@/components/FirmaCertIncluidaSection'
import Footer from '@/components/Footer'
import SellosConfianza from '@/components/SellosConfianza'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Solicitar contrato — catálogo gestoría online',
  description:
    'Elige y contrata online: alquiler LAU, arras, temporada, habitación, revisión y packs compraventa. Gestoría inmobiliaria desde 61 €. Entrega 24-48 h.',
  keywords:
    'solicitar contrato arras, contrato alquiler online, gestoria inmobiliaria, contrato compraventa, revision legal vivienda',
  alternates: {
    canonical: `${BASE_URL}/gestoria/solicitar`,
  },
  openGraph: {
    title: 'Solicitar servicio de gestoría',
    description:
      'Todos los servicios de gestoría inmobiliaria disponibles. Contratos, revisión legal y asesoría experta desde 61€.',
    url: `${BASE_URL}/gestoria/solicitar`,
    type: 'website',
  },
}

export default function SolicitarIndexPage() {
  return (
    <>
      <Navbar />
      <WhatsAppButton />
      <ServiciosHubContent mode="checkout" />
      <FirmaCertIncluidaSection />
      <SellosConfianza />
      <Footer />
    </>
  )
}
