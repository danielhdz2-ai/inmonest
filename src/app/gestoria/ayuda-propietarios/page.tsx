import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import { RELACIONADOS_AYUDA_PROPIETARIOS } from '@/lib/gestoria-relacionados'
import WhatsAppButton from '@/components/WhatsAppButton'

import { precio, precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'
const LABEL_AYUDA = precioLabel('ayuda-propietarios')
const LABEL_TEMPORADA = precioLabel('alquiler-temporada')
const LABEL_HABITACION = precioLabel('alquiler-habitaciones')
const PRECIO_AYUDA = precio('ayuda-propietarios')

export const metadata: Metadata = {
  title: `Contratos de Alquiler para Propietarios 【DESDE ${PRECIO_AYUDA}€】 LAU 2026`,
  description: `¿Alquilas tu piso? Contratos LAU legales adaptados a la Ley de Vivienda 2026. Protege tu inversión. Redactados por nuestra gestoría en 24h. Desde ${PRECIO_AYUDA}€.`,
  alternates: {
    canonical: `${BASE_URL}/gestoria/ayuda-propietarios`,
  },
  openGraph: {
    title: 'Contratos de alquiler para propietarios',
    description: `Contratos LAU legales que cumplen Ley de Vivienda 2026. Protege tu piso de inquilinos morosos. Redactados por nuestra gestoría. 24h. Desde ${PRECIO_AYUDA}€.`,
    url: `${BASE_URL}/gestoria/ayuda-propietarios`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/promo3.png`, width: 1200, height: 630, alt: 'Contratos alquiler propietarios' }],
  },
}

export const revalidate = 86400  // 24 horas (antes: 1h - optimizado para reducir CPU)

export default function AyudaPropietariosPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contratos de Alquiler para Propietarios',
    description: 'Contratos de alquiler LAU personalizados y adaptados a la Ley de Vivienda 2026. Redactados por gestoría inmobiliaria experta para proteger tu inversión inmobiliaria.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    offers: {
      '@type': 'Offer',
      price: String(PRECIO_AYUDA),
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
      <section className="bg-gradient-to-br from-orange-50 to-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                ✅ Ley de Vivienda 2026 cumplida
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                ¿Alquilas tu piso? <br/><span className="text-gold-500">Protégelo con un contrato legal</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Contratos de alquiler LAU personalizados y adaptados a la <strong>Ley de Vivienda 2026</strong>. 
                Protege tu inversión de inquilinos morosos, impagos y okupa. Redactados por nuestra gestoría en 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href="/gestoria/solicitar/ayuda-propietarios"
                  className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
                >
                  Solicitar contrato ({LABEL_AYUDA})
                </Link>
                <a
                  href="https://wa.me/34745022862?text=Hola,%20necesito%20un%20contrato%20de%20alquiler%20para%20mi%20piso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition text-center shadow-lg"
                >
                  WhatsApp directo
                </a>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Entrega en 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Personalizado</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>IVA incluido</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/promo3.png"
                alt="Propietario firmando contrato de alquiler"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-xl border-2 border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">🏠</div>
                  <div>
                    <div className="font-bold text-gray-900">245</div>
                    <div className="text-sm text-gray-600">propietarios protegidos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Por qué necesitas un contrato profesional?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-gold-500">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Evita inquilinos morosos</h3>
              <p className="text-gray-700">
                Cláusulas claras sobre fianza, plazos de pago, y consecuencias del impago. 
                Facilita el desahucio si el inquilino no paga.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-gold-500">
              <div className="text-4xl mb-4">⚖️</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Cumple la Ley de Vivienda 2026</h3>
              <p className="text-gray-700">
                Adaptado a toda la normativa vigente: fianzas, prórrogas, subidas de renta, 
                mascotas, suministros, etc. Sin riesgo de nulidad.
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-gold-500">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Maximiza tus rentas</h3>
              <p className="text-gray-700">
                Incluimos cláusulas de actualización IPC, reparto justo de gastos, 
                y condiciones que protegen tu rentabilidad sin ser abusivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Qué incluimos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            ¿Qué incluye tu contrato personalizado?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: '📝',
                title: 'Identificación completa',
                desc: 'Datos de propietario e inquilino, identificación del inmueble (referencia catastral, metros, linderos), y destino de la vivienda.',
              },
              {
                icon: '💰',
                title: 'Renta y fianza',
                desc: 'Precio mensual, forma de pago, fianza legal (máx. 2 meses), depósito de suministros si aplica, y garantías adicionales permitidas.',
              },
              {
                icon: '📅',
                title: 'Duración y prórrogas',
                desc: 'Plazo inicial, prórroga obligatoria de 5 años, prórroga tácita de 3 años, condiciones de desistimiento para ambas partes.',
              },
              {
                icon: '📈',
                title: 'Actualización de renta',
                desc: 'Cláusula de actualización según IPC con los límites legales. Transparente y conforme a la Ley de Vivienda 2026.',
              },
              {
                icon: '🔧',
                title: 'Reparaciones y mantenimiento',
                desc: 'Qué gastos corresponden al propietario (estructurales) y cuáles al inquilino (uso diario). Evita conflictos futuros.',
              },
              {
                icon: '🏢',
                title: 'Gastos e impuestos',
                desc: 'Reparto de IBI, comunidad de propietarios, suministros, derramas, etc. Conforme a normativa vigente.',
              },
              {
                icon: '📋',
                title: 'Inventario detallado',
                desc: 'Anexo con estado de la vivienda, muebles, electrodomésticos, y desperfectos previos. Fundamental para devolución de fianza.',
              },
              {
                icon: '🚪',
                title: 'Condiciones de salida',
                desc: 'Cláusulas de desistimiento, preaviso, devolución de fianza, estado de entrega, y penalizaciones por incumplimiento.',
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

      {/* Tipos de contratos */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Contratos para cada situación
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border-2 border-orange-200 rounded-lg p-6 hover:border-orange-500 transition">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Alquiler LAU (vivienda habitual)</h3>
              <div className="text-3xl font-bold text-gold-500 mb-3">{LABEL_AYUDA}</div>
              <p className="text-gray-600 mb-4">
                Para alquilar como vivienda principal del inquilino. Protección LAU completa, 
                5 años + 3 prórroga tácita.
              </p>
              <Link
                href="/gestoria/solicitar/ayuda-propietarios"
                className="block text-center bg-gold-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Solicitar →
              </Link>
            </div>
            <div className="border-2 border-orange-200 rounded-lg p-6 hover:border-orange-500 transition">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Alquiler temporal</h3>
              <div className="text-3xl font-bold text-gold-500 mb-3">{LABEL_TEMPORADA}</div>
              <p className="text-gray-600 mb-4">
                Para estancias cortas (estudios, trabajo temporal). Menos de 1 año. 
                Condiciones específicas para temporales.
              </p>
              <Link
                href="/gestoria/solicitar/alquiler-temporada"
                className="block text-center bg-gold-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Solicitar →
              </Link>
            </div>
            <div className="border-2 border-orange-200 rounded-lg p-6 hover:border-orange-500 transition">
              <h3 className="text-xl font-bold mb-3 text-gray-900">Alquiler de habitación</h3>
              <div className="text-3xl font-bold text-gold-500 mb-3">{LABEL_HABITACION}</div>
              <p className="text-gray-600 mb-4">
                Para alquilar una habitación en piso compartido. Espacios comunes, normas de convivencia, etc.
              </p>
              <Link
                href="/gestoria/solicitar/alquiler-habitaciones"
                className="block text-center bg-gold-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#b8872a] transition"
              >
                Solicitar →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <GestoriaLandingExtras
          servicio="ayuda-propietarios"
          servicioNombre="Ayuda Propietarios LAU"
          whatsappMessage="Hola Daniel, soy propietario y necesito ayuda con mi contrato de alquiler"
          phase="contact"
        />
      </div>

      {/* Para agencias */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            ¿Eres agencia inmobiliaria?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Ofrecemos <strong>descuentos por volumen</strong> para agencias que necesitan contratos recurrentes.
          </p>
          <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Packs para Agencias</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-3xl font-bold text-gold-500">10 contratos</div>
                <div className="text-gray-600">{LABEL_AYUDA}/ud — consultar descuento</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-500">25 contratos</div>
                <div className="text-gray-600">{LABEL_AYUDA}/ud — consultar descuento</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-500">50+ contratos</div>
                <div className="text-gray-600">Consultar precio</div>
              </div>
            </div>
            <a
              href="https://wa.me/34745022862?text=Hola,%20soy%20agencia%20inmobiliaria%20y%20necesito%20contratos%20de%20alquiler%20en%20volumen"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#b8872a] transition"
            >
              Contactar para pack agencias
            </a>
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
                q: '¿Cuánto tarda en estar listo?',
                a: 'Entre 24 y 48 horas laborables. Te enviamos un formulario para personalizar el contrato (datos, renta, fianza, etc.) y lo redactamos en PDF firmable.',
              },
              {
                q: '¿Puedo usar el mismo contrato para todos mis pisos?',
                a: 'No es recomendable. Cada piso tiene características distintas (ubicación, estado, muebles, etc.). Pero podemos hacerte packs con descuento si tienes varios pisos.',
              },
              {
                q: '¿El contrato sirve para desahucio por impago?',
                a: 'Sí. Incluimos todas las cláusulas necesarias para que puedas iniciar un desahucio por impago con garantías legales. El contrato es válido ante juzgado.',
              },
              {
                q: '¿Qué pasa si la ley cambia?',
                a: 'Si hay cambios legislativos importantes, te avisamos por email y te ofrecemos actualización del contrato a precio reducido.',
              },
              {
                q: '¿Incluye el inventario de muebles?',
                a: 'Sí. Te enviamos plantilla de inventario para que rellenes el estado de la vivienda, muebles, electrodomésticos, etc. Se adjunta al contrato como anexo.',
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


      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <GestoriaLandingExtras
          servicio="ayuda-propietarios"
          servicioNombre="Ayuda Propietarios LAU"
          testimonioLanding="ayuda-propietarios"
          relacionados={RELACIONADOS_AYUDA_PROPIETARIOS}
          phase="footer"
          skipDaniel
          skipLlamaGestor
        />
      </div>

      {/* CTA Final */}
      <section className="py-16 px-4 bg-gold-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Protege tu inversión inmobiliaria
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Un contrato profesional te ahorra miles de euros en problemas legales futuros.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/ayuda-propietarios"
              className="bg-white text-gold-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Solicitar contrato ({LABEL_AYUDA})
            </Link>
            <a
              href="https://wa.me/34745022862?text=Hola,%20necesito%20asesoramiento%20para%20alquilar%20mi%20piso"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#b8872a] transition shadow-lg border-2 border-white"
            >
              Asesoramiento gratuito (WhatsApp)
            </a>
          </div>
        </div>
      </section>

      {/* Relacionados */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-gray-900">Servicios relacionados</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/gestoria/solicitar/rescision-alquiler" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-gold-500">Rescisión de contrato</h3>
              <p className="text-gray-600 text-sm mb-3">
                Si necesitas rescindir un contrato de alquiler por incumplimiento del inquilino.
              </p>
              <span className="text-gold-500 font-semibold">Desde {LABEL_AYUDA} →</span>
            </Link>
            <Link href="/gestoria" className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-bold text-lg mb-2 text-gold-500">Más servicios de gestoría</h3>
              <p className="text-gray-600 text-sm mb-3">
                Revisión de contratos, arras, compraventa y más servicios legales inmobiliarios.
              </p>
              <span className="text-gold-500 font-semibold">Ver todos →</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

