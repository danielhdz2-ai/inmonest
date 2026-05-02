import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import AgenciasContent from './AgenciasContent'

export const metadata: Metadata = {
  title: 'Agencias Inmobiliarias | Publica Pisos Sin Comisión de Portal — Inmonest',
  description: 'Portal inmobiliario sin comisión para agencias. Sube tus inmuebles y llega a compradores e inquilinos reales en toda España. Sin cuotas de publicación.',
  alternates: { canonical: '/agencias' },
  keywords: 'portal inmobiliario agencias, publicar pisos inmobiliaria, agencias inmobiliarias sin comision portal, portal pisos agencias',
}

export default function AgenciasPage() {
  return (
    <>
      <Navbar />
      <AgenciasContent />
    </>
  )
}
