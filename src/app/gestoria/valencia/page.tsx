import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import CiudadHubComoTrabajamos from '@/components/CiudadHubComoTrabajamos'
import CiudadHubExtras from '@/components/CiudadHubExtras'
import ComprarConSeguridad from '@/components/ComprarConSeguridad'
import CiudadHubMercado from '@/components/CiudadHubMercado'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import JsonLd from '@/components/JsonLd'
import GestoriaHubConversionFooter from '@/components/GestoriaHubConversionFooter'
import { GESTORIA_VALENCIA_FAQ } from '@/lib/gestoria-valencia-faq'
import {
  buildFaqSchema,
  buildLegalServiceSchema,
  buildServiceOfferSchema,
} from '@/lib/gestoria-ciudad-schema'

const BASE_URL = 'https://inmonest.com'

const META_DESCRIPTION =
  'Gestoría inmobiliaria en Valencia para particulares. Contratos LAU desde 145€, arras 145€. Sin comisiones de agencia. Abogados expertos, entrega 48h.'

export const metadata: Metadata = {
  title: 'Gestoría inmobiliaria Valencia desde 61€',
  description: META_DESCRIPTION,
  keywords: 'gestoría inmobiliaria valencia, gestoría para particulares valencia, comprar piso valencia sin agencia, vender piso valencia, contrato arras valencia, asesoría compra vivienda valencia',
  alternates: { canonical: `${BASE_URL}/gestoria/valencia` },
  openGraph: {
    title: 'Gestoría inmobiliaria Valencia',
    description: META_DESCRIPTION,
    url: `${BASE_URL}/gestoria/valencia`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria4.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria en Valencia' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestoría inmobiliaria Valencia',
    description:
      'Contratos de alquiler, arras y compraventa en Valencia desde 145€. Sin comisiones de agencia. Entrega 48h.',
  },
}

export default function GestoriaValenciaPage() {
  return (
    <>
      <JsonLd
        schema={[
          buildLegalServiceSchema('Valencia', 'valencia'),
          buildServiceOfferSchema('Acompañamiento Reserva hasta Arras', 'Valencia', 424),
          buildFaqSchema(GESTORIA_VALENCIA_FAQ),
        ]}
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-black to-black text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
              <Link href="/" className="hover:text-gray-300">Inicio</Link>
              <span>/</span>
              <Link href="/gestoria" className="hover:text-gray-300">Gestoría</Link>
              <span>/</span>
              <span className="text-white font-medium">Valencia</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Gestoría Inmobiliaria <span className="text-gold-500">Valencia</span> para Particulares
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  <strong>Gestoría inmobiliaria para particulares</strong> en Valencia. Asesor experto asignado, sin comisiones de agencia (3-5%) y contratos redactados por abogados con conocimiento del mercado valenciano.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="#servicios"
                    className="bg-gold-500 text-[#1a2f1c] px-8 py-3 rounded-lg font-semibold hover:bg-gold-600 transition"
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
                  src="/gestoria3.jpg"
                  alt="Gestoría inmobiliaria en Valencia"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Por qué Valencia necesita gestoría especializada */}
        <section className="py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Por qué en Valencia necesitas asesoramiento especializado?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Cédula de habitabilidad</h3>
                <p className="text-gray-600">
                  En la Comunidad Valenciana la cédula de habitabilidad es obligatoria para toda compraventa. Su ausencia puede impedir la inscripción en el registro y generar graves problemas legales.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Mercado en expansión</h3>
                <p className="text-gray-600">
                  Valencia vive un momento de crecimiento inmobiliario intenso. Más demanda significa mayor competencia, operaciones más rápidas y la necesidad de asesoramiento ágil y profesional.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Zonas turísticas reguladas</h3>
                <p className="text-gray-600">
                  Las zonas costeras y turísticas de Valencia tienen regulación específica sobre viviendas vacacionales y usos turísticos. Es crítico verificar el uso permitido antes de comprar.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
              Nuestros servicios en Valencia
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Servicios premium de gestoría inmobiliaria diseñados específicamente para el mercado valenciano
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Servicio 1 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition">
                <div className="relative h-64">
                  <Image
                    src="/gestoria1.jpg"
                    alt="Acompañamiento en compraventa Valencia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Premium
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Acompañamiento Reserva hasta Arras
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Un asesor experto de Inmonest te acompaña desde la firma de la reserva hasta el contrato de arras. Incluye revisión completa de contratos, análisis de nota registral, verificación de cédula de habitabilidad y redacción del contrato de arras personalizado.
                  </p>

                  <div className="mb-6">
                    <p className="text-sm font-semibold text-gray-500 mb-3">Incluye:</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Asesor experto de Inmonest asignado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Revisión contrato de reserva</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Análisis nota registral completo</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Verificación cédula de habitabilidad</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Redacción contrato de arras personalizado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      className="bg-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-600 transition"
                    >
                      Contratar
                    </Link>
                  </div>
                </div>
              </div>

              {/* Servicio 2 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition border-2 border-gold-500">
                <div className="relative h-64">
                  <Image
                    src="/gestoria4.jpg"
                    alt="Servicio completo de compra Valencia"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-gradient-to-r from-gold-500 to-[#d4a73e] text-white text-xs font-bold px-3 py-1 rounded-full">
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
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Gestor personalizado asignado</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Estudio completo de la operación</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Redacción de contratos reserva y arras</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Ayuda para recabar documentación</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Asesoramiento continuo hasta escritura</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      className="bg-gold-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gold-600 transition"
                    >
                      Contratar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ComprarConSeguridad ciudad="Valencia" ciudadSlug="valencia" />

        <CiudadHubServiciosGrid ciudad="Valencia" ciudadSlug="valencia" />

        <CiudadHubComoTrabajamos ciudad="Valencia" />

        <CiudadHubMercado
          ciudad="Valencia"
          zonas={[
            { nombre: 'Ruzafa', rango: '800-1.100€/mes', perfil: 'jóvenes profesionales' },
            { nombre: 'Ciutat Vella', rango: '650-900€/mes', perfil: 'estudiantes y turismo' },
            { nombre: 'Benimaclet', rango: '550-750€/mes', perfil: 'universitarios' },
            { nombre: 'Mestalla-Nou Moles', rango: '700-950€/mes', perfil: 'familias' },
            { nombre: 'Poblats Marítims', rango: '750-1.000€/mes', perfil: 'perfil mixto' },
          ]}
          compraventa={
            <>
              <p>
                El precio medio en Valencia ronda los <strong>1.800-2.200€/m²</strong>. Un piso de 80m² en Ruzafa suele superar los <strong>200.000€</strong>. En Benimaclet, el rango habitual es de <strong>120.000-160.000€</strong>.
              </p>
              <p>
                Con una comisión de agencia del 3-5%, hablamos de <strong>7.000-13.000€</strong> de honorarios solo por intermediar. Inmonest cobra honorarios fijos desde <strong>145€</strong>.
              </p>
            </>
          }
          particularidades={[
            'Cédula de habitabilidad: obligatoria para vender y alquilar en la Comunitat Valenciana',
            'Licencia VUT: restricciones en centro histórico y Ruzafa para alquiler turístico',
            'Due diligence post-DANA: verificación adicional en Paiporta, Alfafar y Sedaví',
            'Certificado energético: obligatorio; sanciones hasta 6.000€ por incumplimiento',
          ]}
        />

        {/* Quiénes somos */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Inmonest: Gestoría Inmobiliaria para Particulares en Valencia
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Somos Inmonest, una gestoría inmobiliaria especializada en ayudar a particulares compradores y vendedores en Valencia. Conocemos las particularidades del mercado valenciano: cédula de habitabilidad obligatoria, regulación de zonas turísticas y normativa específica de la Comunidad Valenciana.
            </p>
            <p className="text-lg text-gray-600 mb-4">
              No somos una agencia inmobiliaria. Estamos en contra de las comisiones abusivas (que pueden llegar a 9.000-15.000€). En Inmonest tienes un asesor experto asignado a tu servicio en todo momento.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Te ayudamos a comprar o vender con todas las garantías jurídicas, de manera profesional y segura.
            </p>
            <Link
              href="/gestoria"
              className="inline-block bg-gold-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gold-600 transition"
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
              <Link href="/gestoria/barcelona" className="text-gold-500 hover:text-gold-700 font-semibold">
                Gestoría Barcelona →
              </Link>
              <Link href="/gestoria/madrid" className="text-gold-500 hover:text-gold-700 font-semibold">
                Gestoría Madrid →
              </Link>
              <Link href="/zaragoza/contrato-alquiler" className="text-gold-500 hover:text-gold-700 font-semibold">
                Contrato de alquiler en Zaragoza →
              </Link>
              <Link href="/gestoria/sevilla" className="text-gold-500 hover:text-gold-700 font-semibold">
                Gestoría inmobiliaria en Sevilla →
              </Link>
              <Link href="/granada/contrato-alquiler" className="text-gold-500 hover:text-gold-700 font-semibold">
                Contrato de alquiler en Granada →
              </Link>
            </div>
          </div>
        </section>

        <CiudadHubExtras
          ciudad="Valencia"
          hubSlug="valencia"
          whatsappMessage="Hola, necesito gestoría inmobiliaria para particulares en Valencia"
          testimoniosLayout="stack"
          showGoogleReviews
        />

        <CiudadHubFaq
          ciudad="Valencia"
          items={GESTORIA_VALENCIA_FAQ}
          subtitulo="Respuestas específicas para el mercado valenciano: cédula de habitabilidad, VUT y compraventa entre particulares."
        />
      </main>

      <GestoriaHubConversionFooter
        ciudad="Valencia"
        ciudadSlug="valencia"
        ctaTitulo="¿Vas a alquilar o comprar en Valencia?"
        ctaTexto="Fianza Generalitat y normativa autonómica: empieza por el contrato o llama a un gestor."
      />
    </>
  )
}
