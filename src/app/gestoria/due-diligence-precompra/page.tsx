import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestorContactBanner from '@/components/GestorContactBanner'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestoriaPideInfoForm from '@/components/GestoriaPideInfoForm'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import TrackedContactLink from '@/components/TrackedContactLink'
import LlamaGestorBanner from '@/components/LlamaGestorBanner'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Due Diligence Pre-Compra 【350€】 Verificación Completa Post-Arras',
  description: 'Ya firmaste arras? Verificamos actas de comunidad, derramas, ITE, nota registral e información urbanística antes de escriturar. Informe completo en 3-5 días. 350€ IVA incluido.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/due-diligence-precompra`,
  },
  openGraph: {
    title: 'Due Diligence Pre-Compra — Verificación Documental Completa',
    description: 'Servicio integral de verificación antes de escriturar: actas comunidad, derramas, ITE, registros, urbanismo. Informe profesional en 3-5 días. 350€.',
    url: `${BASE_URL}/gestoria/due-diligence-precompra`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria1.jpg`, width: 1200, height: 630, alt: 'Due diligence inmobiliaria' }],
  },
}

export const revalidate = 86400  // 24 horas

export default function DueDiligencePrecompraPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Pack Due Diligence Pre-Compra',
    description: 'Verificación integral de documentación inmobiliaria tras firmar arras: actas de comunidad, derramas, ITE, nota registral e información urbanística. Informe ejecutivo en 3-5 días.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '350',
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
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🔍 Post-Arras · Pre-Escritura
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Ya firmaste arras? <span className="text-blue-600">Verifica TODO antes de escriturar</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                <strong>Pack Due Diligence Pre-Compra:</strong> Revisamos actas de comunidad, derramas pendientes, 
                ITE del edificio, nota registral actualizada e información urbanística. 
                <strong> Informe ejecutivo en 3-5 días laborables.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/pack-due-diligence-precompra"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition text-center shadow-lg"
                >
                  Contratar por 350€
                </Link>
                <a
                  href="https://wa.me/34745022862?text=Hola,%20firm%C3%A9%20arras%20y%20necesito%20due%20diligence%20antes%20de%20escriturar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition text-center shadow-lg"
                >
                  💬 Consulta WhatsApp
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>3-5 días entrega</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Informe ejecutivo PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/gestoria1.jpg"
                alt="Due diligence inmobiliaria - verificación documental"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl border-2 border-blue-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">350€</div>
                  <div className="text-sm text-gray-600">Verificación completa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué lo necesitas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué verificar ANTES de escriturar?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Derramas ocultas</h3>
              <p className="text-gray-700">
                El vendedor puede ocultar derramas extraordinarias aprobadas (fachada, ascensor, tejado). 
                <strong> Puedes heredar gastos de 5.000-15.000€.</strong>
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">🏚️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">ITE desfavorable</h3>
              <p className="text-gray-700">
                Si el ITE (Inspección Técnica de Edificios) detecta deficiencias graves, 
                el ayuntamiento puede <strong>ordenar obras obligatorias</strong> que pagarás tú.
              </p>
            </div>
            <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Problemas urbanísticos</h3>
              <p className="text-gray-700">
                Reformas sin licencia, terrazas ilegales, divisiones no autorizadas. 
                <strong>El ayuntamiento puede exigir legalización o demolición.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué verificamos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué incluye el Pack Due Diligence? (350€)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* 1. Actas de Comunidad */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Revisión Actas de Comunidad</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Solicitamos al administrador las actas de los últimos 2 años</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Identificamos derramas aprobadas (ordinarias y extraordinarias)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Verificamos cuotas pendientes del vendedor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Detectamos conflictos comunitarios relevantes</span>
                </li>
              </ul>
            </div>

            {/* 2. Derramas y Cuotas */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Análisis de Derramas Pendientes</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Certificado de deudas del administrador (si existe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Derramas extraordinarias aprobadas: fachada, ascensor, tejado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Cuotas mensuales ordinarias: importe y periodicidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Proyecciones: qué pagarás tú en los próximos 12 meses</span>
                </li>
              </ul>
            </div>

            {/* 3. ITE del Edificio */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">ITE (Inspección Técnica de Edificios)</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Obtenemos el ITE actualizado del ayuntamiento (obligatorio +50 años)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Analizamos deficiencias estructurales detectadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Verificamos si hay órdenes de ejecución pendientes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Estimamos costes de obras correctoras si procede</span>
                </li>
              </ul>
            </div>

            {/* 4. Nota Registral */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Nota Registral Actualizada</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Solicitamos nota simple registral actualizada (incluida en precio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Verificamos que no hay cargas nuevas desde las arras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Confirmamos que los m² registrales coinciden con lo anunciado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Revisamos linderos, anejo (garaje/trastero), cuota participación</span>
                </li>
              </ul>
            </div>

            {/* 5. Información Urbanística */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <h3 className="text-xl font-bold text-gray-900">Consulta Urbanística Municipal</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Cédula urbanística del inmueble (si disponible en ayuntamiento)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Verificación de licencias de obra históricas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Detección de reformas sin legalizar (divisiones, terrazas cerradas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Protección patrimonial o limitaciones urbanísticas</span>
                </li>
              </ul>
            </div>

            {/* 6. Informe Ejecutivo */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  6
                </div>
                <h3 className="text-xl font-bold text-gray-900">Informe Ejecutivo Final</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Documento PDF ejecutivo con todos los hallazgos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Semáforo de riesgos: 🟢 Verde / 🟡 Amarillo / 🔴 Rojo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Recomendaciones: seguir adelante, renegociar precio o desistir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Anexos: PDFs de actas, ITE, nota registral, cédula urbanística</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Cómo funciona el servicio?
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Contratas y envías la documentación</h3>
                <p className="text-gray-700">
                  Pagas 350€ (IVA incluido) y nos envías: actas de comunidad (últimos 2 años), ITE del edificio, 
                  nota registral actualizada, cédula urbanística, y copia de las arras firmadas. 
                  Si no tienes algún documento, te indicamos cómo obtenerlo.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Análisis profesional (48 horas)</h3>
                <p className="text-gray-700">
                  Nuestro equipo jurídico revisa toda la documentación con criterio profesional en 48 horas: 
                  derramas pendientes y extraordinarias, deficiencias del ITE, cargas ocultas en registro, 
                  licencias urbanísticas y reformas sin legalizar.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Entrega de informe ejecutivo (3-5 días totales)</h3>
                <p className="text-gray-700">
                  Recibes por email un PDF ejecutivo con todos los hallazgos, semáforo de riesgos (🟢🟡🔴) y recomendación final: 
                  <strong> escriturar, renegociar precio o desistir.</strong> Incluye anexos con toda la documentación revisada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Casos reales que hemos detectado
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">🚨</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Derrama de 12.000€ en Madrid (Chamberí)</h3>
              <p className="text-gray-700 mb-4">
                Cliente firmó arras por 280.000€. En actas encontramos derrama extraordinaria aprobada para 
                rehabilitación de fachada: <strong>12.000€ por vivienda</strong>, pagaderos en 3 años.
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                Resultado: Renegociamos precio a 268.000€ descontando la derrama.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">⚠️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">ITE desfavorable en Barcelona (Eixample)</h3>
              <p className="text-gray-700 mb-4">
                ITE de 2024 detectó deficiencias graves en estructura. Ayuntamiento ordenó obras de refuerzo 
                en <strong>plazo de 18 meses o multa de 30.000€.</strong>
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                Resultado: Cliente desistió. Recuperó señal (arras penitenciales).
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Reforma ilegal en Valencia (Ruzafa)</h3>
              <p className="text-gray-700 mb-4">
                Piso anunciado como 3 habitaciones era originalmente 2. División sin licencia. 
                <strong> Ayuntamiento puede exigir demolición del tabique.</strong>
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                Resultado: Vendedor legalizó reforma antes de escriturar (coste 1.200€).
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-3xl mb-3">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cuotas comunidad ocultas en Sevilla</h3>
              <p className="text-gray-700 mb-4">
                Vendedor dijo "80€/mes cuota comunidad". En actas vimos que la real era <strong>145€/mes + derramas trimestrales</strong> 
                de limpieza piscina (total: ~200€/mes).
              </p>
              <p className="text-sm text-blue-600 font-semibold">
                Resultado: Cliente ajustó presupuesto mensual antes de hipoteca.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Cuándo debo contratar este servicio?
              </h3>
              <p className="text-gray-700">
                <strong>Justo después de firmar arras penitenciales</strong> y antes de escriturar. 
                Lo ideal es hacerlo cuando aún tienes derecho a desistir perdiendo la señal (normalmente 30-60 días).
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Qué pasa si detectáis problemas graves?
              </h3>
              <p className="text-gray-700">
                Te entregamos informe con <strong>semáforo de riesgos</strong> y 3 opciones: (1) Seguir adelante si riesgos son menores, 
                (2) Renegociar precio descontando gastos, o (3) Desistir si problemas son muy graves (recuperas señal con arras penitenciales).
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Incluye el coste de la nota registral y el ITE?
              </h3>
              <p className="text-gray-700">
                <strong>Sí, todo incluido en 350€.</strong> Nosotros solicitamos y pagamos la nota simple registral (~9€). 
                El ITE lo obtenemos del ayuntamiento (gratuito si existe, o lo solicitamos si el edificio debe tenerlo).
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Y si el administrador no responde o no hay actas?
              </h3>
              <p className="text-gray-700">
                Insistimos por email y teléfono. Si el administrador no colabora, <strong>lo reflejamos en el informe como señal de alarma</strong> 
                (puede indicar problemas de gestión o conflictos comunitarios). Recomendaríamos renegociar o desistir.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Puedo contratar solo parte del servicio (ej: solo ITE)?
              </h3>
              <p className="text-gray-700">
                No, es un <strong>pack integral</strong> porque los riesgos están interrelacionados. Por ejemplo, 
                una derrama puede estar motivada por deficiencias del ITE. Verificar solo un documento sería incompleto y arriesgado.
              </p>
            </div>
            <div className="border-l-4 border-blue-600 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Qué pasa si ya escrituré? ¿Sirve de algo?
              </h3>
              <p className="text-gray-700">
                Si ya escrituraste, <strong>este servicio no aplica</strong> (su objetivo es verificar ANTES de firmar). 
                Sin embargo, si descubres derramas ocultas post-compra, podríamos valorar reclamación al vendedor por vicio oculto.
              </p>
            </div>
          </div>
        </div>
      </section>


      <LlamaGestorBanner
        variant="strip"
        title="¿Firmaste arras? Habla con un gestor antes de escriturar"
        subtitle="Te explicamos la due diligence sin compromiso. Luego decides si contratas."
        whatsappMessage="Hola, firmé arras y necesito due diligence pre-compra"
      />

      <section className="py-12 px-4 bg-[#fdf8ee] border-y border-[#e8d48a]">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-[#e8d48a] p-5 sm:p-6 shadow-sm">
          <GestoriaPideInfoForm
            ciudad="España"
            servicio="due diligence pre-compra"
            precioLabel="350€"
            serviceKey="pack-due-diligence-precompra"
          />
        </div>
      </section>

      <GestorContactBanner
        whatsappMessage="Hola, firmé arras y necesito due diligence pre-compra"
        title="¿Listo para verificar antes de escriturar?"
        subtitle="Te llamamos, resolvemos dudas y te explicamos el pack de 350€ sin compromiso"
      />
      <TestimoniosSection landing="due-diligence" />

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-600 to-blue-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Ya firmaste arras? No arriesgues 200.000€ sin verificar antes
          </h2>
          <p className="text-xl mb-8 opacity-90">
              Por solo 350€ obtienes certeza total antes de escriturar. Informe ejecutivo en 3-5 días.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/pack-due-diligence-precompra"
              className="bg-white text-blue-600 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar por 350€ →
            </Link>
            <TrackedContactLink
              event="click_whatsapp"
              city="due-diligence"
              href="https://wa.me/34745022862?text=Hola,%20firm%C3%A9%20arras%20y%20necesito%20due%20diligence"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-green-600 transition shadow-lg"
            >
              WhatsApp
            </TrackedContactLink>
            <TrackedContactLink
              event="click_phone"
              city="due-diligence"
              href="tel:+34745022862"
              className="border border-white/40 text-white px-10 py-4 rounded-lg font-bold text-lg hover:bg-white/10 transition shadow-lg"
            >
              Llamar 745 022 862
            </TrackedContactLink>
          </div>
          <p className="mt-6 text-sm opacity-75">
            ✓ IVA incluido · ✓ Informe en 3-5 días · ✓ Análisis en 48h
          </p>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden />
      <StickyMobileContratoCta
        ciudad="España"
        ciudadSlug="due-diligence"
        servicio="due-diligence"
        whatsappMessage="Hola, firmé arras y necesito due diligence pre-compra"
      />

    </>
  )
}
