import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
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
    description: 'Contacta directamente con propietarios. Sin intermediarios, sin comisiones.',
    url: `${BASE_URL}/barcelona/pisos-particulares-sin-comision`,
    type: 'website',
  },
}

const VENTAJAS = [
  { icon: '💰', titulo: 'Ahorra hasta 6.000€', desc: 'Sin comisión de agencia. En un piso de 1.200€/mes ahorras 2 mensualidades (2.400€). En compra ahorras el 2% (6.000€).' },
  { icon: '🤝', titulo: 'Trato directo', desc: 'Hablas directamente con quien toma las decisiones. Negociación más rápida.' },
  { icon: '✅', titulo: 'Verificados con IA', desc: 'Cada anuncio validado por IA con fotos y documentación real.' },
  { icon: '⚡', titulo: 'Respuesta en 24h', desc: 'Los particulares responden más rápido. Visita en 1-2 días.' },
]

const BARRIOS = [
  { nombre: 'Eixample', precio: '1.400€/mes', desc: 'El barrio modernista. Edificios de Gaudí, excelente transporte.', link: '/pisos?city=barcelona&district=eixample', imagen: '/ciudades/barcelona2.jpg' },
  { nombre: 'Gràcia', precio: '1.250€/mes', desc: 'Bohemio, plazas con terrazas. Popular entre jóvenes profesionales.', link: '/pisos?city=barcelona&district=gracia', imagen: '/interior1.jpg' },
  { nombre: 'Sants', precio: '1.100€/mes', desc: 'Residencial y bien conectado. Perfecto para familias.', link: '/pisos?city=barcelona&district=sants', imagen: '/interior2.jpg' },
  { nombre: 'Poblenou', precio: '1.350€/mes', desc: 'Barrio tecnológico. Startups, coworkings y playa.', link: '/pisos?city=barcelona&district=poblenou', imagen: '/ciudades/barcelona3.jpg' },
]

const TESTIMONIOS = [
  { nombre: 'Laura M.', barrio: 'Gràcia', texto: 'Encontré mi piso en 1 semana. Sin agencia, sin comisiones. ¡Increíble!', ahorro: '2.400€' },
  { nombre: 'Carlos R.', barrio: 'Sants', texto: 'Compré sin pagar comisión. Todo fue muy rápido y transparente.', ahorro: '6.000€' },
]

const FAQS = [
  { q: '¿Por qué alquilar directamente al propietario?', a: 'Ahorras 1-2 meses de comisión (1.200-2.400€) y el proceso es más rápido.' },
  { q: '¿Cómo verificáis los pisos?', a: 'IA valida fotos, descripción y datos catastrales. Solo pisos reales.' },
  { q: '¿Cuánto tarda?', a: 'Alquiler: 7-10 días. Compra: 30-45 días. Más rápido que con agencia.' },
]

export default function PisosBarcelonaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/imagencabezera.jpg" alt="Barcelona" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0d00]/85 via-[#2e1900]/65 to-[#1a0d00]/35" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center text-white mb-12">
            <div className="inline-block bg-[#c9962a]/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-[#c9962a]/40 mb-6 text-[#f4c94a]">
              🏠 Barcelona • Particulares • Sin Comisión
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Pisos de particulares<br />
              <span className="text-[#f4c94a]">sin comisión</span> en Barcelona
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
              Contacta directamente con el propietario.<br />
              <strong className="text-white">Ahorra hasta 6.000€</strong> en comisiones de agencia.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="text-center">
                <div className="text-4xl font-black text-[#f4c94a]">253</div>
                <div className="text-sm text-white/70">Pisos disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#f4c94a]">0€</div>
                <div className="text-sm text-white/70">Comisión</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-[#f4c94a]">24h</div>
                <div className="text-sm text-white/70">Respuesta</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/pisos?city=barcelona&operation=rent" className="bg-[#f4c94a] hover:bg-[#e8b52a] text-gray-900 font-bold px-8 py-4 rounded-full text-lg shadow-xl hover:scale-105 transition-all">
                Ver pisos en alquiler →
              </Link>
              <Link href="/pisos?city=barcelona&operation=sale" className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white font-bold px-8 py-4 rounded-full text-lg transition-all">
                Ver pisos en venta →
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6">
            <Suspense fallback={<div className="h-32 animate-pulse bg-gray-100 rounded-lg" />}>
              <SearchForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">¿Por qué buscar pisos de particulares?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAJAS.map((v, i) => (
              <div key={i} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#c9962a] hover:shadow-lg transition-all">
                <div className="text-4xl mb-4">{v.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{v.titulo}</h3>
                <p className="text-gray-600">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Barrios más populares de Barcelona</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BARRIOS.map((b, i) => (
              <Link key={i} href={b.link} className="group">
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={b.imagen} alt={b.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-[#c9962a] text-white text-xs font-bold px-2.5 py-1 rounded-full">{b.precio}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#c9962a] mb-2 transition-colors">{b.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-3">{b.desc}</p>
                    <span className="text-[#c9962a] font-semibold text-sm group-hover:underline">Ver pisos →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-[#fef9e8] to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-12 text-center">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TESTIMONIOS.map((t, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#c9962a]/50 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#c9962a] to-[#a87a20] rounded-full flex items-center justify-center text-white font-bold">{t.nombre.charAt(0)}</div>
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

      <section className="py-20 px-4 bg-gradient-to-r from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6">¿Quieres recibir pisos nuevos antes que nadie?</h2>
          <p className="text-xl text-[#f4c94a]/90 mb-8">Crea una alerta personalizada gratis.</p>
          <Link href="/publicar-anuncio" className="inline-block bg-white hover:bg-gray-50 text-[#c9962a] font-bold px-8 py-4 rounded-full text-lg shadow-xl">
            Crear alerta gratis →
          </Link>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {FAQS.map((faq, i) => (
              <details key={i} className="bg-gray-50 border border-gray-200 rounded-xl p-6 group hover:border-[#c9962a]/50 transition-all">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between">
                  {faq.q}
                  <span className="text-[#c9962a] group-open:rotate-180 transition-transform">▼</span>
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
