import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Contratar Contrato de Arras en A Coruña 【145€】 Abogados en 48h | Inmonest',
  description: '¿Necesitas un contrato de arras en A Coruña? Redacción personalizada por abogados en 48h. Precio fijo 145€. A Coruña, Santiago, Ferrol. Nota simple incluida.',
  keywords: ['contratar contrato arras A Coruña', 'comprar contrato arras Galicia', 'solicitar contrato arras Santiago', 'precio contrato arras A Coruña', 'abogado contrato arras Ferrol'],
  alternates: {
    canonical: `${BASE_URL}/coruna/contrato-arras`,
  },
  openGraph: {
    title: 'Contrato de Arras en A Coruña - 145€ | Inmonest',
    description: 'Contrato de arras penitenciales en A Coruña. Abogados especializados. 48h. 145€.',
    url: `${BASE_URL}/coruna/contrato-arras`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria1.jpg`, width: 1200, height: 630, alt: 'Contrato de arras A Coruña' }],
  },
}

export const revalidate = 3600

export default function ContratoArrasCorunaPage() {
  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Contrato de Arras Penitenciales en A Coruña',
    description: 'Redacción de contrato de arras para compraventa de inmuebles en A Coruña. Abogados especializados en derecho inmobiliario.',
    provider: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'A Coruña',
      containedIn: { '@type': 'Country', name: 'España' },
    },
    offers: {
      '@type': 'Offer',
      price: '145',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '187',
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: '¿El contrato de arras es válido en toda Galicia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí, el contrato de arras penitenciales es válido en toda Galicia (A Coruña, Santiago, Ferrol, Vigo, Pontevedra). Se rige por el Código Civil español.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué pasa si el banco no aprueba la hipoteca?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nuestro contrato incluye cláusula suspensiva por financiación. Si el banco deniega la hipoteca, el comprador recupera la señal sin penalización.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto suele ser la señal de arras en A Coruña?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Habitualmente entre el 5% y el 10% del precio de venta. No hay cantidad mínima legal, aunque por debajo del 5% pierde fuerza disuasoria.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Necesito notario para las arras?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. El contrato de arras es válido con firma privada entre las partes. Solo la escritura de compraventa definitiva requiere notario.',
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
          src="/gestoria1.jpg"
          alt="Contrato de arras en A Coruña"
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
            <span className="text-white/80">Contrato de Arras A Coruña</span>
          </nav>

          <span className="inline-block bg-[#c9a84c] text-[#3d2a05] text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit">
            Compraventa · A Coruña
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 max-w-2xl">
            Contrato de Arras Penitenciales en A Coruña
          </h1>
          <p className="text-white/80 text-lg max-w-xl mb-5">
            El estándar de oro en la compraventa de inmuebles en Galicia
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-3xl font-bold text-[#c9a84c]">145 €</span>
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
              <p className="text-gray-800 font-semibold text-lg">¿Necesitas redactar un Contrato de Arras Penitenciales en A Coruña?</p>
              <p className="text-gray-600 text-sm mt-1">Abogados especializados lo redactan por ti en 48h. Precio fijo: 145€. Sin sorpresas.</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">¿Qué es el contrato de arras penitenciales?</h2>
            <p className="text-gray-600 leading-relaxed text-[1.05rem]">
              El contrato de arras penitenciales es el documento precontractual más utilizado en A Coruña y Galicia (Santiago, Ferrol, Narón, Arteixo) para formalizar la intención de compraventa de un inmueble. Permite a cualquiera de las dos partes desistir del acuerdo: el comprador pierde la señal entregada, y el vendedor debe devolver el doble si es él quien se echa atrás. Esta doble penalización lo convierte en la herramienta de seguridad jurídica más equilibrada del mercado inmobiliario gallego.
            </p>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3">¿Para quién es este contrato en A Coruña?</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Compradores en A Coruña, Santiago, Ferrol que quieren reservar un inmueble con garantías
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Vendedores en Galicia que desean asegurar la operación sin cerrarla definitivamente
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Operaciones donde aún quede financiación hipotecaria pendiente de aprobar
                </li>
                <li className="flex items-start gap-2 text-gray-600 text-sm">
                  <span className="text-[#c9a84c] mt-0.5">✓</span>
                  Situaciones donde se necesiten semanas para preparar la escritura notarial
                </li>
              </ul>
            </div>
          </div>

          {/* Tarjeta CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-[#fdf8ee] border border-[#e8d48a] rounded-2xl p-6 space-y-4">
              <p className="text-sm text-[#7a5c1e] font-medium uppercase tracking-wide">Compraventa · A Coruña</p>
              <h3 className="text-xl font-bold text-gray-900">Contrato de Arras Penitenciales</h3>
              <div>
                <p className="text-4xl font-bold text-[#c9a84c]">145 €</p>
                <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Redacción personalizada con datos reales
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Revisión de nota simple registral
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Cláusulas de desistimiento y penalización
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-[#c9a84c] mt-0.5 shrink-0">✓</span>
                  Entrega en PDF firmable en 48h
                </li>
              </ul>
              <Link
                href="/gestoria/solicitar/arras-penitenciales"
                className="block w-full text-center bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold py-3 px-4 rounded-xl transition-colors"
              >
                Solicitar ahora
              </Link>
              <a
                href="https://wa.me/34641009947?text=Hola,%20necesito%20un%20contrato%20de%20arras%20en%20A%20Coruña"
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
              'Redacción personalizada con datos reales de las partes',
              'Revisión de nota simple registral del inmueble',
              'Cláusulas de desistimiento y penalización estándar',
              'Condiciones suspensivas (hipoteca, licencias, etc.)',
              'Plazo de firma de escritura pública incluido',
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
              { num: '01', titulo: 'Solicita el contrato', desc: 'Rellena el formulario con los datos básicos de comprador, vendedor e inmueble. Solo tarda 3 minutos.' },
              { num: '02', titulo: 'Revisión por abogado', desc: 'Nuestro equipo jurídico revisa la nota simple, confirma los datos y redacta el contrato personalizado.' },
              { num: '03', titulo: 'Recibe el documento', desc: 'En menos de 48h tienes el PDF listo para firmar digitalmente. Incluimos guía de firma para ambas partes.' },
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
                q: '¿El contrato de arras es válido en toda Galicia?',
                a: 'Sí, el contrato de arras penitenciales es válido en toda Galicia (A Coruña, Santiago de Compostela, Vigo, Ferrol, Pontevedra, Lugo, Ourense). Se rige por el Código Civil español.',
              },
              {
                q: '¿Qué pasa si el banco no aprueba la hipoteca?',
                a: 'Nuestro contrato incluye cláusula suspensiva por financiación. Si el banco deniega la hipoteca, el comprador recupera la señal sin penalización.',
              },
              {
                q: '¿Cuánto suele ser la señal de arras en A Coruña?',
                a: 'Habitualmente entre el 5% y el 10% del precio de venta. No hay cantidad mínima legal, aunque por debajo del 5% pierde fuerza disuasoria para el vendedor.',
              },
              {
                q: '¿Las arras penitenciales son lo mismo que las confirmatorias?',
                a: 'No. Las penitenciales permiten desistir con penalización económica. Las confirmatorias obligan al cumplimiento del contrato y abren la puerta a exigir cumplimiento forzoso.',
              },
              {
                q: '¿Necesito notario para las arras?',
                a: 'No. El contrato de arras es válido con firma privada entre las partes. Solo la escritura de compraventa definitiva requiere notario.',
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
              href="/gestoria/arras-confirmatorias"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Contrato</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">
                Arras Confirmatorias
              </h3>
              <p className="text-[#c9a84c] font-bold">145 €</p>
            </Link>
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Contrato</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">
                Contrato de Alquiler LAU
              </h3>
              <p className="text-[#c9a84c] font-bold">120 €</p>
            </Link>
            <Link
              href="/gestoria/revision-contrato-arras"
              className="border border-gray-200 rounded-xl p-5 hover:border-[#c9a84c] hover:shadow-sm transition-all group"
            >
              <p className="text-sm text-gray-500 mb-1">Revisión</p>
              <h3 className="font-semibold text-gray-800 group-hover:text-[#c9a84c] transition-colors mb-2">
                Revisión de Contrato de Arras
              </h3>
              <p className="text-[#c9a84c] font-bold">60 €</p>
            </Link>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="bg-[#0d1a0f] rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">¿Listo para solicitar tu contrato de arras en A Coruña?</h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            En menos de 48h tienes el documento listo para firmar. Redactado por abogados, sin plantillas genéricas.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/arras-penitenciales"
              className="bg-[#c9a84c] hover:bg-[#b8943a] text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Solicitar contrato — 145 € <span className="text-xs font-normal opacity-90">(IVA incl.)</span>
            </Link>
            <a
              href="https://wa.me/34641009947?text=Hola,%20necesito%20un%20contrato%20de%20arras%20en%20A%20Coruña"
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
