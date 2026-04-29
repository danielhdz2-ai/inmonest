import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import SearchForm from '@/components/SearchForm'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Pisos de Particulares en Sevilla Sin Comisión 2026 — Ahorra hasta 4.500€',
  description: 'Encuentra pisos de particulares en Sevilla sin comisión de agencia. Alquiler y venta directo del propietario. Ahorra hasta 4.500€ en intermediarios. 100% verificados.',
  alternates: { canonical: `${BASE_URL}/sevilla/pisos-particulares-sin-comision` },
  openGraph: {
    title: 'Pisos de Particulares en Sevilla Sin Comisión — Inmonest',
    description: 'Contacta directamente con propietarios. Sin intermediarios, sin comisiones.',
    url: `${BASE_URL}/sevilla/pisos-particulares-sin-comision`,
    type: 'website',
  },
}

const VENTAJAS = [
  { icon: '💰', titulo: 'Ahorra hasta 4.500€', desc: 'Sin comisión de agencia. En Sevilla ahorras 1-2 meses de alquiler o el 2-3% en compra.' },
  { icon: '🤝', titulo: 'Trato directo', desc: 'Hablas directamente con el propietario. Negociación rápida y transparente.' },
  { icon: '✅', titulo: 'Verificados con IA', desc: 'Cada anuncio validado por IA. Solo pisos reales con documentación.' },
  { icon: '⚡', titulo: 'Respuesta en 24h', desc: 'Los particulares responden más rápido. Visita en 1-2 días.' },
]

const BARRIOS = [
  { nombre: 'Centro', precio: '800€/mes', desc: 'Catedral, Giralda, calles con encanto. El corazón de Sevilla.', link: '/pisos?city=sevilla&district=centro' },
  { nombre: 'Triana', precio: '850€/mes', desc: 'Barrio con alma, cerámica, mercado y tapas. Muy auténtico.', link: '/pisos?city=sevilla&district=triana' },
  { nombre: 'Nervión', precio: '750€/mes', desc: 'Residencial, comercios, bien comunicado. Ideal para familias.', link: '/pisos?city=sevilla&district=nervion' },
  { nombre: 'Macarena', precio: '700€/mes', desc: 'Tradicional, Basílica, murallas. Ambiente local y tranquilo.', link: '/pisos?city=sevilla&district=macarena' },
]

const TESTIMONIOS = [
  { nombre: 'Antonio R.', barrio: 'Triana', texto: 'Encontré piso en Triana en 1 semana. Sin agencia, sin comisiones. ¡Perfecto!', ahorro: '1.700€' },
  { nombre: 'Carmen S.', barrio: 'Centro', texto: 'Compré mi piso sin pagar comisión. Todo super claro y rápido.', ahorro: '4.500€' },
]

const FAQS = [
  { q: '¿Por qué alquilar sin agencia en Sevilla?', a: 'Ahorras 1-2 meses de comisión (800-1.600€ de media). Además, tratas directamente con quien decide.' },
  { q: '¿Cómo verificáis los pisos?', a: 'Usamos IA para validar fotos, descripción y datos catastrales. Solo publicamos pisos reales.' },
  { q: '¿Cuánto tarda el proceso?', a: 'Alquiler: 7-10 días. Compra: 30-45 días. Más rápido que con agencia tradicional.' },
]

export default function PisosSevillaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/ciudades/sevilla1.jpg" alt="Sevilla" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-orange-800/85 to-red-900/90" />
        </div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center text-white mb-12">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              🌞 Sevilla • Particulares • Sin Comisión
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Pisos de particulares<br />
              <span className="text-yellow-300">sin comisión</span> en Sevilla
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Contacta directamente con el propietario.<br />
              <strong className="text-white">Ahorra hasta 4.500€</strong> en comisiones.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-300">253</div>
                <div className="text-sm text-amber-200">Pisos disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-300">0€</div>
                <div className="text-sm text-amber-200">Comisión</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-yellow-300">24h</div>
                <div className="text-sm text-amber-200">Respuesta</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pisos?city=sevilla&operation=rent" className="bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:scale-105 transition-all">
                Ver pisos en alquiler →
              </Link>
              <Link href="/pisos?city=sevilla&operation=sale" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-bold px-8 py-4 rounded-full text-lg transition-all">
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
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">¿Por qué buscar pisos de particulares?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAJAS.map((v, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-amber-300 transition-all">
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
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Barrios más populares de Sevilla</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BARRIOS.map((b, i) => (
              <Link key={i} href={b.link} className="group">
                <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-6xl font-black opacity-90">
                    {b.nombre.charAt(0)}
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600">{b.nombre}</h3>
                      <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2.5 py-1 rounded-full">{b.precio}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{b.desc}</p>
                    <span className="text-amber-600 font-semibold text-sm group-hover:underline">Ver pisos →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 px-4 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">{t.nombre.charAt(0)}</div>
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
      <section className="py-20 px-4 bg-gradient-to-r from-amber-600 to-orange-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">¿Quieres recibir pisos nuevos antes que nadie?</h2>
          <p className="text-xl text-amber-100 mb-8">Crea una alerta personalizada gratis.</p>
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
                  <span className="text-amber-600 group-open:rotate-180 transition-transform">▼</span>
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
