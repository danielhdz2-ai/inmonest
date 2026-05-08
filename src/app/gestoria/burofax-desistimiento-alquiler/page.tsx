import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Burofax Desistimiento Alquiler 【DESDE 15€】Rescinde tu contrato legal | Inmonest',
  description: '¿Quieres dejar tu piso de alquiler? Burofax de desistimiento redactado por abogados. Legal, válido y con acuse de recibo. Desde 15€. Entrega en 24h. ✓',
  alternates: {
    canonical: `${BASE_URL}/gestoria/burofax-desistimiento-alquiler`,
  },
  openGraph: {
    title: 'Burofax Desistimiento Alquiler - Desde 15€ | Inmonest',
    description: 'Comunica legalmente tu desistimiento de alquiler. Burofax redactado por abogados con acuse de recibo oficial.',
    url: `${BASE_URL}/gestoria/burofax-desistimiento-alquiler`,
    type: 'website',
  },
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Burofax Desistimiento de Alquiler',
  description: 'Burofax de desistimiento de contrato de alquiler redactado por abogados con acuse de recibo oficial. Válido legalmente para comunicar tu salida del piso.',
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '15',
    priceCurrency: 'EUR',
  },
})

export default function BurofaxDesistimientoPage() {
  return (
    <>
      <Script
        id="schema-burofax"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-[#1a0d00] to-[#2e1900] text-white py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/gestoria/gestoria4.jpg"
              alt="Burofax desistimiento"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#c9962a]/30 text-[#f4c94a] text-xs font-semibold mb-4">
                📨 Comunicación Legal
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                Burofax de Desistimiento de Alquiler
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                ¿Quieres dejar tu piso de alquiler? Comunícalo legalmente con un burofax redactado por abogados. Con acuse de recibo oficial. <strong>Desde 15€.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gestoria/solicitar/burofax-desistimiento"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#c9962a] text-white font-bold hover:bg-[#a87a20] transition-colors text-lg shadow-xl"
                >
                  Solicitar burofax desde 15€ →
                </Link>
                <a
                  href="#como-funciona"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Cómo funciona
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">⚖️</div>
                <h3 className="font-bold text-gray-900 mb-2">Legal al 100%</h3>
                <p className="text-gray-600 text-sm">Redactado por abogados especializados en derecho inmobiliario</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📬</div>
                <h3 className="font-bold text-gray-900 mb-2">Acuse de recibo</h3>
                <p className="text-gray-600 text-sm">Prueba legal de que tu propietario recibió la comunicación</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="font-bold text-gray-900 mb-2">Entrega en 24h</h3>
                <p className="text-gray-600 text-sm">Recibe tu burofax en PDF listo para enviar en menos de 24 horas</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es un burofax de desistimiento de alquiler?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El <strong>burofax de desistimiento</strong> es la forma legal y profesional de comunicar a tu propietario que vas a abandonar el piso de alquiler. Es el equivalente a una carta certificada, pero con mayor valor legal porque incluye <strong>acuse de recibo</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Según la <strong>Ley de Arrendamientos Urbanos (LAU)</strong>, el inquilino debe avisar con <strong>30 días de antelación</strong> si quiere dejar el piso después de los primeros 6 meses de contrato.
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 my-6">
              <p className="text-blue-900 font-semibold mb-2">📌 ¿Por qué burofax y no un email o WhatsApp?</p>
              <p className="text-blue-800">
                El burofax tiene <strong>validez legal</strong> en caso de conflicto. Si el propietario dice que "nunca recibió el aviso", tú tienes el acuse de recibo oficial de Correos como prueba. Un email o WhatsApp NO sirve como prueba legal.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cuándo necesito un burofax de desistimiento?</h2>
            <div className="space-y-4">
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Quieres dejar el piso después de 6 meses</h3>
                <p className="text-gray-700 text-sm">La LAU permite al inquilino marcharse a partir de los 6 meses con 30 días de aviso previo.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ El propietario no contesta a tus mensajes</h3>
                <p className="text-gray-700 text-sm">Si no responde a emails o llamadas, el burofax es la forma legal de asegurarte de que recibió tu comunicación.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Quieres evitar problemas con la fianza</h3>
                <p className="text-gray-700 text-sm">Un burofax bien redactado deja claro que cumpliste los plazos legales, evitando que el propietario retenga tu fianza indebidamente.</p>
              </div>
              
              <div className="bg-white border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-2">✓ Termina el contrato y quieres hacerlo formal</h3>
                <p className="text-gray-700 text-sm">Aunque llegues al final del contrato, un burofax confirma que no vas a renovar automáticamente.</p>
              </div>
            </div>
          </section>

          <section id="como-funciona" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cómo funciona nuestro servicio?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Solicitas el burofax</h3>
                  <p className="text-gray-700">Completas un formulario con tus datos, los del propietario, la dirección del piso y la fecha en que quieres dejar el inmueble.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Nuestros abogados lo redactan</h3>
                  <p className="text-gray-700">En menos de 24 horas, un abogado especializado redacta tu burofax con todas las cláusulas legales necesarias.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Recibes el PDF</h3>
                  <p className="text-gray-700">Te enviamos el burofax en PDF listo para enviar. Incluye instrucciones para enviarlo por Correos (online o presencial).</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#c9962a] text-white flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Envías el burofax</h3>
                  <p className="text-gray-700">Puedes enviarlo online desde la web de Correos (15€ aprox.) o acudir a una oficina. Recibirás el acuse de recibo en 3-5 días.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué incluye el burofax?</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Identificación completa del inquilino y propietario</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Dirección del inmueble</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Fecha de firma del contrato</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Comunicación expresa de desistimiento según la LAU</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Fecha exacta de entrega de llaves</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Solicitud de devolución de fianza</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Referencias legales (LAU artículo 11)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9962a] text-xl">✓</span>
                <span className="text-gray-700">Instrucciones de envío por Correos</span>
              </li>
            </ul>
          </section>

          {/* Imagen */}
          <div className="my-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/gestoria/gestoria6.jpg"
              alt="Burofax de desistimiento profesional"
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>

          {/* Precios */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Precios</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Burofax Básico</h3>
                <p className="text-4xl font-extrabold text-[#c9962a] mb-4">15€</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ Redacción por abogado</li>
                  <li>✓ Entrega en 24-48h</li>
                  <li>✓ PDF listo para enviar</li>
                  <li>✓ Instrucciones de envío</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/burofax-desistimiento?tipo=basico"
                  className="block text-center px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Solicitar básico
                </Link>
              </div>
              
              <div className="border-2 border-[#c9962a] rounded-2xl p-6 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#c9962a] text-white text-xs font-bold">
                  MÁS POPULAR
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Burofax Premium</h3>
                <p className="text-4xl font-extrabold text-[#c9962a] mb-4">25€</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ Todo lo del básico</li>
                  <li>✓ Entrega en 12h</li>
                  <li>✓ Revisión personalizada</li>
                  <li>✓ Consulta telefónica incluida</li>
                  <li>✓ Asistencia en envío</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/burofax-desistimiento?tipo=premium"
                  className="block text-center px-6 py-3 rounded-full bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
                >
                  Solicitar premium
                </Link>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              * El envío del burofax por Correos (15-20€) se paga aparte directamente a Correos
            </p>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿El burofax es obligatorio?</summary>
                <p className="text-gray-700 mt-3">
                  No es obligatorio, pero es <strong>altamente recomendable</strong>. Puedes comunicar tu desistimiento por email o carta, pero el burofax es la única forma con <strong>prueba legal</strong> de que el propietario recibió el aviso en tiempo y forma.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuántos días de antelación debo avisar?</summary>
                <p className="text-gray-700 mt-3">
                  La LAU establece <strong>30 días de antelación</strong> como mínimo. Si tu contrato dice más (por ejemplo, 60 días), debes cumplir lo que dice el contrato.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Puedo marcharme antes de 6 meses?</summary>
                <p className="text-gray-700 mt-3">
                  Sí, pero el propietario puede exigirte una <strong>indemnización</strong>. Lo habitual es pagar el equivalente a 1 mes de renta por cada año que quede de contrato. El burofax puede incluir esta cláusula si aplica.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuánto tarda en llegar el burofax al propietario?</summary>
                <p className="text-gray-700 mt-3">
                  Correos entrega burofax en <strong>24-72 horas laborables</strong>. Recibirás el acuse de recibo (prueba de entrega) en 3-5 días por email o correo postal.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué pasa si el propietario no recoge el burofax?</summary>
                <p className="text-gray-700 mt-3">
                  Correos lo intenta 2 veces y deja aviso. Si no lo recoge, se considera <strong>"rehusado"</strong>, lo cual también tiene validez legal. El acuse dirá "No retirado" y eso es suficiente prueba de que intentaste comunicarlo.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Me devuelven la fianza automáticamente?</summary>
                <p className="text-gray-700 mt-3">
                  No. La fianza se devuelve tras <strong>entrega de llaves + revisión del estado del piso</strong>. El burofax solo comunica tu desistimiento. Si hay desperfectos, el propietario puede descontar reparaciones de la fianza.
                </p>
              </details>
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-[#1a0d00] to-[#2e1900] rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Listo para dejar tu piso legalmente?</h3>
            <p className="text-white/80 mb-6">
              Burofax redactado por abogados en menos de 24 horas. Con acuse de recibo oficial.
            </p>
            <Link
              href="/gestoria/solicitar/burofax-desistimiento"
              className="inline-block px-8 py-4 rounded-full bg-[#c9962a] text-white font-bold hover:bg-[#a87a20] transition-colors"
            >
              Solicitar burofax desde 15€ →
            </Link>
          </div>

        </article>

        {/* Relacionados */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Servicios relacionados</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link href="/gestoria/contrato-alquiler" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Contrato de Alquiler LAU →
                </h3>
                <p className="text-sm text-gray-600">Desde 7€</p>
              </Link>
              <Link href="/gestoria/rescision-alquiler" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Rescisión de Alquiler →
                </h3>
                <p className="text-sm text-gray-600">Desde 40€</p>
              </Link>
              <Link href="/blog/contrato-arrendamiento-lau" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Guía LAU 2026 →
                </h3>
                <p className="text-sm text-gray-600">Gratis</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
