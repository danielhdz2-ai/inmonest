import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ServiciosHubContent from '@/components/ServiciosHubContent'
import { GESTORIA_PRECIO_MIN } from '@/lib/gestoria-catalogo'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Servicios de gestoría inmobiliaria — Contratos y packs',
  description:
    'Todos los servicios de Inmonest: arras, alquiler LAU, due diligence, venta completa, préstamos y revisiones. Precio cerrado desde ' +
    GESTORIA_PRECIO_MIN +
    '€. Elige el servicio y ve a su página.',
  alternates: { canonical: `${BASE_URL}/servicios` },
  openGraph: {
    title: 'Servicios de gestoría inmobiliaria | Inmonest',
    description: 'Contratos, revisiones y packs con precio cerrado. Arras, alquiler, due diligence y más.',
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

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <section className="relative isolate overflow-hidden text-white min-h-[320px] sm:min-h-[380px] flex items-end">
          <div
            className="absolute inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: "url('/sofainmonest.png')" }}
            aria-hidden
          />
          <div
            className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0d1a0f]/88 via-[#1a2f1c]/72 to-[#1a2f1c]/45"
            aria-hidden
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#0d1a0f]/70 via-transparent to-[#0d1a0f]/25" aria-hidden />

          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-xs text-white/60 mb-6">
              <Link href="/" className="hover:text-white/90">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-white/90">Servicios</span>
            </nav>
            <p className="text-xs font-bold uppercase tracking-widest text-[#f4c94a] mb-3">Gestoría inmobiliaria</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 max-w-3xl leading-tight drop-shadow-sm">
              Servicios con precio cerrado
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mb-6 drop-shadow-sm">
              Elige el contrato o pack que necesitas. Cada tarjeta abre la página del servicio (información, FAQ y
              contratación). Desde {GESTORIA_PRECIO_MIN}€ · entrega habitual en 48h.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/gestoria"
                className="inline-flex items-center rounded-full bg-[#c9962a] text-[#1a2f1c] font-semibold px-5 py-2.5 text-sm hover:bg-[#b8841e] transition"
              >
                Ir a gestoría
              </Link>
              <Link
                href="/gestoria/ciudades"
                className="inline-flex items-center rounded-full border border-white/40 bg-black/20 backdrop-blur-sm text-white font-medium px-5 py-2.5 text-sm hover:bg-white/15 transition"
              >
                Ver por ciudad
              </Link>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <ServiciosHubContent />
        </section>
      </main>
    </>
  )
}
