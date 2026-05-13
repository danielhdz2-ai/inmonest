import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import SolicitarFormClient from './SolicitarFormClient'

const BASE_URL = 'https://inmonest.com'

const SERVICIOS: Record<string, { nombre: string; precio: number; categoria: string; incluye: string[] }> = {
  'arras-penitenciales':    { nombre: 'Contrato de Arras Penitenciales',          precio: 145, categoria: 'Compraventa',           incluye: ['Redacción personalizada con datos reales', 'Revisión de nota simple registral', 'Cláusulas de desistimiento y penalización', 'PDF firmable en 48h'] },
  'arras-confirmatorias':   { nombre: 'Contrato de Arras Confirmatorias',          precio: 145, categoria: 'Compraventa',           incluye: ['Redacción personalizada con datos reales', 'Cláusulas de obligación de cumplimiento', 'Revisión de nota simple registral', 'PDF firmable en 48h'] },
  'contrato-alquiler':      { nombre: 'Contrato de Alquiler de Vivienda (LAU)',    precio: 120,  categoria: 'Alquiler',              incluye: ['Adaptado a la Ley de Vivienda 2026', 'Cláusulas de actualización de renta', 'Fianza y garantías adicionales', 'PDF firmable en 48h'] },
  'rescision-alquiler':     { nombre: 'Contrato de Rescisión de Alquiler',         precio: 73,  categoria: 'Rescisión y fianzas',   incluye: ['Acta de estado del inmueble', 'Liquidación y devolución de fianza', 'Cláusula de renuncia mutua', 'PDF firmable en 48h'] },
  'alquiler-habitaciones':  { nombre: 'Contrato de Alquiler de Habitación',        precio: 121, categoria: 'Alquiler',              incluye: ['Regulación de zonas comunes', 'Normas de convivencia pactadas', 'Fianza y condiciones de devolución', 'PDF firmable en 48h'] },
  'alquiler-local-comercial':{ nombre: 'Contrato de Alquiler de Local Comercial', precio: 121, categoria: 'Alquiler',              incluye: ['Régimen LAU uso distinto de vivienda', 'Actualización de renta libre o IPC', 'Derecho de tanteo ante venta', 'PDF firmable en 48h'] },
  'alquiler-opcion-compra': { nombre: 'Contrato de Alquiler con Opción a Compra', precio: 182, categoria: 'Compraventa',           incluye: ['Arrendamiento + opción de compra integrados', 'Precio de compra fijado e inalterable', 'Descuento de rentas en precio final', 'PDF firmable en 48h'] },
  'prestamo-particulares':  { nombre: 'Contrato de Préstamo entre Particulares',  precio: 109,  categoria: 'Financiación',          incluye: ['Importe, plazos y cuotas detalladas', 'Vencimiento anticipado por impago', 'Nota fiscal: tributación ante AEAT', 'PDF firmable en 48h'] },
  'alquiler-garaje-trastero':{ nombre: 'Contrato de Alquiler de Garaje o Trastero', precio: 48, categoria: 'Alquiler',            incluye: ['Descripción del espacio y vehículos', 'Fianza y devolución detallada', 'Responsabilidad por daños y robos', 'PDF firmable en 24h'] },
  'pack-revision-reserva-alquiler': { nombre: 'Pack Revisión y Redacción: Reserva + Contrato de Alquiler', precio: 169, categoria: 'Alquiler', incluye: ['Revisión completa del contrato de reserva', 'Redacción del contrato de alquiler LAU personalizado', 'Adaptado a la Ley de Vivienda 2026', 'Cláusulas de actualización de renta y fianza', 'PDF firmable en 48h'] },
  'arras-parking-garage': { nombre: 'Contrato de Arras para Compraventa de Parking o Garaje', precio: 73, categoria: 'Compraventa', incluye: ['Redacción personalizada para parking/garaje', 'Revisión de nota simple registral', 'Cláusulas de desistimiento adaptadas', 'Verificación de cargas y servidumbres', 'PDF firmable en 48h'] },
  'acompanamiento-reserva-arras':       { nombre: 'Acompañamiento Reserva hasta Arras',              precio: 424, categoria: 'Servicios Premium',     incluye: ['Revisión contrato de reserva', 'Análisis nota registral completo', 'Revisión documentación urbanística', 'Redacción contrato de arras', 'Apoyo jurídico durante todo el proceso'] },
  'compra-completa-reserva-escritura':  { nombre: 'Servicio Completo de Compra: Reserva a Escritura', precio: 666, categoria: 'Servicios Premium',     incluye: ['Gestión completa del proceso de compra', 'Revisión contratos con agencias', 'Revisión honorarios y notas de encargo', 'Análisis documentación registral y urbanística', 'Coordinación con notaría', 'Atención prioritaria'] },
  'revision-arras':                     { nombre: 'Revisión de Contrato de Arras',                    precio: 60,  categoria: 'Revisión Legal',       incluye: ['Análisis completo de cláusulas', 'Detección de errores registrales', 'Informe de riesgos legales', 'Recomendaciones de negociación', 'Entrega en 24h'] },
  'revision-alquiler':                  { nombre: 'Revisión de Contrato de Alquiler',                 precio: 60,  categoria: 'Revisión Legal',       incluye: ['Verificación Ley Vivienda 2026', 'Detección de cláusulas ilegales', 'Análisis de fianza y garantías', 'Informe de conformidad', 'Entrega en 24h'] },
  'revision-correccion':                { nombre: 'Revisión + Corrección de Contrato',                precio: 120,  categoria: 'Revisión Legal',       incluye: ['Todo lo anterior +', 'Versión corregida del contrato', 'Argumentos legales para negociar', 'Asesoramiento vía email', 'Entrega en 48h'] },
  'revision-correccion-arras':          { nombre: 'Revisión + Corrección de Contrato de Arras',       precio: 120, categoria: 'Revisión Legal',       incluye: ['Análisis completo de cláusulas', 'Detección de errores registrales', 'Versión corregida del contrato', 'Argumentos legales para negociar', 'Asesoramiento vía email', 'Entrega en 48h'] },
  'ayuda-propietarios':                 { nombre: 'Redacción de Contrato LAU para Propietarios',      precio: 73,  categoria: 'Alquiler',             incluye: ['Contrato LAU conforme 2026', 'Cláusulas de protección propietario', 'Inventario de bienes incluido', 'Actualización de renta IPC', 'PDF firmable en 48h'] },
  'contrato-ilegal':                    { nombre: 'Análisis de Fraude Inmobiliario',                  precio: 29,  categoria: 'Revisión Legal',       incluye: ['Verificación documentación', 'Detección de señales de fraude', 'Análisis nota simple registral', 'Informe de riesgos críticos', 'Entrega urgente en 12h'] },
  'asesoria-compra':                    { nombre: 'Asesoría Completa Compra de Vivienda',             precio: 95,  categoria: 'Servicios Premium',    incluye: ['Análisis inicial gratuito', 'Revisión nota simple + arras', 'Asesoramiento hipoteca', 'Revisión documentación vendedor', 'Acompañamiento hasta escritura'] },
  'contrato-compraventa':               { nombre: 'Contrato de Compraventa de Vivienda',              precio: 80,  categoria: 'Compraventa',          incluye: ['Redacción completa personalizada', 'Cláusulas de protección comprador/vendedor', 'Condiciones de pago y entrega', 'Garantías y saneamiento', 'PDF firmable en 48h'] },
}

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
