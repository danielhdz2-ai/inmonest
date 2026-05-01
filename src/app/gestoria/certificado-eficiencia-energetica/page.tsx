import type { Metadata } from 'next'
import Navbar from '@/components/NavbarServer'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Certificado Eficiencia Energética【DESDE 45€】CEE Oficial con Técnico | Inmonest',
  description: 'Certificado de eficiencia energética (CEE) obligatorio para vender o alquilar. Técnico oficial, registro incluido. Desde 45€. Cita en 48h. ✓ Válido 10 años',
  alternates: {
    canonical: `${BASE_URL}/gestoria/certificado-eficiencia-energetica`,
  },
  openGraph: {
    title: 'Certificado Eficiencia Energética - Desde 45€ | Inmonest',
    description: 'CEE oficial con técnico cualificado. Registro incluido. Obligatorio para alquilar o vender.',
    url: `${BASE_URL}/gestoria/certificado-eficiencia-energetica`,
    type: 'website',
  },
}

const schemaJson = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Certificado de Eficiencia Energética (CEE)',
  description: 'Certificado de eficiencia energética oficial realizado por técnico cualificado. Obligatorio para vender o alquilar vivienda. Registro incluido. Válido 10 años.',
  provider: {
    '@type': 'Organization',
    name: 'Inmonest',
    url: BASE_URL,
  },
  offers: {
    '@type': 'Offer',
    price: '45',
    priceCurrency: 'EUR',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '234',
  },
})

export default function CertificadoEficienciaEnergeticaPage() {
  return (
    <>
      <Script
        id="schema-cee"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaJson }}
      />
      <Navbar />
      
      <div className="min-h-screen bg-white">
        {/* Hero */}
        <section className="relative bg-gradient-to-r from-[#1a0d00] to-[#2e1900] text-white py-16 sm:py-24">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="/gestoria/gestoria2.jpg"
              alt="Certificado energético"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-600/30 text-emerald-300 text-xs font-semibold mb-4">
                🏡 Obligatorio por Ley
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-6">
                Certificado de Eficiencia Energética (CEE)
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                ¿Vas a vender o alquilar tu piso? El certificado energético es <strong>obligatorio por ley</strong>. Técnico oficial, visita en 48h, registro incluido. <strong>Desde 45€.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/gestoria/solicitar/certificado-energetico"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors text-lg shadow-xl"
                >
                  Solicitar certificado desde 45€ →
                </Link>
                <a
                  href="#precios"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Ver precios
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">👨‍🔧</div>
                <h3 className="font-bold text-gray-900 mb-2">Técnico oficial</h3>
                <p className="text-gray-600 text-sm">Ingeniero o arquitecto colegiado</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📋</div>
                <h3 className="font-bold text-gray-900 mb-2">Registro incluido</h3>
                <p className="text-gray-600 text-sm">Lo registramos en tu comunidad autónoma</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⏱️</div>
                <h3 className="font-bold text-gray-900 mb-2">Cita en 48h</h3>
                <p className="text-gray-600 text-sm">Visita rápida, certificado en 3-5 días</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">✅</div>
                <h3 className="font-bold text-gray-900 mb-2">Válido 10 años</h3>
                <p className="text-gray-600 text-sm">No necesitas renovarlo hasta 2036</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contenido principal */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué es el certificado de eficiencia energética?</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              El <strong>certificado de eficiencia energética (CEE)</strong> es un documento oficial que mide cuánta energía consume tu vivienda y qué emisiones de CO₂ genera. Es como la "etiqueta energética" de tu piso, con una calificación de la <strong>A (más eficiente)</strong> a la <strong>G (menos eficiente)</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Desde 2013, es <strong>obligatorio por ley</strong> (Real Decreto 235/2013) para:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="text-gray-700">✓ Vender una vivienda</li>
              <li className="text-gray-700">✓ Alquilar una vivienda</li>
              <li className="text-gray-700">✓ Anunciar el piso en portales inmobiliarios</li>
            </ul>
            
            <div className="bg-red-50 border-l-4 border-red-600 p-6 my-6">
              <p className="text-red-900 font-semibold mb-2">⚠️ Multas por NO tener certificado</p>
              <p className="text-red-800">
                Las multas van de <strong>300€ a 6,000€</strong> dependiendo de la gravedad. Además, NO puedes publicar tu anuncio en Idealista, Fotocasa o similares sin el certificado.
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Cómo funciona el proceso?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">1</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Solicitas el certificado</h3>
                  <p className="text-gray-700">Completas un formulario con los datos del piso (dirección, m², año construcción). Pagas online desde 45€.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">2</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Te asignamos un técnico</h3>
                  <p className="text-gray-700">En 24-48h te contacta un técnico oficial (ingeniero o arquitecto colegiado) para agendar la visita.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">3</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Visita al piso (30-45 min)</h3>
                  <p className="text-gray-700">El técnico mide ventanas, revisa caldera, aislamiento, orientación, etc. Solo necesita acceso al piso, no hace obras.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">4</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Recibe el certificado (3-5 días)</h3>
                  <p className="text-gray-700">Te enviamos el certificado en PDF firmado digitalmente + etiqueta energética para imprimir.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">5</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Registro en tu comunidad autónoma</h3>
                  <p className="text-gray-700">Nosotros registramos el certificado (incluido en el precio). Recibes el número de registro oficial en 7-10 días.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Imagen */}
          <div className="my-12 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/gestoria/gestoria5.jpg"
              alt="Etiqueta energética de vivienda"
              width={800}
              height={450}
              className="w-full h-auto"
            />
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">¿Qué calificación tendrá mi piso?</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              La calificación depende de varios factores. Aquí tienes una guía orientativa:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <span className="font-bold text-green-700 text-xl">A - B</span>
                <span className="text-gray-700 text-sm">Pisos nuevos (< 5 años) con aislamiento térmico, doble acristalamiento, aerotermia o solar.</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-lime-50 border border-lime-200">
                <span className="font-bold text-lime-700 text-xl">C - D</span>
                <span className="text-gray-700 text-sm">Pisos entre 5-15 años con reformas recientes o caldera de condensación.</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <span className="font-bold text-yellow-700 text-xl">E</span>
                <span className="text-gray-700 text-sm">Pisos entre 15-30 años sin reformas energéticas. Lo más común en España (~50%).</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                <span className="font-bold text-orange-700 text-xl">F - G</span>
                <span className="text-gray-700 text-sm">Pisos antiguos (> 30 años) sin aislamiento, ventanas simples, calefacción antigua.</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Una calificación E, F o G NO impide vender o alquilar. Solo es informativo para el comprador/inquilino.
            </p>
          </section>

          {/* Precios */}
          <section id="precios" className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Precios por tamaño de vivienda</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Hasta 60 m²</h3>
                <p className="text-sm text-gray-500 mb-3">(Estudio, 1 hab)</p>
                <p className="text-4xl font-extrabold text-emerald-600 mb-4">45€</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ Técnico oficial</li>
                  <li>✓ Visita + certificado</li>
                  <li>✓ Registro incluido</li>
                  <li>✓ Entrega en 3-5 días</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/certificado-energetico?tamano=pequeno"
                  className="block text-center px-6 py-3 rounded-full bg-emerald-100 text-emerald-700 font-semibold hover:bg-emerald-200 transition-colors"
                >
                  Solicitar
                </Link>
              </div>
              
              <div className="border-2 border-emerald-600 rounded-2xl p-6 relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold">
                  MÁS COMÚN
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2">60-120 m²</h3>
                <p className="text-sm text-gray-500 mb-3">(2-3 hab)</p>
                <p className="text-4xl font-extrabold text-emerald-600 mb-4">65€</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ Técnico oficial</li>
                  <li>✓ Visita + certificado</li>
                  <li>✓ Registro incluido</li>
                  <li>✓ Entrega en 3-5 días</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/certificado-energetico?tamano=medio"
                  className="block text-center px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                >
                  Solicitar
                </Link>
              </div>
              
              <div className="border-2 border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Más de 120 m²</h3>
                <p className="text-sm text-gray-500 mb-3">(4+ hab, áticos)</p>
                <p className="text-4xl font-extrabold text-emerald-600 mb-4">85€</p>
                <ul className="space-y-2 text-sm text-gray-700 mb-6">
                  <li>✓ Técnico oficial</li>
                  <li>✓ Visita + certificado</li>
                  <li>✓ Registro incluido</li>
                  <li>✓ Entrega en 3-5 días</li>
                </ul>
                <Link
                  href="/gestoria/solicitar/certificado-energetico?tamano=grande"
                  className="block text-center px-6 py-3 rounded-full bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Solicitar
                </Link>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuánto tarda la visita del técnico?</summary>
                <p className="text-gray-700 mt-3">
                  Entre <strong>30-45 minutos</strong> dependiendo del tamaño. El técnico mide ventanas, revisa la caldera, toma fotos y anota datos. NO hace obras ni pruebas destructivas.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué documentos necesito tener preparados?</summary>
                <p className="text-gray-700 mt-3">
                  Solo necesitas:
                  <ul className="mt-2 ml-6 space-y-1">
                    <li>• Escritura o nota simple (para verificar m²)</li>
                    <li>• Facturas de luz/gas de los últimos 12 meses (opcional pero ayuda)</li>
                    <li>• Acceso al piso y a zonas comunes</li>
                  </ul>
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Puedo vender/alquilar sin certificado?</summary>
                <p className="text-gray-700 mt-3">
                  <strong>NO</strong>. Es ilegal y te pueden multar entre 300€ y 6,000€. Además, los portales inmobiliarios (Idealista, Fotocasa) exigen el número de registro para publicar.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Cuánto tiempo es válido el certificado?</summary>
                <p className="text-gray-700 mt-3">
                  <strong>10 años</strong> desde la fecha de emisión. Después debes renovarlo si vuelves a vender o alquilar.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Qué pasa si saco una F o una G?</summary>
                <p className="text-gray-700 mt-3">
                  No pasa nada. Puedes vender o alquilar igual. La calificación solo es <strong>informativa</strong>. El comprador/inquilino sabrá que consume más energía, pero tú NO estás obligado a reformar nada.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-5 cursor-pointer">
                <summary className="font-bold text-gray-900">¿Incluye el registro oficial?</summary>
                <p className="text-gray-700 mt-3">
                  Sí, el precio incluye el <strong>registro en tu comunidad autónoma</strong> (IVIMA en Madrid, ICAEN en Cataluña, etc.). El técnico lo tramita automáticamente.
                </p>
              </details>
            </div>
          </section>

          {/* CTA final */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">¿Necesitas tu certificado energético?</h3>
            <p className="text-white/90 mb-6">
              Técnico oficial, cita en 48h, registro incluido. Válido 10 años.
            </p>
            <Link
              href="/gestoria/solicitar/certificado-energetico"
              className="inline-block px-8 py-4 rounded-full bg-white text-emerald-700 font-bold hover:bg-gray-100 transition-colors"
            >
              Solicitar desde 45€ →
            </Link>
          </div>

        </article>

        {/* Relacionados */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Servicios relacionados</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              <Link href="/gestoria/contrato-compraventa" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Contrato de Compraventa →
                </h3>
                <p className="text-sm text-gray-600">Desde 80€</p>
              </Link>
              <Link href="/gestoria/nota-simple" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Nota Simple Registro →
                </h3>
                <p className="text-sm text-gray-600">Desde 9€</p>
              </Link>
              <Link href="/gestoria/contrato-alquiler" className="group p-6 bg-white rounded-xl border border-gray-200 hover:border-[#c9962a] transition-colors">
                <h3 className="font-bold text-gray-900 group-hover:text-[#c9962a] mb-2">
                  Contrato de Alquiler LAU →
                </h3>
                <p className="text-sm text-gray-600">Desde 7€</p>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
