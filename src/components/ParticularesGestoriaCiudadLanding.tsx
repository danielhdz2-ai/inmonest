import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/NavbarServer'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import PageHeroImage from '@/components/PageHeroImage'
import ParticularesGestoriaServiciosCatalog from '@/components/ParticularesGestoriaServiciosCatalog'
import GestoriaAlquilerModulosCompletos, {
  GestoriaAlquilerTramiteOnlineSection,
} from '@/components/GestoriaAlquilerModulosCompletos'
import GestoriaCiudadServiciosYPanel from '@/components/GestoriaCiudadServiciosYPanel'
import { getCiudadImage } from '@/lib/gestoria-images'
import { getContratoAlquilerBarrioHref } from '@/lib/barcelona-barrio-portal-links'
import {
  getPortalLandingIntro,
  getPortalLandingLeadConfig,
  type PortalLandingVariant,
} from '@/lib/portal-landing-variant-copy'
import { precioLabel } from '@/lib/gestoria-precios-ui'
import { LANDINGS_CIUDAD_PREMIUM_SLUGS } from '@/lib/landings-ciudad-premium'

const BASE_URL = 'https://inmonest.com'

export type ParticularesGestoriaCiudadProps = {
  ciudad: string
  nombre: string
  precioMedio: string
  barrios: string[]
  intro: string
  faqs: Array<{ q: string; a: string }>
  variant: PortalLandingVariant
  mercado?: {
    precio_venta: string
    precio_alquiler: string
    precio_m2: string
    tendencia_venta: string
    tendencia_alquiler: string
    descripcion: string
  }
}

const TRANSITION_FAQ = {
  q: '¿Inmonest sigue siendo un portal para buscar pisos?',
  a: 'No. Inmonest es gestoría inmobiliaria online: contratos de alquiler LAU, arras y revisión legal para particulares. Si ya has encontrado piso o eres propietario, te ayudamos a firmar con seguridad jurídica.',
}

const VARIANT_PATH: Partial<Record<PortalLandingVariant, string>> = {
  hub: '',
  'alquiler-particulares': 'alquiler-particulares',
  pisos: 'pisos',
  'alquiler-sin-agencia': 'alquiler-sin-agencia',
  'vender-piso': 'vender-piso',
  'pisos-sin-comision': 'pisos-particulares-sin-comision',
}

function buildBreadcrumb(ciudad: string, nombre: string, variant: PortalLandingVariant) {
  const items = [
    { name: 'Inicio', item: BASE_URL },
    { name: 'Gestoría', item: `${BASE_URL}/gestoria` },
  ]
  if (variant === 'hub') {
    items.push({ name: nombre, item: `${BASE_URL}/${ciudad}` })
    return items
  }
  if (variant === 'pisos-sin-comision') {
    items.push({
      name: `Particulares ${nombre}`,
      item: `${BASE_URL}/${ciudad}/pisos-particulares-sin-comision`,
    })
    return items
  }
  const segment = VARIANT_PATH[variant]
  if (segment) {
    items.push({ name: nombre, item: `${BASE_URL}/${ciudad}/${segment}` })
  }
  return items
}

export default function ParticularesGestoriaCiudadLanding({
  ciudad,
  nombre,
  precioMedio,
  barrios,
  intro,
  faqs,
  variant,
  mercado,
}: ParticularesGestoriaCiudadProps) {
  const heroImage = getCiudadImage(ciudad)
  const contratoHref = `/${ciudad}/contrato-alquiler`
  const lead = getPortalLandingLeadConfig(variant)
  const introResolved = getPortalLandingIntro(variant, nombre, intro)
  const lauPrecio = precioLabel('contrato-alquiler', ciudad)

  const h1 =
    variant === 'pisos'
      ? `Particulares en ${nombre}: contrato LAU y arras`
      : variant === 'hub'
        ? `Gestoría inmobiliaria en ${nombre} para particulares`
        : variant === 'alquiler-sin-agencia'
          ? `Alquiler sin agencia en ${nombre}`
          : variant === 'vender-piso'
            ? `Vender piso en ${nombre} sin comisión`
            : variant === 'pisos-sin-comision'
              ? `Pisos de particulares en ${nombre}`
              : `Alquiler entre particulares en ${nombre}`

  const h1Accent =
    variant === 'pisos' || variant === 'pisos-sin-comision'
      ? 'sin portal, con gestoría online'
      : variant === 'vender-piso'
        ? 'arras, venta integral y gestoría'
        : variant === 'alquiler-sin-agencia'
          ? 'contrato LAU, temporada y habitación'
          : 'con contrato LAU blindado'

  const faqMerged = [TRANSITION_FAQ, ...faqs.filter((f) => f.q !== TRANSITION_FAQ.q)]

  const breadcrumbJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: buildBreadcrumb(ciudad, nombre, variant).map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.item,
    })),
  })

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqMerged.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  })

  const articleJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: h1,
    description: introResolved,
    author: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    publisher: { '@type': 'Organization', name: 'Inmonest', url: BASE_URL },
    dateModified: new Date().toISOString().split('T')[0],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id':
        variant === 'hub'
          ? `${BASE_URL}/${ciudad}`
          : variant === 'pisos-sin-comision'
            ? `${BASE_URL}/${ciudad}/pisos-particulares-sin-comision`
            : `${BASE_URL}/${ciudad}/${variant}`,
    },
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbJson }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJson }} />

      <Navbar />

      <section className="relative overflow-hidden bg-forest-900">
        <Image
          src={heroImage.src}
          alt={heroImage.alt || `Gestoría alquiler ${nombre}`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-forest-900/80" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12">
          <nav className="flex items-center gap-1.5 text-xs text-white/40 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white/70 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-white/70 transition-colors">
              Gestoría
            </Link>
            <span>/</span>
            <span className="text-white/70">{nombre}</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 rounded-full px-3.5 py-1 mb-4">
            <span className="text-xs font-semibold text-gold-300 tracking-wide uppercase">
              Gestoría para particulares
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl">
            {h1}
            <br />
            <span className="text-gold-300">{h1Accent}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl">
            {introResolved}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={lead.solicitarHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors shadow-lg"
            >
              {variant === 'vender-piso'
                ? `Solicitar arras — ${precioLabel('arras-penitenciales')}`
                : `Solicitar contrato alquiler — ${lauPrecio}`}
            </Link>
            <Link
              href={contratoHref}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Ver landing {nombre}
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: 'Renta orientativa', value: precioMedio },
              { label: 'Entrega contrato', value: '48 h' },
              { label: 'Online', value: 'Toda España' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                <p className="text-xs text-white/45 mb-0.5">{label}</p>
                <p className="text-sm font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-50 border-y border-amber-200/80">
        <div className="max-w-4xl mx-auto px-4 py-5 text-sm text-amber-950 leading-relaxed">
          <strong>Inmonest ya no publica ni busca anuncios.</strong> Si alquilas o alquilas en {nombre} como
          particular, nuestro servicio es jurídico: contrato LAU, arras, revisión y panel de cliente — sin
          comisiones de intermediación inmobiliaria.{' '}
          <Link href="/opiniones" className="underline font-semibold text-amber-900 hover:text-amber-950">
            Opiniones 5.0 en Google
          </Link>
        </div>
      </section>

      {mercado && (variant === 'pisos' || variant === 'vender-piso') && (
        <section className="max-w-4xl mx-auto px-4 py-10">
          <PageHeroImage
            src={heroImage.src}
            alt={`Mercado vivienda ${nombre}`}
            className="mb-8"
          />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Precio m²', value: mercado.precio_m2 },
              { label: 'Venta media', value: mercado.precio_venta },
              { label: 'Alquiler medio', value: mercado.precio_alquiler },
              { label: 'Tendencia alquiler', value: mercado.tendencia_alquiler },
            ].map(({ label, value }) => (
              <div key={label} className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
                <p className="text-xs text-amber-800 font-semibold uppercase tracking-wide mb-1">{label}</p>
                <p className="text-sm font-black text-gray-900">{value}</p>
              </div>
            ))}
          </div>
          <p className="text-gray-600 leading-relaxed">{mercado.descripcion}</p>
        </section>
      )}

      <ParticularesGestoriaServiciosCatalog ciudad={ciudad} nombre={nombre} />

      <GestoriaAlquilerTramiteOnlineSection
        ciudadNombre={nombre}
        panelAnchorId="panel-gestoria-portal-ciudad"
        variant="lau"
      />

      <GestoriaAlquilerModulosCompletos
        variant="lau"
        ciudadNombre={nombre}
        ciudadSlug={ciudad}
        solicitarHref={lead.solicitarHref}
        panelAnchorId="panel-gestoria-portal-ciudad"
        partes={{ tramiteOnline: false, panelDemo: false }}
      />

      <GestoriaCiudadServiciosYPanel
        ciudadNombre={nombre}
        ciudadSlug={ciudad}
        sectionIntro={`En ${nombre} cubrimos alquiler LAU, temporada, habitación y compraventa integral entre particulares: precio cerrado, bloques ilustrados y panel de seguimiento.`}
      />

      <section className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Barrios de referencia en {nombre}</h2>
          <p className="text-sm text-gray-500 mb-4 max-w-2xl">
            Contexto de mercado para tu contrato (no enlaces a anuncios). En Barcelona también tenemos guías LAU
            por barrio.
          </p>
          <div className="flex flex-wrap gap-3">
            {barrios.map((barrio) => (
              <Link
                key={barrio}
                href={getContratoAlquilerBarrioHref(ciudad, barrio)}
                className="bg-white border border-gray-200 hover:border-gold-300 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gold-700 transition-colors"
              >
                {barrio}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-gray max-w-none">
          <h2>Cómo pasar de “particular” a contrato firmado</h2>
          <ol className="space-y-3 not-prose">
            {[
              'Encuentras piso o inquilino por tu cuenta (Idealista, boca a boca, etc.).',
              'Solicitas el contrato LAU en Inmonest con los datos del inmueble y las partes.',
              'Un gestor redacta el PDF en 48 h; una ronda de cambios incluida.',
              'Firmáis con la tranquilidad de un documento adaptado a LAU y Ley de Vivienda.',
            ].map((step, i) => (
              <li key={step} className="flex gap-3 text-gray-600 text-sm leading-relaxed">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gold-500 text-white text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-gray-50 py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqMerged.map(({ q, a }) => (
              <details
                key={q}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-4 cursor-pointer list-none font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  {q}
                  <svg
                    className="w-5 h-5 text-gray-400 shrink-0 group-open:rotate-180 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-forest-900 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              {variant === 'vender-piso' ? `Arras y venta en ${nombre}` : `Contrato LAU en ${nombre}`}
            </h2>
            <p className="text-white/60 text-sm max-w-lg mx-auto">
              {variant === 'vender-piso'
                ? `${precioLabel('arras-penitenciales')} IVA incl. · Gestor experto · Trámite online`
                : `${lauPrecio} IVA incluido · Gestor experto · Entrega en 48 h`}
            </p>
          </div>
          <LeadCaptureForm
            serviceKey={lead.serviceKey}
            price={lead.price}
            label={`${lead.labelSuffix} ${nombre} — gestoría Inmonest`}
          />
        </div>
      </section>

      {variant === 'hub' && (
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-xl font-semibold text-gray-800 mb-5">Guías en {nombre}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: `/${ciudad}/alquiler-particulares`, t: 'Alquiler entre particulares', d: 'LAU y contexto de mercado' },
              { href: `/${ciudad}/alquiler-sin-agencia`, t: 'Alquiler sin agencia', d: 'Contratos sin intermediario' },
              { href: `/${ciudad}/contrato-alquiler`, t: 'Contrato alquiler', d: 'Landing servicio' },
              ...((LANDINGS_CIUDAD_PREMIUM_SLUGS as readonly string[]).includes(ciudad)
                ? [{ href: `/${ciudad}/alquiler-temporada`, t: 'Alquiler temporada', d: 'Estancia temporal' }]
                : [{ href: '/gestoria/alquiler-temporada', t: 'Alquiler temporada', d: 'Estancia temporal' }]),
              { href: `/${ciudad}/contrato-arras`, t: 'Contrato arras', d: 'Compraventa' },
              { href: `/${ciudad}/vender-piso`, t: 'Vender piso', d: 'Gestoría vendedor' },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="border border-gray-200 rounded-xl p-5 hover:border-gold-500 transition-colors"
              >
                <h3 className="font-semibold text-gray-900">{s.t}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.d}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
