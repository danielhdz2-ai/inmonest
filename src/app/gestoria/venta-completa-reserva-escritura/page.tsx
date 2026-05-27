import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría venta piso particular — acompañamiento completo',
  description: 'Vendes tu piso a particular? Te acompañamos desde reserva hasta escritura: contratos, documentación, gestor personalizado. Todo listo para escriturar. 666€.',
  keywords: 'vender piso particular, asesoría venta vivienda, acompañamiento venta piso, contratos venta particular, gestoría venta inmueble, ayuda vender piso',
  alternates: {
    canonical: `${BASE_URL}/gestoria/venta-completa-reserva-escritura`,
  },
  openGraph: {
    title: 'Gestoría venta piso particular — acompañamiento completo',
    description: 'Gestor personalizado te acompaña desde reserva hasta escritura. Redactamos contratos, recabamos documentación. Vende seguro entre particulares. 666€.',
    url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Acompañamiento venta piso' }],
  },
}

export const revalidate = 86400  // 24 horas

export default function VentaCompletaPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Servicio Completo de Venta: Reserva a Escritura',
    description: 'Acompañamiento completo para propietarios que venden su piso a particulares. Gestor personalizado, redacción de contratos, recogida de documentación y asesoramiento hasta escriturar.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '666',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '4',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Qué incluye el servicio de acompañamiento de venta?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Incluye: gestor personalizado asignado, estudio completo de la operación, redacción de contrato de reserva, redacción de contrato de arras, ayuda para recabar toda la documentación necesaria, asesoramiento continuo hasta la firma de escrituras y coordinación con notaría.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo dura el acompañamiento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Te acompañamos durante todo el proceso desde que firmas la reserva hasta que se escritura. Normalmente entre 1-3 meses dependiendo de los plazos de hipoteca del comprador y disponibilidad de notaría.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué documentación necesito para vender?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'DNI del propietario, escrituras de propiedad, nota simple registral actualizada, último recibo IBI, certificado de eficiencia energética, últimos recibos de comunidad (si aplica), cédula de habitabilidad (según CCAA). Nuestro gestor te ayuda a recopilar todo.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo vender sin agencia inmobiliaria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Este servicio está diseñado específicamente para propietarios que venden directamente a compradores particulares, sin agencia. Te proporcionamos todo el apoyo legal y administrativo necesario.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuándo pago el servicio?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'El pago se realiza al inicio del servicio, cuando te asignamos tu gestor personalizado y comenzamos el estudio de la operación. No hay pagos ocultos ni costes adicionales.',
        },
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      { '@type': 'ListItem', position: 3, name: 'Acompañamiento Venta Completo', item: `${BASE_URL}/gestoria/venta-completa-reserva-escritura` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-[#c9962a]/20 text-[#a87a20] px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-[#c9962a]/30">
                🏠 Para propietarios particulares
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#c9962a]">Vende tu piso a particular</span> con acompañamiento completo
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un <strong>gestor personalizado</strong> te acompaña desde la reserva hasta la escritura. 
                Redactamos contratos, recabamos documentación y te asesoramos en cada paso. 
                <strong> Vende seguro sin agencia.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/venta-completa-reserva-escritura"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a87a20] transition text-center shadow-lg"
                >
                  Contratar servicio (666€)
                </Link>
                <a
                  href="https://wa.me/34641008847?text=Hola,%20quiero%20vender%20mi%20piso%20a%20particular%20y%20necesito%20acompañamiento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-[#c9962a] text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#fef9e8] transition text-center shadow"
                >
                  💬 WhatsApp directo
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Gestor personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Contratos incluidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/keys.jpg"
                alt="Venta piso particular con gestor"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-[#c9962a]/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏡</div>
                  <div>
                    <div className="font-bold text-gray-900">89 ventas</div>
                    <div className="text-sm text-gray-600">acompañadas con éxito</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué lo necesitas */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué necesitas acompañamiento profesional?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Evita errores legales costosos</h3>
              <p className="text-gray-700">
                Contratos mal redactados, documentación incompleta o cláusulas que te perjudican 
                pueden bloquear la venta o generar problemas legales futuros.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Documentación completa garantizada</h3>
              <p className="text-gray-700">
                La notaría necesita toda la documentación en orden. Nosotros te ayudamos a 
                recabar todo lo necesario: IBI, comunidad, cédula de habitabilidad, etc.
              </p>
            </div>
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-[#c9962a]">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Protección durante todo el proceso</h3>
              <p className="text-gray-700">
                Desde la reserva hasta la firma en notaría, tu gestor te asesora en cada decisión 
                y se asegura de que todo vaya según lo pactado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Llama ahora */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Tienes dudas sobre el proceso?
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Llámanos ahora y te informamos de todo sin compromiso
            </p>
            <a
              href="tel:+34641008847"
              className="inline-flex items-center gap-3 bg-white text-[#a87a20] px-8 py-5 rounded-xl font-bold text-2xl hover:bg-gray-100 transition shadow-2xl"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>641 008 847</span>
            </a>
            <p className="mt-4 text-white/80 text-sm">
              Horario: Lunes a Viernes 9:00 - 19:00h
            </p>
          </div>
        </div>
      </section>

      {/* Qué hacemos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué incluye el servicio completo?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Análisis inicial de la operación</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Asignación de gestor personalizado a tu caso</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Estudio completo de la venta: precio, condiciones, plazos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Verificación de que toda tu documentación está en orden</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Plan de acción personalizado para tu venta</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Redacción de contrato de reserva</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Contrato de reserva personalizado con los datos reales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Cláusulas de protección: plazos, condiciones, devolución señal</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Asesoramiento sobre cantidad de señal adecuada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Explicación detallada de cada cláusula</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Redacción de contrato de arras</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Contrato de arras completo (penitenciales o confirmatorias)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Descripción exacta del inmueble según datos registrales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Condiciones de pago: señal, resto, fecha límite escritura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Cláusulas de garantía y cumplimiento</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recogida de documentación</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Nota simple registral actualizada (gestión incluida)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Certificado de eficiencia energética (te indicamos cómo)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>IBI, recibos comunidad, cédula de habitabilidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Verificación de que todo está completo para notaría</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  5
                </div>
                <h3 className="text-xl font-bold text-gray-900">Asesoramiento continuo con gestor inmobiliario</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Gestor inmobiliario dedicado disponible por email, teléfono y WhatsApp</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Resolución de todas tus dudas en cada fase del proceso de venta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Asesoramiento profesional completo durante toda la operación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Coordinación con comprador, notaría y banco</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Seguimiento personalizado hasta firma de escrituras</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  6
                </div>
                <h3 className="text-xl font-bold text-gray-900">Coordinación con notaría</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Envío de documentación a la notaría elegida</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Verificación de que todo está listo para escriturar</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Asesoramiento sobre impuestos (plusvalía, IRPF)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Apoyo hasta la firma definitiva</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Cómo funciona el proceso?
          </h2>
          <div className="space-y-6">
            {[
              {
                paso: '1',
                titulo: 'Contratas el servicio',
                desc: 'Rellenas el formulario con los datos de tu venta. Pago único de 666€ (IVA incluido). Sin costes ocultos.',
              },
              {
                paso: '2',
                titulo: 'Te asignamos tu gestor',
                desc: 'En 24h te contacta tu gestor personalizado por email y teléfono. Comienza el estudio de tu operación.',
              },
              {
                paso: '3',
                titulo: 'Redactamos los contratos',
                desc: 'Primero el contrato de reserva, luego el de arras. Revisas cada documento antes de firmar.',
              },
              {
                paso: '4',
                titulo: 'Recabamos la documentación',
                desc: 'Tu gestor te ayuda a conseguir todos los documentos necesarios para la notaría: nota simple, IBI, energético, etc.',
              },
              {
                paso: '5',
                titulo: 'Coordinación con notaría',
                desc: 'Enviamos toda la documentación. Verificamos que esté todo correcto. Fijamos fecha de firma.',
              },
              {
                paso: '6',
                titulo: 'Firma de escrituras',
                desc: 'Tu gestor te acompaña hasta el día de la firma. Venta completada con todas las garantías.',
              },
            ].map(item => (
              <div key={item.paso} className="flex gap-4 items-start">
                <div className="bg-[#c9962a] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shrink-0">
                  {item.paso}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.titulo}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Vender con Inmonest vs. Vender solo
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Aspecto</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-[#c9962a]">Con Inmonest</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Por tu cuenta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Redacción contratos</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Incluido
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-orange-600 font-semibold">Plantilla internet</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Gestor personalizado</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Asignado
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 font-semibold">✗</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Ayuda con documentación</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Total
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-orange-600 font-semibold">Buscas tú</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">Asesoramiento legal</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Continuo
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-red-600 font-semibold">✗</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-gray-900">Coordinación notaría</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Incluido
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-orange-600 font-semibold">Gestionas tú</span>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">Coste total</td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-[#c9962a] font-bold text-lg">666€</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600 font-semibold">0€<br /><span className="text-xs">(pero más riesgo)</span></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Documentación necesaria */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Documentación que necesitarás
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            No te preocupes, tu gestor te ayuda a conseguir todo. Esta es la lista completa:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">📄</span>
                Documentos del propietario
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>DNI o NIE en vigor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Escrituras de propiedad del inmueble</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Certificado de matrimonio (si procede)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">🏠</span>
                Documentos del inmueble
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Nota simple registral (la gestionamos nosotros)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Último recibo del IBI (Impuesto Bienes Inmuebles)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Certificado de eficiencia energética vigente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Cédula de habitabilidad (según comunidad autónoma)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">🏢</span>
                Si hay comunidad de propietarios
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Últimos recibos de comunidad pagados</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Certificado de estar al corriente de pagos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Estatutos de la comunidad (opcional)</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-bold text-lg mb-4 text-gray-900 flex items-center gap-2">
                <span className="text-[#c9962a]">💰</span>
                Si hay hipoteca pendiente
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Certificado de deuda pendiente del banco</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Últimos recibos de la hipoteca</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-0.5">•</span>
                  <span>Contacto del banco para cancelación</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Qué incluye el servicio de acompañamiento de venta?',
                a: 'Incluye: gestor personalizado asignado, estudio completo de la operación, redacción de contrato de reserva, redacción de contrato de arras, ayuda para recabar toda la documentación necesaria, asesoramiento continuo hasta la firma de escrituras y coordinación con notaría.',
              },
              {
                q: '¿Cuánto tiempo dura el acompañamiento?',
                a: 'Te acompañamos durante todo el proceso desde que firmas la reserva hasta que se escritura. Normalmente entre 1-3 meses dependiendo de los plazos de hipoteca del comprador y disponibilidad de notaría.',
              },
              {
                q: '¿Qué documentación necesito para vender?',
                a: 'DNI del propietario, escrituras de propiedad, nota simple registral actualizada, último recibo IBI, certificado de eficiencia energética, últimos recibos de comunidad (si aplica), cédula de habitabilidad (según CCAA). Nuestro gestor te ayuda a recopilar todo.',
              },
              {
                q: '¿Puedo vender sin agencia inmobiliaria?',
                a: 'Sí. Este servicio está diseñado específicamente para propietarios que venden directamente a compradores particulares, sin agencia. Te proporcionamos todo el apoyo legal y administrativo necesario.',
              },
              {
                q: '¿Cuándo pago el servicio?',
                a: 'El pago se realiza al inicio del servicio, cuando te asignamos tu gestor personalizado y comenzamos el estudio de la operación. No hay pagos ocultos ni costes adicionales.',
              },
              {
                q: '¿Qué pasa si la venta no se completa?',
                a: 'El servicio cubre todo el acompañamiento hasta escritura. Si la venta se cancela por causas ajenas a nosotros (comprador se retira, no consigue hipoteca, etc.), ya habremos redactado los contratos y realizado el trabajo de asesoramiento.',
              },
            ].map(({ q, a }) => (
              <details key={q} className="bg-white rounded-xl border border-gray-100 group">
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

      {/* CTA final */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Vende tu piso con todas las garantías
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Gestor personalizado, contratos incluidos, documentación completa y asesoramiento 
            hasta escriturar. Todo por 666€ IVA incluido.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/venta-completa-reserva-escritura"
              className="bg-white text-[#a87a20] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Contratar ahora (666€)
            </Link>
            <a
              href="https://wa.me/34641008847?text=Hola,%20quiero%20información%20sobre%20el%20servicio%20de%20acompañamiento%20de%20venta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition"
            >
              💬 Preguntar por WhatsApp
            </a>
          </div>
          <p className="mt-6 text-white/80 text-sm">
            Sin pagos ocultos • Gestor asignado en 24h • IVA incluido
          </p>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Otros servicios relacionados
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/gestoria/solicitar/arras-penitenciales"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Contrato de Arras</h3>
              <p className="text-gray-600 text-sm mb-3">
                Solo el contrato de arras penitenciales redactado y personalizado.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 145€</div>
            </Link>

            <Link
              href="/gestoria/solicitar/reserva-compra"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Contrato de Reserva</h3>
              <p className="text-gray-600 text-sm mb-3">
                Redacción del contrato de reserva para asegurar la operación.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 61€</div>
            </Link>

            <Link
              href="/gestoria/revision-contrato-arras"
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 hover:border-[#c9962a] hover:shadow-md transition"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-900">Revisión de Contratos</h3>
              <p className="text-gray-600 text-sm mb-3">
                Ya tienes contrato? Lo revisamos y te decimos si está bien.
              </p>
              <div className="text-[#c9962a] font-bold">Desde 60€</div>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
