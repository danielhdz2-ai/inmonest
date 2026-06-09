import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'
import SolicitarFormClient from './SolicitarFormClient'
import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'

const BASE_URL = 'https://inmonest.com'

const SERVICIOS = GESTORIA_SERVICIOS

export function generateStaticParams() {
  return Object.keys(SERVICIOS).map((servicio) => ({ servicio }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ servicio: string }>
}): Promise<Metadata> {
  const { servicio } = await params
  const data = SERVICIOS[servicio]
  
  if (!data) {
    return {
      title: 'Servicio no encontrado | Inmonest',
      description: 'El servicio solicitado no está disponible.',
    }
  }

  const isAlquilerLau = servicio === 'contrato-alquiler'
  const description = isAlquilerLau
    ? `Gestoría especializada que tramita contratos de alquiler: ${data.nombre} por ${data.precio}€. ${data.incluye.slice(0, 2).join('. ')}. Entrega en 48h.`
    : `Solicita ${data.nombre} por ${data.precio}€. ${data.incluye.slice(0, 2).join('. ')}. Redactado por gestoría inmobiliaria experta. Entrega en 48h.`

  return {
    title: `${data.nombre} - ${data.precio}€ | Gestoría Inmonest`,
    description,
    alternates: {
      canonical: `${BASE_URL}/gestoria/solicitar/${servicio}`,
    },
    openGraph: {
      title: `${data.nombre} - ${data.precio}€`,
      description: isAlquilerLau
        ? `${data.incluye[0]}. Gestoría especializada en contratos de alquiler LAU.`
        : `${data.incluye[0]}. Servicio profesional de gestoría inmobiliaria.`,
      url: `${BASE_URL}/gestoria/solicitar/${servicio}`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function SolicitarServicioPage({
  params,
}: {
  params: Promise<{ servicio: string }>
}) {
  const { servicio } = await params
  const data = SERVICIOS[servicio]
  if (!data) notFound()

  // Schema markup Product para SEO
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: data.nombre,
    description: data.incluye.join('. '),
    category: data.categoria,
    brand: {
      '@type': 'Brand',
      name: 'Inmonest',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/gestoria/solicitar/${servicio}`,
      priceCurrency: 'EUR',
      price: data.precio,
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2027-12-31',
      seller: {
        '@type': 'Organization',
        name: 'Inmonest',
        url: BASE_URL,
      },
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
            <a href="/" className="hover:text-gray-600">Inicio</a>
            <span>/</span>
            <a href="/gestoria" className="hover:text-gray-600">Gestoría</a>
            <span>/</span>
            <a href={`/gestoria/${servicio}`} className="hover:text-gray-600">{data.nombre}</a>
            <span>/</span>
            <span className="text-gray-700 font-medium">Solicitar</span>
          </nav>

          <PageHeroImage
            src="/gestoria1.jpg"
            alt={`Solicitar ${data.nombre}`}
            className="mb-8"
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* ── Panel izquierdo: resumen del servicio ── */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] rounded-2xl p-7 text-white sticky top-24">
                <span className="inline-block bg-[#c9a84c]/20 text-[#c9a84c] text-xs font-bold px-3 py-1 rounded-full mb-4">
                  {data.categoria}
                </span>
                <h1 className="text-xl font-bold text-white mb-2 leading-snug">{data.nombre}</h1>
                <p className="text-4xl font-extrabold text-[#c9a84c] mb-1">{data.precio} €</p>
                <p className="text-white/50 text-xs mb-6">Pago único · Sin suscripción</p>

                <div className="space-y-3 mb-6">
                  {data.incluye.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[#c9a84c] mt-0.5 text-sm flex-shrink-0">✓</span>
                      <span className="text-white/80 text-sm leading-snug">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-5 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">⚖️</span>
                    <span className="text-xs text-white/70">Redactado por gestoría inmobiliaria experta</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">🔒</span>
                    <span className="text-xs text-white/70">Pago 100% seguro con Stripe</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#c9a84c]">⚡</span>
                    <span className="text-xs text-white/70">Entrega en 48h tras el pago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel derecho: formulario ── */}
            <div className="lg:col-span-3">
              <SolicitarFormClient
                servicioSlug={servicio}
                servicioNombre={data.nombre}
                servicioPrecio={data.precio}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
