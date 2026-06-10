import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import CiudadHubComoTrabajamos from '@/components/CiudadHubComoTrabajamos'
import CiudadHubExtras from '@/components/CiudadHubExtras'
import CiudadHubMercado from '@/components/CiudadHubMercado'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import JsonLd from '@/components/JsonLd'
import { GESTORIA_MADRID_FAQ } from '@/lib/gestoria-madrid-faq'
import {
  buildFaqSchema,
  buildLegalServiceSchema,
  buildServiceOfferSchema,
} from '@/lib/gestoria-ciudad-schema'

const BASE_URL = 'https://inmonest.com'

const META_DESCRIPTION =
  'Gestoría inmobiliaria para particulares en Madrid. Contratos LAU desde 120€, arras 145€, servicio completo 687€. Sin comisiones. Abogados especializados.'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria Madrid para Particulares | Contratos y Asesoramiento',
  description: META_DESCRIPTION,
  keywords: 'gestoría inmobiliaria madrid, gestoría para particulares madrid, comprar piso madrid sin agencia, vender piso madrid, contrato arras madrid, asesoría compra vivienda madrid',
  alternates: { canonical: `${BASE_URL}/gestoria/madrid` },
  openGraph: {
    title: 'Gestoría Inmobiliaria Madrid para Particulares | Inmonest',
    description: META_DESCRIPTION,
    url: `${BASE_URL}/gestoria/madrid`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria3.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria en Madrid' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestoría Inmobiliaria Madrid para Particulares | Inmonest',
    description:
      'Contratos de alquiler, arras y compraventa en Madrid desde 120€. Sin comisiones de agencia. Entrega 48h.',
  },
}

export default function GestoriaMadridPage() {
  return (
    <>
      <JsonLd
        schema={[
          buildLegalServiceSchema('Madrid', 'madrid'),
          buildServiceOfferSchema('Acompañamiento Reserva hasta Arras', 'Madrid', 424),
          buildFaqSchema(GESTORIA_MADRID_FAQ),
        ]}
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
              <span className="text-white font-medium">Madrid</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Gestoría Inmobiliaria <span className="text-[#c9a84c]">Madrid</span> para Particulares
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  <strong>Gestoría inmobiliaria para particulares</strong> en Madrid. Asesor experto asignado, sin comisiones de agencia (3-5%) y contratos redactados por abogados especializados en el mercado madrileño.
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
                  src="/gestoria7.jpg"
                  alt="Gestoría inmobiliaria en Madrid"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Por qué Madrid necesita gestoría especializada */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Por qué en Madrid necesitas asesoramiento especializado?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mercado más caro de España</h3>
                <p className="text-gray-600">
                  Madrid tiene los precios inmobiliarios más altos del país. Un error en la compra puede suponer pérdidas de decenas de miles de euros. El asesoramiento profesional es una inversión que se amortiza.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">IEE e ITE obligatorias</h3>
                <p className="text-gray-600">
                  La Inspección de Edificios (IEE) y la ITE son obligatorias en Madrid para edificios de más de 50 años. Su ausencia impide inscribir la compraventa y puede generar sanciones de hasta 3.000€.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-[#c9a84c]/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-[#c9a84c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Operaciones ultra-rápidas</h3>
                <p className="text-gray-600">
                  En Madrid las viviendas más atractivas se venden en días. Las agencias presionan para firmar rápido. Necesitas asesoramiento ágil que revise los contratos sin frenar la operación.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Nuestros servicios en Madrid
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Servicios premium de gestoría inmobiliaria diseñados específicamente para el mercado madrileño
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Servicio 1 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-64">
                  <Image
                    src="/gestoria1.jpg"
                    alt="Acompañamiento en compraventa Madrid"
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
                    Te acompañamos desde la firma de la reserva hasta el contrato de arras. Incluye revisión completa de contratos, análisis de nota registral, verificación de IEE/ITE y redacción del contrato de arras.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 mb-3">Incluye:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
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
                        <span>Verificación IEE, ITE, cédula de habitabilidad</span>
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
                        <span>Asesoramiento continuo durante el proceso</span>
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
                    alt="Servicio completo de compra Madrid"
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

        <CiudadHubServiciosGrid ciudad="Madrid" ciudadSlug="madrid" />

        <CiudadHubComoTrabajamos ciudad="Madrid" />

        <CiudadHubMercado
          ciudad="Madrid"
          zonas={[
            { nombre: 'Salamanca', rango: '1.200-1.800€/mes', perfil: 'ejecutivos y familias' },
            { nombre: 'Chamberí', rango: '900-1.300€/mes', perfil: 'contratos LAU larga duración' },
            { nombre: 'Lavapiés-Embajadores', rango: 'desde 700€/mes', perfil: 'jóvenes y estudiantes' },
            { nombre: 'Vallecas-Vicálvaro', rango: '600-850€/mes', perfil: 'familias trabajadoras' },
            { nombre: 'Arganzuela-Legazpi', rango: '800-1.100€/mes', perfil: 'perfil mixto' },
          ]}
          compraventa={
            <>
              <p>
                El precio medio en Madrid ronda los <strong>3.800-4.500€/m²</strong>. Un piso de 80m² en Salamanca supera los <strong>400.000€</strong>. En Vallecas, el rango habitual es de <strong>180.000-220.000€</strong>.
              </p>
              <p>
                Con una comisión de agencia del 3-5%, hablamos de <strong>12.000-20.000€</strong> de honorarios solo por intermediar. Inmonest cobra honorarios fijos desde <strong>120€</strong>.
              </p>
            </>
          }
          particularidades={[
            'Plusvalía municipal (IIVTNU): obligatoria en toda venta, liquidar en 30 días hábiles',
            'IEE e ITE: obligatorias en edificios de más de 50 años; bloquean la inscripción registral sin ellas',
            'Operaciones express: las agencias presionan para firmar en 24-48h; ofrecemos revisión urgente',
            'Certificado energético: obligatorio para vender o alquilar; penalizaciones hasta 6.000€',
          ]}
        />

        {/* Quiénes somos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Inmonest: Gestoría Inmobiliaria para Particulares
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              <strong>No somos una agencia inmobiliaria.</strong> Somos una gestoría especializada en asesoramiento legal inmobiliario para particulares. Nuestro objetivo es ayudarte a comprar o vender tu vivienda evitando las comisiones abusivas de las agencias (entre 9.000€ y 15.000€ en Madrid) y sin renunciar a asesoramiento profesional.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Cada cliente tiene un <strong>asesor experto asignado</strong> que te acompaña durante todo el proceso: análisis de documentación, redacción de contratos, coordinación con notarías y resolución de cualquier problema legal que surja.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Conocemos las particularidades del mercado madrileño: IEE e ITE obligatorias, presión de las agencias en operaciones rápidas y la complejidad del mercado más competitivo de España. Trabajamos para garantizar que tu operación se cierre con todas las garantías y sin sorpresas.
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
              <Link href="/gestoria/barcelona" className="text-[#c9a84c] hover:text-[#a87a20] font-semibold">
                Gestoría Barcelona →
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

        <CiudadHubExtras
          ciudad="Madrid"
          hubSlug="madrid"
          whatsappMessage="Hola, necesito gestoría inmobiliaria para particulares en Madrid"
          testimoniosLayout="stack"
          showGoogleReviews
        />

        <CiudadHubFaq
          ciudad="Madrid"
          items={GESTORIA_MADRID_FAQ}
          subtitulo="Respuestas específicas para el mercado madrileño: plusvalía, ITE y compraventa entre particulares."
        />

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Vas a comprar una vivienda en Madrid?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              En el mercado más caro de España, un error puede costarte decenas de miles de euros. Contrata asesoramiento especializado y compra con total seguridad jurídica.
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
