import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import GestoriaCiudadHubHero from '@/components/GestoriaCiudadHubHero'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import CiudadHubComoTrabajamos from '@/components/CiudadHubComoTrabajamos'
import CiudadHubExtras from '@/components/CiudadHubExtras'
import CiudadHubMercado from '@/components/CiudadHubMercado'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubRazones from '@/components/CiudadHubRazones'
import ComprarConSeguridad from '@/components/ComprarConSeguridad'
import GestoriaCiudadServiciosYPanel from '@/components/GestoriaCiudadServiciosYPanel'
import GestoriaHubConversionFooter from '@/components/GestoriaHubConversionFooter'
import GestoriaCiudadAgenciasBanner from '@/components/GestoriaCiudadAgenciasBanner'
import JsonLd from '@/components/JsonLd'
import type { CiudadHubConfig } from '@/lib/gestoria-ciudad-hub-data'
import { GESTORIA_HUB_CIUDAD_SLUGS } from '@/lib/gestoria-ciudad-hub-data'
import { getNombreCiudad } from '@/lib/gestoria-ciudades-inventario'
import { isAgenciaGestoriaCiudadSlug } from '@/lib/agencias-gestoria-ciudades'
import { getCiudadImage } from '@/lib/gestoria-images'
import {
  getContratoAlquilerPrecio,
  getContratoAlquilerSolicitarHref,
} from '@/lib/gestoria-catalogo'
import {
  buildFaqSchema,
  buildLegalServiceSchema,
  buildServiceOfferSchema,
} from '@/lib/gestoria-ciudad-schema'

type CiudadHubLandingPageProps = {
  config: CiudadHubConfig
}

export default function CiudadHubLandingPage({ config }: CiudadHubLandingPageProps) {
  const { nombre, slug } = config
  const precioLau = getContratoAlquilerPrecio(slug)
  const solicitarLauHref = getContratoAlquilerSolicitarHref(slug)

  return (
    <>
      <JsonLd
        schema={[
          buildLegalServiceSchema(nombre, slug),
          buildServiceOfferSchema('Acompañamiento Reserva hasta Arras', nombre, 424),
          buildFaqSchema(config.faq),
        ]}
      />
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <GestoriaCiudadHubHero
          config={config}
          imageSrc={getCiudadImage(slug).src}
          imageAlt={`Gestoría inmobiliaria en ${nombre}`}
          precioLau={precioLau}
          solicitarLauHref={solicitarLauHref}
        />

        <CiudadHubRazones ciudad={nombre} razones={config.razones} />

        <ComprarConSeguridad ciudad={nombre} ciudadSlug={slug} />

        <CiudadHubServiciosGrid
          ciudad={nombre}
          ciudadSlug={slug}
          subtitulo={config.serviciosSubtitulo}
        />

        <CiudadHubComoTrabajamos ciudad={nombre} />

        <GestoriaCiudadServiciosYPanel
          ciudadNombre={nombre}
          ciudadSlug={slug}
          sectionIntro={config.serviciosSubtitulo}
        />

        <CiudadHubMercado
          ciudad={nombre}
          zonas={config.mercadoZonas}
          compraventa={
            <>
              {config.mercadoCompraventa.map((p) => (
                <p key={p} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              ))}
            </>
          }
          particularidades={config.mercadoParticularidades}
        />

        <section className="py-12 bg-white border-t border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-6">También ofrecemos gestoría inmobiliaria en:</h3>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {GESTORIA_HUB_CIUDAD_SLUGS.filter((s) => s !== slug)
                .slice(0, 8)
                .map((hubSlug) => (
                  <Link
                    key={hubSlug}
                    href={`/gestoria/${hubSlug}`}
                    className="text-gold-500 hover:underline font-semibold"
                  >
                    {getNombreCiudad(hubSlug)}
                  </Link>
                ))}
              <Link href="/gestoria/ciudades" className="text-gold-500 hover:underline font-semibold">
                Ver todas las ciudades →
              </Link>
            </div>
          </div>
        </section>

        <CiudadHubExtras
          ciudad={nombre}
          hubSlug={slug}
          whatsappMessage={`Hola, necesito gestoría inmobiliaria para particulares en ${nombre}`}
          testimoniosLayout="stack"
        />

        <CiudadHubFaq ciudad={nombre} items={config.faq} subtitulo={config.faqSubtitulo} />

        <CiudadHubExtras
          ciudad={nombre}
          hubSlug={slug}
          section="testimonios"
          testimoniosLayout="stack"
        />

        {isAgenciaGestoriaCiudadSlug(slug) && (
          <GestoriaCiudadAgenciasBanner ciudadSlug={slug} ciudadNombre={nombre} />
        )}
      </main>

      <GestoriaHubConversionFooter
        ciudad={nombre}
        ciudadSlug={slug}
        ctaTitulo={config.ctaFinalTitulo}
        ctaTexto={config.ctaFinalTexto}
      />
    </>
  )
}
