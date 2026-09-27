import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import PageHeroImage from '@/components/PageHeroImage'

const BASE_URL = 'https://inmonest.com'
const SLUG = 'gestoria-online-ciudades-espana'
const FECHA = '2026-09-27'
const DESCRIPTION =
  'Gestoría inmobiliaria 100 % online en toda España: due diligence, arras y contratos LAU con gestor asignado. Guía por ciudades (Vigo, Córdoba, Canarias, Cádiz, Toledo…) y enlaces a landings locales Inmonest.'

export const metadata: Metadata = {
  title: 'Gestoría inmobiliaria online por ciudades de España [2026]',
  description: DESCRIPTION,
  keywords:
    'gestoría inmobiliaria online españa, due diligence por ciudad, comprar piso particular vigo, gestoría cordoba, gestoría canarias online, contratar gestoría online',
  alternates: { canonical: `/blog/${SLUG}` },
  openGraph: {
    title: 'Gestoría online en España: servicios por ciudad',
    description: DESCRIPTION,
    url: `${BASE_URL}/blog/${SLUG}`,
    locale: 'es_ES',
    type: 'article',
    siteName: 'Inmonest',
    publishedTime: FECHA,
  },
}

const CIUDADES_NUEVAS = [
  { slug: 'vigo', nombre: 'Vigo', texto: 'Ría, Ensanche y compraventa sin agencia.' },
  { slug: 'cordoba', nombre: 'Córdoba', texto: 'Casco UNESCO y arras entre particulares.' },
  { slug: 'las-palmas', nombre: 'Las Palmas', texto: 'Gran Canaria y operaciones a distancia.' },
  { slug: 'santa-cruz', nombre: 'Santa Cruz de Tenerife', texto: 'Capital tinerfeña y área metropolitana.' },
  { slug: 'cadiz', nombre: 'Cádiz', texto: 'Bahía, casco isleño y costa.' },
  { slug: 'badajoz', nombre: 'Badajoz', texto: 'Extremadura y primera vivienda.' },
  { slug: 'toledo', nombre: 'Toledo', texto: 'Corredor sur Madrid-Toledo.' },
  { slug: 'tarragona', nombre: 'Tarragona', texto: 'Camp de Tarragona y Costa Daurada.' },
  { slug: 'almeria', nombre: 'Almería', texto: 'Capital y Poniente Almeriense.' },
  { slug: 'gijon', nombre: 'Gijón', texto: 'Litoral central asturiano.' },
] as const

const FAQ = [
  {
    q: '¿La gestoría online sirve si el piso está en otra provincia?',
    a: 'Sí. Inmonest trabaja en toda España: subes documentación al panel, hablas con tu gestor por videollamada o WhatsApp y recibes informes y contratos en PDF. Solo te desplazas a notaría para firmar.',
  },
  {
    q: '¿Qué servicio contratar primero al comprar de particular?',
    a: 'Si ya tienes borrador de arras, conviene revisión o corrección del contrato. Si vas a entregar señal elevada o ya firmaste arras, el pack due diligence pre-compra (350 €) audita registro, comunidad, ITE y urbanismo.',
  },
  {
    q: '¿Por qué landings por ciudad si el trámite es online?',
    a: 'El trámite es el mismo en toda España, pero el SEO y el contexto local importan: normativa autonómica, tipo de mercado (costa, universidad, patrimonio) y riesgos documentales distintos. Cada landing explica tu caso con ejemplos de zona.',
  },
] as const

export default function GestoriaOnlineCiudadesEspanaPage() {
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Gestoría inmobiliaria online por ciudades de España',
    description: DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Daniel Hernández',
      jobTitle: 'Gestor inmobiliario',
      worksFor: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Inmonest',
      url: BASE_URL,
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` },
    },
    datePublished: FECHA,
    dateModified: FECHA,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${SLUG}` },
    image: `${BASE_URL}/gestoria2.jpg`,
  })

  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  })

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleSchema }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <Navbar />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-gold-500">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold-500">
            Blog
          </Link>
          <span>/</span>
          <span className="text-gold-500 font-semibold">Gestoría online por ciudades</span>
        </nav>

        <header className="mb-10">
          <span className="inline-block bg-cream-100 text-gold-800 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-gold-200">
            Gestoría · España
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Gestoría inmobiliaria online en toda España (y por ciudades)
          </h1>
          <p className="text-xl text-gray-600 mb-6">{DESCRIPTION}</p>
          <PageHeroImage src="/gestoria2.jpg" alt="Gestoría inmobiliaria online en ciudades de España" priority />
        </header>

        <div className="prose prose-lg prose-gray max-w-none">
        <p className="lead text-gray-700">
          Inmonest no es un portal de anuncios: somos <strong>gestoría inmobiliaria digital</strong> para particulares.
          El mismo flujo online (panel, gestor, informe PDF) vale en Madrid, Vigo o Las Palmas; las páginas por ciudad
          aportan contexto de mercado, barrios y riesgos documentales concretos.
        </p>

        <h2>Servicios que puedes contratar online</h2>
        <ul>
          <li>
            <Link href="/gestoria/pack-due-diligence-precompra" className="text-gold-700 font-medium hover:underline">
              Due diligence pre-compra (350 €)
            </Link>{' '}
            — auditoría documental tras arras o antes de señal elevada.
          </li>
          <li>
            <Link href="/gestoria/arras-penitenciales" className="text-gold-700 font-medium hover:underline">
              Arras penitenciales (145 €)
            </Link>{' '}
            — redacción y firma digital.
          </li>
          <li>
            <Link href="/gestoria/revision-correccion-arras" className="text-gold-700 font-medium hover:underline">
              Revisión de contrato de arras (120 €)
            </Link>{' '}
            — antes de entregar la señal.
          </li>
          <li>
            <Link href="/gestoria/contrato-alquiler" className="text-gold-700 font-medium hover:underline">
              Contrato alquiler LAU (145 €)
            </Link>{' '}
            — si alquilas o arriendas después de comprar.
          </li>
        </ul>

        <h2>Nuevas ciudades con hub y due diligence local</h2>
        <p>
          Cada fila enlaza al <strong>hub de gestoría</strong> de la ciudad y al{' '}
          <strong>due diligence</strong> con títulos y contenido propios (no plantilla genérica).
        </p>
        <div className="not-prose space-y-4 my-8">
          {CIUDADES_NUEVAS.map((c) => (
            <div key={c.slug} className="rounded-xl border border-gray-200 bg-slate-50 p-5">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{c.nombre}</h3>
              <p className="text-sm text-gray-600 mb-3">{c.texto}</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <Link href={`/gestoria/${c.slug}`} className="text-gold-700 font-semibold hover:underline">
                  Hub gestoría {c.nombre} →
                </Link>
                <Link
                  href={`/gestoria/due-diligence-precompra/${c.slug}`}
                  className="text-gold-700 font-semibold hover:underline"
                >
                  Due diligence {c.nombre} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        <h2>Cómo funciona el trámite online</h2>
        <ol>
          <li>Primera llamada o WhatsApp con el gestor (sin compromiso).</li>
          <li>Contratas el servicio; se abre tu expediente en el panel.</li>
          <li>Subes documentación (arras, nota simple, actas, certificados).</li>
          <li>Recibes informe o contrato PDF y asesoramiento hasta escritura.</li>
        </ol>
        <p>
          Más detalle en la{' '}
          <Link href="/gestoria/pack-due-diligence-precompra" className="text-gold-700 hover:underline">
            landing nacional del pack due diligence
          </Link>{' '}
          y en el artículo{' '}
          <Link href="/blog/due-diligence-compra-vivienda" className="text-gold-700 hover:underline">
            qué revisar antes de comprar
          </Link>
          .
        </p>

        <h2>Preguntas frecuentes</h2>
        {FAQ.map((item) => (
          <div key={item.q} className="mb-6">
            <h3 className="text-base font-bold text-gray-900">{item.q}</h3>
            <p className="text-gray-600 text-base">{item.a}</p>
          </div>
        ))}

        <div className="not-prose mt-10 rounded-2xl bg-gold-50 border border-gold-200 p-6 text-center">
          <p className="text-gray-800 mb-4">¿Compras de particular en una de estas ciudades?</p>
          <Link
            href="/gestoria/solicitar/pack-due-diligence-precompra"
            className="inline-flex rounded-xl bg-gold-500 px-6 py-3 text-sm font-bold text-white hover:bg-gold-600"
          >
            Contratar due diligence online →
          </Link>
        </div>
        </div>
      </article>
    </div>
  )
}
