import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestorContactBanner from '@/components/GestorContactBanner'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Vende tu piso en Valladolid sin agencia — Gestoría acompañamiento completo 687€',
  description: 'Vende tu piso en Valladolid sin pagar comisiones a agencias. Gestoría inmobiliaria experta te acompaña desde arras hasta escritura. Contratos, documentación castellano-leonesa y gestor asignado. 687€ IVA incluido.',
  keywords: 'vender piso Valladolid sin agencia, gestoría venta Valladolid, venta particular Valladolid, vender sin inmobiliaria Valladolid, acompañamiento venta Valladolid, contratos arras Valladolid',
  alternates: {
    canonical: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valladolid`,
  },
  openGraph: {
    title: 'Vende tu piso en Valladolid sin agencia — Gestoría 687€',
    description: 'Ahorra miles de euros en comisiones. Gestoría especializada en acompañar a particulares vendedores en Valladolid. Desde arras hasta escritura.',
    url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valladolid`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Venta piso Valladolid sin agencia' }],
  },
}

export const revalidate = 86400

export default function VentaCompletaValladolidPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio Completo de Venta en Valladolid: Reserva a Escritura',
    description: 'Acompañamiento completo para propietarios que venden su piso en Valladolid sin agencia. Gestoría inmobiliaria experta en particulares vendedores. Contratos de arras, documentación y asesoramiento hasta escritura.',
    areaServed: {
      '@type': 'City',
      name: 'Valladolid',
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
      { '@type': 'ListItem', position: 4, name: 'Valladolid', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valladolid` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Valladolid */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/venta-completa-reserva-escritura" className="hover:text-[#c9962a]">Venta Completa</Link>
            <span>/</span>
            <span className="text-[#c9962a] font-semibold">Valladolid</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-amber-300">
                🚄 Vende en Valladolid sin agencia
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#c9962a]">¿Ya encontraste comprador?</span> Te ayudamos con todos los trámites en Valladolid
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Si <strong>vendes de particular a particular en Valladolid</strong> y ya tienes comprador,
                un <strong>gestor inmobiliario especializado</strong> te acompaña desde la reserva hasta la escritura.
                Redactamos contratos de arras, recabamos documentación de Castilla y León y asesoramos en cada paso.
                <strong> Vende seguro sin agencia, ahorra miles de euros en comisiones.</strong>
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>✓ Ya tienes comprador particular:</strong> Perfecto, nosotros nos encargamos de toda la gestión documental.
                  <strong> ✓ Especialistas en Valladolid:</strong> Conocemos el mercado pucelano, la normativa de Castilla y León
                  y coordinamos con notarías de todos los barrios (Centro, Delicias, Campo Grande, Parquesol, Zorrilla...).
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
                  <span>Gestor en Valladolid</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Sin comisión sobre venta</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>687€ IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/familia10.jpg"
                alt="Familia vendedora feliz en Valladolid"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-[#c9962a]/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏡</div>
                  <div>
                    <div className="font-bold text-gray-900">38 ventas</div>
                    <div className="text-sm text-gray-600">acompañadas en Valladolid</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Situaciones típicas Valladolid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Situaciones habituales al vender en Valladolid
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            En una ciudad conectada con Madrid por AVE y con fuerte mercado familiar, estas son las ventas más comunes que gestionamos:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">🚄 Comprador que llega desde Madrid</h3>
              <p className="text-gray-700">
                Un particular de Madrid busca vivienda en Valladolid por el AVE y precios más asequibles.
                Ya habéis acordado precio y necesitáis arras, documentación y coordinación con notaría sin intermediarios.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">👨‍👩‍👧‍👦 Familia que amplía vivienda</h3>
              <p className="text-gray-700">
                Vendes tu piso en Delicias, Parquesol o Zorrilla porque necesitáis una vivienda mayor.
                El comprador es otro particular de Valladolid y queréis cerrar la operación con todas las garantías legales.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">📜 Piso heredado en el Centro</h3>
              <p className="text-gray-700">
                Varios herederos reciben un piso en el centro histórico o cerca del Campo Grande.
                Hay que revisar cargas en el Registro de la Propiedad de Valladolid, acordar entre herederos y formalizar la venta a un comprador particular.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">🎓 Piso cerca del campus universitario</h3>
              <p className="text-gray-700">
                Vendes un piso en La Victoria, Rondilla o zona Miguel Delibes que alquilabas a estudiantes de la UVa.
                El comprador es inversor o familia y necesitáis contrato de arras adaptado a la operación.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">💼 Cambio de trabajo o empresa</h3>
              <p className="text-gray-700">
                Te trasladas por motivos laborales — Polígono de Argales, zona empresarial o fuera de Valladolid —
                y ya tienes comprador. Gestionamos toda la documentación y la coordinación con notaría sin que pierdas tiempo.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <h3 className="text-lg font-bold text-gray-900 mb-2">🍷 Comprador de la Ribera del Duero</h3>
              <p className="text-gray-700">
                Vendes en Valladolid capital a alguien de la provincia o de la zona vitivinícola que busca vivienda en la ciudad.
                Conocemos el ITP de Castilla y León y los trámites entre capital y municipios de la provincia de Valladolid.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Oficina Inmonest */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                <span className="text-[#c9962a]">Inmonest</span>: Tu gestoría inmobiliaria de confianza en Valladolid
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Somos una gestoría inmobiliaria especializada en acompañar a <strong>particulares vendedores</strong> que
                quieren vender su piso sin pagar las comisiones abusivas de las agencias tradicionales.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Conocemos el mercado pucelano: barrios residenciales como Parquesol y Covaresa, el centro histórico,
                la zona universitaria y la periferia industrial. Te damos <strong>seguridad jurídica, contratos personalizados y asesoramiento continuo</strong> por 687€.
              </p>
              <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-[#c9962a]">
                <p className="text-gray-800">
                  <strong>No somos una agencia inmobiliaria.</strong> Somos gestoría. Por eso no cobramos comisión sobre la venta.
                  Nuestro único objetivo es que vendas con total tranquilidad y al mejor precio posible.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/inmonestexterior.png"
                alt="Oficina Inmonest gestoría inmobiliaria"
                width={600}
                height={450}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ventajas Valladolid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué elegir Inmonest para vender tu piso en Valladolid?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#c9962a] shadow-sm">
              <div className="text-4xl mb-4">👨‍⚖️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Gestoría especializada</h3>
              <p className="text-gray-700">
                No somos una agencia inmobiliaria. Somos gestoría inmobiliaria especializada en acompañar
                a particulares vendedores en Valladolid. Seguridad jurídica sin comisión sobre la venta.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#c9962a] shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ahorra miles de euros</h3>
              <p className="text-gray-700">
                Las agencias en Valladolid cobran entre 3% y 5% de comisión (2.400€-4.000€ en un piso de 80.000€).
                Con Inmonest pagas solo 687€ y obtienes el mismo acompañamiento profesional.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#c9962a] shadow-sm">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Expertos en Valladolid</h3>
              <p className="text-gray-700">
                Conocemos la documentación de Castilla y León, los requisitos del Ayuntamiento de Valladolid,
                el ITP autonómico y las notarías de todos los barrios de la capital pucelana.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            ¿Cómo trabaja Inmonest contigo?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Proceso claro y transparente desde el primer contacto hasta la firma en notaría
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                n: '1',
                titulo: 'Primera llamada con tu gestor',
                items: [
                  'Nos llamas o rellenas el formulario para conocer tu operación de venta en Valladolid',
                  'Un gestor especializado de Inmonest te contacta en menos de 24 horas',
                  'Analizamos juntos la situación: precio acordado, plazos, comprador, condiciones',
                  'Te explicamos todo el proceso paso a paso y resolvemos tus dudas',
                ],
              },
              {
                n: '2',
                titulo: 'Contratas el servicio',
                items: [
                  'Pago único de 687€ IVA incluido por todo el servicio completo',
                  'Sin costes ocultos ni sorpresas: pagas una sola vez al inicio',
                  'Te asignamos tu gestor personalizado que te acompañará hasta el final',
                  'Comenzamos a trabajar inmediatamente en tu proceso de venta',
                ],
              },
              {
                n: '3',
                titulo: 'Nos encargamos de todo',
                items: [
                  'Redactamos el contrato de arras personalizado para tu operación en Valladolid',
                  'Te ayudamos a recabar toda la documentación necesaria paso a paso',
                  'Coordinamos con la notaría para preparar la firma de escrituras',
                  'Revisamos que toda la documentación esté correcta y completa',
                ],
              },
              {
                n: '4',
                titulo: 'Asesoramiento continuo hasta escritura',
                items: [
                  'Tu gestor especializado de Inmonest está disponible para consultas',
                  'Te asesoramos en cada paso: desde arras hasta el día de escritura',
                  'Resolvemos cualquier duda o imprevisto que surja durante el proceso',
                  'Te acompañamos hasta que firmes en notaría y completes tu venta',
                ],
              },
            ].map(({ n, titulo, items }) => (
              <div key={n} className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                    {n}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{titulo}</h3>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-[#c9962a] mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Qué incluye el servicio en Valladolid
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Todo lo necesario para vender tu piso en Valladolid con todas las garantías legales
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Gestor especializado asignado
              </h3>
              <p className="text-gray-700">
                Un profesional experto con conocimiento del mercado pucelano: Centro, Delicias, Campo Grande,
                Parquesol, Zorrilla, Covaresa, La Victoria y municipios de la provincia.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Contratos de arras personalizados
              </h3>
              <p className="text-gray-700">
                Redacción de contratos de arras (penitenciales o confirmatorias) cumpliendo con la normativa vigente
                en Castilla y León y adaptados a las particularidades de tu operación.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Ayuda con toda la documentación
              </h3>
              <p className="text-gray-700">
                Te guiamos para obtener: certificado energético, cédula de habitabilidad (si aplica),
                nota simple del Registro de la Propiedad de Valladolid, IBI, recibos de comunidad y documentación municipal.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Coordinación con notarías de Valladolid
              </h3>
              <p className="text-gray-700">
                Coordinación con notarías de Valladolid capital y provincia: Centro, Delicias, Campo Grande,
                Parquesol, Zorrilla, Rondilla, Covaresa o el barrio donde quieras escriturar.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Asesoramiento legal continuo
              </h3>
              <p className="text-gray-700">
                Tu gestor está disponible por teléfono, email y WhatsApp durante todo el proceso para resolver
                cualquier duda legal o administrativa específica de tu venta en Valladolid.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Seguimiento hasta escritura
              </h3>
              <p className="text-gray-700">
                Acompañamiento completo desde la firma de arras hasta la firma de escrituras en notaría.
                No te dejamos solo en ningún momento del proceso de venta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabla comparativa */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Inmonest Gestoría vs Agencias Inmobiliarias
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Por qué los particulares vendedores en Valladolid eligen Inmonest en lugar de agencias tradicionales
          </p>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-lg rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left border-b-2 border-gray-300 font-bold text-gray-900"></th>
                  <th className="p-4 text-center border-b-2 border-[#c9962a] font-bold text-[#a87a20] bg-amber-50">
                    <div className="text-xl mb-1">🏆 Inmonest Gestoría</div>
                    <div className="text-sm font-normal">Especialistas en particulares</div>
                  </th>
                  <th className="p-4 text-center border-b-2 border-gray-300 font-bold text-gray-600">
                    <div className="text-xl mb-1">🏢 Agencias Inmobiliarias</div>
                    <div className="text-sm font-normal">Modelo tradicional</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">💰 Coste del servicio</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="text-2xl font-bold text-green-600">687€</div>
                    <div className="text-sm text-gray-600">IVA incluido · Tarifa plana</div>
                  </td>
                  <td className="p-4 text-center bg-red-50">
                    <div className="text-2xl font-bold text-red-600">2.400€ - 4.000€</div>
                    <div className="text-sm text-gray-600">3-5% comisión sobre venta</div>
                  </td>
                </tr>
                <tr className="bg-amber-50 border-2 border-[#c9962a]">
                  <td className="p-4 font-bold text-gray-900">💰 Ahorro total para ti</td>
                  <td className="p-4 text-center" colSpan={2}>
                    <div className="text-3xl font-bold text-[#a87a20]">Ahorras entre 1.713€ y 3.313€</div>
                    <div className="text-sm text-gray-600 mt-1">En una venta de 80.000€ comparado con agencia tradicional</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Malas prácticas comunes de agencias inmobiliarias en Valladolid
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Honorarios desmedidos:</strong> Cobran 3-5% de comisión por trámites que una gestoría resuelve por 687€.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Doble comisión:</strong> Muchas agencias cobran comisión tanto al vendedor como al comprador.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Contratos con permanencia:</strong> Te obligan a exclusividad durante meses aunque no vendan tu piso.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Falta de asesoramiento legal:</strong> Los agentes comerciales no son asesores legales ni revisan la documentación en profundidad.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-[#c9962a] rounded-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-3">🎯 La ventaja de Inmonest en Valladolid</h3>
            <p className="text-gray-700 text-lg">
              Inmonest es una <strong>gestoría inmobiliaria especializada en particulares</strong>. No somos agencia,
              por eso no cobramos comisión sobre la venta. Te proporcionamos el mismo acompañamiento profesional
              <strong> por una tarifa plana de 687€</strong>, independientemente del precio de tu piso en Valladolid.
            </p>
          </div>
        </div>
      </section>


      <GestorContactBanner />
      <TestimoniosSection hideRating />

      {/* CTA Valladolid */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vende tu piso en Valladolid sin pagar comisiones desmedidas
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Gestoría inmobiliaria en Valladolid especializada en particulares. Contratos personalizados, documentación completa
            y gestor asignado hasta escritura. Todo por 687€ IVA incluido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="bg-white text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar ahora (687€)
            </Link>
            <a
              href="tel:+34641008847"
              className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              641 008 847
            </a>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            Sin pagos ocultos • Gestor en Valladolid en 24h • IVA incluido
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Otros servicios en Valladolid
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/gestoria"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Gestoría Inmobiliaria</h3>
              <p className="text-gray-600 text-sm mb-3">
                Todos los servicios de gestoría inmobiliaria online en Valladolid y toda España.
              </p>
              <div className="text-[#c9962a] font-bold">Ver servicios →</div>
            </Link>
            <Link
              href="/gestoria/solicitar/arras-penitenciales"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Contrato de Arras</h3>
              <p className="text-gray-600 text-sm mb-3">
                Solo el contrato de arras penitenciales redactado.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 145€</div>
            </Link>
            <Link
              href="/gestoria/asesoria-compra-piso"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Servicio de Compra</h3>
              <p className="text-gray-600 text-sm mb-3">
                Acompañamiento completo si estás comprando en Valladolid.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 687€</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
