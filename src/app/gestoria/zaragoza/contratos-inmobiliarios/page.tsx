import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria Zaragoza 【DESDE 29€】 Contratos Alquiler y Arras | Inmonest',
  description: 'Gestoría especializada en Zaragoza. Redactamos contratos de alquiler LAU, arras penitenciales y compraventa. Abogados expertos en derecho inmobiliario aragonés. Desde 29€. Entrega en 48h.',
  keywords: [
    'gestoria inmobiliaria zaragoza',
    'contrato alquiler zaragoza',
    'contrato arras zaragoza',
    'abogado inmobiliario zaragoza',
    'contrato compraventa zaragoza',
    'gestoria contratos zaragoza',
    'abogado alquiler zaragoza',
    'contrato lau zaragoza',
  ],
  alternates: {
    canonical: `${BASE_URL}/gestoria/zaragoza/contratos-inmobiliarios`,
  },
  openGraph: {
    title: 'Gestoría Inmobiliaria en Zaragoza - Contratos desde 29€',
    description: 'Redactamos y revisamos contratos inmobiliarios en Zaragoza. Alquiler, arras, compraventa. Asesoría legal especializada. Entrega 48h.',
    url: `${BASE_URL}/gestoria/zaragoza/contratos-inmobiliarios`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria/gestoria3.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria en Zaragoza' }],
  },
}

// Schema.org: Breadcrumbs + Service
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
        { '@type': 'ListItem', position: 3, name: 'Zaragoza', item: `${BASE_URL}/gestoria/zaragoza/contratos-inmobiliarios` },
      ],
    },
    {
      '@type': 'LegalService',
      name: 'Gestoría Inmobiliaria Zaragoza - Inmonest',
      description: 'Servicio de redacción y revisión de contratos inmobiliarios en Zaragoza. Especialistas en alquiler LAU, arras penitenciales y compraventa.',
      url: `${BASE_URL}/gestoria/zaragoza/contratos-inmobiliarios`,
      image: `${BASE_URL}/gestoria/gestoria3.jpg`,
      areaServed: {
        '@type': 'City',
        name: 'Zaragoza',
        addressRegion: 'Aragón',
        addressCountry: 'ES',
      },
      priceRange: '€€',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.8',
        reviewCount: '127',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Contratos Inmobiliarios Zaragoza',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Alquiler LAU Zaragoza', price: '29', priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Arras Penitenciales Zaragoza', price: '145', priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Revisión Contrato Alquiler Zaragoza', price: '59', priceCurrency: 'EUR' },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta un contrato de alquiler en Zaragoza?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'En Inmonest redactamos contratos de alquiler LAU adaptados a la normativa aragonesa desde 29€. Incluye asesoramiento personalizado y entrega en 48h.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué diferencia hay entre arras confirmatorias y penitenciales en Zaragoza?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Las arras confirmatorias obligan a comprar. Las penitenciales permiten desistir perdiendo la señal (comprador) o devolviéndola duplicada (vendedor). En Zaragoza recomendamos arras penitenciales para proteger ambas partes.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Necesito un abogado para firmar un contrato de alquiler en Zaragoza?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No es obligatorio, pero muy recomendable. Un abogado especializado revisa cláusulas abusivas, garantiza cumplimiento de la LAU y evita problemas futuros. En Inmonest ofrecemos revisión desde 59€.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto tardan en redactar un contrato inmobiliario en Zaragoza?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Entregamos todos los contratos en 48 horas laborables. Para revisiones urgentes ofrecemos servicio express en 24h.',
          },
        },
      ],
    },
  ],
}

export default function GestoriaZaragozaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a0d00] via-[#2e1900] to-[#4a2e00] text-white py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <Image src="/gestoria/gestoria3.jpg" alt="Gestoría Zaragoza" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-[#c9962a]/20 border border-[#c9962a]/40 mb-6">
            <span className="text-[#f4c94a] font-semibold text-sm">🏛️ Especialistas en Derecho Inmobiliario Aragonés</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Gestoría Inmobiliaria en <span className="text-[#f4c94a]">Zaragoza</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Redactamos y revisamos contratos de alquiler, arras y compraventa adaptados a la legislación aragonesa. 
            <strong className="text-[#f4c94a]"> Desde 29€. Entrega en 48 horas.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="inline-block px-8 py-4 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-bold text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Solicitar Contrato de Alquiler - 29€
            </Link>
            <Link
              href="/gestoria/solicitar/arras-penitenciales"
              className="inline-block px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-[#2e1900] font-bold text-lg shadow-xl transition-all"
            >
              Contrato de Arras - 145€
            </Link>
          </div>
        </div>
      </section>

      {/* Intro: Por qué necesitas un abogado en Zaragoza */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          ¿Por qué necesitas una gestoría especializada en <span className="text-[#c9962a]">Zaragoza</span>?
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            El mercado inmobiliario de <strong>Zaragoza</strong> tiene particularidades únicas: desde la regulación de alquileres en el Casco Histórico 
            hasta las especificidades de compraventa en zonas como Actur, Romareda o Universidad. Un contrato mal redactado puede costarte miles de euros 
            en problemas legales.
          </p>
          <p>
            En <strong>Inmonest</strong> somos expertos en <strong>derecho inmobiliario aragonés</strong>. Redactamos contratos que cumplen con:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Ley de Arrendamientos Urbanos (LAU 29/1994)</strong> actualizada a 2026</li>
            <li><strong>Normativa específica de Aragón</strong> sobre fianzas y depósitos</li>
            <li><strong>Jurisprudencia reciente</strong> de tribunales aragoneses</li>
            <li><strong>Protección completa</strong> para propietarios e inquilinos</li>
          </ul>
        </div>
      </section>

      {/* Servicios principales */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Nuestros Servicios en Zaragoza
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#c9962a] transition-all hover:shadow-2xl">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Contrato de Alquiler LAU</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Contrato de arrendamiento de vivienda habitual adaptado a Zaragoza. Incluye cláusulas de fianza, 
                duración, gastos de comunidad y normativa aragonesa específica.
              </p>
              <div className="text-3xl font-bold text-[#c9962a] mb-4">29€</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ Redacción personalizada</li>
                <li>✅ Conforme LAU 2026</li>
                <li>✅ Entrega en 48h</li>
                <li>✅ Revisiones ilimitadas</li>
              </ul>
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="block text-center py-3 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-semibold transition"
              >
                Solicitar ahora
              </Link>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#c9962a] hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-bold mb-4">
                ⭐ MÁS VENDIDO
              </div>
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Contrato de Arras Penitenciales</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Protege tu señal de compra en Zaragoza. Permite desistir de la operación con penalización justa. 
                Redactado por abogados expertos en compraventa inmobiliaria.
              </p>
              <div className="text-3xl font-bold text-[#c9962a] mb-4">145€</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ Arras confirmatorias o penitenciales</li>
                <li>✅ Cláusulas de desistimiento</li>
                <li>✅ Protección compradores y vendedores</li>
                <li>✅ Asesoría legal incluida</li>
              </ul>
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="block text-center py-3 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-semibold transition"
              >
                Solicitar ahora
              </Link>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-[#c9962a] transition-all hover:shadow-2xl">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Revisión de Contratos</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ¿Te han dado un contrato para firmar en Zaragoza? Nuestros abogados lo revisan línea por línea, 
                detectan cláusulas abusivas y te asesoran antes de firmar.
              </p>
              <div className="text-3xl font-bold text-[#c9962a] mb-4">59€</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ Revisión completa por abogado</li>
                <li>✅ Detección cláusulas abusivas</li>
                <li>✅ Informe detallado</li>
                <li>✅ Asesoramiento personalizado</li>
              </ul>
              <Link
                href="/gestoria/solicitar/revision-alquiler"
                className="block text-center py-3 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-semibold transition"
              >
                Solicitar revisión
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido SEO: Mercado inmobiliario Zaragoza */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          El mercado inmobiliario en Zaragoza en 2026
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p>
            <strong>Zaragoza</strong> se ha consolidado como una de las ciudades más atractivas para invertir en vivienda en España. 
            Con precios más accesibles que Madrid o Barcelona, pero con excelente calidad de vida, la capital aragonesa atrae tanto a compradores 
            como a inversores en alquiler.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Zonas más demandadas en Zaragoza</h3>
          <p>
            Las áreas con mayor demanda de contratos de alquiler y compraventa son:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Centro - Casco Histórico:</strong> Alquileres turísticos y estudiantes. Contratos temporales muy comunes.</li>
            <li><strong>Actur - Rey Fernando:</strong> Familias jóvenes. Contratos LAU de larga duración (3-5 años).</li>
            <li><strong>Universidad - San José:</strong> Estudiantes universitarios. Alquileres de habitaciones y pisos compartidos.</li>
            <li><strong>Romareda - Miralbueno:</strong> Zona residencial premium. Compraventas con arras penitenciales frecuentes.</li>
            <li><strong>Valdespartera - Parque Venecia:</strong> Obra nueva. Necesitas contratos de reserva y arras confirmatorias.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Precios de alquiler en Zaragoza (2026)</h3>
          <p>
            El precio medio del alquiler en Zaragoza ronda los <strong>700-850€/mes</strong> para pisos de 2-3 habitaciones. 
            Zonas como el Centro pueden superar los 900€/mes, mientras que barrios periféricos como Delicias o Oliver ofrecen opciones desde 500€/mes.
          </p>
          <p>
            <strong>Importante:</strong> Todos los contratos de alquiler en Zaragoza deben incluir fianza (1 mes de renta mínimo) y cumplir 
            con la normativa aragonesa sobre depósitos. Nuestros contratos incluyen estas cláusulas automáticamente.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">¿Cuándo necesitas un contrato de arras en Zaragoza?</h3>
          <p>
            Las <strong>arras penitenciales</strong> son esenciales cuando compras una vivienda en Zaragoza. Sirven para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Asegurar que el vendedor no vende a otra persona mientras preparas la hipoteca</li>
            <li>Protegerte si cambias de opinión (pierdes la señal, pero evitas un juicio)</li>
            <li>Obligar al vendedor a vender (si él desiste, debe devolver el doble)</li>
          </ul>
          <p>
            En Zaragoza, la señal típica es del <strong>10% del precio de compra</strong>. Para un piso de 150.000€, serían 15.000€. 
            Nuestro contrato de arras penitenciales protege esta cantidad con cláusulas claras y ejecutables legalmente.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas frecuentes sobre contratos inmobiliarios en Zaragoza
          </h2>
          <div className="space-y-6">
            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Cuánto cuesta un contrato de alquiler en Zaragoza?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                En Inmonest redactamos contratos de alquiler LAU adaptados a la normativa aragonesa desde <strong>29€</strong>. 
                Incluye asesoramiento personalizado, revisiones ilimitadas y entrega en 48h. Otras gestorías cobran 80-120€ por el mismo servicio.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Qué diferencia hay entre arras confirmatorias y penitenciales en Zaragoza?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                <strong>Arras confirmatorias:</strong> Obligan a comprar. Si te echas atrás, el vendedor puede demandarte por el total del precio.<br />
                <strong>Arras penitenciales:</strong> Permiten desistir. Si el comprador se retracta, pierde la señal. Si el vendedor desiste, debe devolver el doble. 
                En Zaragoza recomendamos <strong>arras penitenciales</strong> para proteger ambas partes.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Necesito un abogado para firmar un contrato de alquiler en Zaragoza?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                No es obligatorio, pero <strong>muy recomendable</strong>. Un abogado especializado revisa cláusulas abusivas (ej: prohibición de mascotas sin justificación, 
                penalizaciones excesivas), garantiza cumplimiento de la LAU y evita problemas futuros. En Inmonest ofrecemos revisión desde <strong>59€</strong>.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Cuánto tardan en redactar un contrato inmobiliario en Zaragoza?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Entregamos todos los contratos en <strong>48 horas laborables</strong>. Si tienes prisa (ej: firmas mañana), ofrecemos servicio express en 24h 
                con recargo de 20€. Trabajamos 100% online, no necesitas desplazarte.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Los contratos son válidos legalmente en Zaragoza?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Sí, 100%. Todos nuestros contratos están redactados por <strong>abogados colegiados</strong> especializados en derecho inmobiliario. 
                Cumplen con la LAU, normativa aragonesa y jurisprudencia actualizada. Son totalmente ejecutables ante tribunales de Zaragoza.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-[#2e1900] to-[#4a2e00] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            ¿Listo para proteger tu operación inmobiliaria en Zaragoza?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Miles de clientes en Aragón confían en nosotros para redactar y revisar sus contratos. 
            Únete a ellos y evita problemas legales costosos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria"
              className="inline-block px-8 py-4 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-bold text-lg shadow-xl transition-transform transform hover:scale-105"
            >
              Ver todos los servicios
            </Link>
            <Link
              href="/contacto"
              className="inline-block px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-[#2e1900] font-bold text-lg shadow-xl transition-all"
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </section>

      {/* Enlaces internos para SEO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Servicios relacionados en otras ciudades</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/gestoria/barcelona" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Gestoría Barcelona →
          </Link>
          <Link href="/gestoria/madrid" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Gestoría Madrid →
          </Link>
          <Link href="/gestoria/valencia" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Gestoría Valencia →
          </Link>
          <Link href="/gestoria/revision-contrato-alquiler" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Revisión Contrato Alquiler →
          </Link>
          <Link href="/gestoria/guia-arras-penitenciales" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Guía Arras Penitenciales →
          </Link>
          <Link href="/zaragoza/contrato-alquiler" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Contrato Alquiler Zaragoza →
          </Link>
        </div>
      </section>
    </div>
  )
}
