import type { Metadata } from 'next'
import Link from 'next/link'
import TotalPurchaseCostCalculator from '@/components/TotalPurchaseCostCalculator'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Calculadora de Gastos de Compra de Vivienda 2026 — Calcula ITP, Notaría, Registro',
  description: 'Calculadora gratuita de gastos totales de compra: ITP/IVA por provincia, notaría, registro, gestoría y tasación. Descubre cuánto necesitas realmente para comprar tu piso.',
  alternates: { canonical: `${BASE_URL}/calculadora-gastos-compra` },
  openGraph: {
    title: 'Calculadora de Gastos de Compra de Vivienda 2026 — Inmonest',
    description: 'Calcula todos los gastos de compra: ITP, notaría, registro, gestoría. 100% gratis y sin registro.',
    url: `${BASE_URL}/calculadora-gastos-compra`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

const GASTOS = [
  {
    nombre: 'ITP o IVA',
    porcentaje: '6-10%',
    descripcion: 'Impuesto de Transmisiones Patrimoniales (vivienda usada) o IVA (obra nueva). Varía según comunidad autónoma.',
    ejemplo: 'Piso de 300.000€ en Madrid (ITP 6%): 18.000€',
  },
  {
    nombre: 'Notaría',
    porcentaje: '0,2-0,5%',
    descripcion: 'Gastos de escritura pública ante notario. Depende del precio de la vivienda.',
    ejemplo: 'Piso de 300.000€: 850-1.200€',
  },
  {
    nombre: 'Registro de la Propiedad',
    porcentaje: '0,1-0,3%',
    descripcion: 'Inscripción de la compraventa en el Registro. Suele ser el 75% del coste de notaría.',
    ejemplo: 'Piso de 300.000€: 600-900€',
  },
  {
    nombre: 'Gestoría',
    porcentaje: 'Fijo',
    descripcion: 'Gestión administrativa de la operación. Precio aproximado entre 400-600€.',
    ejemplo: 'Gestión completa: 500€',
  },
  {
    nombre: 'Tasación',
    porcentaje: 'Fijo',
    descripcion: 'Valoración oficial del inmueble requerida por el banco si pides hipoteca.',
    ejemplo: 'Piso de 300.000€: 300-450€',
  },
]

const FAQS = [
  {
    q: '¿Cuánto dinero necesito realmente para comprar un piso?',
    a: 'Además del precio de la vivienda, necesitas entre un 10-15% adicional para gastos (ITP, notaría, registro, gestoría, tasación). Por ejemplo, para un piso de 200.000€, necesitas entre 20.000-30.000€ extras.',
  },
  {
    q: '¿Qué diferencia hay entre ITP e IVA al comprar?',
    a: 'El ITP se paga en viviendas de segunda mano (6-10% según comunidad) y el IVA en obra nueva (10% fijo). El ITP varía: Madrid 6%, Cataluña y Valencia 10%, Andalucía 8%.',
  },
  {
    q: '¿Los gastos de compra se pueden incluir en la hipoteca?',
    a: 'No. Los bancos solo financian el precio de la vivienda (hasta el 80% del valor de tasación). Los gastos de compra debes pagarlos con tus ahorros.',
  },
  {
    q: '¿Quién paga los gastos de notaría, el comprador o el vendedor?',
    a: 'El comprador paga la notaría, el registro de la propiedad, la gestoría y la tasación. El vendedor paga la plusvalía municipal.',
  },
]

export default function CalculadoraGastosCompraPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              🧮 Calculadora gratuita
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
              ¿Cuánto cuesta <span className="text-blue-600">realmente</span><br />comprar una vivienda?
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Calcula todos los gastos ocultos: ITP, notaría, registro, gestoría y tasación.<br />
              <strong className="text-gray-900">Descubre el coste real antes de comprar.</strong>
            </p>
          </div>

          {/* Grid: Calculadora + Info */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Calculadora Sticky */}
            <div className="lg:sticky lg:top-24">
              <TotalPurchaseCostCalculator precioVivienda={250000} provincia="Madrid" />
              
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                <p className="text-sm text-blue-900 mb-3">
                  💡 <strong>¿Ya sabes cuánto necesitas?</strong> Encuentra pisos sin comisión de agencia y ahorra aún más.
                </p>
                <Link 
                  href="/pisos?operation=sale" 
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-center transition-colors"
                >
                  Ver pisos en venta sin comisión
                </Link>
              </div>
            </div>

            {/* Contenido SEO */}
            <div className="space-y-8">
              {/* Qué gastos hay */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Gastos de compra de vivienda en 2026</h2>
                <p className="text-gray-700 mb-6">
                  Cuando compras una vivienda en España, el precio del piso es solo el 85-90% del coste total. 
                  Los <strong>gastos de compra</strong> (impuestos, notaría, registro) suelen representar entre un <strong>10-15% adicional</strong>.
                </p>

                <div className="space-y-4">
                  {GASTOS.map((gasto, i) => (
                    <div key={i} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-blue-300 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{gasto.nombre}</h3>
                        <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                          {gasto.porcentaje}
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">📊 Ejemplo real: Piso de 250.000€ en Madrid</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Precio de la vivienda</span>
                    <span className="font-bold text-gray-900">250.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">ITP 6% (Madrid)</span>
                    <span className="font-bold text-gray-900">15.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Notaría</span>
                    <span className="font-bold text-gray-900">1.000€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Registro</span>
                    <span className="font-bold text-gray-900">750€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Gestoría</span>
                    <span className="font-bold text-gray-900">500€</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Tasación</span>
                    <span className="font-bold text-gray-900">350€</span>
                  </div>
                  <div className="border-t border-amber-300 pt-2 mt-2 flex justify-between text-base">
                    <span className="font-bold text-gray-900">Coste total real</span>
                    <span className="font-black text-amber-700">267.600€</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mt-3 italic">
                  💰 Necesitas 17.600€ adicionales al precio de venta (7% extra)
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
                        <span className="text-blue-600 group-open:rotate-180 transition-transform">▼</span>
                      </summary>
                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>

              {/* CTA Final */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
                <h3 className="text-2xl font-bold mb-3">¿Listo para comprar sin sorpresas?</h3>
                <p className="text-blue-100 mb-5">
                  Encuentra pisos vendidos por particulares sin comisión de agencia.<br />
                  Ahorra hasta 6.000€ en intermediarios.
                </p>
                <Link 
                  href="/pisos?operation=sale" 
                  className="inline-block bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3.5 rounded-full transition-colors"
                >
                  Explorar pisos en venta →
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
