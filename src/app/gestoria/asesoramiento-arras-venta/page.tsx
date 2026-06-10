import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import TestimoniosCarousel from '@/components/TestimoniosCarousel'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Asesoramiento Venta Piso desde Arras hasta Escritura | Gestor 166€',
  description: 'Ya firmaste arras y necesitas ayuda para vender? Gestor experto te acompaña recabando documentación, gestionando trámites hasta escritura. Solo 166€ IVA incluido. ✓ Particulares vendedores ✓ Sin sorpresas',
  keywords: 'tramites venta piso particular, gestor venta inmueble, asesoramiento venta vivienda, documentacion venta casa, ayuda vender piso, gestoria venta particular, tramites escritura publica, vender inmueble sin inmobiliaria',
  alternates: {
    canonical: `${BASE_URL}/gestoria/asesoramiento-arras-venta`,
  },
  openGraph: {
    title: 'Asesoramiento Venta Piso desde Arras | Gestoría Inmonest',
    description: 'Gestor experto te acompaña desde arras hasta escritura. Recabamos documentación, gestionamos trámites. Ideal para particulares vendedores. 166€.',
    url: `${BASE_URL}/gestoria/asesoramiento-arras-venta`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Asesoramiento venta piso particular' }],
  },
}

export const revalidate = 86400  // 24 horas

export default function AsesoramientoArrasVentaPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Asesoramiento Arras hasta Escritura (Vendedores)',
    description: 'Servicio de acompañamiento para propietarios vendedores que ya firmaron contrato de arras. Gestor experto recaba documentación, gestiona trámites y coordina todo hasta escritura pública.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '166',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Este servicio incluye el contrato de arras?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'NO. Este servicio es para vendedores que YA firmaron el contrato de arras y necesitan acompañamiento profesional desde ese momento hasta la firma de escrituras ante notario. El contrato de arras se contrata por separado.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué documentación me ayudáis a recabar?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Te ayudamos con: escrituras de propiedad, nota simple registral actualizada, últimos recibos IBI, certificado de eficiencia energética, últimos recibos de comunidad, cédula de habitabilidad (según CCAA), liquidación de plusvalía municipal, certificados de deuda cero, y toda documentación específica que requiera tu operación.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo dura el acompañamiento?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Te acompañamos desde que contratas el servicio (momento posterior a firmar arras) hasta el día de la escritura ante notario. Normalmente entre 1-2 meses dependiendo de los plazos de hipoteca del comprador y disponibilidad de notaría.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Por qué contratar gestoría en vez de inmobiliaria?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Una inmobiliaria cobra entre 3% y 5% de comisión (3.000€-5.000€ en un piso de 100.000€). Nuestro servicio cuesta solo 166€ IVA incluido y te proporcionamos el mismo acompañamiento profesional sin cobrarte comisión sobre el precio de venta.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa si el comprador se echa atrás?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestro gestor te asesora sobre cómo actuar según el tipo de arras firmado (penitenciales o confirmatorias). Te explicamos tus derechos, cómo reclamar la señal o indemnización, y los pasos legales a seguir.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Puedo contratar el servicio si ya tengo arras firmado?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, de hecho es el objetivo principal de este servicio. Está diseñado específicamente para vendedores particulares que ya firmaron arras y necesitan ayuda profesional para completar la venta hasta escrituras.',
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
      { '@type': 'ListItem', position: 3, name: 'Asesoramiento Venta Arras a Escritura', item: `${BASE_URL}/gestoria/asesoramiento-arras-venta` },
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
                📝 Para vendedores particulares
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="text-[#c9962a]">Ya firmaste arras?</span> Te acompañamos hasta escritura
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un <strong>gestor experto de Inmonest</strong> te ayuda a recabar toda la documentación, 
                gestionar trámites y coordinar el proceso hasta el día de escritura ante notario. 
                <strong> Vende tu piso con seguridad y tranquilidad.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/asesoramiento-arras-venta"
                  className="bg-[#c9962a] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#a87a20] transition text-center shadow-lg"
                >
                  Contratar servicio (166€)
                </Link>
                <a
                  href="https://wa.me/34641008847?text=Hola,%20ya%20firmé%20arras%20y%20necesito%20ayuda%20para%20vender%20mi%20piso"
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
                  <span>Gestor experto asignado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Documentación completa</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#c9962a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido · 166€</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/keys.jpg"
                alt="Asesoramiento venta piso particular desde arras hasta escritura"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-[#c9962a]/30">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">✅</div>
                  <div>
                    <div className="font-bold text-gray-900">143 ventas</div>
                    <div className="text-sm text-gray-600">completadas con éxito</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Para quién es este servicio */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Para quién es este servicio?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Ya firmaste contrato de arras</h3>
              <p className="text-gray-700">
                Tienes el contrato de arras firmado con el comprador y ahora necesitas ayuda 
                profesional para completar todo el proceso hasta escritura pública.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Eres propietario vendedor</h3>
              <p className="text-gray-700">
                Estás vendiendo tu piso de particular a particular sin agencia inmobiliaria 
                y quieres el respaldo de un gestor experto en el proceso.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Necesitas ayuda con trámites</h3>
              <p className="text-gray-700">
                No sabes qué documentación necesitas, cómo recabarla o coordinar con notaría. 
                Necesitas ayuda profesional pero sin pagar comisión de inmobiliaria.
              </p>
            </div>
          </div>
          <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-2xl">⚠️</div>
              <div>
                <h4 className="font-bold text-gray-900 mb-2">IMPORTANTE: Este servicio NO incluye el contrato de arras</h4>
                <p className="text-gray-700">
                  Este servicio es para vendedores que <strong>ya tienen firmado</strong> su contrato de arras y necesitan 
                  acompañamiento desde ese punto hasta escriturar. Si aún no tienes arras firmado, puedes contratar 
                  nuestro <Link href="/gestoria/arras-penitenciales" className="text-[#c9962a] font-semibold underline">Contrato de Arras Penitenciales</Link> o <Link href="/gestoria/arras-confirmatorias" className="text-[#c9962a] font-semibold underline">Confirmatorias</Link> por separado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Llama ahora - Banner destacado */}
      <section className="py-12 px-4 bg-gradient-to-r from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-white/30">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              📞 Habla con un asesor experto ahora
            </h2>
            <p className="text-xl text-white/90 mb-6">
              Te explicamos todo el proceso, resolvemos tus dudas y te informamos sin compromiso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+34641008847"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#a87a20] px-8 py-5 rounded-xl font-bold text-2xl hover:bg-gray-100 transition shadow-2xl"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>641 008 847</span>
              </a>
              <a
                href="https://wa.me/34641008847?text=Hola,%20necesito%20ayuda%20para%20vender%20mi%20piso,%20ya%20firmé%20arras"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-500 text-white px-8 py-5 rounded-xl font-bold text-xl hover:bg-green-600 transition shadow-2xl"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                <span>WhatsApp</span>
              </a>
            </div>
            <p className="mt-4 text-white/80 text-sm">
              Horario: Lunes a Viernes 9:00 - 19:00h · Sábados 10:00 - 14:00h
            </p>
          </div>
        </div>
      </section>

      {/* Cómo funciona el servicio */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Cómo funciona nuestro servicio?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900">Asignación de gestor experto</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Te asignamos un gestor experto de Inmonest especializado en ventas inmobiliarias</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Primera llamada para revisar tu contrato de arras y la situación actual</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Análisis completo de la operación: plazos, condiciones, requisitos específicos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Plan de acción personalizado con todas las gestiones necesarias</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900">Recogida de documentación</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Listado completo de documentos necesarios para tu caso específico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Ayuda paso a paso para obtener cada documento: dónde, cómo, cuándo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Revisión de toda la documentación para asegurar que está completa y correcta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Soporte continuo para resolver cualquier problema documental</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900">Gestión de trámites</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Gestión de certificados de deuda cero (comunidad, IBI, suministros)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Ayuda con liquidación de plusvalía municipal y otros impuestos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Coordinación con entidades bancarias (si hay hipoteca pendiente)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Seguimiento de todos los trámites hasta su finalización</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-[#c9962a]">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#c9962a]/20 text-[#a87a20] w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900">Coordinación hasta escritura</h3>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Contacto directo con la notaría para coordinar fecha y hora de escritura</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Preparación de toda la documentación para entregar en notaría</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Asesoramiento previo a la firma: qué esperar, qué revisar, cómo proceder</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9962a] mt-1">✓</span>
                  <span>Soporte hasta el día de firma para resolver cualquier duda o imprevisto</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Por qué Inmonest vs Inmobiliarias */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué Inmonest gestoría y no una inmobiliaria?
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left border-b-2 border-gray-300 font-bold text-gray-900"></th>
                  <th className="p-4 text-center border-b-2 border-[#c9962a] font-bold text-[#a87a20] bg-amber-50">
                    <div className="text-xl mb-1">🏆 Inmonest Gestoría</div>
                    <div className="text-sm font-normal">Servicio profesional</div>
                  </th>
                  <th className="p-4 text-center border-b-2 border-gray-300 font-bold text-gray-600">
                    <div className="text-xl mb-1">🏢 Inmobiliaria</div>
                    <div className="text-sm font-normal">Servicio tradicional</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Precio del servicio</td>
                  <td className="p-4 text-center bg-green-50">
                    <div className="text-2xl font-bold text-green-600">166€</div>
                    <div className="text-sm text-gray-600">IVA incluido · Tarifa plana</div>
                  </td>
                  <td className="p-4 text-center bg-red-50">
                    <div className="text-2xl font-bold text-red-600">3.000€ - 5.000€</div>
                    <div className="text-sm text-gray-600">3-5% comisión sobre venta</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Gestor personalizado</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Sí, asignado a tu caso</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Depende del agente</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Ayuda con documentación</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Paso a paso incluido</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Según disponibilidad</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Coordinación con notaría</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Sí, incluido</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Sí, incluido</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Asesoramiento legal</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Especialistas gestoría</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">❌</span>
                    <div className="text-sm text-gray-600 mt-1">No suelen tener gestor</div>
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 font-semibold text-gray-900">Transparencia de costes</td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">✅</span>
                    <div className="text-sm text-gray-600 mt-1">Precio fijo 166€</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-2xl">⚠️</span>
                    <div className="text-sm text-gray-600 mt-1">Depende del precio venta</div>
                  </td>
                </tr>
                <tr className="bg-amber-50 border-2 border-[#c9962a]">
                  <td className="p-4 font-bold text-gray-900">💰 Ahorro total</td>
                  <td className="p-4 text-center" colSpan={2}>
                    <div className="text-3xl font-bold text-[#a87a20]">Ahorras entre 2.834€ y 4.834€</div>
                    <div className="text-sm text-gray-600 mt-1">En una venta de 100.000€ comparado con inmobiliaria</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-6 bg-amber-50 border-l-4 border-[#c9962a] rounded-lg">
            <h3 className="font-bold text-xl text-gray-900 mb-3">🎯 Ventaja principal de Inmonest</h3>
            <p className="text-gray-700 text-lg">
              Nuestro servicio está diseñado <strong>específicamente para particulares</strong> que venden entre ellos. 
              No cobramos comisión sobre la venta porque <strong>no somos inmobiliaria</strong>, somos gestoría especializada. 
              Te proporcionamos el mismo acompañamiento profesional <strong>por una tarifa plana de 166€</strong>, 
              independientemente del precio de tu piso.
            </p>
          </div>
        </div>
      </section>

      {/* Documentación que recabamos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Documentación que te ayudamos a recabar
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '📄', title: 'Escrituras de propiedad', desc: 'Copia actualizada de las escrituras registrales del inmueble' },
              { icon: '📋', title: 'Nota simple registral', desc: 'Actualizada (menos de 3 meses), verificamos cargas y titularidad' },
              { icon: '🏛️', title: 'Último recibo IBI', desc: 'Impuesto de Bienes Inmuebles del año en curso o anterior' },
              { icon: '⚡', title: 'Certificado energético', desc: 'Certificado de eficiencia energética válido y registrado' },
              { icon: '🏢', title: 'Recibos de comunidad', desc: 'Últimos 3-6 meses, certificado de deuda cero si es posible' },
              { icon: '🏠', title: 'Cédula habitabilidad', desc: 'Según CCAA, verificamos vigencia y requisitos específicos' },
              { icon: '🔧', title: 'ITE si aplicable', desc: 'Inspección Técnica de Edificios en comunidades que lo requieran' },
              { icon: '💰', title: 'Certificado deuda cero', desc: 'De comunidad, IBI, y otros impuestos municipales' },
              { icon: '📝', title: 'Documentación específica', desc: 'Cualquier documento adicional según tu operación particular' },
            ].map((doc, index) => (
              <div key={index} className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:border-[#c9962a] transition">
                <div className="text-4xl mb-3">{doc.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{doc.title}</h3>
                <p className="text-sm text-gray-600">{doc.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-700">
              <strong>No te preocupes si no sabes dónde obtener algo.</strong> Tu gestor te guía paso a paso 
              para conseguir cada documento de forma rápida y sencilla.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Destacado */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#c9962a] to-[#a87a20]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Vende tu piso con tranquilidad
          </h2>
          <p className="text-2xl text-white/90 mb-8">
            Gestor experto · Documentación completa · Solo 166€ IVA incluido
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/asesoramiento-arras-venta"
              className="bg-white text-[#a87a20] px-10 py-5 rounded-xl font-bold text-xl hover:bg-gray-100 transition shadow-2xl"
            >
              Contratar servicio ahora
            </Link>
            <a
              href="https://wa.me/34641008847?text=Hola,%20quiero%20información%20sobre%20asesoramiento%20venta%20piso"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-10 py-5 rounded-xl font-bold text-xl hover:bg-green-600 transition shadow-2xl"
            >
              💬 WhatsApp directo
            </a>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Lo que dicen nuestros clientes
          </h2>
          <TestimoniosCarousel landing="asesoramiento-arras" />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Este servicio incluye el contrato de arras?',
                a: 'NO. Este servicio es para vendedores que YA firmaron el contrato de arras y necesitan acompañamiento profesional desde ese momento hasta la firma de escrituras ante notario. El contrato de arras se contrata por separado (Arras Penitenciales 145€ o Arras Confirmatorias 145€).',
              },
              {
                q: '¿Qué documentación me ayudáis a recabar?',
                a: 'Te ayudamos con: escrituras de propiedad, nota simple registral actualizada, últimos recibos IBI, certificado de eficiencia energética, últimos recibos de comunidad, cédula de habitabilidad (según CCAA), liquidación de plusvalía municipal, certificados de deuda cero, y toda documentación específica que requiera tu operación.',
              },
              {
                q: '¿Cuánto tiempo dura el acompañamiento?',
                a: 'Te acompañamos desde que contratas el servicio (momento posterior a firmar arras) hasta el día de la escritura ante notario. Normalmente entre 1-2 meses dependiendo de los plazos de hipoteca del comprador y disponibilidad de notaría.',
              },
              {
                q: '¿Por qué contratar gestoría en vez de inmobiliaria?',
                a: 'Una inmobiliaria cobra entre 3% y 5% de comisión (3.000€-5.000€ en un piso de 100.000€). Nuestro servicio cuesta solo 166€ IVA incluido y te proporcionamos el mismo acompañamiento profesional sin cobrarte comisión sobre el precio de venta.',
              },
              {
                q: '¿Qué pasa si el comprador se echa atrás?',
                a: 'Nuestro gestor te asesora sobre cómo actuar según el tipo de arras firmado (penitenciales o confirmatorias). Te explicamos tus derechos, cómo reclamar la señal o indemnización, y los pasos legales a seguir.',
              },
              {
                q: '¿Puedo contratar el servicio si ya tengo arras firmado?',
                a: 'Sí, de hecho es el objetivo principal de este servicio. Está diseñado específicamente para vendedores particulares que ya firmaron arras y necesitan ayuda profesional para completar la venta hasta escrituras.',
              },
              {
                q: '¿Qué pasa si mi piso tiene hipoteca pendiente?',
                a: 'No hay problema. Tu gestor coordina con tu banco para obtener el certificado de deuda pendiente y gestiona la cancelación de hipoteca el día de la escritura. Es un trámite habitual que gestionamos frecuentemente.',
              },
              {
                q: '¿Cuándo pago el servicio?',
                a: 'El pago se realiza al inicio del servicio, cuando te asignamos tu gestor personalizado y comenzamos el análisis de tu operación. Son 166€ IVA incluido (precio final). No hay pagos ocultos ni costes adicionales.',
              },
            ].map((faq, index) => (
              <details key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group">
                <summary className="font-bold text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  <span className="text-lg">{faq.q}</span>
                  <svg className="w-5 h-5 text-[#c9962a] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="text-gray-700 mt-4 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            ¿Listo para vender tu piso con tranquilidad?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contrata ahora y te asignamos tu gestor experto en 24h
          </p>
          <Link
            href="/gestoria/solicitar/asesoramiento-arras-venta"
            className="inline-block bg-[#c9962a] text-white px-12 py-5 rounded-xl font-bold text-xl hover:bg-[#a87a20] transition shadow-2xl"
          >
            Contratar por 166€ (IVA incluido)
          </Link>
        </div>
      </section>
    </>
  )
}
