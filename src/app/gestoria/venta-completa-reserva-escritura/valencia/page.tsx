import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Vende tu piso en Valencia sin agencia — Gestoría acompañamiento completo 687€',
  description: 'Vende tu piso en Valencia sin pagar comisiones a agencias. Gestoría inmobiliaria experta te acompaña desde arras hasta escritura. Contratos, documentación y gestor asignado. 687€ IVA incluido.',
  keywords: 'vender piso Valencia sin agencia, gestoría venta Valencia, venta particular Valencia, vender sin inmobiliaria Valencia, acompañamiento venta Valencia, contratos arras Valencia',
  alternates: {
    canonical: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valencia`,
  },
  openGraph: {
    title: 'Vende tu piso en Valencia sin agencia — Gestoría 687€',
    description: 'Ahorra miles de euros en comisiones. Gestoría especializada en acompañar a particulares vendedores en Valencia. Desde arras hasta escritura.',
    url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valencia`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Venta piso Valencia sin agencia' }],
  },
}

export const revalidate = 86400

export default function VentaCompletaValenciaPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio Completo de Venta en Valencia: Reserva a Escritura',
    description: 'Acompañamiento completo para propietarios que venden su piso en Valencia sin agencia. Gestoría inmobiliaria experta en particulares vendedores. Contratos de arras, documentación y asesoramiento hasta escritura.',
    areaServed: {
      '@type': 'City',
      name: 'Valencia',
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
      { '@type': 'ListItem', position: 4, name: 'Valencia', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valencia` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero Valencia */}
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/venta-completa-reserva-escritura" className="hover:text-[#c9962a]">Venta Completa</Link>
            <span>/</span>
            <span className="text-[#c9962a] font-semibold">Valencia</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-orange-300">
                🍊 Vende en Valencia sin agencia
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#c9962a]">¿Ya encontraste comprador?</span> Te ayudamos con todos los trámites en Valencia
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Si <strong>vendes de particular a particular en Valencia</strong> y ya tienes comprador, 
                un <strong>gestor inmobiliario especializado</strong> te acompaña desde la reserva hasta la escritura. 
                Redactamos contratos de arras, recabamos documentación valenciana y asesoramos en cada paso. 
                <strong>Vende seguro sin agencia, ahorra 10.000€+ en comisiones.</strong>
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>✓ Ya tienes comprador particular:</strong> Perfecto, nosotros nos encargamos de toda la gestión documental. 
                  <strong>✓ Especialistas en Valencia:</strong> Conocemos el mercado valenciano, documentación de la Comunitat Valenciana 
                  y coordinamos con notarías de todos los barrios (Ruzafa, Campanar, Benimaclet, El Carmen...).
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
                  <span>Gestor en Valencia</span>
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
                alt="Familia vendedora feliz en Valencia"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-[#c9962a]/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏡</div>
                  <div>
                    <div className="font-bold text-gray-900">58 ventas</div>
                    <div className="text-sm text-gray-600">acompañadas en Valencia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Oficina Inmonest */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                <span className="text-[#c9962a]">Inmonest</span>: Tu gestoría inmobiliaria de confianza en Valencia
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Somos una gestoría inmobiliaria especializada en acompañar a <strong>particulares vendedores</strong> que 
                quieren vender su piso sin pagar las comisiones abusivas de las agencias tradicionales.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Nuestro equipo de gestores expertos en el mercado valenciano te proporciona <strong>seguridad jurídica, 
                contratos personalizados y asesoramiento continuo</strong> por una tarifa plana de 687€, independientemente 
                del precio de tu piso.
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

      {/* Ventajas Valencia */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué elegir Inmonest para vender tu piso en Valencia?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#c9962a] shadow-sm">
              <div className="text-4xl mb-4">👨‍⚖️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Gestoría especializada</h3>
              <p className="text-gray-700">
                No somos una agencia inmobiliaria. Somos gestoría inmobiliaria especializada en acompañar 
                a particulares vendedores en Valencia. Te proporcionamos seguridad jurídica sin cobrarte comisión sobre la venta.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#c9962a] shadow-sm">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ahorra miles de euros</h3>
              <p className="text-gray-700">
                Las agencias inmobiliarias en Valencia cobran entre 3% y 5% de comisión (3.000€-5.000€ en un piso de 100.000€). 
                Con Inmonest pagas solo 687€ y obtienes el mismo acompañamiento profesional.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg border-l-4 border-[#c9962a] shadow-sm">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Expertos en Valencia</h3>
              <p className="text-gray-700">
                Conocemos la documentación específica de la Comunidad Valenciana, los requisitos municipales de Valencia, 
                las notarías de todos los barrios y el dinámico mercado inmobiliario valenciano.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            ¿Cómo trabaja Inmonest contigo?
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Proceso claro y transparente desde el primer contacto hasta la firma en notaría
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Primera llamada con tu gestor</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Nos llamas o rellenas el formulario para conocer tu operación de venta en Valencia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Un gestor especializado de Inmonest te contacta en menos de 24 horas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Analizamos juntos la situación: precio acordado, plazos, comprador, condiciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Te explicamos todo el proceso paso a paso y resolvemos tus dudas</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Contratas el servicio</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Pago único de 687€ IVA incluido por todo el servicio completo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Sin costes ocultos ni sorpresas: pagas una sola vez al inicio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Te asignamos tu gestor personalizado que te acompañará hasta el final</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Comenzamos a trabajar inmediatamente en tu proceso de venta</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Nos encargamos de todo</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Redactamos el contrato de arras personalizado para tu operación en Valencia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Te ayudamos a recabar toda la documentación necesaria paso a paso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Coordinamos con la notaría para preparar la firma de escrituras</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisamos que toda la documentación esté correcta y completa</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Asesoramiento continuo hasta escritura</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Tu gestor especializado de Inmonest está disponible para consultas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Te asesoramos en cada paso: desde arras hasta el día de escritura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Resolvemos cualquier duda o imprevisto que surja durante el proceso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Te acompañamos hasta que firmes en notaría y completes tu venta</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluye */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Qué incluye el servicio en Valencia
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Todo lo necesario para vender tu piso en Valencia con todas las garantías legales
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Gestor especializado asignado
              </h3>
              <p className="text-gray-700">
                Un profesional experto de Inmonest con experiencia en el mercado valenciano que conoce las particularidades 
                de la Comunidad Valenciana, notarías de todos los barrios y documentación específica de Valencia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Contratos de arras personalizados
              </h3>
              <p className="text-gray-700">
                Redacción de contratos de arras (penitenciales o confirmatorias) cumpliendo con la normativa vigente en la Comunidad Valenciana 
                y adaptados a las particularidades de tu operación de venta.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Ayuda con toda la documentación
              </h3>
              <p className="text-gray-700">
                Te guiamos paso a paso para obtener: certificado energético, cédula de habitabilidad (si aplica), 
                nota simple del Registro de la Propiedad de Valencia, IBI, recibos de comunidad y toda la documentación necesaria.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Coordinación con notarías Valencia
              </h3>
              <p className="text-gray-700">
                Coordinación con notarías de todos los barrios de Valencia: Ruzafa, Campanar, Benimaclet, El Carmen, 
                Ciutat Vella, L'Eixample, Quatre Carreres o cualquier otro barrio donde quieras escriturar.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <h3 className="text-xl font-bold mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">✓</span>
                Asesoramiento legal continuo
              </h3>
              <p className="text-gray-700">
                Tu gestor está disponible por teléfono, email y WhatsApp durante todo el proceso para resolver 
                cualquier duda legal o administrativa específica de tu venta en Valencia.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
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

      {/* Tabla comparativa Inmonest vs Agencias */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Inmonest Gestoría vs Agencias Inmobiliarias
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Por qué miles de particulares vendedores en Valencia eligen Inmonest en lugar de agencias tradicionales
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
                    <div className="text-2xl font-bold text-red-600">3.000€ - 5.000€</div>
                    <div className="text-sm text-gray-600">3-5% comisión sobre venta</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">📋 Contratos personalizados</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Redacción incluida</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Plantillas genéricas</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">👨‍⚖️ Gestor asignado</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Sí, para todo el proceso</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">❌</span>
                    <div className="text-sm text-gray-600 mt-1">Solo agente comercial</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">🔍 Asesoramiento legal</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Especialistas gestoría</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">❌</span>
                    <div className="text-sm text-gray-600 mt-1">No tienen gestor propio</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">📄 Ayuda con documentación</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Paso a paso incluido</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Según disponibilidad</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">💼 Transparencia de costes</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Precio fijo 687€</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Depende precio venta</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">⏱️ Disponibilidad del gestor</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Tel, email, WhatsApp</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Según carga del agente</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">🎯 Conflicto de intereses</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Solo trabajamos para ti</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">❌</span>
                    <div className="text-sm text-gray-600 mt-1">Cobran del comprador también</div>
                  </td>
                </tr>
                <tr className="bg-amber-50 border-2 border-[#c9962a]">
                  <td className="p-4 font-bold text-gray-900">💰 Ahorro total para ti</td>
                  <td className="p-4 text-center" colSpan={2}>
                    <div className="text-3xl font-bold text-[#a87a20]">Ahorras entre 2.313€ y 4.313€</div>
                    <div className="text-sm text-gray-600 mt-1">En una venta de 100.000€ comparado con agencia tradicional</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">⚠️</span>
              Malas prácticas comunes de agencias inmobiliarias en Valencia
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Honorarios desmedidos:</strong> Cobran 3-5% de comisión sobre el precio de venta, que pueden ser miles de euros por hacer trámites básicos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Doble comisión:</strong> Muchas agencias cobran comisión tanto al vendedor como al comprador, maximizando sus beneficios a costa de ambas partes.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Contratos con permanencia:</strong> Te obligan a exclusividad durante meses aunque no vendan tu piso, limitando tus opciones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Falta de asesoramiento legal:</strong> Los agentes comerciales no son asesores legales. Muchos no revisan la documentación en profundidad.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span><strong>Presión para bajar precio:</strong> Tienen incentivo para cerrar rápido aunque sea a menor precio, ya que su comisión está asegurada.</span>
              </li>
            </ul>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-[#c9962a] rounded-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-3">🎯 La ventaja de Inmonest en Valencia</h3>
            <p className="text-gray-700 text-lg">
              Inmonest es una <strong>gestoría inmobiliaria especializada en particulares</strong>. No somos agencia, 
              por eso no cobramos comisión sobre la venta. Te proporcionamos el mismo acompañamiento profesional 
              <strong> por una tarifa plana de 687€</strong>, independientemente del precio de tu piso en Valencia. 
              Nuestro único objetivo es que vendas con total seguridad jurídica y al mejor precio posible.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Valencia */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vende tu piso en Valencia sin pagar comisiones desmedidas
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Gestoría inmobiliaria en Valencia especializada en particulares. Contratos personalizados, documentación completa 
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
            Sin pagos ocultos • Gestor en Valencia en 24h • IVA incluido
          </p>
        </div>
      </section>

      {/* Servicios relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Otros servicios en Valencia
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/gestoria/valencia"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Gestoría Valencia</h3>
              <p className="text-gray-600 text-sm mb-3">
                Todos los servicios de gestoría inmobiliaria en Valencia.
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
              href="/gestoria/compra-completa-reserva-escritura"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Servicio de Compra</h3>
              <p className="text-gray-600 text-sm mb-3">
                Acompañamiento completo si estás comprando en Valencia.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 687€</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
