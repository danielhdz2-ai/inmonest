import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CalculadoraAhorroComisiones from '@/components/CalculadoraAhorroComisiones'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Calculadora Ahorro Comisiones | Cuánto Ahorras Vendiendo Sin Agencia',
  description: 'Calcula cuánto dinero ahorras vendiendo tu piso sin agencia inmobiliaria. Descubre tu ahorro real vs. comisión tradicional 4-5%. Informe gratuito por email.',
  alternates: { canonical: `${BASE_URL}/calculadora-ahorro-comisiones` },
  openGraph: {
    title: 'Calculadora: Ahorra miles vendiendo sin agencia',
    description: 'Calcula tu ahorro real vendiendo sin comisiones. Informe detallado gratis.',
    url: `${BASE_URL}/calculadora-ahorro-comisiones`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
  },
}

export default function CalculadoraAhorroPage() {
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Calculadora de Ahorro de Comisiones Inmobiliarias',
    description: 'Herramienta gratuita para calcular cuánto ahorras vendiendo tu piso sin agencia inmobiliaria',
    url: `${BASE_URL}/calculadora-ahorro-comisiones`,
    applicationCategory: 'FinanceApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR'
    }
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto cobra una agencia inmobiliaria por vender un piso?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Las agencias inmobiliarias tradicionales cobran entre 3% y 5% del precio de venta como comisión. Para un piso de 250,000€, esto significa entre 7,500€ y 12,500€ en comisiones. Con Inmonest solo pagas 666€ por el servicio completo de acompañamiento legal.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Cuánto ahorro vendiendo sin agencia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En un piso de 250,000€, la comisión típica de agencia (4%) sería 10,000€. Con el servicio de Inmonest (666€), ahorras 9,334€. En un piso de 400,000€, el ahorro supera los 15,000€.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué incluye el servicio de Inmonest por 666€?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El servicio de venta completa (666€) incluye: gestor personalizado asignado, redacción de contrato de reserva y arras, ayuda para recabar toda la documentación, asesoramiento legal continuo, coordinación con notaría y acompañamiento hasta la firma de escrituras.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Es seguro vender sin agencia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, es completamente seguro si cuentas con el asesoramiento legal adecuado. Con Inmonest tienes un gestor experto que redacta contratos, revisa documentación y te acompaña hasta la escritura, garantizando la misma seguridad jurídica que con una agencia pero ahorrando miles de euros.'
        }
      }
    ]
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaJson }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />

        {/* Hero */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <span>💰</span>
              Herramienta gratuita
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              ¿Cuánto ahorras vendiendo<br />sin agencia inmobiliaria?
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Descubre en segundos cuánto dinero te quedas en tu bolsillo 
              vendiendo directamente con apoyo legal profesional
            </p>
          </div>
        </section>

        {/* Calculadora */}
        <section className="pb-16 px-4">
          <div className="max-w-2xl mx-auto">
            <CalculadoraAhorroComisiones />
          </div>
        </section>

        {/* Ejemplo real */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Ejemplos reales de ahorro
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { precio: 150000, ahorro: 5334 },
                { precio: 250000, ahorro: 9334 },
                { precio: 400000, ahorro: 15334 }
              ].map(ejemplo => {
                const comision = ejemplo.precio * 0.04
                return (
                  <div key={ejemplo.precio} className="bg-gradient-to-br from-[#fef9e8] to-white rounded-xl p-6 border-2 border-[#c9962a]/20">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-gray-900 mb-1">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(ejemplo.precio)}
                      </div>
                      <div className="text-sm text-gray-500">Precio de venta</div>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Agencia (4%):</span>
                        <span className="font-semibold text-red-600">
                          -{new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(comision)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Inmonest:</span>
                        <span className="font-semibold text-green-600">-666€</span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-gray-200 text-center">
                      <div className="text-sm text-gray-600 mb-1">Tu ahorro</div>
                      <div className="text-3xl font-black text-[#c9962a]">
                        {new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(ejemplo.ahorro)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comparativa */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Venta con agencia vs. Venta con Inmonest
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Concepto</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">Agencia tradicional</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-[#c9962a]">Inmonest</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Comisión / Coste</td>
                    <td className="px-6 py-4 text-center text-red-600 font-bold">3-5% (6,000€ - 10,000€)</td>
                    <td className="px-6 py-4 text-center text-[#c9962a] font-bold">666€ fijo</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Contratos legales</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Incluido</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Incluido</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Gestor personalizado</td>
                    <td className="px-6 py-4 text-center text-gray-400">~ Comercial</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Jurídico</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Acompañamiento hasta escritura</td>
                    <td className="px-6 py-4 text-center text-gray-400">⚠️ Limitado</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Completo</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Publicación anuncio</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Incluido</td>
                    <td className="px-6 py-4 text-center text-green-600">✓ Gratis</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '¿Cuánto cobra una agencia inmobiliaria por vender un piso?',
                  a: 'Las agencias inmobiliarias tradicionales cobran entre 3% y 5% del precio de venta como comisión. Para un piso de 250,000€, esto significa entre 7,500€ y 12,500€ en comisiones. Con Inmonest solo pagas 666€ por el servicio completo de acompañamiento legal.'
                },
                {
                  q: '¿Cuánto ahorro vendiendo sin agencia?',
                  a: 'En un piso de 250,000€, la comisión típica de agencia (4%) sería 10,000€. Con el servicio de Inmonest (666€), ahorras 9,334€. En un piso de 400,000€, el ahorro supera los 15,000€.'
                },
                {
                  q: '¿Qué incluye el servicio de Inmonest por 666€?',
                  a: 'El servicio de venta completa (666€) incluye: gestor personalizado asignado, redacción de contrato de reserva y arras, ayuda para recabar toda la documentación, asesoramiento legal continuo, coordinación con notaría y acompañamiento hasta la firma de escrituras.'
                },
                {
                  q: '¿Es seguro vender sin agencia?',
                  a: 'Sí, es completamente seguro si cuentas con el asesoramiento legal adecuado. Con Inmonest tienes un gestor experto que redacta contratos, revisa documentación y te acompaña hasta la escritura, garantizando la misma seguridad jurídica que con una agencia pero ahorrando miles de euros.'
                }
              ].map(({ q, a }) => (
                <details key={q} className="bg-gray-50 rounded-xl border border-gray-100 group hover:border-[#c9962a]/40 transition-all">
                  <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                    {q}
                    <svg className="w-4 h-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para vender sin pagar comisiones?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Publica tu anuncio gratis o contrata acompañamiento legal completo por solo 666€
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/publicar-anuncio"
                className="bg-white text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
              >
                Publicar anuncio gratis
              </Link>
              <Link
                href="/gestoria/venta-completa-reserva-escritura"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-[#a87a20] transition"
              >
                Ver servicio de venta (666€)
              </Link>
            </div>
          </div>
        </section>

        <WhatsAppButton />
      </main>
    </>
  )
}
