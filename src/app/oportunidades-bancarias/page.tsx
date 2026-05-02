import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import NavbarServer from '@/components/NavbarServer'
import Footer from '@/components/Footer'

const BASE_URL = 'https://inmonest.com'

export const metadata: Metadata = {
  title: 'Pisos de Banco Baratos | Oportunidades de Fondos Bancarios 2026 — Inmonest',
  description:
    'Encuentra pisos de Solvia, Aliseda, Servihabitat y otros fondos bancarios desde 40.000 €. Verificados, con documentación completa y gestión de compraventa incluida.',
  keywords:
    'pisos fondo bancario, pisos baratos banco, solvia pisos, aliseda pisos, servihabitat pisos, oportunidades inmobiliarias bancarias, pisos banco baratos 2026',
  alternates: { canonical: '/oportunidades-bancarias' },
  openGraph: {
    title: 'Pisos de Banco Baratos — Oportunidades de Fondos Bancarios',
    description: 'Solvia, Aliseda, Servihabitat y más. Pisos verificados desde 40.000 €. Gestión legal incluida.',
    url: `${BASE_URL}/oportunidades-bancarias`,
    locale: 'es_ES',
    type: 'website',
    siteName: 'Inmonest',
    images: [{ url: `${BASE_URL}/mercado1.jpg`, width: 1200, height: 630, alt: 'Pisos de fondos bancarios baratos — Inmonest' }],
  },
}

const FONDOS = [
  {
    nombre: 'Solvia',
    banco: 'Banco Sabadell',
    descripcion: 'Una de las carteras más activas de España. Pisos desde 43.000 € en toda España con buena rotación de stock.',
    rango: 'Desde 43.000 €',
    tipo: 'Venta y alquiler',
    color: 'bg-blue-50 border-blue-200',
    badge: 'bg-blue-100 text-blue-800',
  },
  {
    nombre: 'Aliseda',
    banco: 'Blackstone / Santander',
    descripcion: 'Cartera de gran tamaño con presencia nacional. Precios competitivos pero requiere gestión documental más compleja.',
    rango: 'Desde 55.000 €',
    tipo: 'Principalmente venta',
    color: 'bg-red-50 border-red-200',
    badge: 'bg-red-100 text-red-800',
  },
  {
    nombre: 'Servihabitat',
    banco: 'CaixaBank',
    descripcion: 'La mayor cartera de España con miles de pisos en todas las comunidades. Excelente relación precio-ubicación.',
    rango: 'Desde 38.000 €',
    tipo: 'Venta y alquiler social',
    color: 'bg-green-50 border-green-200',
    badge: 'bg-green-100 text-green-800',
  },
  {
    nombre: 'Haya Real Estate',
    banco: 'Bankia / CaixaBank',
    descripcion: 'Gestiona carteras de múltiples entidades. Buena presencia en comunidades como Andalucía, Levante y Madrid.',
    rango: 'Desde 45.000 €',
    tipo: 'Venta',
    color: 'bg-amber-50 border-amber-200',
    badge: 'bg-amber-100 text-amber-800',
  },
  {
    nombre: 'Altamira',
    banco: 'Santander y otros',
    descripcion: 'Fuerte presencia en zonas periféricas y municipios medianos. Ideal para inversores que buscan rentabilidad alta.',
    rango: 'Desde 40.000 €',
    tipo: 'Venta',
    color: 'bg-purple-50 border-purple-200',
    badge: 'bg-purple-100 text-purple-800',
  },
]

const PASOS = [
  {
    n: '1',
    titulo: 'Regístrate gratis',
    texto: 'Crea tu cuenta en Inmonest en 2 minutos. Sin tarjeta, sin compromiso. Activa las alertas de nuevas oportunidades bancarias.',
  },
  {
    n: '2',
    titulo: 'Filtra por fondo bancario',
    texto: 'Usa nuestro buscador para ver solo pisos de fondos bancarios verificados. Filtra por ciudad, precio, superficie y banco.',
  },
  {
    n: '3',
    titulo: 'Asegura la operación',
    texto: 'Protégete con un contrato de arras redactado por abogados especializados. Entrega en 48h desde 120 €.',
  },
]

const VENTAJAS = [
  {
    icon: '💰',
    titulo: '30-50% por debajo del mercado',
    texto: 'Los bancos necesitan liquidar inmuebles. Eso significa precios muy por debajo de lo que pagarías a un particular.',
  },
  {
    icon: '📋',
    titulo: 'Documentación verificada',
    texto: 'En Inmonest verificamos la nota simple, deudas de comunidad e IBI antes de publicar cada piso bancario.',
  },
  {
    icon: '🏛️',
    titulo: 'Financiación especial',
    texto: 'Muchos fondos ofrecen condiciones hipotecarias preferentes. Comparamos las ofertas para que elijas la mejor.',
  },
  {
    icon: '⚖️',
    titulo: 'Gestión legal incluida',
    texto: 'Contrato de arras, nota simple, compraventa notarial. Nuestros abogados te acompañan en cada paso.',
  },
]

const FAQ = [
  {
    q: '¿Son seguros los pisos de fondos bancarios?',
    a: 'Sí, siempre que hagas la debida diligencia. Verifica la nota simple, deudas de comunidad e IBI antes de firmar. En Inmonest incluimos esta verificación en nuestros pisos bancarios publicados.',
  },
  {
    q: '¿Puedo conseguir hipoteca para un piso de banco?',
    a: 'Sí. Son completamente hipotecables. El banco vendedor a veces ofrece condiciones especiales, pero compara siempre con otras entidades antes de aceptar.',
  },
  {
    q: '¿Qué pasa si el piso está ocupado?',
    a: 'Algunos pisos bancarios tienen ocupantes o inquilinos. Es fundamental verificar el estado de ocupación antes de hacer ninguna oferta. Te lo indicamos claramente en cada ficha.',
  },
  {
    q: '¿Se puede negociar el precio?',
    a: 'Sí, especialmente en pisos que llevan más de 6 meses publicados. Un descuento del 5–15% sobre el precio de publicación es habitual con una oferta formal y financiación acreditada.',
  },
  {
    q: '¿Qué servicios ofrece Inmonest para este tipo de compras?',
    a: 'Nota simple (9 €), contrato de arras (120 €), contrato de compraventa (120 €) y asesoría legal personalizada. Todo en nuestra gestoría online.',
  },
]

export default function OportunidadesBancariasPage() {
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Pisos de Banco Baratos — Oportunidades de Fondos Bancarios',
    description: 'Encuentra pisos de Solvia, Aliseda, Servihabitat y otros fondos bancarios verificados desde 40.000 €.',
    url: `${BASE_URL}/oportunidades-bancarias`,
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqSchema }} />

      <NavbarServer />

      <main className="min-h-screen bg-white text-gray-800">

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative bg-gray-900 text-white overflow-hidden">
          <Image
            src="/inmobiliaria8.jpg"
            alt="Oportunidades inmobiliarias bancarias"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="relative z-10 max-w-5xl mx-auto px-4 py-20 md:py-28">
            <nav className="text-sm text-gray-400 mb-6">
              <ol className="flex flex-wrap gap-1">
                <li><Link href="/" className="hover:text-white">Inicio</Link></li>
                <li className="mx-1">/</li>
                <li className="text-gray-200">Oportunidades Bancarias</li>
              </ol>
            </nav>

            <div className="inline-flex items-center gap-2 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
              Actualizado 2026
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Pisos de banco baratos<br />
              <span className="text-amber-400">verificados y sin sorpresas</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">
              Solvia, Aliseda, Servihabitat y más. Accede a pisos entre 40.000 € y 150.000 €
              con documentación verificada, gestión legal y sin comisión de agencia.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10 max-w-lg">
              {[
                { v: '40k€', l: 'Desde' },
                { v: '50%', l: 'Ahorro medio' },
                { v: '48h', l: 'Gestión arras' },
              ].map(({ v, l }) => (
                <div key={l} className="bg-white/10 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-amber-400">{v}</div>
                  <div className="text-xs text-gray-300 mt-1">{l}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pisos?tipo=bancario"
                className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Ver pisos bancarios
              </Link>
              <Link
                href="/registro"
                className="bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-3 rounded-full transition border border-white/30"
              >
                Crear alerta gratuita
              </Link>
            </div>
          </div>
        </section>

        {/* ── FONDOS BANCARIOS ──────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Fondos bancarios disponibles</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Monitorizamos los principales fondos inmobiliarios bancarios de España.
              Cada piso publicado ha sido revisado antes de aparecer en Inmonest.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FONDOS.map((f) => (
              <div key={f.nombre} className={`border rounded-2xl p-5 ${f.color}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{f.nombre}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${f.badge}`}>
                      {f.banco}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-900">{f.rango}</div>
                    <div className="text-xs text-gray-500">{f.tipo}</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{f.descripcion}</p>
                <Link
                  href={`/pisos?banco=${f.nombre.toLowerCase()}`}
                  className="mt-4 inline-block text-sm font-semibold text-amber-700 hover:underline"
                >
                  Ver pisos de {f.nombre} →
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── IMAGEN EXTERIOR + CONFIANZA ───────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/inmonestexterior.png"
                alt="Inmonest — Tu portal inmobiliario de confianza"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Tu portal inmobiliario de confianza</h2>
              <p className="text-gray-500 mb-4">
                En Inmonest no somos una agencia. Somos el puente directo entre el comprador y
                los fondos bancarios, con toda la documentación verificada y abogados especializados
                respaldando cada operación.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                {['Verificación documental previa', 'Abogados especializados en compraventa', 'Sin comisión de agencia', 'Gestión 100% online'].map(b => (
                  <li key={b} className="flex items-center gap-2">
                    <span className="text-amber-500 font-bold">✓</span> {b}
                  </li>
                ))}
              </ul>
              <Link href="/registro" className="inline-block mt-6 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-3 rounded-full transition">
                Crear cuenta gratis
              </Link>
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA ─────────────────────────────────────────────────── */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Cómo funciona en Inmonest</h2>
              <p className="text-gray-500">En 3 pasos tienes tu piso bancario asegurado legalmente</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PASOS.map((p, i) => (
                <div key={p.n} className="text-center">
                  <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                    <Image
                      src={i === 0 ? '/keys.jpg' : i === 1 ? '/interior3.jpg' : '/gestoria1.jpg'}
                      alt={p.titulo}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-white text-xl font-bold flex items-center justify-center">
                        {p.n}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.titulo}</h3>
                  <p className="text-gray-500 text-sm">{p.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA REGISTRO ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gray-900 text-white py-16">
          <Image
            src="/familia3.jpg"
            alt="Familia en su nuevo hogar"
            fill
            className="object-cover opacity-20"
          />
          <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Recibe alertas de nuevos pisos bancarios
            </h2>
            <p className="text-gray-300 mb-8 text-lg">
              Crea tu cuenta gratuita y sé el primero en enterarte cuando aparezca
              una oportunidad bancaria en la ciudad que buscas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link
                href="/registro"
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-white font-bold px-6 py-4 rounded-full text-center transition text-lg"
              >
                Registrarme gratis
              </Link>
              <Link
                href="/pisos?tipo=bancario"
                className="flex-1 bg-white/15 hover:bg-white/25 text-white font-semibold px-6 py-4 rounded-full text-center transition border border-white/30"
              >
                Ver oportunidades
              </Link>
            </div>
            <p className="text-gray-400 text-xs mt-4">Sin tarjeta. Sin permanencia. Cancela cuando quieras.</p>
          </div>
        </section>

        {/* ── VENTAJAS ──────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">¿Por qué comprar un piso bancario en Inmonest?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VENTAJAS.map((v) => (
              <div key={v.titulo} className="flex gap-4 p-5 border border-gray-100 rounded-2xl">
                <div className="text-3xl shrink-0">{v.icon}</div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{v.titulo}</h3>
                  <p className="text-gray-500 text-sm">{v.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SERVICIOS GESTORÍA ────────────────────────────────────────────── */}
        <section className="bg-amber-50 py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Asegura tu compra con nuestra gestoría</h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Los pisos bancarios tienen particularidades legales. Protégete con nuestros servicios especializados.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                {
                  titulo: 'Nota Simple',
                  precio: '9 €',
                  desc: 'Verifica cargas, hipotecas y titularidad del inmueble antes de hacer ninguna oferta.',
                  href: '/gestoria/nota-simple',
                  urgente: true,
                },
                {
                  titulo: 'Contrato de Arras',
                  precio: '120 €',
                  desc: 'Reserva el piso bancario con seguridad legal. Redactado por abogados, entrega en 48h.',
                  href: '/gestoria/arras-penitenciales',
                  urgente: false,
                },
                {
                  titulo: 'Contrato de Compraventa',
                  precio: '120 €',
                  desc: 'El documento definitivo revisado por nuestros abogados antes de la firma ante notario.',
                  href: '/gestoria/contrato-compraventa',
                  urgente: false,
                },
              ].map((s) => (
                <div key={s.titulo} className="bg-white rounded-2xl border border-amber-200 p-6 relative">
                  {s.urgente && (
                    <span className="absolute -top-3 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Paso previo obligatorio
                    </span>
                  )}
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{s.titulo}</h3>
                    <span className="text-2xl font-bold text-amber-600">{s.precio}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                  <Link
                    href={s.href}
                    className="block text-center bg-gray-900 hover:bg-gray-700 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition"
                  >
                    Solicitar
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALERÍA DE INTERIORES ─────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-center mb-6">Ejemplos de propiedades disponibles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['/interior1.jpg', '/interior2.jpg', '/interior4.jpg', '/mercado1.jpg'].map((src, i) => (
              <div key={i} className="relative h-36 md:h-44 rounded-xl overflow-hidden">
                <Image src={src} alt={`Interior propiedad bancaria ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────────── */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Preguntas frecuentes</h2>
          <div className="space-y-5">
            {FAQ.map(({ q, a }) => (
              <details key={q} className="border border-gray-200 rounded-xl p-5 group">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {q}
                  <span className="text-amber-500 text-xl ml-2 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-gray-500 text-sm leading-relaxed">{a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── ENLACES INTERNOS ──────────────────────────────────────────────── */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-xl font-bold mb-6 text-center text-gray-700">Información relacionada</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center">
              {[
                { label: 'Blog: Guía fondos bancarios', href: '/blog/pisos-fondo-bancario-baratos' },
                { label: 'Contratos de Arras', href: '/gestoria' },
                { label: 'Nota Simple registral', href: '/gestoria/nota-simple' },
                { label: 'Calculadora gastos compra', href: '/calculadora-gastos-compra' },
                { label: 'Pisos en Madrid', href: '/madrid/pisos' },
                { label: 'Pisos en Barcelona', href: '/barcelona/pisos' },
                { label: 'Pisos en Valencia', href: '/valencia/pisos' },
                { label: 'Pisos en Sevilla', href: '/sevilla/pisos' },
              ].map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="bg-white border border-gray-200 rounded-xl px-3 py-3 hover:border-amber-400 hover:text-amber-700 transition text-gray-600"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
