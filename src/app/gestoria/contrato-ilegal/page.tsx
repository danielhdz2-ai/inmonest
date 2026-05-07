import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: '¿Tu Contrato es Ilegal? 【ANÁLISIS 29€】 Detectamos Fraudes y Abusos | Inmonest',
  description: '¿Sospechas que tu contrato de alquiler o compra es ilegal? Abogado lo analiza en 24h. Detectamos fraudes, documentos falsos y estafas. Desde 29€.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/contrato-ilegal`,
  },
  openGraph: {
    title: 'Detectar Contratos Ilegales o Fraudulentos — Inmonest',
    description: 'Análisis legal de contratos sospechosos. Detectamos fraudes, documentos falsificados, estafas inmobiliarias. 24h. Desde 29€.',
    url: `${BASE_URL}/gestoria/contrato-ilegal`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/keys.jpg`, width: 1200, height: 630, alt: 'Detectar contrato ilegal' }],
  },
}

export const revalidate = 3600

export default function ContratoIlegalPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Detección de Contratos Ilegales o Fraudulentos',
    description: 'Análisis legal de contratos sospechosos de ser ilegales o fraudulentos. Detectamos documentos falsos, estafas inmobiliarias, cláusulas nulas y operaciones fraudulentas.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: '29',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <Navbar />
      <WhatsAppButton />

      {/* Hero */}
      <section className="bg-gradient-to-br from-red-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                🚨 Detectamos fraudes inmobiliarios
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Crees que tu contrato <span className="text-red-600">es ilegal o falso</span>?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Un abogado especializado lo analiza en <strong>24 horas</strong>. Detectamos documentos falsificados, 
                estafas, contratos nulos y operaciones fraudulentas. <strong>Protégete antes de perder tu dinero.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/contrato-ilegal"
                  className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition text-center shadow-lg"
                >
                  Analizar mi contrato (29€)
                </Link>
                <a
                  href="https://wa.me/34624177966?text=Urgente:%20creo%20que%20mi%20contrato%20es%20ilegal%20o%20fraudulento"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition text-center shadow-lg"
                >
                  🚨 Urgente (WhatsApp)
                </a>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p className="text-sm text-yellow-800">
                  <strong>⚠️ Si ya has pagado señal o arras:</strong> Actúa rápido. 
                  Cuanto antes detectemos el fraude, más probabilidades de recuperar tu dinero.
                </p>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Análisis en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Confidencial</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/keys.jpg"
                alt="Análisis de contrato ilegal o fraudulento"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl border-2 border-red-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🛡️</div>
                  <div>
                    <div className="font-bold text-gray-900">87%</div>
                    <div className="text-sm text-gray-600">fraudes detectados a tiempo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Señales de alerta */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Señales de que tu contrato puede ser ilegal
          </h2>
          <p className="text-xl text-center text-gray-600 mb-12">
            Si detectas <strong>2 o más de estas señales</strong>, consulta urgentemente
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🚩',
                title: 'Te piden pagar en efectivo',
                desc: 'Exigen toda la señal o arras en billetes. No aceptan transferencia bancaria ni quieren dejar rastro del pago.',
              },
              {
                icon: '🚩',
                title: 'Propietario con prisa extrema',
                desc: '"Firma hoy o pierdes el piso". Presión para que firmes sin leer, sin tiempo para consultar o pedir nota simple.',
              },
              {
                icon: '🚩',
                title: 'No te dejan ver la nota simple',
                desc: 'Dicen que "no hace falta", que "está todo bien", o ponen excusas para no mostrarte el Registro de la Propiedad.',
              },
              {
                icon: '🚩',
                title: 'Precio muy por debajo del mercado',
                desc: 'Un piso de 200.000€ a 120.000€. Ofertas "gangas" que son demasiado buenas para ser verdad.',
              },
              {
                icon: '🚩',
                title: 'Documentos con faltas o errores',
                desc: 'Contratos con faltas de ortografía graves, datos incoherentes, o que parecen hechos con plantillas antiguas.',
              },
              {
                icon: '🚩',
                title: 'No quieren ir a notario',
                desc: 'Proponen "contrato privado válido" sin escritura pública. O dicen que "el notario es caro e innecesario".',
              },
              {
                icon: '🚩',
                title: 'Vendedor no coincide con registro',
                desc: 'La persona que firma no es la que aparece como propietaria. O hay múltiples propietarios que no firman.',
              },
              {
                icon: '🚩',
                title: 'Te piden dinero antes de ver el piso',
                desc: '"Reserva sin verlo" o "envíame 500€ para apartarlo". Operaciones por WhatsApp sin conocer al vendedor.',
              },
              {
                icon: '🚩',
                title: 'Datos de contacto sospechosos',
                desc: 'Solo móvil extranjero, emails genéricos (Gmail/Outlook sin empresa), o se niegan a darte datos personales.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 hover:shadow-md transition">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-700 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué analizamos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué analizamos en tu caso?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '🔍',
                title: 'Verificación de identidad del vendedor',
                desc: 'Comprobamos si la persona que firma es realmente el propietario registral. Detectamos suplantaciones de identidad.',
              },
              {
                icon: '📋',
                title: 'Análisis de documentación',
                desc: 'Revisamos nota simple, DNI, escrituras previas. Detectamos documentos falsificados o manipulados digitalmente.',
              },
              {
                icon: '💰',
                title: 'Coherencia de precio y pago',
                desc: 'Comparamos precio con mercado. Analizamos si las condiciones de pago son sospechosas (efectivo, cuentas extranjeras, etc.).',
              },
              {
                icon: '⚖️',
                title: 'Validez legal del contrato',
                desc: 'Verificamos si el contrato cumple requisitos mínimos legales o si es completamente nulo de origen.',
              },
              {
                icon: '🏠',
                title: 'Cargas y gravámenes ocultos',
                desc: 'Comprobamos hipotecas, embargos, cargas que el vendedor oculta intencionadamente para estafarte.',
              },
              {
                icon: '🕵️',
                title: 'Patrones de estafa conocidos',
                desc: 'Comparamos tu caso con estafas inmobiliarias típicas: okupas que venden pisos ajenos, subarrendamientos ilegales, etc.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition flex gap-4">
                <div className="text-4xl">{item.icon}</div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Fraudes que hemos evitado
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">✅</div>
                <h3 className="text-xl font-bold text-gray-900">Caso 1: Okupa vendiendo piso ajeno</h3>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Situación:</strong> Cliente iba a pagar 15.000€ de arras por un piso a 180.000€. 
                Precio muy bueno para la zona.
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Detección:</strong> El "vendedor" no era propietario. Era un okupa que había falsificado DNI 
                y escrituras. El verdadero dueño vivía en el extranjero.
              </p>
              <p className="text-green-700 font-semibold">
                ✅ Resultado: Cliente no pagó nada. Denunciamos a Policía. Okupa detenido.
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">✅</div>
                <h3 className="text-xl font-bold text-gray-900">Caso 2: Hipoteca oculta superior al precio</h3>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Situación:</strong> Cliente iba a comprar piso por 150.000€. Vendedor muy insistente en 
                "no necesitas ver nota simple, créeme".
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Detección:</strong> Piso tenía hipoteca de 220.000€ impagada + embargo judicial. 
                Era imposible venderlo sin saldar deudas.
              </p>
              <p className="text-green-700 font-semibold">
                ✅ Resultado: Cliente evitó perder 150.000€. Vendedor tenía antecedentes por estafa.
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">✅</div>
                <h3 className="text-xl font-bold text-gray-900">Caso 3: Alquiler falso (subarriendo ilegal)</h3>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Situación:</strong> Cliente iba a alquilar piso. Le pedían 3 meses por adelantado (4.200€) 
                en efectivo "para evitar impuestos".
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Detección:</strong> El "casero" era realmente un inquilino que subarrendaba ilegalmente. 
                Contrato falso sin consentimiento del verdadero propietario.
              </p>
              <p className="text-green-700 font-semibold">
                ✅ Resultado: Cliente no pagó. Estafador denunciado. Recuperación inmediata.
              </p>
            </div>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="text-4xl">✅</div>
                <h3 className="text-xl font-bold text-gray-900">Caso 4: Documentos PDF falsificados</h3>
              </div>
              <p className="text-gray-700 mb-3">
                <strong>Situación:</strong> Cliente recibió "nota simple" y "escritura" por email en PDF. 
                Todo parecía correcto visualmente.
              </p>
              <p className="text-gray-700 mb-3">
                <strong>Detección:</strong> Los documentos estaban editados con Photoshop. Nombres cambiados, 
                sellos falsos. Pedimos nota simple oficial y no coincidía nada.
              </p>
              <p className="text-green-700 font-semibold">
                ✅ Resultado: Fraude detectado antes del pago. Denuncia interpuesta.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Cómo funciona el análisis?
          </h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Envías toda la documentación',
                desc: 'Contrato, nota simple (si la tienes), DNI del vendedor, escrituras, emails, WhatsApps. Cuanta más info, mejor.',
                time: '5 minutos',
              },
              {
                step: '2',
                title: 'Abogado investiga el caso',
                desc: 'Verificamos identidad, documentación, registro, precios de mercado, patrones de estafa. Análisis forense del contrato.',
                time: '12-24 horas',
              },
              {
                step: '3',
                title: 'Recibes informe de riesgo',
                desc: 'Te enviamos PDF con: nivel de riesgo (bajo/medio/alto/fraude confirmado), evidencias detectadas, recomendaciones y pasos a seguir.',
                time: 'Inmediato',
              },
              {
                step: '4',
                title: 'Plan de acción',
                desc: 'Si es fraude: te guiamos para denunciar y recuperar dinero. Si es legal pero con riesgos: te decimos cómo corregirlo.',
                time: 'Según caso',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6 items-start">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{item.time}</span>
                  </div>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precio */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Análisis urgente: 29€
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Mucho más barato que perder 10.000€ en un fraude inmobiliario
          </p>
          <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Análisis Anti-Fraude</h3>
            <div className="text-6xl font-bold text-red-600 mb-4">29€</div>
            <div className="text-sm text-gray-500 mb-6">IVA incluido · Entrega 24h</div>
            <ul className="text-left space-y-3 mb-8 max-w-md mx-auto">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Verificación de identidad del vendedor</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Análisis forense de documentación</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Detección de patrones de estafa</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Informe de riesgo en PDF</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Recomendaciones y plan de acción</span>
              </li>
            </ul>
            <Link
              href="/gestoria/solicitar/contrato-ilegal"
              className="block bg-red-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-red-700 transition"
            >
              Analizar mi contrato ahora
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Preguntas frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: '¿Qué hago si confirman que es un fraude?',
                a: 'Te damos informe detallado para denunciar a Policía/Guardia Civil. Si ya pagaste dinero, te orientamos para reclamación judicial y recuperación. El informe es válido como prueba.',
              },
              {
                q: '¿Puedo analizar el contrato antes de pagar señal?',
                a: 'Sí, es el momento ideal. Si detectamos fraude ANTES de pagar, evitas perder tu dinero. Es mucho más fácil prevenir que recuperar después.',
              },
              {
                q: '¿Analizáis tanto alquiler como compraventa?',
                a: 'Sí, analizamos contratos de alquiler, compraventa, arras, reserva, y cualquier documento inmobiliario sospechoso.',
              },
              {
                q: '¿Qué documentos necesitáis?',
                a: 'Contrato firmado o por firmar, nota simple (si la tienes), DNI/datos del vendedor, emails, WhatsApps, cualquier comunicación relevante. Cuanta más info, mejor análisis.',
              },
              {
                q: '¿Es confidencial?',
                a: 'Totalmente. No compartimos tu información con nadie salvo que tú autorices (ej: denuncia a Policía). Protección de datos garantizada.',
              },
            ].map((item, i) => (
              <details key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <summary className="font-bold text-lg text-gray-900 cursor-pointer">{item.q}</summary>
                <p className="mt-4 text-gray-600">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            No arriesgues tu dinero. Verifica antes de pagar.
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Por 29€ puedes descubrir si estás ante un fraude y evitar perder miles de euros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/contrato-ilegal"
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Analizar mi contrato (29€)
            </Link>
            <a
              href="https://wa.me/34624177966?text=URGENTE:%20sospecho%20que%20mi%20contrato%20es%20fraudulento"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-orange-700 transition shadow-lg border-2 border-white"
            >
              🚨 Consulta urgente (WhatsApp)
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
