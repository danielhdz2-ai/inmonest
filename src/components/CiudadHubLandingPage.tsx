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
import JsonLd from '@/components/JsonLd'
import type { CiudadHubConfig } from '@/lib/gestoria-ciudad-hub-data'
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
        <section className="relative bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white py-20">
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
                <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-[#c9a84c]/20 text-[#c9a84c] border border-[#c9a84c]/30 mb-4">
                  {config.heroBadge}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Gestoría Inmobiliaria <span className="text-[#c9a84c]">{nombre}</span> para Particulares
                </h1>
                <p className="text-xl text-gray-300 mb-8">{config.heroSubtitulo}</p>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/gestoria/solicitar/contrato-alquiler"
                    className="bg-[#c9a84c] text-[#1a2f1c] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition shadow-lg"
                  >
                    Contrato alquiler desde 145€ →
                  </Link>
                  <Link
                    href="/gestoria/solicitar/arras-penitenciales"
                    className="bg-white/10 border border-[#c9a84c]/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/15 transition"
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
              <Link href="/gestoria/madrid" className="text-[#c9a84c] hover:underline font-semibold">
                Madrid
              </Link>
              <Link href="/gestoria/barcelona" className="text-[#c9a84c] hover:underline font-semibold">
                Barcelona
              </Link>
              <Link href="/gestoria/valencia" className="text-[#c9a84c] hover:underline font-semibold">
                Valencia
              </Link>
              <Link href="/gestoria/sevilla" className="text-[#c9a84c] hover:underline font-semibold">
                Sevilla
              </Link>
              <Link href="/gestoria" className="text-[#c9a84c] hover:underline font-semibold">
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

        <section className="py-16 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{config.ctaFinalTitulo}</h2>
            <p className="text-xl text-gray-300 mb-8">{config.ctaFinalTexto}</p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/gestoria/solicitar/acompanamiento-reserva-arras"
                className="bg-[#c9a84c] text-[#1a2f1c] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
              >
                Contratar servicio premium
              </Link>
              <a
                href="tel:+34745022862"
                className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Llamar: 745 022 862
              </a>
              <a
                href={`https://wa.me/34745022862?text=${encodeURIComponent(`Hola, necesito gestoría inmobiliaria en ${nombre}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
