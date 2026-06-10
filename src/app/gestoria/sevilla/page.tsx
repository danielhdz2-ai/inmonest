import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import CiudadHubComoTrabajamos from '@/components/CiudadHubComoTrabajamos'
import CiudadHubExtras from '@/components/CiudadHubExtras'
import CiudadHubVentajasOnline from '@/components/CiudadHubVentajasOnline'
import { GESTORIA_PRECIOS } from '@/lib/gestoria-servicios-destacados'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Gestoría Inmobiliaria Sevilla para Particulares | Contratos desde 120€',
  description: 'Gestoría inmobiliaria para particulares en Sevilla. Contratos LAU desde 120€, arras 145€, servicio completo 687€. Sin comisiones de agencia. Normativa andaluza.',
  keywords: [
    'gestoria inmobiliaria sevilla',
    'contrato alquiler sevilla',
    'abogado inmobiliario sevilla',
    'contrato arras sevilla',
    'gestoria contratos sevilla',
    'abogado compraventa sevilla',
    'contrato lau sevilla',
    'revision contrato sevilla',
  ],
  alternates: {
    canonical: `${BASE_URL}/gestoria/sevilla`,
  },
  openGraph: {
    title: 'Gestoría Inmobiliaria Sevilla para Particulares | Contratos desde 120€',
    description: 'Gestoría inmobiliaria en Sevilla 100% online. Contratos de alquiler LAU, arras penitenciales y compraventa. Abogados especializados en normativa andaluza.',
    url: `${BASE_URL}/gestoria/sevilla`,
    type: 'website',
    siteName: 'Inmonest',
    locale: 'es_ES',
    images: [{ url: `${BASE_URL}/gestoria5.jpg`, width: 1200, height: 630, alt: 'Gestoría inmobiliaria online en Sevilla' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gestoría Inmobiliaria Sevilla para Particulares | Contratos desde 120€',
    description:
      'Contratos de alquiler LAU, arras y compraventa en Sevilla desde 120€. Sin comisiones de agencia. Normativa andaluza.',
  },
}

// Schema.org: Breadcrumbs + Service + FAQ
const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
        { '@type': 'ListItem', position: 3, name: 'Sevilla', item: `${BASE_URL}/gestoria/sevilla` },
      ],
    },
    {
      '@type': 'LegalService',
      name: 'Gestoría Inmobiliaria Sevilla - Inmonest',
      description: 'Gestoría 100% online especializada en contratos inmobiliarios en Sevilla. Redacción y revisión de alquiler LAU, arras, compraventa y rescisión por abogados colegiados.',
      url: `${BASE_URL}/gestoria/sevilla`,
      image: `${BASE_URL}/gestoria5.jpg`,
      areaServed: {
        '@type': 'City',
        name: 'Sevilla',
        addressRegion: 'Andalucía',
        addressCountry: 'ES',
      },
      priceRange: '€€',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios Gestoría Inmobiliaria Sevilla',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Alquiler Vivienda Sevilla', price: String(GESTORIA_PRECIOS.contratoAlquiler), priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Contrato Arras Penitenciales Sevilla', price: String(GESTORIA_PRECIOS.arrasPenitenciales), priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Revisión Contrato Arras Sevilla', price: String(GESTORIA_PRECIOS.revisionArras), priceCurrency: 'EUR' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Rescisión Contrato Alquiler Sevilla', price: String(GESTORIA_PRECIOS.rescisionAlquiler), priceCurrency: 'EUR' },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: '¿Cuánto cuesta un contrato de alquiler en Sevilla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `En Inmonest redactamos contratos de alquiler LAU para Sevilla por ${GESTORIA_PRECIOS.contratoAlquiler}€ IVA incluido. Incluye personalización completa, asesoría legal y entrega en 48h. Todo 100% online.`,
          },
        },
        {
          '@type': 'Question',
          name: '¿Puedo hacer un contrato de alquiler online en Sevilla sin ir a ningún sitio?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sí, nuestro servicio es 100% online. Rellenas un formulario, un abogado redacta tu contrato adaptado a Sevilla y lo recibes en 48h por email. Sin desplazamientos.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Los contratos son válidos en Sevilla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Totalmente. Todos nuestros contratos están redactados por abogados colegiados especializados en derecho inmobiliario andaluz. Cumplen con la LAU y normativa específica de Andalucía.',
          },
        },
        {
          '@type': 'Question',
          name: '¿Qué incluye el servicio de gestoría inmobiliaria en Sevilla?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Redacción personalizada del contrato, revisión de cláusulas por abogado, asesoramiento legal completo, revisiones ilimitadas hasta que quedes satisfecho y entrega en 48h.',
          },
        },
      ],
    },
  ],
}

export default function GestoriaSevillaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <WhatsAppButton />

      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1a0d00] via-[#2e1900] to-[#5a3200] text-white py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <Image src="/gestoria5.jpg" alt="Gestoría Sevilla" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-block px-4 py-2 rounded-full bg-[#c9962a]/20 border border-[#c9962a]/40 mb-6">
            <span className="text-[#f4c94a] font-semibold text-sm">💼 Gestoría 100% Online | Especialistas en Andalucía</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            Gestoría Inmobiliaria Online en <span className="text-[#f4c94a]">Sevilla</span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            <strong>Gestoría inmobiliaria para particulares</strong> en Sevilla. Contratos de alquiler, arras y compraventa redactados por <strong className="text-[#f4c94a]">abogados expertos</strong> en normativa andaluza.  
            Sin comisiones de agencia. <strong>Contrato LAU desde {GESTORIA_PRECIOS.contratoAlquiler}€.</strong> Entrega en 48 horas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="inline-block px-8 py-4 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-bold text-lg shadow-xl transition-all transform hover:scale-105"
            >
              Contrato Alquiler LAU - {GESTORIA_PRECIOS.contratoAlquiler}€
            </Link>
            <Link
              href="/gestoria"
              className="inline-block px-8 py-4 rounded-full bg-white hover:bg-gray-100 text-[#2e1900] font-bold text-lg shadow-xl transition-all"
            >
              Ver todos los servicios
            </Link>
          </div>
        </div>
      </section>

      <CiudadHubVentajasOnline ciudad="Sevilla" />

      <CiudadHubServiciosGrid
        ciudad="Sevilla"
        subtitulo="Redactados por abogados colegiados con experiencia en el mercado inmobiliario sevillano. Precios iguales que en nuestra gestoría online."
      />

      <CiudadHubComoTrabajamos ciudad="Sevilla" />

      {/* Contenido SEO: Mercado Sevilla */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
          El mercado de alquiler y compraventa en Sevilla (2026)
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
          <p>
            <strong>Sevilla</strong> es una de las ciudades con mayor crecimiento del sector inmobiliario en Andalucía. 
            El turismo, la llegada de empresas tecnológicas y la excelente calidad de vida han impulsado tanto el mercado de alquiler como el de compraventa.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Zonas más demandadas para alquilar en Sevilla</h3>
          <p>
            Los barrios con mayor demanda de contratos de alquiler en 2026 son:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Triana:</strong> Zona emblemática. Alquileres de 700-950€/mes para 2-3 habitaciones. Alta demanda turística.</li>
            <li><strong>Nervión - Luis Montoto:</strong> Familiar y céntrica. Precios 650-850€/mes. Contratos LAU de larga duración comunes.</li>
            <li><strong>Macarena - San Julián:</strong> Estudiantes y jóvenes profesionales. Alquileres desde 500€/mes. Muchos contratos temporales.</li>
            <li><strong>Los Remedios:</strong> Residencial y tranquila. 800-1,100€/mes. Familias con niños.</li>
            <li><strong>Centro - Arenal:</strong> Turismo y estudiantes Erasmus. Alquileres temporales muy frecuentes (850-1,200€/mes).</li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Precios de compraventa en Sevilla</h3>
          <p>
            El precio medio de la vivienda en Sevilla ronda los <strong>2,200-2,800€/m²</strong>. Un piso de 80m² en Nervión cuesta aproximadamente 
            <strong> 180,000-220,000€</strong>, mientras que en el Centro histórico puede superar los 250,000€.
          </p>
          <p>
            Cuando compras una vivienda en Sevilla, es <strong>imprescindible firmar un contrato de arras</strong> para asegurar la operación. 
            Las arras penitenciales (las más recomendadas) suelen ser del <strong>10% del precio total</strong>. Para un piso de 200,000€, la señal sería de 20,000€.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">¿Por qué contratar una gestoría inmobiliaria en Sevilla?</h3>
          <p>
            El mercado sevillano tiene particularidades que solo conocen abogados especializados:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Normativa andaluza específica:</strong> Fianzas, depósitos y plazos regulados por la Junta de Andalucía.</li>
            <li><strong>Alquileres turísticos:</strong> Requieren contratos especiales (no LAU). Muy comunes en Centro y Triana.</li>
            <li><strong>Cláusulas abusivas frecuentes:</strong> Prohibiciones injustificadas, penalizaciones excesivas, fianzas ilegales.</li>
            <li><strong>Jurisprudencia local:</strong> Tribunales de Sevilla tienen sentencias específicas sobre arrendamientos.</li>
          </ul>
          <p>
            Un contrato mal redactado puede costarte <strong>miles de euros</strong> en problemas legales, desahucios complicados o pérdida de fianzas. 
            Nuestros abogados especializados en Sevilla evitan estos riesgos con contratos desde <strong>{GESTORIA_PRECIOS.contratoAlquiler}€</strong>.
          </p>

          <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Contratos de alquiler temporal en Sevilla</h3>
          <p>
            Sevilla tiene una alta demanda de <strong>alquileres temporales</strong> (estudiantes, Erasmus, trabajadores desplazados). 
            Estos contratos <strong>NO son LAU</strong>, tienen normativa diferente y plazos más flexibles.
          </p>
          <p>
            Ofrecemos contratos de alquiler temporal adaptados a Sevilla desde <strong>97€</strong>. Incluyen:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Duración flexible (3-11 meses)</li>
            <li>Condiciones de prórroga</li>
            <li>Fianzas y gastos claros</li>
            <li>Cláusulas de rescisión anticipada</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Preguntas frecuentes sobre gestoría inmobiliaria en Sevilla
        </h2>
        <div className="space-y-6">
          <details className="bg-gray-50 rounded-xl p-6 shadow-md">
            <summary className="text-xl font-bold text-gray-900 cursor-pointer">
              ¿Cuánto cuesta un contrato de alquiler en Sevilla?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              En Inmonest redactamos contratos de alquiler LAU para Sevilla por <strong>{GESTORIA_PRECIOS.contratoAlquiler}€ IVA incluido</strong>. Mismo precio en toda España, sin sorpresas. 
              Incluye personalización completa, asesoría legal y entrega en 48h. Todo 100% online.
            </p>
          </details>

          <details className="bg-gray-50 rounded-xl p-6 shadow-md">
            <summary className="text-xl font-bold text-gray-900 cursor-pointer">
              ¿Puedo hacer un contrato de alquiler online en Sevilla sin ir a ningún sitio?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Sí, nuestro servicio es <strong>100% online</strong>. No necesitas desplazarte a ninguna oficina. Rellenas un formulario, pagas de forma segura con Stripe 
              y recibes tu contrato en 48h por email. Perfecto si vives en Sevilla, Dos Hermanas, Alcalá de Guadaíra o alrededores.
            </p>
          </details>

          <details className="bg-gray-50 rounded-xl p-6 shadow-md">
            <summary className="text-xl font-bold text-gray-900 cursor-pointer">
              ¿Los contratos son válidos legalmente en Sevilla?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Totalmente. Todos nuestros contratos están redactados por <strong>abogados colegiados</strong> especializados en derecho inmobiliario andaluz. 
              Cumplen con la LAU, normativa de la Junta de Andalucía y jurisprudencia actualizada de tribunales sevillanos.
            </p>
          </details>

          <details className="bg-gray-50 rounded-xl p-6 shadow-md">
            <summary className="text-xl font-bold text-gray-900 cursor-pointer">
              ¿Qué incluye el servicio de gestoría inmobiliaria en Sevilla?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Incluye: <strong>redacción personalizada</strong> del contrato adaptado a tu situación, <strong>revisión de cláusulas</strong> por abogado especializado, 
              <strong>asesoramiento legal completo</strong>, <strong>revisiones ilimitadas</strong> hasta que quedes satisfecho y <strong>entrega en 48h</strong> por email.
            </p>
          </details>

          <details className="bg-gray-50 rounded-xl p-6 shadow-md">
            <summary className="text-xl font-bold text-gray-900 cursor-pointer">
              ¿Puedo rescin dir un contrato de alquiler en Sevilla antes de tiempo?
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              Sí, pero hay que hacerlo legalmente. Si eres inquilino, puedes rescindir tras 6 meses con preaviso de 30 días (LAU). 
              Si eres propietario, solo puedes rescindir si el contrato lo permite o por causas justificadas. 
              Ofrecemos servicio de <strong>rescisión de contrato desde {GESTORIA_PRECIOS.rescisionAlquiler}€</strong> para evitar problemas legales.
            </p>
          </details>
        </div>
      </section>

      <CiudadHubExtras ciudad="Sevilla" hubSlug="sevilla" whatsappMessage="Hola, necesito gestoría inmobiliaria para particulares en Sevilla" />

      {/* CTA Final */}
      <section className="bg-gradient-to-br from-[#2e1900] to-[#5a3200] text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
            ¿Necesitas un contrato inmobiliario en Sevilla?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Más de 200 clientes en Andalucía confían en nuestros abogados. Sin desplazamientos, sin esperas. 
            Servicio 100% online con la garantía de profesionales colegiados.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/gestoria/solicitar/contrato-alquiler"
              className="inline-block px-8 py-4 rounded-full bg-[#c9962a] hover:bg-[#a87a20] text-white font-bold text-lg shadow-xl transition-transform transform hover:scale-105"
            >
              Contrato Alquiler LAU - {GESTORIA_PRECIOS.contratoAlquiler}€
            </Link>
            <a
              href="https://wa.me/34641008847?text=Hola,%20necesito%20un%20contrato%20inmobiliario%20en%20Sevilla"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-xl transition-all"
            >
              💬 WhatsApp: 641 008 847
            </a>
          </div>
        </div>
      </section>

      {/* Enlaces internos SEO */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Servicios relacionados en otras ciudades</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <Link href="/gestoria/barcelona" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Gestoría Barcelona →
          </Link>
          <Link href="/gestoria/madrid" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Gestoría Madrid →
          </Link>
          <Link href="/gestoria/valencia" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Gestoría Valencia →
          </Link>
          <Link href="/zaragoza/contrato-alquiler" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Contrato Alquiler Zaragoza →
          </Link>
          <Link href="/granada/contrato-alquiler" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Contrato Alquiler Granada →
          </Link>
          <Link href="/gestoria/guia-arras-penitenciales" className="text-[#c9962a] hover:text-[#a87a20] font-semibold">
            Guía Arras Penitenciales →
          </Link>
        </div>
      </section>
    </div>
  )
}
