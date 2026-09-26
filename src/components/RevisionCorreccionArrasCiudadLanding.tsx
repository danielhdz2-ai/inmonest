import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestoriaTramiteOnlineSection from '@/components/GestoriaTramiteOnlineSection'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import type { RevisionCorreccionArrasCiudadConfig } from '@/lib/revision-correccion-arras-ciudad-data'
import {
  REVISION_ARRAS_GESTOR,
  REVISION_ARRAS_PRECIO,
} from '@/lib/revision-correccion-arras-ciudad-data'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const SOLICITAR_URL = '/gestoria/solicitar/revision-correccion-arras'

const REVISA_BASE = [
  'Tipo de arras (penitenciales vs confirmatorias) y coherencia con el precio',
  'Importe de señal y forma de pago trazable',
  'Plazo para firma de escritura pública',
  'Cláusula de cancelación por hipoteca o financiación',
  'Penalizaciones por incumplimiento de comprador o vendedor',
  'Datos registrales del inmueble y referencia catastral',
] as const

export default function RevisionCorreccionArrasCiudadLanding({
  config,
}: {
  config: RevisionCorreccionArrasCiudadConfig
}) {
  const { nombre, slug, hero, mercadoIntro, alerta, riesgosLocales, faqs, gestorBio, region } = config

  return (
    <>
      <GestoriaLandingSeo
        pagePath={`/gestoria/revision-correccion-arras/${slug}`}
        pageTitle={hero.h1}
        description={hero.lead}
        servicioNombre="Revisión y corrección de contrato de arras"
        ciudadNombre={nombre}
        precioEuros={REVISION_ARRAS_PRECIO}
        faqs={faqs}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Revisión arras', path: '/gestoria/revision-correccion-arras' },
          { name: nombre },
        )}
      />
      <Navbar />

      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <Image src={config.heroImage} alt="" fill className="object-cover" priority sizes="100vw" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28">
          <p className="text-gold-400 font-semibold text-sm uppercase tracking-wide mb-3">
            {hero.badge ?? `Revisión arras · ${region}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl">{hero.h1}</h1>
          <p className="text-lg text-slate-200 max-w-2xl mb-8">{hero.lead}</p>
          <Link
            href={SOLICITAR_URL}
            className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gold-500 text-gray-900 font-semibold hover:bg-gold-400 transition"
          >
            Revisar mi contrato — {precioLabel('revision-correccion-arras')}
          </Link>
        </div>
      </section>

      <GestoriaTramiteOnlineSection
        ciudad={nombre}
        tipo="arras-penitenciales"
        panelAnchorId="panel-revision-arras"
      />

      <section className="py-16 px-4 bg-amber-50 border-y border-amber-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-bold text-amber-950 mb-3">{alerta.titulo}</h2>
          <p className="text-amber-900/90 text-sm leading-relaxed">{alerta.texto}</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-10">{mercadoIntro}</p>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Riesgos frecuentes en arras en {nombre}
              </h2>
              <ul className="space-y-3 mb-8">
                {riesgosLocales.map((item) => (
                  <li key={item} className="flex gap-2 text-gray-700 text-sm">
                    <span className="text-red-500 font-bold shrink-0">!</span>
                    {item}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Checklist base de revisión</h3>
              <ul className="space-y-2">
                {REVISA_BASE.map((item) => (
                  <li key={item} className="flex gap-2 text-gray-600 text-sm">
                    <span className="text-gold-500 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-gray-600 text-sm">
                Precio cerrado: {REVISION_ARRAS_PRECIO}€ IVA incluido. Observaciones + borrador corregido listo para
                firmar.
              </p>
            </div>
            <div className="bg-slate-50 border border-gray-200 rounded-xl p-6">
              <div className="flex gap-4 items-center mb-4">
                <Image
                  src={REVISION_ARRAS_GESTOR.foto}
                  alt={REVISION_ARRAS_GESTOR.nombre}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{REVISION_ARRAS_GESTOR.nombre}</p>
                  <p className="text-xs text-gray-600">{REVISION_ARRAS_GESTOR.rol}</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {gestorBio ?? REVISION_ARRAS_GESTOR.bio}
              </p>
              <Link
                href={`/${slug}/contrato-arras`}
                className="inline-block mt-4 text-sm text-gold-700 font-semibold hover:underline"
              >
                ¿Aún no tienes arras? Redactar en {nombre} →
              </Link>
              <Link
                href={`/gestoria/due-diligence-precompra/${slug}`}
                className="inline-block mt-2 text-sm text-gray-700 hover:underline"
              >
                Due diligence pre-compra en {nombre} →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Preguntas frecuentes · arras en {nombre}</h2>
          <ul className="space-y-6">
            {faqs.map((f) => (
              <li key={f.q}>
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CiudadHubServiciosGrid
        ciudad={nombre}
        ciudadSlug={slug}
        subtitulo={`Servicios de gestoría inmobiliaria en ${nombre} relacionados con la compraventa.`}
      />

      <GestoriaLandingExtras
        servicio="revision-correccion-arras"
        servicioNombre={`Revisión arras en ${nombre}`}
        ciudad={nombre}
        hubSlug={slug}
        whatsappMessage={`Hola, quiero revisar un contrato de arras en ${nombre}`}
      />
      <WhatsAppButton />
    </>
  )
}
