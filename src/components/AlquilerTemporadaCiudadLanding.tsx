import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import { gestoriaLandingBreadcrumbs } from '@/lib/gestoria-ciudad-schema'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import WhatsAppButton from '@/components/WhatsAppButton'
import GestoriaAlquilerModulosCompletos, {
  GestoriaAlquilerTramiteOnlineSection,
} from '@/components/GestoriaAlquilerModulosCompletos'
import GestoriaCiudadServiciosYPanel from '@/components/GestoriaCiudadServiciosYPanel'
import type { AlquilerTemporadaCiudadConfig } from '@/lib/alquiler-temporada-ciudad-data'
import { getAlquilerTemporadaPrecio } from '@/lib/alquiler-temporada-ciudad-data'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const SOLICITAR_URL = '/gestoria/solicitar/alquiler-temporada'

export default function AlquilerTemporadaCiudadLanding({ config }: { config: AlquilerTemporadaCiudadConfig }) {
  const { nombre, slug, hero, mercadoIntro, casosUso, normativaBullets } = config
  const precio = getAlquilerTemporadaPrecio()

  return (
    <>
      <GestoriaLandingSeo
        pagePath={`/${slug}/alquiler-temporada`}
        pageTitle={hero.h1}
        description={hero.lead}
        servicioNombre="Contrato de alquiler de temporada"
        ciudadNombre={nombre}
        precioEuros={precio}
        faqs={config.faqs}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Alquiler temporada', path: '/gestoria/alquiler-temporada' },
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
            {hero.badge ?? `Alquiler temporada · ${nombre}`}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-3xl">{hero.h1}</h1>
          <p className="text-lg text-slate-200 max-w-2xl mb-8">{hero.lead}</p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={SOLICITAR_URL}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gold-500 text-gray-900 font-semibold hover:bg-gold-400 transition"
            >
              Contratar desde {precioLabel('alquiler-temporada')}
            </Link>
            <Link
              href={`/${slug}/contrato-alquiler`}
              className="inline-flex items-center justify-center px-8 py-3 rounded-lg border border-white/30 hover:bg-white/10 transition"
            >
              Ver contrato LAU en {nombre}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mercado de alquiler temporal en {nombre}</h2>
          <p className="text-gray-600 leading-relaxed mb-8">{mercadoIntro}</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Casos habituales</h3>
          <ul className="grid sm:grid-cols-2 gap-3 mb-8">
            {casosUso.map((item) => (
              <li key={item} className="text-sm text-gray-700 bg-slate-50 rounded-lg px-4 py-3 border border-gray-100">
                {item}
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Qué debe reflejar el contrato</h3>
          <ul className="space-y-2">
            {normativaBullets.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-gray-700">
                <span className="text-gold-500 font-bold shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GestoriaAlquilerTramiteOnlineSection
        ciudadNombre={nombre}
        panelAnchorId="panel-gestoria-temporada"
        variant="temporada"
      />

      <GestoriaAlquilerModulosCompletos
        variant="temporada"
        ciudadNombre={nombre}
        ciudadSlug={slug}
        solicitarHref={SOLICITAR_URL}
        panelAnchorId="panel-gestoria-temporada"
        partes={{ tramiteOnline: false }}
      />

      <GestoriaCiudadServiciosYPanel
        ciudadNombre={nombre}
        ciudadSlug={slug}
        sectionIntro={`Contrato de temporada desde ${precio}€ y resto de servicios de gestoría inmobiliaria en ${nombre}: arras, LAU habitual, compra y venta entre particulares.`}
      />

      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Preguntas frecuentes · temporada en {nombre}</h2>
          <ul className="space-y-6">
            {config.faqs.map((f) => (
              <li key={f.q}>
                <h3 className="font-semibold text-gray-900 mb-2">{f.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.a}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio="alquiler-temporada"
        servicioNombre={`Alquiler temporada en ${nombre}`}
        ciudad={nombre}
        hubSlug={slug}
        whatsappMessage={`Hola, necesito contrato alquiler temporada en ${nombre}`}
      />
      <WhatsAppButton />
    </>
  )
}
