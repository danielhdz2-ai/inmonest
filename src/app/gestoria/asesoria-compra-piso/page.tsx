import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestorContactBanner from '@/components/GestorContactBanner'
import TestimoniosSection from '@/components/TestimoniosSection'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Compra Piso sin Comisiones Abusivas 【687€】Gestoría Inmobiliaria',
  description: 'Gestoría inmobiliaria para particulares. Te acompañamos desde la reserva hasta la escritura. Sin comisiones de agencia. Servicio completo 687€.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/asesoria-compra-piso`,
  },
  openGraph: {
    title: 'Compra tu Piso sin Comisiones Abusivas — Inmonest',
    description: 'Gestoría inmobiliaria especializada en compraventa. Te acompañamos en todo el proceso sin pagar comisiones a agencias. Servicio completo 687€.',
    url: `${BASE_URL}/gestoria/asesoria-compra-piso`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/familia3.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria compra piso' }],
  },
}

export const revalidate = 86400

export default function AsesoriaCompraPisoPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio Completo de Compra de Vivienda',
    description: 'Gestoría inmobiliaria que acompaña a particulares en la compra de vivienda desde la reserva hasta la escritura. Sin comisiones de agencia.',
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
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-to-br from-purple-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🏠 Gestoría inmobiliaria para particulares
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Compras piso y <span className="text-[#c9962a]">no quieres pagar comisiones abusivas</span>?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                <strong>Inmonest</strong> te acompaña desde la reserva hasta la escritura. Revisamos documentación, 
                contratos, hipoteca y te ayudamos en todo el proceso. <strong>Sin comisiones de agencia.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/compra-completa-reserva-escritura"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
                >
                  Contratar servicio completo (687€)
                </Link>
                <a
                  href="https://wa.me/34745022862?text=Hola,%20estoy%20comprando%20piso%20y%20necesito%20ayuda%20con%20la%20gesti%C3%B3n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#c9962a] border-2 border-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-50 transition text-center shadow-lg"
                >
                  💬 WhatsApp directo
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestoría a tu lado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Sin comisiones de agencia</span>
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
                src="/familia3.jpg"
                alt="Gestoría inmobiliaria compra piso"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">⭐</div>
                  <div>
                    <div className="font-bold text-gray-900">156</div>
                    <div className="text-sm text-gray-600">compras gestionadas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GestorContactBanner whatsappMessage="Hola, estoy comprando piso y necesito ayuda con la gestión" />

      {/* Por qué Inmonest */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué comprar con gestoría en lugar de agencia?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ahorras en comisiones</h3>
              <p className="text-gray-700">
                Las agencias cobran entre 3% y 5% del precio (9.000€-15.000€ en un piso de 300k). 
                Con Inmonest pagas <strong>687€ fijos</strong>.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Evitas errores costosos</h3>
              <p className="text-gray-700">
                Revisamos documentación, detectamos cargas ocultas, verificamos metros cuadrados, 
                analizamos contratos. Te protegemos de fraudes y problemas legales.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Acompañamiento completo</h3>
              <p className="text-gray-700">
                Desde la reserva hasta la escritura. Revisamos todo, negociamos en tu nombre 
                y te acompañamos hasta que tengas las llaves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye el servicio */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué incluye el servicio completo de compra?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Verificación documental completa</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Solicitud y análisis de nota simple registral</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Verificación de propietario, cargas, hipotecas, embargos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Comprobación de metros cuadrados reales vs anuncio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Informe de riesgos detectados en PDF</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Revisión y negociación de contratos</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión completa contrato de arras/reserva</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Detección de cláusulas abusivas o perjudiciales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Negociación de condiciones con vendedor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Redacción de enmiendas y modificaciones</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Gestión completa de hipoteca</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión oferta vinculante del banco</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Análisis de comisiones, seguros, vinculaciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Detección de cláusulas abusivas (suelo, IRPH)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Coordinación con notaría y registro</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-orange-100 text-[#c9962a] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Acompañamiento hasta escritura</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Soporte continuo vía email/WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión de escritura de compraventa</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Coordinación de fechas y documentación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Atención prioritaria durante todo el proceso</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Problemas que hemos detectado y solucionado
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Ahorro de 8.500€ en hipoteca</h3>
              <p className="text-gray-700 text-sm mb-3">
                Cliente iba a firmar hipoteca con comisión de apertura del 1,5% + seguro de vida obligatorio caro. 
                Negociamos: 0% comisión + seguro externo. Ahorro: 8.500€.
              </p>
              <div className="text-orange-700 font-semibold text-sm">Barcelona, marzo 2026</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <div className="text-4xl mb-3">📐</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Detectamos 12m² menos</h3>
              <p className="text-gray-700 text-sm mb-3">
                Anuncio decía 78m². Nota simple registral: 66m². Diferencia: 12m² × 3.000€/m² = 36.000€ de sobreprecio. 
                Renegociamos precio o cancelación.
              </p>
              <div className="text-orange-700 font-semibold text-sm">Madrid, abril 2026</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-2 border-orange-200">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-lg font-bold mb-2 text-gray-900">Evitamos compra con okupa</h3>
              <p className="text-gray-700 text-sm mb-3">
                Vendedor ocultaba que había inquilino moroso de hace 2 años (okupa de facto). 
                Cliente habría heredado el problema. Cancelamos compra a tiempo.
              </p>
              <div className="text-orange-700 font-semibold text-sm">Valencia, mayo 2026</div>
            </div>
          </div>
        </div>
      </section>

      <TestimoniosSection className="bg-orange-50" landing="asesoria-compra" />

      {/* Precio */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Servicio completo por 687€
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Mucho más barato que comisiones de agencia de 9.000€-15.000€
          </p>
          <div className="border-2 border-[#c9962a] rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Servicio Completo de Compra</h3>
            <div className="text-5xl font-bold text-[#c9962a] mb-2">687€</div>
            <div className="text-sm text-gray-500 mb-8">IVA incluido · Pago único</div>
            <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Gestión completa reserva, arras y escritura</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Revisión completa de documentación registral</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Revisión de contratos con agencias e inmobiliarias</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Apoyo legal en todo el proceso de compra</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-[#c9962a] mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Coordinación con notaría y atención prioritaria</span>
              </li>
            </ul>
            <Link
              href="/gestoria/solicitar/compra-completa-reserva-escritura"
              className="inline-block bg-[#c9962a] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#b8872a] transition shadow-lg"
            >
              Contratar servicio completo (687€)
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Cuándo debo contratar el servicio?',
                a: 'Lo ideal es ANTES de firmar arras o reserva. Así revisamos todo desde el principio y evitamos problemas. Pero también te ayudamos si ya firmaste y estás en proceso de hipoteca o escritura.',
              },
              {
                q: '¿Inmonest negocia en mi nombre?',
                a: 'Sí, como gestoría inmobiliaria negociamos directamente con vendedor, agencia o banco. Defendemos tus intereses durante todo el proceso.',
              },
              {
                q: '¿Qué diferencia hay con contratar una agencia?',
                a: 'Las agencias cobran 3%-5% del precio (9.000€-15.000€). Nosotros cobramos 687€ fijos. Además, las agencias trabajan para el vendedor. Nosotros trabajamos para ti.',
              },
              {
                q: '¿Qué pasa si detectáis un problema grave?',
                a: 'Te damos informe detallado con opciones: 1) Renegociar condiciones, 2) Cancelar compra y recuperar arras si procede, 3) Continuar asumiendo el riesgo (con pleno conocimiento).',
              },
              {
                q: '¿Trabajáis con hipotecas de cualquier banco?',
                a: 'Sí, revisamos ofertas de cualquier banco: BBVA, Santander, CaixaBank, Sabadell, ING, etc. Somos independientes, no cobramos comisión de bancos.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-[#c9962a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            No pagues comisiones abusivas. Compra con Inmonest.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Por 687€ evitas comisiones de 9.000€-15.000€ y errores que pueden costarte mucho más.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/compra-completa-reserva-escritura"
              className="bg-white text-[#c9962a] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar servicio completo (687€)
            </Link>
            <a
              href="https://wa.me/34745022862?text=Hola,%20necesito%20ayuda%20para%20comprar%20un%20piso%20sin%20comisiones"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition shadow-lg border-2 border-white"
            >
              💬 Consulta gratuita (WhatsApp)
            </a>
          </div>
        </div>
      </section>

      {/* Por ciudad */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
            Compra tu piso sin agencia en tu ciudad
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Asesoría adaptada al mercado local: normativa, plazos y documentación de cada ciudad
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { slug: 'madrid', nombre: 'Madrid', emoji: '🏛️' },
              { slug: 'barcelona', nombre: 'Barcelona', emoji: '🏖️' },
              { slug: 'valencia', nombre: 'Valencia', emoji: '🌊' },
              { slug: 'sevilla', nombre: 'Sevilla', emoji: '☀️' },
              { slug: 'malaga', nombre: 'Málaga', emoji: '🌴' },
            ].map((ciudad) => (
              <Link
                key={ciudad.slug}
                href={`/gestoria/asesoria-compra-piso/${ciudad.slug}`}
                className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
              >
                <span className="text-2xl">{ciudad.emoji}</span>
                <div>
                  <div className="font-bold text-gray-900">{ciudad.nombre}</div>
                  <div className="text-xs text-[#c9962a]">Ver servicio →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Servicios relacionados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/gestoria/revision-contrato-arras" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Revisión contrato de arras</h3>
              <p className="text-gray-600 text-sm mb-3">
                Si solo necesitas revisar el contrato de arras que te han dado.
              </p>
              <span className="text-[#c9962a] font-semibold">Desde 60€ →</span>
            </Link>
            <Link href="/gestoria/solicitar/arras-penitenciales" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Contrato de arras penitenciales</h3>
              <p className="text-gray-600 text-sm mb-3">
                Contrato de arras personalizado redactado por gestoría en 48h.
              </p>
              <span className="text-[#c9962a] font-semibold">145€ →</span>
            </Link>
            <Link href="/gestoria" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-[#c9962a]">Más servicios de gestoría</h3>
              <p className="text-gray-600 text-sm mb-3">
                Contratos de alquiler, venta, rescisión y más servicios inmobiliarios.
              </p>
              <span className="text-[#c9962a] font-semibold">Ver todos →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

