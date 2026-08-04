import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contrato de alquiler Granada desde 145€',
  description:
    'Contrato LAU en Granada desde 145€ (temporal 165€). Ideal para estudiantes y familias. Arras desde 145€. Entrega en 48h.',
  keywords: [
    'contrato alquiler granada',
    'contrato estudiantes granada',
    'contrato lau granada',
    'gestoria inmobiliaria granada',
    'contrato arras granada',
    'abogado inmobiliario granada',
    'alquiler centro granada',
    'contrato temporal granada',
  ],
  alternates: {
    canonical: `${BASE_URL}/granada/contrato-alquiler`,
  },
  openGraph: {
    title: 'Contrato de alquiler Granada desde 145€',
    description:
      'Contratos de alquiler en Granada para estudiantes y familias. LAU desde 145€, temporada 165€. Entrega 48h.',
    url: `${BASE_URL}/granada/contrato-alquiler`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria2.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria en Granada' }],
  },
}

// Schema.org: Breadcrumbs + Service + FAQ
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Granada', item: `${BASE_URL}/granada` },
        { '@type': 'ListItem', position: 3, name: 'Contrato de Alquiler', item: `${BASE_URL}/granada/contrato-alquiler` },
      ],
    },
    {
      '@type': 'LegalService',
      name: 'Contratos de Alquiler Granada - Inmonest',
      description: 'Servicio especializado en contratos de alquiler en Granada. Estudiantes, LAU, arras penitenciales y compraventa. Abogados expertos en normativa andaluza.',
      url: `${BASE_URL}/granada/contrato-alquiler`,
      image: `${BASE_URL}/gestoria2.jpg`,
      areaServed: {
        '@type': 'City',
        name: 'Granada',
        addressRegion: 'Andalucía',
        addressCountry: 'ES',
      },
      priceRange: '€€',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Contratos Inmobiliarios Granada',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Alquiler Estudiantes Granada', price: '97', priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Alquiler LAU Granada', price: '145', priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Arras Penitenciales Granada', price: '145', priceCurrency: 'EUR' },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta un contrato de alquiler para estudiantes en Granada?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Redactamos contratos de alquiler temporal para estudiantes en Granada desde 165€. Incluye cláusulas de duración académica, gastos compartidos y normativa específica para residencias estudiantiles.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Es diferente un contrato de alquiler para estudiantes que un contrato LAU en Granada?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí. Los contratos LAU son para vivienda habitual (larga duración, mínimo 3 años). Los contratos para estudiantes son temporales (9-10 meses), con normativa diferente y más flexibilidad.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Necesito abogado para comprar un piso en Granada?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No es obligatorio, pero muy recomendable. Un abogado redacta el contrato de arras para proteger tu señal (10-15% del precio), revisa la documentación legal del inmueble y garantiza que la compraventa se hace correctamente.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta un contrato de arras en Granada?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Redactamos contratos de arras penitenciales en Granada desde 145€. Incluye asesoramiento completo, cláusulas de desistimiento y protección legal tanto para comprador como vendedor.',
          },
        },
      ],
    },
  ],
}

export default function GestoriaGranadaPage() {
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
      <section className="relative bg-gradient-to-br from-forest-950 via-[#3d2100] to-[#5a2d00] text-white py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <Image src="/gestoria2.jpg" alt="Gestoría Granada" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/40 mb-6">
            <span className="text-gold-300 font-semibold text-sm">🎓 Especialistas en Zona Universitaria | Andalucía</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Contratos de Alquiler y Compraventa en <span className="text-gold-300">Granada</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Redactamos contratos para <strong className="text-gold-300">estudiantes, familias e inversores</strong> en Granada.  
            Alquiler LAU, temporal, arras y compraventa. <strong>LAU 145€ · Temporada 165€. Entrega en 48 horas.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler-temporal"
              className="inline-block px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-bold text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Contrato Estudiantes - 165€
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

      {/* Por qué Granada es especial */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
          El mercado inmobiliario de <span className="text-gold-500">Granada</span> es único
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
          <p>
            <strong>Granada</strong> tiene un mercado inmobiliario muy dinámico marcado por la <strong>Universidad de Granada</strong>, 
            una de las mayores de España con más de 60,000 estudiantes. Esto genera una alta demanda de alquileres temporales, 
            pisos compartidos y habitaciones individuales.
          </p>
          <p>
            Además, la ciudad atrae a <strong>compradores jóvenes</strong> por sus precios accesibles (2,000-2,400€/m²) comparados con Madrid o Barcelona, 
            y a <strong>inversores</strong> que compran pisos para alquiler turístico (Albaicín, Realejo) o estudiantil (zona Fuentenueva, Zaidín).
          </p>
          <p>
            En <strong>Inmonest</strong> conocemos estas particularidades. Redactamos contratos adaptados a Granada que cumplen con:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Normativa andaluza</strong> sobre fianzas y depósitos</li>
            <li><strong>Contratos temporales</strong> para estudiantes (no LAU)</li>
            <li><strong>Alquileres turísticos</strong> regulados por Junta de Andalucía</li>
            <li><strong>Arras penitenciales</strong> con cláusulas específicas para compraventa granadina</li>
          </ul>
        </div>
      </section>

      {/* Servicios principales */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            Servicios de Gestoría en Granada
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Contratos redactados por abogados especializados en el mercado inmobiliario granadino
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Servicio 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gold-500 hover:shadow-2xl transform hover:scale-105 transition-all">
              <div className="inline-block px-3 py-1 rounded-full bg-yellow-500 text-white text-xs font-bold mb-4">
                🎓 ESTUDIANTES
              </div>
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Contrato Alquiler Temporal</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Específico para estudiantes en Granada. Duración curso académico (9-10 meses). 
                Incluye cláusulas de gastos compartidos, normas de convivencia y fianza.
              </p>
              <div className="text-3xl font-bold text-gold-500 mb-4">165€</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ Adaptado a normativa estudiantil</li>
                <li>✅ Duración flexible (3-11 meses)</li>
                <li>✅ Gastos y fianza claros</li>
                <li>✅ Entrega en 48h</li>
              </ul>
              <Link
                href="/gestoria/solicitar/contrato-alquiler-temporal"
                className="block text-center py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold transition"
              >
                Solicitar ahora
              </Link>
            </div>

            {/* Servicio 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-gold-500 transition-all hover:shadow-2xl">
              <div className="text-5xl mb-4">🏠</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Contrato Alquiler LAU</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Arrendamiento de vivienda habitual en Granada. Para familias o profesionales. 
                Duración mínima 3 años. Conforme LAU 2026 y normativa andaluza.
              </p>
              <div className="text-3xl font-bold text-gold-500 mb-4">145€</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ Conforme LAU actualizada</li>
                <li>✅ Protección propietarios e inquilinos</li>
                <li>✅ Cláusulas de prórroga</li>
                <li>✅ Revisiones ilimitadas</li>
              </ul>
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="block text-center py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold transition"
              >
                Solicitar ahora
              </Link>
            </div>

            {/* Servicio 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-gold-500 transition-all hover:shadow-2xl">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Contrato de Arras</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Protege tu compra en Granada. Arras penitenciales para asegurar la señal (10-15% del precio). 
                Permite desistir con penalización justa. Redactado por abogados.
              </p>
              <div className="text-3xl font-bold text-gold-500 mb-4">145€</div>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                <li>✅ Protección compradores y vendedores</li>
                <li>✅ Cláusulas de desistimiento</li>
                <li>✅ Asesoría legal incluida</li>
                <li>✅ Válido ante notario</li>
              </ul>
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="block text-center py-3 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-semibold transition"
              >
                Solicitar ahora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido SEO: Mercado Granada */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          Alquiler y compraventa en Granada: Guía 2026
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Zonas más demandadas para alquilar en Granada</h3>
          <p>
            El mercado de alquiler en Granada está dividido en varias zonas con características muy diferentes:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Centro - Puerta Real:</strong> Estudiantes y jóvenes profesionales. Alquileres 400-650€/mes (habitaciones 250-350€).</li>
            <li><strong>Realejo - Campo del Príncipe:</strong> Zona bohemia cerca de Alhambra. Pisos 500-800€/mes. Mucha demanda de Erasmus.</li>
            <li><strong>Fuentenueva - Campus Universitario:</strong> Epicentro estudiantil. Habitaciones desde 200€/mes. Pisos completos 600-750€/mes.</li>
            <li><strong>Zaidín:</strong> Familiar y económica. Alquileres LAU de larga duración. Precios 450-650€/mes para 3 habitaciones.</li>
            <li><strong>Albaicín:</strong> Turismo y alquileres vacacionales. Regulación estricta de Junta de Andalucía. Precios altos (800-1,200€/mes).</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contratos de alquiler para estudiantes en Granada</h3>
          <p>
            Granada tiene más de <strong>60,000 estudiantes universitarios</strong>. La mayoría busca alquiler temporal (septiembre a junio). 
            Estos contratos <strong>NO son LAU</strong>, son alquileres de <strong>temporada</strong> con normativa diferente:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Duración: 9-10 meses (curso académico)</li>
            <li>No hay prórroga obligatoria (a diferencia LAU)</li>
            <li>Fianza: 1 mes típicamente</li>
            <li>Gastos compartidos: agua, luz, internet (debe especificarse)</li>
            <li>Normas de convivencia: horarios, limpieza, visitas</li>
          </ul>
          <p>
            En <strong>Inmonest</strong> redactamos contratos de alquiler temporal para estudiantes desde <strong>165€</strong>. 
            Incluyen todas estas cláusulas adaptadas a la normativa andaluza.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Comprar vivienda en Granada en 2026</h3>
          <p>
            Granada es una de las capitales andaluzas más accesibles para comprar vivienda. Precio medio: <strong>2,000-2,400€/m²</strong>. 
            Un piso de 70m² en zona Zaidín cuesta aproximadamente <strong>140,000-170,000€</strong>.
          </p>
          <p>
            Zonas en auge para inversión:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Chana - Zaidín:</strong> Familias jóvenes. Obra nueva desde 150,000€. Alta revalorización.</li>
            <li><strong>Centro histórico:</strong> Inversión turística. Pisos desde 180,000€. Rentabilidad 6-8% anual en alquiler vacacional.</li>
            <li><strong>Armilla - Churriana:</strong> Extrarradio bien comunicado. Viviendas desde 120,000€. Ideal primera vivienda.</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">¿Por qué necesitas un contrato de arras en Granada?</h3>
          <p>
            Al comprar una vivienda en Granada, firmar <strong>arras penitenciales</strong> es fundamental para:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Asegurar que el vendedor no vende a otra persona mientras tramitas la hipoteca</li>
            <li>Proteger tu señal (típicamente 10-15% del precio total)</li>
            <li>Permitir desistir de la compra si cambias de opinión (pierdes la señal)</li>
            <li>Obligar al vendedor a vender (si él desiste, debe devolver el doble)</li>
          </ul>
          <p>
            Para un piso de 150,000€ en Granada, la señal sería de <strong>15,000-22,500€</strong>. Nuestro contrato de arras penitenciales 
            protege esta cantidad con cláusulas legales ejecutables ante notario. Precio: <strong>145€</strong>.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Normativa específica de Granada</h3>
          <p>
            Como ciudad andaluza, Granada tiene regulación específica de la <strong>Junta de Andalucía</strong>:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Alquileres turísticos:</strong> Necesitan licencia VUT. Regulación estricta en Albaicín y Realejo.</li>
            <li><strong>Fianzas:</strong> Deben depositarse en Instituto Andaluz de la Vivienda (2 meses para alquiler, 1 mes para residencial).</li>
            <li><strong>Certificado energético:</strong> Obligatorio para alquilar o vender (desde 2013).</li>
            <li><strong>Cédula habitabilidad:</strong> Requerida para contratos LAU en Granada capital.</li>
          </ul>
          <p>
            Todos nuestros contratos incluyen estas obligaciones legales automáticamente.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            Preguntas frecuentes sobre contratos inmobiliarios en Granada
          </h2>
          <div className="space-y-6">
            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Cuánto cuesta un contrato de alquiler para estudiantes en Granada?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Redactamos contratos de alquiler temporal para estudiantes en Granada desde <strong>165€</strong>. Incluye cláusulas de duración académica (9-10 meses), 
                gastos compartidos, fianza y normativa específica para residencias estudiantiles. Perfecto para pisos en zona Fuentenueva, Centro o Realejo.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Es diferente un contrato de alquiler para estudiantes que un contrato LAU en Granada?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Sí, totalmente. Los <strong>contratos LAU</strong> son para vivienda habitual, con duración mínima de 3 años y prórroga obligatoria. 
                Los <strong>contratos temporales para estudiantes</strong> tienen duración flexible (3-11 meses), no hay prórroga obligatoria y terminan automáticamente al finalizar el curso. 
                La normativa aplicable también es diferente.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Necesito abogado para comprar un piso en Granada?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                No es obligatorio, pero <strong>muy recomendable</strong>. Un abogado redacta el contrato de arras para proteger tu señal (10-15% del precio, 
                unos 15,000-22,500€ en Granada), revisa la documentación legal del inmueble (nota simple, certificado energético, IBI) 
                y garantiza que la compraventa se hace correctamente. En Inmonest ofrecemos este servicio desde <strong>145€</strong>.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Cuánto cuesta un contrato de arras en Granada?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Redactamos contratos de arras penitenciales en Granada desde <strong>145€</strong>. Incluye asesoramiento completo por abogado, 
                cláusulas de desistimiento claras (si el comprador se retracta pierde la señal, si el vendedor desiste debe devolver el doble), 
                y protección legal para ambas partes. Válido ante notario.
              </p>
            </details>

            <details className="bg-white rounded-xl p-6 shadow-md">
              <summary className="text-xl font-bold text-gray-900 cursor-pointer">
                ¿Los contratos son válidos en Granada?
              </summary>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Sí, 100%. Todos nuestros contratos están redactados por <strong>abogados colegiados</strong> especializados en derecho inmobiliario andaluz. 
                Cumplen con la LAU, normativa de la Junta de Andalucía y jurisprudencia actualizada. Son ejecutables legalmente ante tribunales de Granada.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-[#2e1900] to-[#5a2d00] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            ¿Necesitas un contrato inmobiliario en Granada?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Más de 90 clientes en Granada confían en nuestros abogados. Especializados en zona universitaria, 
            alquileres para estudiantes y compraventa de vivienda. Servicio 100% online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler-temporal"
              className="inline-block px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-600 text-white font-bold text-lg shadow-xl transition-transform transform hover:scale-105"
            >
              Contrato Estudiantes - 165€
            </Link>
            <Link
              href="/gestoria"
              className="inline-block px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-[#2e1900] font-bold text-lg shadow-xl transition-all"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      {/* Enlaces internos SEO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Servicios relacionados en otras ciudades</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/gestoria/barcelona" className="text-gold-500 hover:text-gold-700 font-semibold">
            Gestoría Barcelona →
          </Link>
          <Link href="/gestoria/madrid" className="text-gold-500 hover:text-gold-700 font-semibold">
            Gestoría Madrid →
          </Link>
          <Link href="/gestoria/valencia" className="text-gold-500 hover:text-gold-700 font-semibold">
            Gestoría Valencia →
          </Link>
          <Link href="/zaragoza/contrato-alquiler" className="text-gold-500 hover:text-gold-700 font-semibold">
            Contrato Alquiler Zaragoza →
          </Link>
          <Link href="/gestoria/sevilla" className="text-gold-500 hover:text-gold-700 font-semibold">
            Gestoría Sevilla →
          </Link>
          <Link href="/gestoria/guia-arras-penitenciales" className="text-gold-500 hover:text-gold-700 font-semibold">
            Guía Arras Penitenciales →
          </Link>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden />
      <StickyMobileContratoCta
        ciudad="Granada"
        ciudadSlug="granada"
        servicio="alquiler"
      />
    </div>
  )
}
