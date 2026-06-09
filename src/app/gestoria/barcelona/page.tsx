import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import CiudadHubComoTrabajamos from '@/components/CiudadHubComoTrabajamos'
import CiudadHubExtras from '@/components/CiudadHubExtras'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria Barcelona para Particulares | Contratos y Acompañamiento Legal',
  description: 'Gestoría inmobiliaria para particulares en Barcelona. Asesor experto asignado para compra o venta de vivienda. Sin comisiones abusivas. Desde 424€. ✓ Generalitat ✓ Notarías Barcelona',
  keywords: 'gestoría inmobiliaria barcelona, gestoría para particulares barcelona, comprar piso barcelona sin agencia, vender piso barcelona, contrato arras barcelona, asesoría compra vivienda barcelona',
  alternates: { canonical: `${BASE_URL}/gestoria/barcelona` },
  openGraph: {
    title: 'Gestoría Inmobiliaria Barcelona | Inmonest',
    description: 'Asesoramiento jurídico especializado en compraventa de inmuebles en Barcelona. Revisión de contratos, nota registral y documentación urbanística.',
    url: `${BASE_URL}/gestoria/barcelona`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function GestoriaBarcelonaPage() {
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Gestoría Inmobiliaria Barcelona - Inmonest',
    description: 'Servicios de gestoría inmobiliaria especializada en compraventa de viviendas en Barcelona',
    url: `${BASE_URL}/gestoria/barcelona`,
    areaServed: {
      '@type': 'City',
      name: 'Barcelona',
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Servicios de Gestoría Inmobiliaria',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Acompañamiento Reserva hasta Arras',
            description: 'Asesoramiento jurídico completo desde la reserva hasta el contrato de arras en Barcelona',
          },
          priceCurrency: 'EUR',
          price: '424',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Servicio Completo de Compra: Reserva a Escritura',
            description: 'Servicio integral con gestor asignado para compraventa de vivienda en Barcelona',
          },
          priceCurrency: 'EUR',
          price: '687',
        },
      ],
    },
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
              <Link href="/" className="hover:text-gray-300">Inicio</Link>
              <span>/</span>
              <Link href="/gestoria" className="hover:text-gray-300">Gestoría</Link>
              <span>/</span>
              <span className="text-white font-medium">Barcelona</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Gestoría Inmobiliaria en <span className="text-[#c9a84c]">Barcelona</span>
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  <strong>Gestoría inmobiliaria para particulares</strong> en Barcelona. Te acompañamos en la compra o venta con un asesor experto asignado, sin comisiones abusivas de agencias (3-5%) y con contratos redactados por abogados.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#servicios"
                    className="bg-[#c9a84c] text-[#1a2f1c] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
                  >
                    Ver servicios
                  </Link>
                  <Link
                    href="/gestoria"
                    className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                  >
                    Todos los contratos
                  </Link>
                </div>
              </div>

              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/gestoria1.jpg"
                  alt="Gestoría inmobiliaria en Barcelona"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Por qué Barcelona necesita gestoría especializada */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Por qué en Barcelona necesitas asesoramiento especializado?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Zona tensionada</h3>
                <p className="text-gray-600">
                  Barcelona está declarada zona tensionada. Los contratos deben cumplir regulación específica de precios, prórrogas y condiciones especiales que no todos conocen.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">ITE y cédula obligatorias</h3>
                <p className="text-gray-600">
                  En Barcelona la Inspección Técnica del Edificio (ITE) y la cédula de habitabilidad son obligatorias. Su ausencia puede bloquear la compraventa o generar sanciones graves.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mercado complejo</h3>
                <p className="text-gray-600">
                  Barcelona tiene uno de los mercados inmobiliarios más competitivos de España. Agencias con honorarios elevados, contratos complejos y operaciones que requieren asesoramiento experto.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Nuestros servicios en Barcelona
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Servicios premium de gestoría inmobiliaria diseñados específicamente para el mercado barcelonés
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Servicio 1 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-64">
                  <Image
                    src="/gestoria1.jpg"
                    alt="Acompañamiento en compraventa Barcelona"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-[#c9a84c] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Premium
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Acompañamiento Reserva hasta Arras
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Un asesor experto de Inmonest te acompaña desde la firma de la reserva hasta el contrato de arras. Incluye revisión completa de contratos, análisis de nota registral, verificación de documentación urbanística (ITE, cédula) y redacción del contrato de arras personalizado.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 mb-3">Incluye:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Asesor experto de Inmonest asignado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Revisión contrato de reserva</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Análisis nota registral completo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Revisión ITE, cédula de habitabilidad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Redacción contrato de arras personalizado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Acompañamiento continuo durante el proceso</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">424 €</p>
                      <p className="text-sm text-gray-500">IVA incluido</p>
                    </div>
                    <Link
                      href="/gestoria/solicitar/acompanamiento-reserva-arras"
                      className="bg-[#c9a84c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
                    >
                      Contratar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Servicio 2 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border-2 border-[#c9a84c]">
                <div className="relative h-64">
                  <Image
                    src="/gestoria4.jpg"
                    alt="Servicio completo de compra Barcelona"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-[#c9a84c] to-[#d4a73e] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Todo incluido
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Servicio Completo: Reserva a Escritura
                  </h3>
                  <p className="text-gray-600 mb-6">
                    El servicio más completo. Gestor personalizado asignado que te acompaña desde la reserva hasta la firma ante notario. Incluye revisión de contratos con agencias, análisis de honorarios, coordinación con notaría y asesoramiento prioritario.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 mb-3">Incluye:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Gestor personalizado asignado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Estudio completo de la operación</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Redacción de contratos reserva y arras</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Ayuda para recabar documentación</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Asesoramiento continuo hasta escritura</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Coordinación con notaría</span>
                      </li>
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-900">687 €</p>
                      <p className="text-sm text-gray-500">IVA incluido</p>
                    </div>
                    <Link
                      href="/gestoria/solicitar/compra-completa-reserva-escritura"
                      className="bg-[#c9a84c] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
                    >
                      Contratar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CiudadHubServiciosGrid ciudad="Barcelona" />

        <CiudadHubComoTrabajamos ciudad="Barcelona" />

        {/* Quiénes somos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Inmonest: Gestoría Inmobiliaria para Particulares
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              <strong>No somos una agencia inmobiliaria.</strong> Somos una gestoría especializada en asesoramiento legal inmobiliario para particulares. Nuestro objetivo es ayudarte a comprar o vender tu vivienda evitando las comisiones abusivas de las agencias (entre 9.000€ y 15.000€ en Barcelona) y sin renunciar a asesoramiento profesional.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Cada cliente tiene un <strong>asesor experto asignado</strong> que te acompaña durante todo el proceso: análisis de documentación, redacción de contratos, coordinación con notarías y resolución de cualquier problema legal que surja.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Conocemos las particularidades del mercado barcelonés: regulación de zona tensionada, ITE, cédula de habitabilidad y normativa específica de la ciudad. Trabajamos para garantizar que tu operación se cierre con todas las garantías y sin sorpresas.
            </p>
            <Link
              href="/gestoria"
              className="inline-block bg-[#c9a84c] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
            >
              Ver todos nuestros servicios
            </Link>
          </div>
        </section>

        {/* Otras ciudades */}
        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">También ofrecemos gestoría inmobiliaria en:</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link href="/gestoria/madrid" className="text-[#c9a84c] hover:text-[#a87a20] font-semibold">
                Gestoría Madrid →
              </Link>
              <Link href="/gestoria/valencia" className="text-[#c9a84c] hover:text-[#a87a20] font-semibold">
                Gestoría Valencia →
              </Link>
              <Link href="/zaragoza/contrato-alquiler" className="text-[#c9a84c] hover:text-[#a87a20] font-semibold">
                Contrato de alquiler en Zaragoza →
              </Link>
              <Link href="/gestoria/sevilla" className="text-[#c9a84c] hover:text-[#a87a20] font-semibold">
                Gestoría inmobiliaria en Sevilla →
              </Link>
              <Link href="/granada/contrato-alquiler" className="text-[#c9a84c] hover:text-[#a87a20] font-semibold">
                Contrato de alquiler en Granada →
              </Link>
            </div>
          </div>
        </section>

        <CiudadHubExtras ciudad="Barcelona" whatsappMessage="Hola, necesito gestoría inmobiliaria para particulares en Barcelona" />

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Vas a comprar una vivienda en Barcelona?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              No dejes tu inversión más importante al azar. Contrata asesoramiento especializado y compra con total seguridad jurídica.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/gestoria/solicitar/acompanamiento-reserva-arras"
                className="bg-[#c9a84c] text-[#1a2f1c] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
              >
                Contratar servicio premium
              </Link>
              <Link
                href="mailto:info@inmonest.com"
                className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Consultar por email
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
