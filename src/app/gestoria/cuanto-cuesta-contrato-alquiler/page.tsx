import type { Metadata } from 'next'
import Link from 'next/link'
import GestoriaGuiaPageLayout from '@/components/GestoriaGuiaPageLayout'
import { RELACIONADOS_ALQUILER } from '@/lib/gestoria-relacionados'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  // ≤48 chars: layout añade " | Inmonest" → precio visible en SERP
  title: 'Contrato de alquiler desde 145€ — Precio 2026',
  description:
    'Precio real 2026: gestoría online desde 145€ en 48h, notario 300–500€, plantilla gratis con riesgos. Comparativa clara de qué incluye cada opción y contratación online.',
  alternates: {
    canonical: `${BASE_URL}/gestoria/cuanto-cuesta-contrato-alquiler`,
  },
  openGraph: {
    title: 'Contrato de alquiler desde 145€ — Precio 2026',
    description:
      'Gestoría online desde 145€ en 48h vs notario 300–500€. Comparativa de precios reales y qué incluye cada opción.',
    url: `${BASE_URL}/gestoria/cuanto-cuesta-contrato-alquiler`,
    type: 'article',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta un contrato de alquiler en 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un contrato de alquiler LAU profesional cuesta entre 145€ (gestoría online) y 500€ (notario). Las plantillas gratuitas existen pero tienen riesgos legales importantes. El precio depende de si lo haces online, ante notario o con gestoría presencial.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto cuesta hacer un contrato de alquiler en una gestoría?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'En una gestoría online como Inmonest, desde 145€ IVA incluido con entrega en 48h. En gestorías presenciales el rango habitual es 200–400€. Un notario suele cobrar 300–500€. La diferencia está en plazo, personalización LAU y si incluye inventario y cláusulas actualizadas a 2026.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Cuánto vale hacer un contrato de alquiler?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Desde 145€ online (profesional), 0€ con plantilla genérica (mayor riesgo legal) o 300–500€ ante notario. Para alquileres habituales, un contrato privado LAU profesional es suficiente y más económico que el notario.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Es obligatorio hacer el contrato de alquiler ante notario?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Un contrato privado firmado por propietario e inquilino es 100% válido. Solo necesitas notario si quieres registrarlo (opcional) o si la duración es superior a 3 años y quieres oponerlo a terceros. Para alquileres normales, un contrato privado profesional es suficiente.',
      },
    },
    {
      '@type': 'Question',
      name: '¿Qué incluye un contrato de alquiler LAU profesional?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Adaptación a Ley de Vivienda 2026, cláusulas personalizadas (mascotas, subarrendamiento, obras), inventario de mobiliario, gestión de fianzas, prórroga automática, causas de resolución, responsabilidad de reparaciones y garantías legales para ambas partes.',
      },
    },
  ],
}

export default function CuantoCuestaContratoAlquilerPage() {
  return (
    <GestoriaGuiaPageLayout
      jsonLd={faqSchema}
      badge="Guía de Precios 2026"
      title="Contrato de alquiler desde 145€ — Precio 2026"
      lead="Precio real 2026: gestoría online desde 145€ en 48h, notario 300–500€ o plantilla gratis (con riesgos). Elige según presupuesto y protección legal."
      imageSrc="/interior3.jpg"
      imageAlt="Precios de contratos de alquiler LAU en 2026"
      breadcrumbLabel="Precio Contrato Alquiler"
      heroActions={[
        { href: '/gestoria/solicitar/contrato-alquiler', label: 'Contratar LAU — 145€' },
        { href: '/valencia/contrato-alquiler', label: 'Ejemplo Valencia', variant: 'secondary' },
        { href: '/gestoria/solicitar/revision-alquiler', label: 'Revisar contrato — 120€', variant: 'secondary' },
      ]}
      servicio="contrato-alquiler"
      servicioNombre="Contrato de Alquiler LAU"
      whatsappMessage="Hola Daniel, tengo dudas sobre el precio del contrato de alquiler"
      ctaTitle="Contrato de alquiler LAU por 145€"
      ctaDescription="Redactado por gestoría especializada. Adaptado a Ley de Vivienda 2026. Cláusulas personalizadas y entrega en 48h."
      ctaPrimaryHref="/gestoria/solicitar/contrato-alquiler"
      ctaPrimaryLabel="Solicitar contrato — 145€"
      ctaImageSrc="/interior3.jpg"
      ctaImageAlt="Contrato de alquiler LAU profesional"
      relacionados={RELACIONADOS_ALQUILER}
    >
          <div className="bg-white rounded-xl border border-gold-200 shadow-sm p-5 sm:p-6 -mt-4">
            <p className="text-sm font-semibold text-gold-800 mb-2">Respuesta rápida (gestoría)</p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              <strong>¿Cuánto cuesta hacer un contrato de alquiler en una gestoría?</strong>{' '}
              Online desde <strong>145€</strong> (48h). Presencial suele ir de 200 a 400€. Notario: 300–500€.
              Abajo tienes la comparativa completa y qué incluye cada opción.
            </p>
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <Link href="/calculadora-gastos-alquiler" className="text-gold-700 font-medium underline">
                Calculadora gastos alquiler
              </Link>
              <Link href="/bilbao/alquiler-particulares" className="text-gold-700 font-medium underline">
                Alquiler particulares Bilbao
              </Link>
              <Link href="/malaga/alquiler-particulares" className="text-gold-700 font-medium underline">
                Particulares Málaga
              </Link>
            </div>
          </div>

          {/* Comparativa de precios */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Comparativa de Precios: ¿Qué Opción Elegir?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Opción 1: Plantilla */}
              <div className="bg-white border-2 border-red-300 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 mb-3">
                    Alto Riesgo
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plantilla Gratis</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">0€</div>
                  <div className="text-sm text-gray-500">Internet / Word</div>
                </div>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">Descarga inmediata</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Sin adaptación a tu caso</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">No cumple Ley Vivienda 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Cláusulas genéricas o ilegales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Sin revisión legal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Puede ser anulada por un juez</span>
                  </li>
                </ul>
                <div className="text-center">
                  <div className="text-xs text-red-700 font-semibold">NO RECOMENDADO</div>
                </div>
              </div>

              {/* Opción 2: Gestoría Online (RECOMENDADO) */}
              <div className="bg-gradient-to-br from-gold-500 to-gold-700 text-white rounded-xl p-6 shadow-xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gold-500">
                  RECOMENDADO
                </div>
                <div className="text-center mb-4 mt-2">
                  <h3 className="text-xl font-bold mb-2">Gestoría Online</h3>
                  <div className="text-4xl font-bold mb-1">145€</div>
                  <div className="text-sm text-white/80">Redacción profesional</div>
                </div>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Adaptado a Ley Vivienda 2026</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Cláusulas personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Redactado por gestores expertos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Entrega en 48h</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Soporte legal incluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5">✓</span>
                    <span>Garantía 100% legal</span>
                  </li>
                </ul>
                <Link
                  href="/gestoria/solicitar/contrato-alquiler"
                  className="block w-full text-center px-4 py-3 rounded-lg bg-white text-gold-500 font-bold hover:bg-gray-100 transition"
                >
                  Contratar Ahora
                </Link>
              </div>

              {/* Opción 3: Notario */}
              <div className="bg-white border-2 border-gray-300 rounded-xl p-6">
                <div className="text-center mb-4">
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-700 mb-3">
                    Opción Premium
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Notario</h3>
                  <div className="text-4xl font-bold text-gray-900 mb-1">300-500€</div>
                  <div className="text-sm text-gray-500">Presencial + registro</div>
                </div>
                <ul className="space-y-3 text-sm mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">Fe pública oficial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">Registro incluido</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span className="text-gray-700">Mayor seguridad jurídica</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Precio alto (3-4x más caro)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Requiere cita presencial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">✗</span>
                    <span className="text-gray-700">Innecesario para alquileres {'<'}3 años</span>
                  </li>
                </ul>
                <div className="text-center">
                  <div className="text-xs text-gray-600 font-semibold">Solo si alquiler {'>'}3 años</div>
                </div>
              </div>
            </div>

            <div className="bg-cream-100 border-l-4 border-gold-500 p-6 rounded-r-lg">
              <h3 className="font-bold text-gold-900 mb-2">Nuestra recomendación</h3>
              <p className="text-gold-800 text-sm">
                Para el <strong>95% de alquileres</strong> (vivienda habitual, 5-7 años), un 
                <strong> contrato privado profesional (145€)</strong> es más que suficiente. 
                Solo usa notario si: el alquiler es {'>'}10 años, el inmueble es comercial de alto valor, 
                o necesitas registrarlo para hipotecarlo.
              </p>
            </div>
          </section>

          {/* Qué incluye cada opción */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué Incluye Cada Opción? Comparativa Detallada
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Característica</th>
                    <th className="px-6 py-4 text-center font-semibold text-red-700">Plantilla</th>
                    <th className="px-6 py-4 text-center font-semibold text-green-700">Gestoría 145€</th>
                    <th className="px-6 py-4 text-center font-semibold text-gold-700">Notario 300€+</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Adaptado Ley Vivienda 2026</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Cláusulas personalizadas</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Redacción por gestores expertos</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Inventario de mobiliario</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                    <td className="px-6 py-4 text-center text-gray-400">Opcional</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Gestión de fianzas</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                    <td className="px-6 py-4 text-center text-gray-400">Opcional</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Soporte legal post-firma</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Fe pública oficial</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Registro Propiedad</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-red-500">✗</td>
                    <td className="px-6 py-4 text-center text-green-500">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-gray-900">Entrega</td>
                    <td className="px-6 py-4 text-center text-gray-700">Inmediata</td>
                    <td className="px-6 py-4 text-center text-gray-700">48h</td>
                    <td className="px-6 py-4 text-center text-gray-700">1 semana</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Precio total</td>
                    <td className="px-6 py-4 text-center text-gray-700 font-bold">0€</td>
                    <td className="px-6 py-4 text-center text-green-700 font-bold">145€</td>
                    <td className="px-6 py-4 text-center text-gold-700 font-bold">300-500€</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* CTA Intermedio */}
          <div className="bg-gradient-to-br from-gold-500 to-gold-700 text-white rounded-2xl p-8 mb-12 text-center">
            <h3 className="text-2xl font-bold mb-3">
              Contrato de Alquiler LAU Profesional por 145€
            </h3>
            <p className="text-lg text-white/90 mb-6">
              Adaptado a Ley de Vivienda 2026. Redactado por gestores especializados. 
              Cláusulas personalizadas para tu situación. Entrega en 48h.
            </p>
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-white text-gold-500 font-bold hover:bg-gray-100 transition text-lg"
            >
              Contratar Ahora - 145€
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <p className="text-sm text-white/70 mt-4">+3.500 contratos redactados • Garantía legal total • Soporte post-firma</p>
          </div>

          {/* Qué incluye nuestro contrato */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Qué Incluye Nuestro Contrato de Alquiler LAU (145€)
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Cláusulas Legales Obligatorias
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Adaptación completa a Ley Vivienda 12/2023</li>
                  <li>Duración: 5 años (arrendador persona física) o 7 años (empresa)</li>
                  <li>Prórroga automática anual</li>
                  <li>Actualización renta según IPC limitado</li>
                  <li>Depósito fianza legal (1-2 mensualidades)</li>
                  <li>Causas de resolución anticipada</li>
                  <li>Derecho de tanteo y retracto</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Cláusulas Personalizadas
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Mascotas: permitidas o prohibidas (tú decides)</li>
                  <li>Subarrendamiento: condiciones o prohibición</li>
                  <li>Obras menores: quién paga, límites</li>
                  <li>Comunidad de vecinos: reparto de gastos</li>
                  <li>Suministros: titularidad y pago</li>
                  <li>Inventario de mobiliario y electrodomésticos</li>
                  <li>Estado de conservación inicial</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Protecciones Legales
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Cláusulas anti-desahucio express</li>
                  <li>Garantías de habitabilidad (ITE, cédula)</li>
                  <li>Responsabilidad reparaciones mayores/menores</li>
                  <li>Procedimiento impago de rentas</li>
                  <li>Notificaciones y comunicaciones oficiales</li>
                  <li>Devolución fianza: plazos y deducciones</li>
                </ul>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">
                  Servicios Incluidos
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>Redacción por gestores especializados</li>
                  <li>Entrega en 48h laborables</li>
                  <li>Formato PDF editable</li>
                  <li>Revisiones ilimitadas antes de firmar</li>
                  <li>Soporte legal post-firma (30 días)</li>
                  <li>Modelo de inventario de mobiliario</li>
                  <li>Guía de gestión de fianzas por CCAA</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Casos de uso */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              ¿Qué Opción Elegir Según tu Situación?
            </h2>
            
            <div className="space-y-4">
              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-green-900 mb-2">Elige Gestoría Online (145€) si:</h3>
                <ul className="text-sm text-green-800 space-y-1 ml-4">
                  <li>• Alquilas piso de vivienda habitual (uso residencial)</li>
                  <li>• Duración del contrato: 1-10 años</li>
                  <li>• Quieres cláusulas personalizadas (mascotas, obras, etc.)</li>
                  <li>• Necesitas entrega rápida (48h) y online</li>
                  <li>• Presupuesto ajustado pero quieres seguridad legal</li>
                </ul>
              </div>

              <div className="bg-cream-100 border-l-4 border-gold-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-gold-900 mb-2">Elige notario (300-500€) si:</h3>
                <ul className="text-sm text-gold-800 space-y-1 ml-4">
                  <li>• El alquiler es superior a 10 años</li>
                  <li>• Alquilas local comercial de alto valor (+5.000€/mes)</li>
                  <li>• Necesitas registrarlo para hipotecar el inmueble</li>
                  <li>• Una de las partes vive en el extranjero</li>
                  <li>• Quieres máxima seguridad jurídica (fe pública)</li>
                </ul>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-red-900 mb-2">Importante:NUNCA uses Plantilla Gratis si:</h3>
                <ul className="text-sm text-red-800 space-y-1 ml-4">
                  <li>• El inmueble vale más de 100.000€</li>
                  <li>• La renta mensual es superior a 600€</li>
                  <li>• Hay situaciones especiales (mascotas, obras, subarrendamiento)</li>
                  <li>• Alquilas en zona tensionada (Madrid, Barcelona, Valencia)</li>
                  <li>• No tienes conocimientos legales para personalizarla</li>
                </ul>
                <p className="mt-3 text-sm text-red-900 font-semibold">
                  Un contrato mal redactado puede costarte miles de euros en juicios o desahucios fallidos. 
                  No arriesgues tu patrimonio por ahorrar 145€.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes sobre Precios
            </h2>
            <div className="space-y-4">
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Cuánto cuesta hacer un contrato de alquiler en una gestoría?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  En gestoría online (Inmonest): desde 145€ IVA incluido en 48h. Presencial: suele ir de 200 a 400€.
                  Notario: 300–500€. La opción online cubre LAU + Ley de Vivienda 2026 con inventario y cláusulas a medida.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Cuánto vale hacer un contrato de alquiler?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Desde 145€ profesional online, 0€ con plantilla genérica (mayor riesgo) o 300–500€ ante notario.
                  Para vivienda habitual, un contrato privado LAU bien hecho es suficiente y más barato que el notario.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Por qué una gestoría online es más barata que un notario?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Porque no incluye fe pública ni registro. Un contrato privado profesional es 100% válido legalmente, 
                  pero no tiene la "presunción de veracidad" del notario. Para alquileres normales (vivienda, {'<'}3 años), 
                  la fe pública es innecesaria, por eso el precio es menor.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Qué pasa si uso una plantilla gratis y hay problemas?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Riesgos: cláusulas ilegales (un juez puede anularlas), falta de adaptación a Ley Vivienda 2026 
                  (multas de 3.000-9.000€), imposibilidad de desahuciar por impago si no cumple requisitos formales, 
                  y pérdida de derechos como propietario. Casos reales: desahucios rechazados por "defectos de forma" 
                  en contratos DIY.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Puedo modificar el contrato después de recibirlo?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  Sí. Te entregamos el contrato en PDF editable. Puedes hacer modificaciones menores (fechas, nombres, 
                  cantidades). Para cambios estructurales, te recomendamos consultarnos antes de firmar. 
                  Incluimos 1 revisión gratuita si necesitas ajustar algo importante.
                </p>
              </details>
              <details className="bg-white border-2 border-gray-200 rounded-lg p-6 cursor-pointer hover:border-gold-500 transition">
                <summary className="font-bold text-gray-900">
                  ¿Incluye el contrato la gestión de fianzas en la CCAA?
                </summary>
                <p className="text-gray-700 mt-3 text-sm">
                  El contrato incluye cláusulas sobre fianzas, pero la gestión administrativa (depositar en el organismo 
                  autonómico) la haces tú. Te enviamos una guía paso a paso para tu comunidad autónoma. 
                  En Madrid es IVIMA, en Cataluña es Agència de l'Habitatge, etc. Es gratis y online.
                </p>
              </details>
            </div>
          </section>

          {/* Enlaces relacionados */}
          <section className="p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">También te puede interesar</h2>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <Link href="/calculadora-gastos-alquiler" className="text-gold-600 hover:underline font-medium">
                → Calculadora de gastos de alquiler (gratis)
              </Link>
              <Link href="/bilbao/contrato-alquiler" className="text-gold-600 hover:underline font-medium">
                → Contrato de alquiler en Bilbao (145€)
              </Link>
              <Link href="/malaga/contrato-alquiler" className="text-gold-600 hover:underline font-medium">
                → Contrato de alquiler en Málaga (145€)
              </Link>
              <Link href="/blog/que-es-gestoria-inmobiliaria" className="text-gold-600 hover:underline font-medium">
                → ¿Qué es una gestoría inmobiliaria?
              </Link>
            </div>
          </section>
    </GestoriaGuiaPageLayout>
  )
}
