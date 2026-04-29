import type { Metadata } from 'next'
import Link from 'next/link'
import TotalRentalCostCalculator from '@/components/TotalRentalCostCalculator'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Calculadora de Gastos de Alquiler 2026 — Calcula el Coste Mensual Real',
  description: 'Calculadora gratuita de gastos totales de alquiler: renta + luz + agua + gas + internet + comunidad + seguro. Descubre cuánto pagarás realmente cada mes.',
  alternates: { canonical: `${BASE_URL}/calculadora-gastos-alquiler` },
  openGraph: {
    title: 'Calculadora de Gastos de Alquiler Mensual — Inmonest',
    description: 'Calcula todos los gastos mensuales de alquiler: renta, suministros, internet, comunidad. 100% gratis.',
    url: `${BASE_URL}/calculadora-gastos-alquiler`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

const GASTOS = [
  {
    nombre: 'Renta mensual',
    promedio: '700-1.500€',
    descripcion: 'El alquiler base que pagas al propietario. Varía según ciudad, barrio y tamaño.',
    ejemplo: 'Piso 2 hab en Barcelona: 1.200€/mes',
  },
  {
    nombre: 'Luz',
    promedio: '50-100€',
    descripcion: 'Factura de electricidad. Depende del consumo, tarifa contratada y número de personas.',
    ejemplo: 'Pareja en piso 60m²: 70€/mes',
  },
  {
    nombre: 'Agua',
    promedio: '20-40€',
    descripcion: 'Suministro de agua potable. Varía según consumo y municipio.',
    ejemplo: '2 personas: 30€/mes',
  },
  {
    nombre: 'Gas',
    promedio: '30-80€',
    descripcion: 'Gas natural o butano para calefacción, agua caliente y cocina. Mayor en invierno.',
    ejemplo: 'Calefacción + cocina: 50€/mes (media anual)',
  },
  {
    nombre: 'Internet + Teléfono',
    promedio: '30-50€',
    descripcion: 'Fibra óptica + línea móvil. Precio competitivo en España.',
    ejemplo: 'Fibra 600Mb + móvil: 40€/mes',
  },
  {
    nombre: 'Comunidad de propietarios',
    promedio: '40-120€',
    descripcion: 'Gastos comunes del edificio: limpieza, ascensor, conserje. A veces lo paga el propietario.',
    ejemplo: 'Edificio con ascensor: 60€/mes',
  },
  {
    nombre: 'Seguro de hogar',
    promedio: '10-25€',
    descripcion: 'Seguro de contenido obligatorio en la mayoría de contratos de alquiler.',
    ejemplo: 'Piso 60m²: 15€/mes',
  },
]

const FAQS = [
  {
    q: '¿Cuánto cuesta realmente alquilar un piso al mes?',
    a: 'Además de la renta, suma entre 200-400€ mensuales en suministros (luz, agua, gas, internet) y gastos comunes (comunidad, seguro). Por ejemplo, un piso de 1.000€/mes puede costarte 1.300€/mes en total.',
  },
  {
    q: '¿Qué gastos paga el inquilino y cuáles el propietario?',
    a: 'El inquilino paga: renta, suministros (luz, agua, gas, internet), seguro de hogar y comunidad (si está en contrato). El propietario paga: IBI, derramas extraordinarias, reparaciones estructurales.',
  },
  {
    q: '¿Se puede alquilar sin pagar comisión de agencia?',
    a: 'Sí. Desde la Ley de Vivienda 2023, el inquilino NO paga comisión de agencia. Solo la paga el propietario. Si alquilas directamente de particular, no hay comisión para nadie.',
  },
  {
    q: '¿Cuánto dinero necesito para entrar en un alquiler?',
    a: 'Normalmente 3 mensualidades: 1 mes de fianza + 2 meses de depósito. Por ejemplo, para un piso de 1.000€/mes necesitas 3.000€ al entrar (sin contar gastos de mudanza).',
  },
]

export default function CalculadoraGastosAlquilerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              🧮 Calculadora gratuita
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              ¿Cuánto cuesta <span className="text-emerald-600">realmente</span><br />alquilar un piso?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calcula todos los gastos mensuales: renta + luz + agua + gas + internet + comunidad.<br />
              <strong className="text-gray-900">Descubre el coste real antes de alquilar.</strong>
            </p>
          </div>

          {/* Grid: Calculadora + Info */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calculadora Sticky */}
            <div className="lg:sticky lg:top-24">
              <TotalRentalCostCalculator rentaMensual={1000} />
              
              <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5">
                <p className="text-sm text-emerald-900 mb-3">
                  💡 <strong>¿Ya sabes tu presupuesto?</strong> Encuentra pisos de particulares sin comisión de agencia.
                </p>
                <Link 
                  href="/pisos?operation=rent" 
                  className="block w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg text-center transition-colors"
                >
                  Ver pisos en alquiler sin comisión
                </Link>
              </div>
            </div>

            {/* Contenido SEO */}
            <div className="space-y-8">
              {/* Qué gastos hay */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gastos mensuales de alquiler en 2026</h2>
                <p className="text-gray-700 mb-6">
                  Cuando alquilas una vivienda en España, la renta es solo el 70-80% del coste total mensual. 
                  Los <strong>suministros y gastos comunes</strong> (luz, agua, gas, internet, comunidad) añaden entre <strong>200-400€ adicionales</strong>.
                </p>

                <div className="space-y-4">
                  {GASTOS.map((gasto, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-emerald-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{gasto.nombre}</h3>
                        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
                          {gasto.promedio}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{gasto.descripcion}</p>
                      <p className="text-xs text-gray-500 italic">Ejemplo: {gasto.ejemplo}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ejemplo práctico */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Ejemplo real: Piso de 1.000€/mes en Madrid</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Renta mensual</span>
                    <span className="font-bold text-gray-900">1.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Luz</span>
                    <span className="font-bold text-gray-900">70€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Agua</span>
                    <span className="font-bold text-gray-900">30€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Gas</span>
                    <span className="font-bold text-gray-900">50€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Internet + móvil</span>
                    <span className="font-bold text-gray-900">40€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Comunidad</span>
                    <span className="font-bold text-gray-900">60€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Seguro</span>
                    <span className="font-bold text-gray-900">15€</span>
                  </div>
                  <div className="border-t border-amber-300 pt-2 mt-2 flex justify-between text-base">
                    <span className="font-bold text-gray-900">Coste total mensual</span>
                    <span className="font-black text-amber-700">1.265€</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 italic">
                  💰 Pagas 265€ adicionales al mes en suministros y gastos comunes (+26%)
                </p>
              </div>

              {/* FAQs */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Preguntas frecuentes</h2>
                <div className="space-y-4">
                  {FAQS.map((faq, i) => (
                    <details key={i} className="bg-white border border-gray-200 rounded-lg p-5 group">
                      <summary className="font-bold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                        {faq.q}
                        <span className="text-emerald-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* CTA Final */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-3">¿Listo para alquilar sin sorpresas?</h3>
                <p className="text-emerald-100 mb-5">
                  Encuentra pisos de particulares sin comisión de agencia.<br />
                  Contacta directamente con el propietario y ahorra tiempo.
                </p>
                <Link 
                  href="/pisos?operation=rent" 
                  className="inline-block bg-white text-emerald-600 hover:bg-emerald-50 font-bold px-8 py-3.5 rounded-full transition-colors"
                >
                  Explorar pisos en alquiler →
                </Link>
              </div>
            </div>
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
    </div>
  )
}
