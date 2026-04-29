import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SearchForm from '@/components/SearchForm'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Pisos de Particulares en Madrid Sin Comisión 2026 — Ahorra hasta 6.000€',
  description: 'Encuentra pisos de particulares en Madrid sin comisión de agencia. Alquiler y venta directo del propietario. Ahorra hasta 6.000€ en intermediarios. 100% verificados.',
  alternates: { canonical: `${BASE_URL}/madrid/pisos-particulares-sin-comision` },
  openGraph: {
    title: 'Pisos de Particulares en Madrid Sin Comisión — Inmonest',
    description: 'Contacta directamente con propietarios. Sin intermediarios, sin comisiones. Ahorra miles de euros.',
    url: `${BASE_URL}/madrid/pisos-particulares-sin-comision`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

const VENTAJAS = [
  { icon: '💰', titulo: 'Ahorra hasta 6.000€', desc: 'Sin comisión de agencia. En un piso de 1.500€/mes ahorras 2 mensualidades (3.000€). En una compra de 300.000€ ahorras el 2% (6.000€).' },
  { icon: '🤝', titulo: 'Trato directo con el propietario', desc: 'Hablas directamente con quien toma las decisiones. Negociación más rápida, sin intermediarios.' },
  { icon: '✅', titulo: 'Pisos verificados con IA', desc: 'Cada anuncio tiene descripción generada por IA que valida fotos y características. Solo publicamos pisos reales.' },
  { icon: '⚡', titulo: 'Respuesta en 24 horas', desc: 'Los particulares responden más rápido que las agencias. Contacta por WhatsApp y consigue visita en 1-2 días.' },
]

const BARRIOS = [
  { nombre: 'Salamanca', precio: '1.800€/mes', desc: 'Barrio elegante con comercios de lujo. Serrano, Velázquez y Goya.', link: '/pisos?city=madrid&district=salamanca' },
  { nombre: 'Chamberí', precio: '1.500€/mes', desc: 'Residencial y céntrico. Perfecto para profesionales. Trafalgar, Alonso Martínez.', link: '/pisos?city=madrid&district=chamberi' },
  { nombre: 'Malasaña', precio: '1.400€/mes', desc: 'Bohemio y alternativo. Lleno de bares, tiendas vintage y ambiente joven.', link: '/pisos?city=madrid&district=malasana' },
  { nombre: 'Retiro', precio: '1.600€/mes', desc: 'Junto al parque. Tranquilo, verde y bien comunicado. Ideal para familias.', link: '/pisos?city=madrid&district=retiro' },
]

const TESTIMONIOS = [
  { nombre: 'Miguel Á.', barrio: 'Chamberí', texto: 'Encontré piso en 5 días. Sin agencia, sin comisiones. El propietario era súper profesional.', ahorro: '3.000€' },
  { nombre: 'Patricia L.', barrio: 'Salamanca', texto: 'Compré mi piso sin pagar comisión. Todo fue transparente y rápido. ¡Recomendadísimo!', ahorro: '6.000€' },
  { nombre: 'Javier M.', barrio: 'Malasaña', texto: 'La plataforma es muy fácil de usar. Contacté con 3 propietarios en un día.', ahorro: '2.400€' },
]

const FAQS = [
  { q: '¿Por qué alquilar directamente al propietario en Madrid?', a: 'Ahorras la comisión de agencia (1-2 meses de alquiler o 2-5% del precio de venta). En Madrid, donde los alquileres son altos, puedes ahorrar entre 2.000-4.000€.' },
  { q: '¿Cómo verificáis que los pisos son reales?', a: 'Usamos IA para validar fotos, descripción y datos catastrales. Además, pedimos documentación del propietario antes de publicar.' },
  { q: '¿Cuánto tarda el proceso?', a: 'En alquiler: 7-10 días. En compra: 30-45 días. Más rápido que con agencia tradicional.' },
  { q: '¿Hay pisos en todas las zonas de Madrid?', a: 'Sí, tenemos pisos en Salamanca, Chamberí, Malasaña, Retiro, Arganzuela, Centro y más.' },
]

export default function PisosMadridPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/ciudades/madrid1.jpg" alt="Madrid" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/85 to-orange-900/90" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center text-white mb-12">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🏠 Madrid • Particulares • Sin Comisión
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Pisos de particulares<br />
              <span className="text-yellow-300">sin comisión</span> en Madrid
            </h1>
            <p className="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto">
              Contacta directamente con el propietario.<br />
              <strong className="text-white">Ahorra hasta 6.000€</strong> en comisiones de agencia.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-300">253</div>
                <div className="text-sm text-red-200">Pisos disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-300">0€</div>
                <div className="text-sm text-red-200">Comisión agencia</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-300">24h</div>
                <div className="text-sm text-red-200">Respuesta media</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/pisos?city=madrid&operation=rent" className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full text-lg transition-all shadow-xl hover:scale-105">
                Ver pisos en alquiler →
              </Link>
              <Link href="/pisos?city=madrid&operation=sale" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-bold px-8 py-4 rounded-full text-lg transition-all">
                Ver pisos en venta →
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Ventajas */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            ¿Por qué buscar pisos de particulares?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAJAS.map((v, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-red-300 transition-all">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.titulo}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barrios */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">
            Barrios más populares de Madrid
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BARRIOS.map((b, i) => (
              <Link key={i} href={b.link} className="group">
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center text-white text-6xl font-black opacity-90">
                    {b.nombre.charAt(0)}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-red-600">{b.nombre}</h3>
                      <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full">{b.precio}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{b.desc}</p>
                    <span className="text-red-600 font-semibold text-sm group-hover:underline">Ver pisos →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">{t.nombre.charAt(0)}</div>
                  <div>
                    <div className="font-bold">{t.nombre}</div>
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

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-red-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">¿Quieres recibir pisos nuevos antes que nadie?</h2>
          <p className="text-xl text-red-100 mb-8">Crea una alerta personalizada y te avisamos cuando haya pisos que te interesen.</p>
          <Link href="/publicar-anuncio" className="inline-block bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-xl">
            Crear alerta gratis →
          </Link>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6 group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between">
                  {faq.q}
                  <span className="text-red-600 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-gray-700 mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }) }} />
    </div>
  )
}
