import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SearchForm from '@/components/SearchForm'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Pisos de Particulares en Barcelona Sin Comisión 2026 — Ahorra hasta 6.000€',
  description: 'Encuentra pisos de particulares en Barcelona sin comisión de agencia. Alquiler y venta directo del propietario. Ahorra hasta 6.000€ en intermediarios. 100% verificados.',
  alternates: { canonical: `${BASE_URL}/barcelona/pisos-particulares-sin-comision` },
  openGraph: {
    title: 'Pisos de Particulares en Barcelona Sin Comisión — Inmonest',
    description: 'Contacta directamente con propietarios. Sin intermediarios, sin comisiones. Ahorra miles de euros.',
    url: `${BASE_URL}/barcelona/pisos-particulares-sin-comision`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [
      {
        url: `${BASE_URL}/og-barcelona.jpg`,
        width: 1200,
        height: 630,
        alt: 'Pisos de particulares en Barcelona sin comisión',
      },
    ],
  },
}

const VENTAJAS = [
  {
    icon: '💰',
    titulo: 'Ahorra hasta 6.000€',
    desc: 'Sin comisión de agencia. En un piso de 1.200€/mes ahorras 2 mensualidades (2.400€). En una compra de 300.000€ ahorras el 2% (6.000€).',
  },
  {
    icon: '🤝',
    titulo: 'Trato directo con el propietario',
    desc: 'Hablas directamente con quien toma las decisiones. Negociación más rápida, sin intermediarios que ralenticen el proceso.',
  },
  {
    icon: '✅',
    titulo: 'Pisos verificados con IA',
    desc: 'Cada anuncio tiene descripción generada por IA que valida fotos, características y documentación. Solo publicamos pisos reales.',
  },
  {
    icon: '⚡',
    titulo: 'Respuesta en 24 horas',
    desc: 'Los particulares responden más rápido que las agencias. Contacta por WhatsApp, email o teléfono y consigue visita en 1-2 días.',
  },
]

const BARRIOS_BARCELONA = [
  {
    nombre: 'Eixample',
    imagen: '/placeholder-eixample.jpg',
    descripcion: 'El barrio modernista por excelencia. Edificios de Gaudí, comercios de lujo y excelente transporte.',
    precioMedio: '1.400€/mes',
    destacado: 'Passeig de Gràcia, Casa Batlló',
    link: '/pisos?city=barcelona&district=eixample',
  },
  {
    nombre: 'Gràcia',
    imagen: '/placeholder-gracia.jpg',
    descripcion: 'Ambiente bohemio, plazas con terrazas y mercado local. Muy popular entre jóvenes profesionales.',
    precioMedio: '1.250€/mes',
    destacado: 'Park Güell, Plaça del Sol',
    link: '/pisos?city=barcelona&district=gracia',
  },
  {
    nombre: 'Sants',
    imagen: '/placeholder-sants.jpg',
    descripcion: 'Residencial y bien conectado. Perfecto para familias. Cerca de la estación y Camp Nou.',
    precioMedio: '1.100€/mes',
    destacado: 'Estación de Sants, Parc de l\'Espanya Industrial',
    link: '/pisos?city=barcelona&district=sants',
  },
  {
    nombre: 'Poblenou',
    imagen: '/placeholder-poblenou.jpg',
    descripcion: 'El barrio tecnológico de Barcelona. Startups, coworkings y cerca de la playa. Muy moderno.',
    precioMedio: '1.350€/mes',
    destacado: 'Rambla del Poblenou, playas',
    link: '/pisos?city=barcelona&district=poblenou',
  },
]

const TESTIMONIOS = [
  {
    nombre: 'Laura M.',
    barrio: 'Gràcia',
    texto: 'Encontré mi piso en 1 semana. Hablé directamente con el dueño y me ahorré 2.400€ de comisión. ¡Increíble!',
    ahorro: '2.400€',
  },
  {
    nombre: 'Carlos R.',
    barrio: 'Sants',
    texto: 'Compré mi primer piso sin pagar comisión de agencia. El propietario era súper transparente y todo fue muy rápido.',
    ahorro: '6.000€',
  },
  {
    nombre: 'Ana S.',
    barrio: 'Eixample',
    texto: 'Las descripciones con IA son geniales. Sabes exactamente qué esperar antes de la visita. Cero sorpresas.',
    ahorro: '1.800€',
  },
]

const FAQS = [
  {
    q: '¿Por qué alquilar o comprar directamente al propietario?',
    a: 'Ahorras la comisión de agencia (1-2 meses de alquiler o 2-5% del precio de venta). Además, el proceso es más rápido porque tratas directamente con quien decide.',
  },
  {
    q: '¿Cómo sé que los pisos son de particulares reales?',
    a: 'Verificamos cada anuncio con IA que analiza fotos, descripción y datos catastrales. Solo publicamos pisos con documentación completa y fotos reales.',
  },
  {
    q: '¿Cuánto tarda el proceso de alquiler/compra?',
    a: 'En alquiler: 7-10 días desde visita hasta contrato. En compra: 30-45 días desde oferta hasta escritura ante notario. Más rápido que con agencia.',
  },
  {
    q: '¿Hay pisos en todos los barrios de Barcelona?',
    a: 'Sí, tenemos pisos de particulares en Eixample, Gràcia, Sants, Poblenou, Sarrià, Ciutat Vella y más. Usa el buscador para filtrar por barrio.',
  },
]

export default function PisosBarcelonaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      {/* Hero con imagen de fondo */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 opacity-95" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center text-white mb-12">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🏠 Barcelona • Particulares • Sin Comisión
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Pisos de particulares<br />
              <span className="text-yellow-400">sin comisión</span> en Barcelona
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Contacta directamente con el propietario.<br />
              <strong className="text-white">Ahorra hasta 6.000€</strong> en comisiones de agencia.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">253</div>
                <div className="text-sm text-blue-200">Pisos disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">0€</div>
                <div className="text-sm text-blue-200">Comisión agencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-400">24h</div>
                <div className="text-sm text-blue-200">Respuesta media</div>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/pisos?city=barcelona&operation=rent" 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Ver pisos en alquiler →
              </Link>
              <Link 
                href="/pisos?city=barcelona&operation=sale" 
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-bold px-8 py-4 rounded-full text-lg transition-all"
              >
                Ver pisos en venta →
              </Link>
            </div>
          </div>

          {/* Buscador integrado */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              ¿Por qué buscar pisos de particulares?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ahorra dinero, tiempo y dolores de cabeza. Trato directo, sin intermediarios.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAJAS.map((v, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-blue-300 hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.titulo}</h3>
                <p className="text-gray-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barrios populares */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Barrios más populares de Barcelona
            </h2>
            <p className="text-lg text-gray-600">
              Encuentra tu piso ideal en los mejores barrios de la ciudad
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BARRIOS_BARCELONA.map((barrio, i) => (
              <Link key={i} href={barrio.link} className="group">
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-gradient-to-br from-blue-400 to-indigo-500 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-white text-6xl font-black opacity-20">
                      {barrio.nombre.charAt(0)}
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {barrio.nombre}
                      </h3>
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                        {barrio.precioMedio}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 leading-relaxed">{barrio.descripcion}</p>
                    <p className="text-xs text-gray-500 mb-3">📍 {barrio.destacado}</p>
                    <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                      Ver pisos en {barrio.nombre} →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-lg text-gray-600">
              Miles de personas ya han ahorrado en comisiones
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{t.nombre}</div>
                    <div className="text-sm text-gray-500">{t.barrio}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic mb-4">"{t.texto}"</p>
                <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 inline-block">
                  <span className="text-green-700 font-bold text-sm">Ahorró {t.ahorro}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Registro */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            ¿Quieres recibir pisos nuevos antes que nadie?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Crea una alerta personalizada y te avisamos cuando haya pisos que te interesen.<br />
            <strong className="text-white">Gratis y sin compromiso.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/publicar-anuncio" 
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl"
            >
              Crear alerta gratis →
            </Link>
            <Link 
              href="/publicar-anuncio" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-bold px-8 py-4 rounded-full text-lg transition-all"
            >
              ¿Tienes un piso? Publícalo gratis
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6 group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center text-lg">
                  {faq.q}
                  <span className="text-blue-600 group-open:rotate-180 transition-transform text-2xl">▼</span>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Schema FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map(faq => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          }),
        }}
      />

      {/* Schema LocalBusiness */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Pisos de Particulares en Barcelona Sin Comisión',
            description: 'Plataforma para encontrar pisos de alquiler y venta en Barcelona directamente de particulares, sin comisión de agencia',
            provider: {
              '@type': 'Organization',
              name: 'Inmonest',
              url: 'https://inmonest.com',
            },
            areaServed: {
              '@type': 'City',
              name: 'Barcelona',
              '@id': 'https://www.wikidata.org/wiki/Q1492',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Pisos en Barcelona',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Accommodation',
                    name: 'Pisos en alquiler Barcelona',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Accommodation',
                    name: 'Pisos en venta Barcelona',
                  },
                },
              ],
            },
          }),
        }}
      />
    </div>
  )
}
