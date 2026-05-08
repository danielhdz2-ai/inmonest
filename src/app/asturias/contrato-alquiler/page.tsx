import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contratar Contrato de Alquiler LAU en Asturias 【120€】 Gestoría Experta | Inmonest',
  description: '¿Necesitas un contrato de alquiler LAU en Asturias? Redacción personalizada por gestoría inmobiliaria experta en 48h. Precio fijo 120€. Oviedo, Gijón, Avilés.',
  keywords: ['contratar contrato alquiler Asturias', 'comprar contrato alquiler Oviedo', 'solicitar contrato alquiler LAU Gijón', 'precio contrato alquiler Asturias', 'gestoría contrato alquiler Avilés'],
  alternates: {
    canonical: `${BASE_URL}/asturias/contrato-alquiler`,
  },
  openGraph: {
    title: 'Contrato de Alquiler LAU en Asturias - 120€ | Inmonest',
    description: 'Contrato de alquiler vivienda en Asturias. Gestoría inmobiliaria experta. LAU + Ley Vivienda 2026. 48h. 120€.',
    url: `${BASE_URL}/asturias/contrato-alquiler`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria/gestoria7.jpg`, width: 1200, height: 630, alt: 'Contrato de alquiler Asturias' }],
  },
}

export const revalidate = 3600

export default function ContratoAlquilerAsturiasPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contrato de Alquiler de Vivienda (LAU) en Asturias',
    description: 'Redacción de contrato de alquiler de vivienda en Asturias. Adaptado a LAU y Ley de Vivienda 2026. Gestoría inmobiliaria experta en contratos de alquiler.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'State',
      name: 'Asturias',
      containedIn: { '@type': 'Country', name: 'España' },
    },
    offers: {
      '@type': 'Offer',
      price: '120',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿Cuánto puede actualizarse el alquiler cada año en Asturias?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Desde 2024, los grandes tenedores están limitados al IPC negociado (máx. 3%). Para pequeños propietarios en Oviedo, Gijón y Avilés, el límite es el IPC + 2%. Nuestro contrato incorpora la fórmula correcta según tu caso.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo dura el contrato de alquiler mínimo?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La LAU establece una duración mínima de 5 años para personas físicas y 7 para personas jurídicas, con prórrogas tácitas anuales. Puedes acordar duraciones superiores pero no inferiores.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué fianza es obligatoria en Asturias?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico de Asturias. Adicionalmente se pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
        },
      },
      {
        '@type': 'Question',
        name: '¿El contrato es válido en todo el Principado de Asturias?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, el contrato de alquiler LAU es válido en toda Asturias (Oviedo, Gijón, Avilés, Langreo, Mieres). Se adapta a la legislación estatal y autonómica vigente.',
        },
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Navbar />
      <WhatsAppButton />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[400px] sm:h-[480px] overflow-hidden">
        <Image
          src="/gestoria/gestoria7.jpg"
          alt="Contrato de alquiler en Asturias"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#3d2a05]/90 via-[#7a5c1e]/70 to-transparent" />

        <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-12">
          <nav className="flex items-center gap-1.5 text-xs text-white/50 mb-4">
            <Link href="/" className="hover:text-white/80 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-white/80 transition-colors">Gestoría</Link>
            <span>/</span>
            <span className="text-white/80">Contrato de Alquiler Asturias</span>
          </nav>

          <span className="inline-block bg-[#c9a84c] text-[#3d2a05] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
            Alquiler · Asturias
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 max-w-2xl">
            Contrato de Alquiler de Vivienda (LAU) en Asturias
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-5">
            Adaptado a la Ley de Vivienda 2026 y LAU vigente para Oviedo, Gijón y Avilés
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-3xl font-bold text-[#c9a84c]">120 €</span>
              <span className="text-white/50 text-xs ml-2">IVA incluido</span>
            </div>
            <span className="text-white/60 text-sm">· Entrega en 48h · PDF firmable</span>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">

        {/* ── DESCRIPCIÓN + CTA ─────────────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-orange-50 border-l-4 border-[#c9a84c] p-4 rounded-r-lg mb-6">
              <p className="text-gray-800 font-semibold text-lg">¿Necesitas redactar un Contrato de Alquiler de Vivienda (LAU) en Asturias?</p>
              <p className="text-gray-600 text-sm mt-1">Gestoría inmobiliaria experta lo redacta por ti en 48h. Precio fijo: 120€. Adaptado a Ley de Vivienda 2026.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¿Qué es el contrato de alquiler LAU?</h2>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">
              El contrato de alquiler de vivienda habitual está regulado por la Ley de Arrendamientos Urbanos (LAU) y la Ley de Vivienda de 2023 con sus actualizaciones de 2026. En Asturias (Oviedo, Gijón, Avilés, Langreo, Mieres), un contrato mal redactado puede suponer años de problemas: cláusulas nulas, actualizaciones de renta incorrectas, imposibilidad de recuperar el piso o disputas por la fianza. Nuestro equipo jurídico redacta contratos personalizados que protegen al propietario y cumplen con todos los derechos del inquilino exigidos por ley.
            </p>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">¿Para quién es este contrato en Asturias?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Propietarios en Asturias que van a alquilar su piso por primera vez
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Arrendadores que tienen contratos antiguos y quieren actualizarlos
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Inquilinos que quieren revisar las condiciones antes de firmar
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Cualquier alquiler de vivienda habitual de larga duración en Asturias
                </li>
              </ul>
            </div>
          </div>

          {/* Tarjeta CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#fdf8ee] border border-[#e8d48a] rounded-2xl p-6 space-y-4">
              <p className="text-sm text-[#7a5c1e] font-medium uppercase tracking-wide">Alquiler · Asturias</p>
              <h3 className="text-xl font-bold text-gray-900">Contrato de Alquiler LAU</h3>
              <div>
                <p className="text-4xl font-bold text-[#c9a84c]">120 €</p>
                <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Adaptado a la Ley de Vivienda 2026 y LAU vigente
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Cláusulas de actualización de renta (IPC limitado)
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Anexo de inventario de mobiliario y estado
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Entrega en PDF firmable en 48h
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/contrato-alquiler"
                className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Solicitar ahora
              </Link>
              <a
                href="https://wa.me/34641009947?text=Hola,%20necesito%20un%20contrato%20de%20alquiler%20en%20Asturias"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm"
              >
                💬 WhatsApp: 641 009 947
              </a>
              <a
                href="tel:+34641009947"
                className="block w-full text-center border border-[#c9a84c] text-[#c9a84c] hover:bg-[#fdf8ee] font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                📞 Llamar: 641 009 947
              </a>
              <Link
                href="/gestoria"
                className="block w-full text-center border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2.5 px-4 rounded-xl transition-colors text-sm"
              >
                Ver todos los contratos
              </Link>
            </div>
          </div>
        </section>

        {/* ── QUÉ INCLUYE ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Qué incluye el servicio?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Adaptado a la Ley de Vivienda 2026 y LAU vigente',
              'Cláusulas de actualización de renta (IPC limitado)',
              'Fianza legal y garantías adicionales opcionales',
              'Anexo de inventario de mobiliario y estado del inmueble',
              'Régimen de obras, mascotas y subarrendamiento',
              'Entrega en PDF firmable digitalmente en 48h',
            ].map((inc, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-[#c9a84c] text-lg mt-0.5 shrink-0">✓</span>
                <span className="text-gray-700 text-sm">{inc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ───────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">¿Cómo funciona?</h2>
          <div className="space-y-6">
            {[
              { num: '01', titulo: 'Solicita el contrato', desc: 'Facilita los datos del propietario, inquilino, piso y condiciones económicas. El formulario es guiado y claro.' },
              { num: '02', titulo: 'Redacción personalizada', desc: 'Nuestro equipo de gestoría redacta un contrato a medida, verificando que todas las cláusulas cumplen la legislación vigente.' },
              { num: '03', titulo: 'Listo para firmar', desc: 'Recibes el contrato PDF en 48h, firmable digitalmente. El inventario de mobiliario se incluye como anexo.' },
            ].map((paso) => (
              <div key={paso.num} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-full bg-[#c9a84c] flex items-center justify-center text-white font-bold text-lg">
                    {paso.num}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{paso.titulo}</h3>
                  <p className="text-gray-600">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {[
              {
                q: '¿Cuánto puede actualizarse el alquiler cada año en Asturias?',
                a: 'Desde 2024, los grandes tenedores están limitados al IPC negociado (máx. 3%). Para pequeños propietarios en Oviedo, Gijón y Avilés, el límite es el IPC + 2%. Nuestro contrato incorpora la fórmula correcta según tu caso.',
              },
              {
                q: '¿Cuánto tiempo dura el contrato de alquiler mínimo?',
                a: 'La LAU establece una duración mínima de 5 años para personas físicas y 7 para personas jurídicas, con prórrogas tácitas anuales. Puedes acordar duraciones superiores pero no inferiores.',
              },
              {
                q: '¿Qué fianza es obligatoria en Asturias?',
                a: 'Una mensualidad de renta como fianza legal mínima, que debe depositarse en el organismo autonómico de Asturias. Adicionalmente, propietario e inquilino pueden acordar garantías adicionales (hasta 2 mensualidades según la LAU).',
              },
              {
                q: '¿El contrato es válido en todo el Principado de Asturias?',
                a: 'Sí, el contrato de alquiler LAU es válido en toda Asturias (Oviedo, Gijón, Avilés, Langreo, Mieres). Se adapta a la legislación estatal y autonómica vigente.',
              },
              {
                q: '¿El contrato sirve si el piso está en zona tensionada?',
                a: 'Sí. Adaptamos el contrato a la regulación específica de zonas tensionadas donde aplican límites adicionales de precio. Consultamos caso por caso.',
              },
            ].map((faq, i) => (
              <details key={i} className="bg-white border border-gray-200 rounded-xl p-6">
                <summary className="font-bold text-gray-900 cursor-pointer">{faq.q}</summary>
                <p className="mt-4 text-gray-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── CONTRATOS RELACIONADOS ───────────────────────────────────── */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Otros contratos que pueden interesarte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/gestoria/arras-penitenciales"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Contrato</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">
                Arras Penitenciales
              </h3>
              <p className="text-[#c9a84c] font-bold">145 €</p>
            </Link>
            <Link
              href="/gestoria/rescision-alquiler"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Rescisión</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">
                Rescisión de Alquiler
              </h3>
              <p className="text-[#c9a84c] font-bold">73 €</p>
            </Link>
            <Link
              href="/gestoria/revision-contrato-alquiler"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Revisión</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">
                Revisión de Contrato de Alquiler
              </h3>
              <p className="text-[#c9a84c] font-bold">60 €</p>
            </Link>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="bg-[#0d1a0f] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">¿Listo para solicitar tu contrato de alquiler en Asturias?</h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            En menos de 48h tienes el documento listo para firmar. Redactado por nuestra gestoría inmobiliaria experta, adaptado a LAU y Ley de Vivienda 2026.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Solicitar contrato — 120 € <span className="text-xs font-normal opacity-90">(IVA incl.)</span>
            </Link>
            <a
              href="https://wa.me/34641009947?text=Hola,%20necesito%20un%20contrato%20de%20alquiler%20en%20Asturias"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors"
            >
              💬 WhatsApp: 641 009 947
            </a>
            <a
              href="tel:+34641009947"
              className="border border-white/20 text-white hover:bg-white/10 font-medium py-3 px-8 rounded-xl transition-colors"
            >
              📞 Llamar ahora
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
