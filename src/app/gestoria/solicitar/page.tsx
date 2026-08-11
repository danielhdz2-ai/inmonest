import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'
import Footer from '@/components/Footer'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Solicitar servicio de gestoría',
  description: 'Contratos de arras, alquiler LAU, compraventa, revisión legal y asesoría completa. Gestoría inmobiliaria online desde 61€. Entrega en 24-48h.',
  keywords: 'solicitar contrato arras, contrato alquiler online, gestoria inmobiliaria, contrato compraventa, revision legal vivienda',
  alternates: {
    canonical: `${BASE_URL}/gestoria/solicitar`,
  },
  openGraph: {
    title: 'Solicitar servicio de gestoría',
    description: 'Todos los servicios de gestoría inmobiliaria disponibles. Contratos, revisión legal y asesoría experta desde 61€.',
    url: `${BASE_URL}/gestoria/solicitar`,
    type: 'website',
  },
}

const SERVICIOS = [
  // COMPRAVENTA
  {
    categoria: 'Compraventa',
    color: 'from-blue-500 to-blue-600',
    items: [
      { slug: 'arras-penitenciales', nombre: 'Contrato de Arras Penitenciales', precio: 145, badge: 'Más vendido' },
      { slug: 'arras-confirmatorias', nombre: 'Contrato de Arras Confirmatorias', precio: 145 },
      { slug: 'reserva-compra', nombre: 'Contrato de Reserva de Compra', precio: 120 },
      { slug: 'contrato-compraventa', nombre: 'Contrato de Compraventa', precio: 145 },
      { slug: 'arras-parking-garage', nombre: 'Arras Parking/Garaje', precio: 145 },
      { slug: 'alquiler-opcion-compra', nombre: 'Alquiler con Opción a Compra', precio: 182 },
    ],
  },
  // ALQUILER
  {
    categoria: 'Alquiler',
    color: 'from-cream-500 to-gold-600',
    items: [
      { slug: 'contrato-alquiler', nombre: 'Contrato de Alquiler LAU', precio: 145, badge: 'Ley 2026' },
      { slug: 'alquiler-temporada', nombre: 'Alquiler por Temporada', precio: 165 },
      { slug: 'alquiler-habitaciones', nombre: 'Alquiler de Habitación', precio: 145 },
      { slug: 'alquiler-local-comercial', nombre: 'Alquiler Local Comercial', precio: 145 },
      { slug: 'alquiler-garaje-trastero', nombre: 'Alquiler Garaje/Trastero', precio: 130 },
    ],
  },
  // RESCISIÓN Y FIANZAS
  {
    categoria: 'Rescisión y Fianzas',
    color: 'from-orange-500 to-orange-600',
    items: [
      { slug: 'rescision-alquiler', nombre: 'Rescisión de Alquiler', precio: 120 },
    ],
  },
  // REVISIÓN LEGAL
  {
    categoria: 'Revisión Legal',
    color: 'from-purple-500 to-purple-600',
    items: [
      { slug: 'revision-alquiler', nombre: 'Revisión Contrato Alquiler', precio: 120 },
      { slug: 'revision-correccion', nombre: 'Revisión + Corrección', precio: 120 },
      { slug: 'revision-correccion-arras', nombre: 'Revisión + Corrección Arras', precio: 120 },
      { slug: 'contrato-ilegal', nombre: 'Análisis de Fraude', precio: 145, badge: '12h' },
    ],
  },
  // SERVICIOS PREMIUM
  {
    categoria: 'Servicios Premium',
    color: 'from-amber-500 to-amber-600',
    items: [
      { slug: 'pack-due-diligence-precompra', nombre: 'Due Diligence Pre-Compra', precio: 350, badge: 'Nuevo' },
      { slug: 'venta-completa-reserva-escritura', nombre: 'Venta Completa Reserva→Escritura', precio: 687 },
      { slug: 'compra-completa-reserva-escritura', nombre: 'Compra Completa Reserva→Escritura', precio: 687 },
      { slug: 'compra-completa-parking-trastero', nombre: 'Compra Parking/Trastero Completa', precio: 295, badge: 'Nuevo' },
      { slug: 'asesoramiento-arras-venta', nombre: 'Asesoramiento Arras→Escritura', precio: 166 },
      { slug: 'acompanamiento-reserva-arras', nombre: 'Acompañamiento Reserva→Arras', precio: 424 },
    ],
  },
  // PACKS COMBINADOS
  {
    categoria: 'Packs Combinados',
    color: 'from-pink-500 to-pink-600',
    items: [
      { slug: 'pack-revision-reserva-alquiler', nombre: 'Pack Revisión + Alquiler LAU', precio: 169 },
    ],
  },
  // FINANCIACIÓN
  {
    categoria: 'Financiación',
    color: 'from-cyan-500 to-cyan-600',
    items: [
      { slug: 'prestamo-particulares', nombre: 'Préstamo entre Particulares', precio: 130 },
    ],
  },
]

export default function SolicitarIndexPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero */}
        <section className="bg-gradient-to-r from-[#2b4c7e] to-[#1e3a5f] text-white py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Servicios de <span className="text-gold-500">Gestoría Inmobiliaria</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-6">
              Contratos redactados por abogados expertos, revisión legal profesional y asesoría completa. <strong>Desde 61€</strong>. Entrega en 24-48h.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">✓ Redacción profesional</span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">✓ Adaptado a Ley 2026</span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">✓ Entrega 24-48h</span>
              <span className="px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm">✓ PDF firmable</span>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-6 py-10">
          <PageHeroImage
            src="/promo3.png"
            alt="Servicios de gestoría inmobiliaria Inmonest"
            className="mb-0"
          />
        </div>

        {/* Servicios por Categoría */}
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto space-y-12">
            
            {SERVICIOS.map((categoria, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                {/* Header */}
                <div className={`bg-gradient-to-r ${categoria.color} px-6 py-4`}>
                  <h2 className="text-2xl font-bold text-white">
                    {categoria.categoria}
                  </h2>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                  {categoria.items.map(servicio => (
                    <Link
                      key={servicio.slug}
                      href={`/gestoria/solicitar/${servicio.slug}`}
                      className="group relative p-6 border-2 border-gray-200 rounded-xl hover:border-gold-500 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Badge */}
                      {servicio.badge && (
                        <div className="absolute top-3 right-3 bg-gold-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {servicio.badge}
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gold-500 transition-colors">
                          {servicio.nombre}
                        </h3>
                        <div className="text-3xl font-bold text-[#2b4c7e]">
                          {servicio.precio}€
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-2 text-gold-500 font-semibold text-sm group-hover:gap-3 transition-all">
                        Ver detalles
                        <span className="text-xl">→</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>

        {/* CTA Bottom */}
        <section className="py-16 px-6 bg-gradient-to-r from-[#2b4c7e] to-[#1e3a5f]">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">
              ¿No encuentras el servicio que necesitas?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Contáctanos y te ayudamos con tu consulta específica
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+34745022862"
                className="px-8 py-4 bg-white text-[#2b4c7e] rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Llamar: 745 022 862
              </a>
              <a
                href="https://wa.me/34745022862?text=Hola,%20necesito%20información%20sobre%20servicios%20de%20gestoría"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#25d366] text-white rounded-lg font-bold text-lg hover:bg-[#20ba5a] transition-colors shadow-lg"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Gestoría Inmobiliaria Online — Todos los Servicios
            </h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Inmonest</strong> es una gestoría inmobiliaria online especializada en contratos, trámites y asesoría legal para compraventa y alquiler de viviendas. Todos nuestros documentos son <strong>redactados por abogados expertos en derecho inmobiliario</strong>, no usamos plantillas genéricas.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Ofrecemos contratos desde <strong>61€</strong> hasta <strong>687€</strong> (servicio completo reserva a escritura). La mayoría de contratos se entregan en <strong>24-48 horas</strong> en formato <strong>PDF firmable digitalmente</strong>.
            </p>
            
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
              Servicios Más Solicitados
            </h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Contrato de Arras Penitenciales</strong> (145€) — El más vendido</li>
              <li><strong>Contrato de Alquiler LAU</strong> (145€) — Adaptado a Ley de Vivienda 2026</li>
              <li><strong>Pack Due Diligence Pre-Compra</strong> (350€) — Revisión completa antes de escriturar</li>
              <li><strong>Servicio Completo Venta</strong> (687€) — Acompañamiento desde reserva hasta escritura</li>
            </ul>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
