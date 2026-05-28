import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import TestimoniosCarousel from '@/components/TestimoniosCarousel'

const BASE_URL = 'https://inmonest.com'
const PHONE = '641008847'
const PHONE_DISPLAY = '641 008 847'

export const metadata: Metadata = {
  title: 'Vender Piso Sin Agencia | Gestor Personal 666€ - Ahorra +15,000€',
  description: 'Vende tu piso sin pagar comisiones de agencia. Gestor inmobiliario te acompaña desde reserva hasta escritura por 666€. Ahorra más de 15,000€ en comisiones. ✓ Contratos incluidos ✓ Asesoramiento legal',
  alternates: { canonical: `${BASE_URL}/vender-piso-sin-agencia` },
  keywords: 'vender piso sin agencia, vender casa particular, ahorro comisiones inmobiliaria, gestor venta vivienda, venta entre particulares',
  openGraph: {
    title: 'Vende tu Piso Sin Agencia | Ahorra +15,000€ en Comisiones',
    description: 'Gestor inmobiliario personal por 666€. Te acompañamos en toda la venta: contratos, documentación, notaría. Sin comisiones abusivas.',
    url: `${BASE_URL}/vender-piso-sin-agencia`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria/gestoria1.jpg`, width: 1200, height: 630 }],
  },
}

export default function VenderPisoSinAgenciaPage() {
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio de Acompañamiento de Venta Sin Agencia',
    description: 'Servicio completo de gestoría para vender tu piso sin agencia inmobiliaria. Gestor personal asignado, contratos incluidos, acompañamiento hasta escritura.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
      telephone: `+34${PHONE}`,
    },
    offers: {
      '@type': 'Offer',
      price: '666',
      priceCurrency: 'EUR',
      description: 'Servicio completo de venta: gestor personalizado, contratos de reserva y arras, documentación, coordinación notaría',
    },
    areaServed: {
      '@type': 'Country',
      name: 'España'
    }
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto ahorro vendiendo sin agencia inmobiliaria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En un piso de 300,000€, las agencias cobran entre 15,000€ y 18,150€ (5% + IVA). Con Inmonest pagas solo 666€ por el servicio completo. Ahorro real: más de 17,000€.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Qué incluye el servicio de 666€?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Incluye: gestor personal asignado durante todo el proceso, redacción de contrato de reserva y arras, ayuda para recabar documentación (nota simple, IBI, certificado energético), asesoramiento legal continuo, coordinación con notaría y acompañamiento hasta la firma de escrituras.'
        }
      },
      {
        '@type': 'Question',
        name: '¿Es seguro vender sin agencia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, completamente seguro con el asesoramiento adecuado. Nuestro gestor te protege igual que una agencia: contratos legales, revisión de documentación, coordinación con notaría. La diferencia es que tú no pagas comisiones abusivas.'
        }
      }
    ]
  })

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Schema markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

        {/* HERO */}
        <section className="relative bg-gradient-to-br from-[#1a0d00] via-[#2d1a00] to-[#1a0d00] pt-24 pb-20 px-4 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, #c9a84c 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left column - Text */}
              <div>
                <div className="inline-flex items-center gap-2 bg-[#c9a84c]/20 border border-[#c9a84c]/40 text-[#f4c94a] px-4 py-2 rounded-full text-sm font-semibold mb-6">
                  <span>💰</span>
                  Ahorra más de 15,000€ en comisiones
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                  Vende tu piso<br />
                  <span className="text-[#c9a84c]">sin pagar comisiones</span><br />
                  a la agencia
                </h1>

                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  <strong className="text-white">Gestor inmobiliario personal</strong> te acompaña desde la reserva 
                  hasta la escritura. Contratos incluidos, asesoramiento legal continuo.
                </p>

                {/* Key benefits */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: '✓', text: 'Gestor personal asignado' },
                    { icon: '✓', text: 'Contratos legales incluidos' },
                    { icon: '✓', text: 'Documentación completa' },
                    { icon: '✓', text: 'Hasta firma escritura' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-white">
                      <span className="w-6 h-6 bg-[#c9a84c] rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/gestoria/solicitar/venta-completa-reserva-escritura"
                    className="inline-flex items-center justify-center gap-2 bg-[#c9a84c] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-[#a87a20] transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
                  >
                    Contratar ahora (666€)
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href={`tel:+34${PHONE}`}
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white hover:text-[#1a0d00] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Llamar ahora
                  </a>
                </div>
              </div>

              {/* Right column - Visual card */}
              <div className="relative">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 border-4 border-[#c9a84c]/30">
                  <div className="absolute -top-4 -right-4 bg-[#c9a84c] text-white px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    Todo incluido
                  </div>
                  
                  <div className="mb-6">
                    <Image
                      src="/gestoria/gestoria1.jpg"
                      alt="Servicio de venta sin agencia"
                      width={400}
                      height={250}
                      className="rounded-2xl w-full object-cover"
                    />
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <p className="text-sm text-red-800 font-semibold">
                      <span className="text-2xl">🚫</span> Agencia tradicional: <span className="line-through">15,000€ - 18,000€</span> en comisiones
                    </p>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Servicio Completo de Venta
                  </h3>
                  
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Acompañamiento completo para propietarios que venden su piso a particulares. 
                    Gestor personalizado te ayuda desde la reserva hasta la escritura.
                  </p>

                  <ul className="space-y-3 mb-6">
                    {[
                      'Gestor personalizado asignado a tu venta',
                      'Estudio completo de la operación',
                      'Redacción de contratos: reserva y arras',
                      'Ayuda para recabar toda la documentación',
                      'Asesoramiento continuo hasta escritura',
                      'Coordinación con notaría'
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                        <svg className="w-5 h-5 text-[#c9a84c] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gradient-to-r from-[#c9a84c] to-[#a87a20] rounded-2xl p-6 text-center">
                    <div className="text-white/80 text-sm font-semibold mb-1">Precio total</div>
                    <div className="text-5xl font-black text-white mb-1">666 €</div>
                    <div className="text-white/90 text-sm">IVA incluido · Pago único</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN COMPARATIVA DE IMPACTO FINANCIERO */}
        <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                <span>⚠️</span>
                Comparativa real de costes
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                ¿Cuánto pagarías con una agencia<br />
                vs. con <span className="text-[#c9a84c]">Inmonest</span>?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Ejemplo real: Venta de un piso de <strong>300,000€</strong> en tu ciudad
              </p>
            </div>

            {/* Tabla comparativa */}
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-800 to-gray-900">
                      <th className="px-6 py-5 text-left text-white font-bold text-lg">Concepto</th>
                      <th className="px-6 py-5 text-center text-white font-bold text-lg">Inmobiliaria Tradicional</th>
                      <th className="px-6 py-5 text-center text-white font-bold text-lg">Inmonest</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100 bg-white">
                      <td className="px-6 py-6 text-gray-900 font-semibold">Precio de venta</td>
                      <td className="px-6 py-6 text-center text-gray-900 font-bold text-lg">300,000€</td>
                      <td className="px-6 py-6 text-center text-gray-900 font-bold text-lg">300,000€</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-red-50">
                      <td className="px-6 py-6 text-gray-900 font-semibold">
                        Comisión / Servicio
                        <div className="text-sm text-gray-500 font-normal mt-1">Coste del intermediario</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-3xl font-black text-red-600 mb-1">18,150€</div>
                        <div className="text-sm text-red-700 font-semibold">(5% base + 21% IVA)</div>
                        <div className="text-xs text-gray-500 mt-2">15,000€ base + 3,150€ IVA</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-3xl font-black text-[#c9a84c] mb-1">666€</div>
                        <div className="text-sm text-gray-600 font-semibold">(IVA ya incluido)</div>
                        <div className="text-xs text-gray-500 mt-2">Tarifa fija completa</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-white">
                      <td className="px-6 py-6 text-gray-900 font-semibold">
                        Gestor personalizado
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center gap-2 text-orange-600 font-semibold">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          Comercial
                        </span>
                        <div className="text-xs text-gray-500 mt-1">Enfoque en vender rápido</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Jurídico
                        </span>
                        <div className="text-xs text-gray-500 mt-1">Te protege legalmente</div>
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <td className="px-6 py-6 text-gray-900 font-semibold">
                        Contratos legales
                      </td>
                      <td className="px-6 py-6 text-center text-green-600 font-semibold">✓ Incluido</td>
                      <td className="px-6 py-6 text-center text-green-600 font-semibold">✓ Incluido</td>
                    </tr>
                    <tr className="border-b border-gray-100 bg-white">
                      <td className="px-6 py-6 text-gray-900 font-semibold">
                        Acompañamiento hasta escritura
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-orange-600 font-semibold">⚠️ Limitado</span>
                        <div className="text-xs text-gray-500 mt-1">Solo hasta arras normalmente</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-green-600 font-semibold">✓ Completo</span>
                        <div className="text-xs text-gray-500 mt-1">Hasta firma notaría</div>
                      </td>
                    </tr>
                    <tr className="bg-gradient-to-r from-green-600 to-emerald-600">
                      <td className="px-6 py-6 text-white font-bold text-xl">
                        💰 TU AHORRO TOTAL
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-sm text-white/80 mb-1">Pagas a agencia</div>
                        <div className="text-2xl font-black text-white line-through opacity-75">18,150€</div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="text-sm text-white mb-1">Te ahorras</div>
                        <div className="text-4xl font-black text-white">17,484€</div>
                        <div className="text-xs text-white/90 mt-2 font-semibold">Dinero que se queda en tu bolsillo</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Highlight ahorro */}
            <div className="mt-12 bg-gradient-to-r from-[#c9a84c] to-[#a87a20] rounded-2xl p-8 text-center shadow-2xl">
              <div className="text-white/90 text-lg mb-2 font-semibold">Con Inmonest te quedas en el bolsillo</div>
              <div className="text-6xl md:text-7xl font-black text-white mb-3">17,484€</div>
              <div className="text-white/90 text-xl mb-6">que las agencias tradicionales te quitarían en comisiones</div>
              <Link
                href="/gestoria/solicitar/venta-completa-reserva-escritura"
                className="inline-flex items-center gap-2 bg-white text-[#a87a20] px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition-all shadow-xl"
              >
                Contratar servicio por 666€
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* SECCIÓN CONTACTO CON GESTOR - Estilo imagen de referencia */}
        <section className="relative py-20 px-4 bg-gradient-to-br from-[#2b4c7e] via-[#3d5a8f] to-[#2b4c7e] overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }} />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Icon */}
            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-white/30">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Habla con tu gestor o llámanos
            </h2>
            
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Resolvemos dudas sobre alquiler, compra, venta entre particulares o arras. 
              <strong className="text-white"> Sin compromiso</strong> antes de contratar.
            </p>

            {/* Teléfono destacado */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/20">
              <a 
                href={`tel:+34${PHONE}`}
                className="block group"
              >
                <div className="text-white/70 text-sm font-semibold mb-3 uppercase tracking-wider">
                  Llamar ahora
                </div>
                <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 group-hover:text-[#c9a84c] transition-colors tracking-tight">
                  {PHONE_DISPLAY}
                </div>
                <div className="text-white/80 text-sm font-medium">
                  L-V · 9:00 - 19:30 · IVA y precios claros
                </div>
              </a>
            </div>

            {/* Botones CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/34${PHONE}?text=Hola,%20quiero%20información%20sobre%20vender%20mi%20piso%20sin%20agencia`}
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-[#20BA5A] transition-all shadow-xl"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp con gestor
              </a>
              <a
                href={`tel:+34${PHONE}`}
                className="inline-flex items-center justify-center gap-3 border-2 border-white text-white px-8 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-[#2b4c7e] transition-all"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Llamar ahora
              </a>
            </div>
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                ¿Cómo funciona el servicio?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Proceso simple y transparente. Te acompañamos en cada paso.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  num: '1',
                  titulo: 'Contratas el servicio',
                  desc: 'Pago único de 666€ (IVA incluido). Sin costes ocultos ni sorpresas.',
                  icon: '💳'
                },
                {
                  num: '2',
                  titulo: 'Te asignamos tu gestor',
                  desc: 'En 24h te contacta tu gestor personal. Comienza el estudio de tu operación.',
                  icon: '👨‍💼'
                },
                {
                  num: '3',
                  titulo: 'Redacción de contratos',
                  desc: 'Contrato de reserva y arras. Revisas todo antes de firmar.',
                  icon: '📋'
                },
                {
                  num: '4',
                  titulo: 'Recabamos documentación',
                  desc: 'Te ayudamos a conseguir: nota simple, IBI, certificado energético, etc.',
                  icon: '📄'
                },
                {
                  num: '5',
                  titulo: 'Coordinación notaría',
                  desc: 'Enviamos toda la documentación y verificamos que esté todo correcto.',
                  icon: '🏛️'
                },
                {
                  num: '6',
                  titulo: 'Firma de escrituras',
                  desc: 'Tu gestor te acompaña hasta el día de la firma. ¡Venta completada!',
                  icon: '✍️'
                }
              ].map((step, i) => (
                <div key={i} className="relative">
                  {i < 5 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-[#c9a84c] to-transparent -z-10" />
                  )}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border-2 border-gray-100 hover:border-[#c9a84c]/50 transition-all h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-[#c9a84c] to-[#a87a20] rounded-full flex items-center justify-center text-white font-black text-2xl shrink-0 shadow-lg">
                        {step.num}
                      </div>
                      <div className="text-4xl">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.titulo}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Lo que dicen nuestros clientes
              </h2>
              <p className="text-xl text-gray-600">
                Más de 150 familias han vendido con nosotros ahorrando miles de euros
              </p>
            </div>
            <TestimoniosCarousel />
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-12">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: '¿Cuánto ahorro vendiendo sin agencia inmobiliaria?',
                  a: 'En un piso de 300,000€, las agencias cobran entre 15,000€ y 18,150€ (5% + IVA). Con Inmonest pagas solo 666€ por el servicio completo. Ahorro real: más de 17,000€ que se quedan en tu bolsillo.'
                },
                {
                  q: '¿Qué incluye exactamente el servicio de 666€?',
                  a: 'Incluye: gestor personal asignado durante todo el proceso, redacción de contrato de reserva y contrato de arras, ayuda para recabar toda la documentación necesaria (nota simple, IBI, certificado energético, etc.), asesoramiento legal continuo, coordinación con notaría y acompañamiento hasta la firma de escrituras.'
                },
                {
                  q: '¿Es seguro vender sin agencia?',
                  a: 'Completamente seguro con el asesoramiento adecuado. Nuestro gestor inmobiliario te protege igual que una agencia: redacta contratos legales, revisa toda la documentación, coordina con la notaría. La diferencia es que tú no pagas comisiones abusivas del 5%.'
                },
                {
                  q: '¿Cuándo pago el servicio?',
                  a: 'El pago de 666€ (IVA incluido) se realiza al inicio, cuando te asignamos tu gestor personalizado y comenzamos el estudio de la operación. Es un pago único, sin costes adicionales ocultos.'
                },
                {
                  q: '¿Qué pasa si la venta no se completa?',
                  a: 'El servicio cubre todo el acompañamiento hasta escritura. Si la venta se cancela por causas ajenas a nosotros (comprador se retira, no consigue hipoteca, etc.), ya habremos redactado los contratos y realizado el trabajo de asesoramiento. No hay devoluciones por ventas canceladas por terceros.'
                },
                {
                  q: '¿Me ayudáis a encontrar comprador?',
                  a: 'No, este servicio es para propietarios que YA tienen comprador (familiar, amigo, particular contactado directamente). Si necesitas encontrar comprador, puedes publicar tu anuncio gratis en Inmonest o contactar con agencias de tu zona.'
                }
              ].map(({ q, a }) => (
                <details key={q} className="bg-gray-50 rounded-xl border border-gray-200 group hover:border-[#c9a84c]/40 transition-all">
                  <summary className="flex items-center justify-between gap-3 px-6 py-5 cursor-pointer font-semibold text-gray-900 list-none">
                    {q}
                    <svg className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-6 pb-5 text-gray-600 leading-relaxed">{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 bg-gradient-to-br from-[#c9a84c] to-[#a87a20]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ahorra más de 17,000€ en comisiones
            </h2>
            <p className="text-2xl text-white/90 mb-10 max-w-2xl mx-auto">
              Gestor inmobiliario personal por solo 666€. Todo incluido hasta la escritura.
            </p>
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="inline-flex items-center gap-3 bg-white text-[#a87a20] px-12 py-6 rounded-xl font-black text-2xl hover:bg-gray-100 transition-all shadow-2xl transform hover:scale-105"
            >
              Contratar ahora (666€)
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-white/80 mt-6 text-sm">
              IVA incluido · Sin costes ocultos · Pago único
            </p>
          </div>
        </section>

        <WhatsAppButton />
      </main>
    </>
  )
}
