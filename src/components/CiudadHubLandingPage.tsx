import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import CiudadHubComoTrabajamos from '@/components/CiudadHubComoTrabajamos'
import CiudadHubExtras from '@/components/CiudadHubExtras'
import CiudadHubMercado from '@/components/CiudadHubMercado'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubRazones from '@/components/CiudadHubRazones'
import ComprarConSeguridad from '@/components/ComprarConSeguridad'
import GestoriaHubConversionFooter from '@/components/GestoriaHubConversionFooter'
import JsonLd from '@/components/JsonLd'
import type { CiudadHubConfig } from '@/lib/gestoria-ciudad-hub-data'
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
        <section className="relative bg-gradient-to-br from-forest-800 to-forest-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
              <Link href="/" className="hover:text-gray-300">
                Inicio
              </Link>
              <span>/</span>
              <Link href="/gestoria" className="hover:text-gray-300">
                Gestoría
              </Link>
              <span>/</span>
              <span className="text-white font-medium">{nombre}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gold-500/20 text-gold-300 border border-gold-500/30 mb-4">
                  {config.heroBadge}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Gestoría Inmobiliaria <span className="text-gold-400">{nombre}</span> para Particulares
                </h1>
                <p className="text-xl text-gray-300 mb-8">{config.heroSubtitulo}</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href={solicitarLauHref}
                    className="bg-gold-500 text-forest-900 px-8 py-3 rounded-lg font-semibold hover:bg-gold-600 transition shadow-lg"
                  >
                    Contrato alquiler desde {precioLau}€ →
                  </Link>
                  <Link
                    href="/gestoria/solicitar/arras-penitenciales"
                    className="bg-white/10 border border-gold-500/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/15 transition"
                  >
                    Arras desde 145€
                  </Link>
                  <Link
                    href="#servicios"
                    className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
                  >
                    Ver todos los servicios
                  </Link>
                </div>
              </div>
              <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={config.ogImage}
                  alt={`Gestoría inmobiliaria en ${nombre}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <CiudadHubRazones ciudad={nombre} razones={config.razones} />

        <ComprarConSeguridad ciudad={nombre} ciudadSlug={slug} />

        <CiudadHubServiciosGrid
          ciudad={nombre}
          ciudadSlug={slug}
          subtitulo={config.serviciosSubtitulo}
        />

        <CiudadHubComoTrabajamos ciudad={nombre} />

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
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/gestoria/madrid" className="text-gold-500 hover:underline font-semibold">
                Madrid
              </Link>
              <Link href="/gestoria/barcelona" className="text-gold-500 hover:underline font-semibold">
                Barcelona
              </Link>
              <Link href="/gestoria/valencia" className="text-gold-500 hover:underline font-semibold">
                Valencia
              </Link>
              <Link href="/gestoria/sevilla" className="text-gold-500 hover:underline font-semibold">
                Sevilla
              </Link>
              <Link href="/gestoria" className="text-gold-500 hover:underline font-semibold">
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
