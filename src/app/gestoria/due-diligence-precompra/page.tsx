import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import { RELACIONADOS_DUE_DILIGENCE } from '@/lib/gestoria-relacionados'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestoriaPideInfoForm from '@/components/GestoriaPideInfoForm'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import { GestoriaImageBanner, GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { DUE_DILIGENCE_LANDING, GESTORIA_CTA_BANNERS } from '@/lib/gestoria-images'
import GestoriaPanelShowcase from '@/components/GestoriaPanelShowcase'

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

const SOLICITAR_URL = '/gestoria/solicitar/pack-due-diligence-precompra'
const PRECIO = 350

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-gold-500 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  )
}

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

      {/* Hero boutique */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <GestoriaImageBanner
          imageSrc={DUE_DILIGENCE_LANDING.hero.src}
          imageAlt={DUE_DILIGENCE_LANDING.hero.alt}
          imagePosition={DUE_DILIGENCE_LANDING.imagePosition}
          size="lg"
        >
          <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border border-gold-500/30 uppercase tracking-widest">
            Post-Arras · Pre-Escritura
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-snug max-w-2xl">
            Ya firmaste arras? Verifica todo antes de escriturar
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mb-5 leading-relaxed">
            <strong className="text-white">Pack Due Diligence Pre-Compra:</strong> revisamos actas de comunidad, derramas pendientes,
            ITE del edificio, nota registral e información urbanística. Informe ejecutivo en 3-5 días laborables.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="text-3xl font-bold text-gold-400">{PRECIO}€</span>
            <span className="text-white/50 text-xs">IVA incluido</span>
            <span className="text-white/55 text-sm hidden sm:inline">· Informe PDF · Análisis en 48h</span>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-5">
            <Link
              href={SOLICITAR_URL}
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              Contratar por {PRECIO}€
            </Link>
            <a
              href="https://wa.me/34745022862?text=Hola,%20firm%C3%A9%20arras%20y%20necesito%20due%20diligence%20antes%20de%20escriturar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Consulta WhatsApp
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2"><CheckIcon /> 3-5 días entrega</li>
            <li className="flex items-center gap-2"><CheckIcon /> Informe ejecutivo PDF</li>
            <li className="flex items-center gap-2"><CheckIcon /> IVA incluido</li>
          </ul>
        </GestoriaImageBanner>
      </div>

      {/* Por qué lo necesitas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué verificar ANTES de escriturar?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-cream-50 p-6 rounded-xl border border-gold-300/40">
              <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold text-sm mb-4">01</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Derramas ocultas</h3>
              <p className="text-gray-700">
                El vendedor puede ocultar derramas extraordinarias aprobadas (fachada, ascensor, tejado). 
                <strong> Puedes heredar gastos de 5.000-15.000€.</strong>
              </p>
            </div>
            <div className="bg-cream-50 p-6 rounded-xl border border-gold-300/40">
              <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold text-sm mb-4">02</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">ITE desfavorable</h3>
              <p className="text-gray-700">
                Si el ITE (Inspección Técnica de Edificios) detecta deficiencias graves, 
                el ayuntamiento puede <strong>ordenar obras obligatorias</strong> que pagarás tú.
              </p>
            </div>
            <div className="bg-cream-50 p-6 rounded-xl border border-gold-300/40">
              <div className="w-10 h-10 rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold text-sm mb-4">03</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Problemas urbanísticos</h3>
              <p className="text-gray-700">
                Reformas sin licencia, terrazas ilegales, divisiones no autorizadas. 
                <strong>El ayuntamiento puede exigir legalización o demolición.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <GestoriaImageBanner
          imageSrc={DUE_DILIGENCE_LANDING.mid.src}
          imageAlt={DUE_DILIGENCE_LANDING.mid.alt}
          imagePosition="left"
          size="sm"
        >
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-gold-400 mb-2">Verificación integral</p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
            Documentación revisada por gestores inmobiliarios antes de la escritura
          </h2>
          <p className="mt-3 text-sm text-white/70 leading-relaxed">
            Actas, derramas, ITE, registro y urbanismo en un solo informe ejecutivo con recomendación clara.
          </p>
        </GestoriaImageBanner>
      </div>

      {/* Qué verificamos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué incluye el Pack Due Diligence? (350€)
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            
            {/* 1. Actas de Comunidad */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-500/10 text-gold-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Revisión Actas de Comunidad</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Solicitamos al administrador las actas de los últimos 2 años</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Identificamos derramas aprobadas (ordinarias y extraordinarias)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Verificamos cuotas pendientes del vendedor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Detectamos conflictos comunitarios relevantes</span>
                </li>
              </ul>
            </div>

            {/* 2. Derramas y Cuotas */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-500/10 text-gold-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Análisis de Derramas Pendientes</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Certificado de deudas del administrador (si existe)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Derramas extraordinarias aprobadas: fachada, ascensor, tejado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Cuotas mensuales ordinarias: importe y periodicidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Proyecciones: qué pagarás tú en los próximos 12 meses</span>
                </li>
              </ul>
            </div>

            {/* 3. ITE del Edificio */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-500/10 text-gold-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">ITE (Inspección Técnica de Edificios)</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Obtenemos el ITE actualizado del ayuntamiento (obligatorio +50 años)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Analizamos deficiencias estructurales detectadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Verificamos si hay órdenes de ejecución pendientes</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Estimamos costes de obras correctoras si procede</span>
                </li>
              </ul>
            </div>

            {/* 4. Nota Registral */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-500/10 text-gold-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Nota Registral Actualizada</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Solicitamos nota simple registral actualizada (incluida en precio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Verificamos que no hay cargas nuevas desde las arras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Confirmamos que los m² registrales coinciden con lo anunciado</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Revisamos linderos, anejo (garaje/trastero), cuota participación</span>
                </li>
              </ul>
            </div>

            {/* 5. Información Urbanística */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-500/10 text-gold-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <h3 className="text-xl font-bold text-gray-900">Consulta Urbanística Municipal</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Cédula urbanística del inmueble (si disponible en ayuntamiento)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Verificación de licencias de obra históricas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Detección de reformas sin legalizar (divisiones, terrazas cerradas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Protección patrimonial o limitaciones urbanísticas</span>
                </li>
              </ul>
            </div>

            {/* 6. Informe Ejecutivo */}
            <div className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-gold-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gold-500/10 text-gold-600 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  6
                </div>
                <h3 className="text-xl font-bold text-gray-900">Informe Ejecutivo Final</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Documento PDF ejecutivo con todos los hallazgos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Semáforo de riesgos: Verde / Amarillo / Rojo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
                  <span>Recomendaciones: seguir adelante, renegociar precio o desistir</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold-600 mt-1">✓</span>
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
              <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center font-bold">
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
              <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center font-bold">
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
              <div className="flex-shrink-0 w-12 h-12 bg-gold-500/10 text-gold-600 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Entrega de informe ejecutivo (3-5 días totales)</h3>
                <p className="text-gray-700">
                  Recibes por email un PDF ejecutivo con todos los hallazgos, semáforo de riesgos y recomendación final:
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
            <div className="bg-white p-6 rounded-xl border border-gold-300/40 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">Caso Madrid</p>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Derrama de 12.000€ en Madrid (Chamberí)</h3>
              <p className="text-gray-700 mb-4">
                Cliente firmó arras por 280.000€. En actas encontramos derrama extraordinaria aprobada para 
                rehabilitación de fachada: <strong>12.000€ por vivienda</strong>, pagaderos en 3 años.
              </p>
              <p className="text-sm text-gold-600 font-semibold">
                Resultado: Renegociamos precio a 268.000€ descontando la derrama.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gold-300/40 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">Caso Barcelona</p>
              <h3 className="text-xl font-bold mb-3 text-gray-900">ITE desfavorable en Barcelona (Eixample)</h3>
              <p className="text-gray-700 mb-4">
                ITE de 2024 detectó deficiencias graves en estructura. Ayuntamiento ordenó obras de refuerzo 
                en <strong>plazo de 18 meses o multa de 30.000€.</strong>
              </p>
              <p className="text-sm text-gold-600 font-semibold">
                Resultado: Cliente desistió. Recuperó señal (arras penitenciales).
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gold-300/40 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">Caso Valencia</p>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Reforma ilegal en Valencia (Ruzafa)</h3>
              <p className="text-gray-700 mb-4">
                Piso anunciado como 3 habitaciones era originalmente 2. División sin licencia. 
                <strong> Ayuntamiento puede exigir demolición del tabique.</strong>
              </p>
              <p className="text-sm text-gold-600 font-semibold">
                Resultado: Vendedor legalizó reforma antes de escriturar (coste 1.200€).
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gold-300/40 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-3">Caso Sevilla</p>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cuotas comunidad ocultas en Sevilla</h3>
              <p className="text-gray-700 mb-4">
                Vendedor dijo "80€/mes cuota comunidad". En actas vimos que la real era <strong>145€/mes + derramas trimestrales</strong> 
                de limpieza piscina (total: ~200€/mes).
              </p>
              <p className="text-sm text-gold-600 font-semibold">
                Resultado: Cliente ajustó presupuesto mensual antes de hipoteca.
              </p>
            </div>
          </div>
        </div>
      </section>

      <GestoriaPanelShowcase servicioLabel="due diligence pre-compra" />

      {/* FAQ */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            <div className="border-l-4 border-gold-500 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Cuándo debo contratar este servicio?
              </h3>
              <p className="text-gray-700">
                <strong>Justo después de firmar arras penitenciales</strong> y antes de escriturar. 
                Lo ideal es hacerlo cuando aún tienes derecho a desistir perdiendo la señal (normalmente 30-60 días).
              </p>
            </div>
            <div className="border-l-4 border-gold-500 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Qué pasa si detectáis problemas graves?
              </h3>
              <p className="text-gray-700">
                Te entregamos informe con <strong>semáforo de riesgos</strong> y 3 opciones: (1) Seguir adelante si riesgos son menores, 
                (2) Renegociar precio descontando gastos, o (3) Desistir si problemas son muy graves (recuperas señal con arras penitenciales).
              </p>
            </div>
            <div className="border-l-4 border-gold-500 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Incluye el coste de la nota registral y el ITE?
              </h3>
              <p className="text-gray-700">
                <strong>Sí, todo incluido en 350€.</strong> Nosotros solicitamos y pagamos la nota simple registral (~9€). 
                El ITE lo obtenemos del ayuntamiento (gratuito si existe, o lo solicitamos si el edificio debe tenerlo).
              </p>
            </div>
            <div className="border-l-4 border-gold-500 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Y si el administrador no responde o no hay actas?
              </h3>
              <p className="text-gray-700">
                Insistimos por email y teléfono. Si el administrador no colabora, <strong>lo reflejamos en el informe como señal de alarma</strong> 
                (puede indicar problemas de gestión o conflictos comunitarios). Recomendaríamos renegociar o desistir.
              </p>
            </div>
            <div className="border-l-4 border-gold-500 pl-6 py-4">
              <h3 className="font-bold text-lg text-gray-900 mb-2">
                ¿Puedo contratar solo parte del servicio (ej: solo ITE)?
              </h3>
              <p className="text-gray-700">
                No, es un <strong>pack integral</strong> porque los riesgos están interrelacionados. Por ejemplo, 
                una derrama puede estar motivada por deficiencias del ITE. Verificar solo un documento sería incompleto y arriesgado.
              </p>
            </div>
            <div className="border-l-4 border-gold-500 pl-6 py-4">
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

      <section className="py-12 px-4 bg-cream-100 border-y border-gold-300/40">
        <div className="max-w-lg mx-auto bg-white rounded-2xl border border-gold-300/40 p-5 sm:p-6 shadow-sm">
          <GestoriaPideInfoForm
            ciudad="España"
            servicio="due diligence pre-compra"
            precioLabel="350€"
            serviceKey="pack-due-diligence-precompra"
          />
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="pack-due-diligence-precompra"
        servicioNombre="Due Diligence Pre-Compra"
        testimonioLanding="due-diligence"
        whatsappMessage="Hola Daniel, firmé arras y necesito due diligence pre-compra"
        llamaGestor={{
          title: 'Llama a tu gestor y cuéntanos tu caso',
          subtitle: 'Te explicamos la due diligence sin compromiso. Luego decides si contratas.',
        }}
        relacionados={RELACIONADOS_DUE_DILIGENCE}
      />

      {/* CTA Final */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow="Due diligence pre-compra"
            title="¿Ya firmaste arras? No arriesgues sin verificar antes"
            description={`Por solo ${PRECIO}€ obtienes certeza total antes de escriturar. Informe ejecutivo en 3-5 días.`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar por ${PRECIO}€`}
            secondaryHref="https://wa.me/34745022862?text=Hola,%20firm%C3%A9%20arras%20y%20necesito%20due%20diligence"
            secondaryLabel="WhatsApp"
            imageSrc={GESTORIA_CTA_BANNERS.dueDiligence.src}
            imageAlt={GESTORIA_CTA_BANNERS.dueDiligence.alt}
            imagePosition="right"
          />
        </div>
      </section>

      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad="España"
        ciudadSlug="due-diligence"
        servicio="due-diligence"
        whatsappMessage="Hola, firmé arras y necesito due diligence pre-compra"
      />

    </>
  )
}
