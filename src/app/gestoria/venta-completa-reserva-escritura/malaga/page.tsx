import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestorContactBanner from '@/components/GestorContactBanner'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría venta piso Málaga — acompañamiento completo',
  description: 'Vendes tu piso en Málaga? Gestor inmobiliario te acompaña desde reserva hasta escritura. Contratos, documentación, asesoramiento completo. 687€ IVA incluido.',
  keywords: 'vender piso Málaga, gestoría venta vivienda Málaga, acompañamiento venta Málaga, contratos venta particular Málaga, asesoría inmobiliaria Málaga',
  alternates: {
    canonical: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/malaga`,
  },
  openGraph: {
    title: 'Gestoría venta piso Málaga — acompañamiento completo',
    description: 'Gestor inmobiliario personalizado en Málaga te acompaña desde reserva hasta escritura. Vende seguro entre particulares. 687€.',
    url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/malaga`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Venta piso Málaga' }],
  },
}

export const revalidate = 86400

export default function VentaCompletaMalagaPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio Completo de Venta en Málaga: Reserva a Escritura',
    description: 'Acompañamiento completo para propietarios que venden su piso en Málaga a particulares. Gestor inmobiliario personalizado, redacción de contratos y asesoramiento hasta escriturar.',
    areaServed: {
      '@type': 'City',
      name: 'Málaga',
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '687',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      { '@type': 'ListItem', position: 3, name: 'Venta Completa', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura` },
      { '@type': 'ListItem', position: 4, name: 'Málaga', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/malaga` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Málaga */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/venta-completa-reserva-escritura" className="hover:text-[#c9962a]">Venta Completa</Link>
            <span>/</span>
            <span className="text-[#c9962a] font-semibold">Málaga</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#c9962a]/20 text-[#a87a20] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#c9962a]/30">
                📍 Servicio en Málaga
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#c9962a]">¿Ya encontraste comprador?</span> Te ayudamos con todos los trámites en Málaga
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Si <strong>vendes de particular a particular en Málaga</strong> y ya tienes comprador, 
                un <strong>gestor inmobiliario especializado</strong> te acompaña desde la reserva hasta la escritura. 
                Redactamos contratos, recabamos documentación y asesoramos en cada paso. 
                <strong>Vende seguro sin agencia, ahorra 10.000€+ en comisiones.</strong>
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>✓ Ya tienes comprador particular:</strong> Perfecto, nosotros nos encargamos de toda la gestión documental. 
                  <strong>✓ Especialistas en Málaga:</strong> Conocemos las particularidades de Andalucía, 
                  documentación específica y coordinamos con notarías de Málaga capital (Centro Histórico, Teatinos, Pedregalejo).
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/venta-completa-reserva-escritura"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a87a20] transition text-center shadow-lg"
                >
                  Contratar servicio (687€)
                </Link>
                <a
                  href="tel:+34641008847"
                  className="bg-white border-2 border-[#c9962a] text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#fef9e8] transition text-center shadow flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  641 008 847
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestor en Málaga</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Conocemos el mercado Costa del Sol</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/keys.jpg"
                alt="Venta piso Málaga"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resto del contenido similar a Barcelona, adaptado para Málaga */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            ¿Qué incluye el servicio completo en Málaga?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-amber-50 to-white p-8 rounded-xl border border-amber-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📝 Redacción de contratos</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Contrato de reserva (arras penitenciales/confirmatorias)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Revisión y ajustes según necesidades de ambas partes</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">📋 Gestión documental completa</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Nota simple registral actualizada</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Certificado energético (si no lo tienes)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Certificado de deudas (comunidad, IBI, basuras)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Cédula de habitabilidad (Andalucía)</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl border border-green-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🤝 Asesoramiento personalizado</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestor dedicado disponible por teléfono y email</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Asesoramiento fiscal (plusvalía municipal, IRPF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Resolución de dudas durante todo el proceso</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-xl border border-purple-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">🏛️ Coordinación escritura</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Coordinación con notaría en Málaga</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Revisión previa del borrador de escritura</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-[#c9962a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Acompañamiento hasta el día de la firma</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl font-bold text-[#c9962a] mb-4">Todo por 687€ IVA incluido</p>
            <p className="text-gray-600 mb-8">Precio fijo, sin sorpresas. Pago tras firma de contrato de reserva.</p>
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="inline-block bg-[#c9962a] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#a87a20] transition shadow-lg"
            >
              Contratar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            ¿Por qué contratar este servicio en Málaga?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ahorra miles de euros</h3>
              <p className="text-gray-600">
                Sin pagar comisión de agencia (4-6% del precio), ahorras 10.000€+ en una venta de 200.000€. 
                Inviertes solo 687€ en seguridad jurídica total.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Venta segura y legal</h3>
              <p className="text-gray-600">
                Contratos profesionales, documentación completa y asesoramiento experto. 
                Evitas errores costosos y proteges tus intereses en cada paso.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="text-4xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Ahorra tiempo y estrés</h3>
              <p className="text-gray-600">
                Tu gestor se encarga de la burocracia: pedir certificados, coordinar con notaría, 
                resolver dudas. Tú solo firmas cuando todo está listo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Cómo funciona en 4 pasos
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#c9962a] text-white rounded-full flex items-center justify-center font-bold text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Contratas el servicio</h3>
                <p className="text-gray-600">
                  Rellenas el formulario online o llamas al 641 008 847. Te asignamos un gestor dedicado en Málaga.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#c9962a] text-white rounded-full flex items-center justify-center font-bold text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Redacción del contrato de reserva</h3>
                <p className="text-gray-600">
                  Tu gestor redacta el contrato de arras (reserva) personalizado. Lo revisas, ajustamos y firmáis vendedor y comprador. 
                  Pagas los 687€ tras firmar.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#c9962a] text-white rounded-full flex items-center justify-center font-bold text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Gestión de documentación</h3>
                <p className="text-gray-600">
                  Tu gestor solicita toda la documentación necesaria: nota simple, certificados de deudas, cédula de habitabilidad, etc. 
                  Te mantiene informado en todo momento.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-[#c9962a] text-white rounded-full flex items-center justify-center font-bold text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Escritura y entrega de llaves</h3>
                <p className="text-gray-600">
                  Coordinamos con la notaría en Málaga. Revisamos el borrador de escritura. 
                  El día de la firma, tu gestor te acompaña si lo necesitas. Cobras y entregas llaves. ¡Venta completada!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="inline-block bg-[#c9962a] text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-[#a87a20] transition shadow-lg"
            >
              Empezar ahora
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Preguntas frecuentes en Málaga
          </h2>
          <div className="space-y-6">
            <details className="bg-white p-6 rounded-xl shadow-md">
              <summary className="font-bold text-lg cursor-pointer text-gray-900">
                ¿Qué pasa si aún no tengo comprador?
              </summary>
              <p className="mt-4 text-gray-600">
                Este servicio es para propietarios que <strong>ya tienen comprador particular</strong>. 
                Si aún no has encontrado comprador, te recomendamos publicar tu piso en plataformas gratuitas 
                (Idealista, Fotocasa, Milanuncios) o contactar con agencias inmobiliarias en Málaga.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-md">
              <summary className="font-bold text-lg cursor-pointer text-gray-900">
                ¿Cuánto se tarda en completar todo el proceso en Málaga?
              </summary>
              <p className="mt-4 text-gray-600">
                Desde la firma del contrato de reserva hasta la escritura suelen pasar <strong>30-60 días</strong>. 
                Depende de la rapidez en obtener documentación (comunidad, ayuntamiento) y la disponibilidad de la notaría en Málaga.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-md">
              <summary className="font-bold text-lg cursor-pointer text-gray-900">
                ¿El precio de 687€ incluye gastos de notaría y registro?
              </summary>
              <p className="mt-4 text-gray-600">
                <strong>No.</strong> Los 687€ son solo por el servicio de gestoría (redacción de contratos, gestión documental, asesoramiento). 
                Los <strong>gastos de notaría y registro</strong> los paga el comprador según la ley (aprox. 1-1.5% del precio de venta). 
                Como vendedor, solo pagas plusvalía municipal (si hay ganancia) e IRPF en tu próxima declaración (si corresponde).
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-md">
              <summary className="font-bold text-lg cursor-pointer text-gray-900">
                ¿Puedo cancelar el servicio si cambia algo?
              </summary>
              <p className="mt-4 text-gray-600">
                Una vez firmado el contrato de reserva y pagados los 687€, nuestro gestor ya ha empezado a trabajar 
                (redacción del contrato, solicitud de documentación). <strong>No hay reembolso</strong> si cancelas, 
                pero puedes pausar el servicio si necesitas más tiempo o surgen imprevistos. Hablamos contigo y buscamos soluciones.
              </p>
            </details>

            <details className="bg-white p-6 rounded-xl shadow-md">
              <summary className="font-bold text-lg cursor-pointer text-gray-900">
                ¿El servicio incluye asesoramiento sobre hipotecas del comprador?
              </summary>
              <p className="mt-4 text-gray-600">
                <strong>No directamente.</strong> Nuestro servicio se centra en la parte del vendedor (contratos, documentación, coordinación). 
                Sin embargo, si el comprador necesita hipoteca, podemos asesoraros sobre el proceso general y coordinarnos con su banco 
                para facilitar la firma en la notaría.
              </p>
            </details>
          </div>
        </div>
      </section>


      <GestorContactBanner />
      <TestimoniosSection />

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para vender tu piso en Málaga con total seguridad?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contrata ahora y recibe asesoramiento personalizado de un gestor inmobiliario especializado en Málaga. 
            Vende entre particulares sin complicaciones.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="bg-white text-[#c9962a] px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar servicio (687€)
            </Link>
            <a
              href="tel:+34641008847"
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition"
            >
              Llamar 641 008 847
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
