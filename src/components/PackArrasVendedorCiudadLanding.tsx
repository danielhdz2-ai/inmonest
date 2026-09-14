import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import JsonLd from '@/components/JsonLd'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaCiudadHero from '@/components/GestoriaCiudadHero'
import { GestoriaCheckIcon } from '@/components/ui/GestoriaCheckIcon'
import { RELACIONADOS_ASESORAMIENTO_VENTA } from '@/lib/gestoria-relacionados'
import { GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { GESTORIA_CTA_BANNERS } from '@/lib/gestoria-images'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { PackArrasVendedorCiudadConfig } from '@/lib/pack-arras-vendedor-ciudad-data'
import {
  PACK_ARRAS_VENDEDOR_CIUDADES_LIST,
  PACK_ARRAS_VENDEDOR_PRECIO,
  PACK_ARRAS_VENDEDOR_SERVICIO_SLUG,
  comisionAgenciaMax,
  comisionAgenciaMin,
} from '@/lib/pack-arras-vendedor-ciudad-data'
import { getPackArrasVendedorFaq } from '@/lib/pack-arras-vendedor-ciudad-faq'
import { getPackArrasVendedorEnriquecimiento } from '@/lib/pack-arras-vendedor-enriquecimiento'
import { buildFaqSchema, buildServiceOfferSchema } from '@/lib/gestoria-ciudad-schema'

const SOLICITAR_URL = '/gestoria/solicitar/pack-arras-plus-vendedor'

const PACK_INCLUYE = [
  'Arras penitenciales redactadas por gestoría (PDF en 48 h)',
  'Revisión de nota simple, cargas y titularidad registral',
  'Checklist documental para notaría (cédula, CEE, comunidad, ITE)',
  'Informe de riesgos detectados antes de firmar o entregar más documentación',
  'Gestor asignado por WhatsApp hasta tener arras y docs al día',
]

type Props = {
  config: PackArrasVendedorCiudadConfig
}

export default function PackArrasVendedorCiudadLanding({ config }: Props) {
  const { nombre, slug, region, precioEjemploPiso } = config
  const agenciaMin = comisionAgenciaMin(precioEjemploPiso)
  const agenciaMax = comisionAgenciaMax(precioEjemploPiso)
  const faq = getPackArrasVendedorFaq(nombre, region, precioEjemploPiso, config.faqPrioritarias)
  const local = getPackArrasVendedorEnriquecimiento(slug)

  return (
    <>
      <JsonLd
        schema={[
          buildServiceOfferSchema('Pack Arras Plus Vendedor', nombre, PACK_ARRAS_VENDEDOR_PRECIO),
          buildFaqSchema(faq),
        ]}
      />
      <Navbar />
      <WhatsAppButton />

      <GestoriaCiudadHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Gestoría', href: '/gestoria' },
          { label: 'Pack Arras Vendedor', href: '/gestoria/pack-arras-plus-vendedor' },
          { label: nombre },
        ]}
        badge={`Gestoría inmobiliaria · Vendedor particular · ${region}`}
        title={config.hero.h1}
        lead={config.hero.lead}
        precio={PACK_ARRAS_VENDEDOR_PRECIO}
        imageSrc={config.heroImage}
        imageAlt={`Pack arras vendedor ${nombre}`}
        solicitarHref={SOLICITAR_URL}
        footnote={`Arras + documentación · Gestor en 24h · Sin comisión sobre el precio del piso`}
      />

      {local && (
        <section className="py-14 px-4 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{local.gestoriaTitulo}</h2>
            <p className="text-gray-600 leading-relaxed">{local.gestoriaIntro}</p>
          </div>
        </section>
      )}

      <AgenciaGestoriaPanelDemo audience="particular" particularRole="vendedor" ciudadNombre={nombre} />

      <section className="py-14 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-8">
            Qué incluye el pack vendedor en {nombre}
          </h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {PACK_INCLUYE.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-gray-700 bg-white rounded-lg p-4 border border-gray-100">
                <GestoriaCheckIcon className="mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
          <p className="text-center text-sm text-gray-600 mt-8">
            ¿Quieres acompañamiento hasta escritura?{' '}
            <Link href={`/gestoria/venta-completa-reserva-escritura/${slug}`} className="font-semibold text-gold-600 hover:underline">
              Venta completa en {nombre} (687€) →
            </Link>
          </p>
        </div>
      </section>

      {local && (
        <>
          <section className="py-14 px-4 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">{local.situacionesTitulo}</h2>
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {local.situaciones.map((s) => (
                  <div key={s.titulo} className="bg-slate-50 border border-gray-200 rounded-xl p-5">
                    <h3 className="font-bold text-gray-900 mb-2">{s.titulo}</h3>
                    <p className="text-sm text-gray-600">{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 px-4 bg-slate-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">{local.barriosTitulo}</h2>
              <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">{local.barriosIntro}</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {local.barrios.map((b) => (
                  <div key={b.nombre} className="bg-white border border-gold-300/30 rounded-xl p-5">
                    <h3 className="font-bold text-gray-900 mb-1">{b.nombre}</h3>
                    <p className="text-xs font-semibold text-gold-700 mb-2">{b.contexto}</p>
                    <p className="text-sm text-gray-600">{b.operativa}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 mb-2">
            Comisión típica de agencia en un piso de {precioEjemploPiso.toLocaleString('es-ES')}€ en {nombre}:
          </p>
          <p className="text-2xl font-bold text-gray-900">
            {agenciaMin.toLocaleString('es-ES')}€ – {agenciaMax.toLocaleString('es-ES')}€
          </p>
          <p className="text-sm text-gold-700 font-semibold mt-2">Pack Inmonest: {PACK_ARRAS_VENDEDOR_PRECIO}€ IVA incl.</p>
        </div>
      </section>

      <section className="py-10 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Zonas con cobertura en {nombre}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CiudadHubServiciosGrid
        ciudad={nombre}
        ciudadSlug={slug}
        subtitulo={`Otros servicios de gestoría en ${nombre} para vendedores.`}
        excluirServicios={[PACK_ARRAS_VENDEDOR_SERVICIO_SLUG]}
      />

      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-3">Pack vendedor también en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PACK_ARRAS_VENDEDOR_CIUDADES_LIST.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/gestoria/pack-arras-plus-vendedor/${c.slug}`}
                className="text-sm font-semibold text-gold-500 hover:underline"
              >
                {c.nombre} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <GestoriaLandingExtras
        servicio={PACK_ARRAS_VENDEDOR_SERVICIO_SLUG}
        servicioNombre={`Pack Arras Vendedor en ${nombre}`}
        ciudad={nombre}
        whatsappMessage={`Hola Daniel, quiero el Pack Arras Vendedor en ${nombre}`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes — Pack vendedor en ${nombre}`}
        subtitulo="Dudas habituales de propietarios que venden sin agencia."
      />

      <GestoriaLandingExtras
        servicio={PACK_ARRAS_VENDEDOR_SERVICIO_SLUG}
        servicioNombre={`Pack Arras Vendedor en ${nombre}`}
        ciudad={nombre}
        testimonioLanding={config.testimoniosLanding}
        relacionados={RELACIONADOS_ASESORAMIENTO_VENTA}
        skipCiudades
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow={`Pack vendedor · ${nombre}`}
            title={`Arras y documentación en ${nombre}`}
            description={`${PACK_ARRAS_VENDEDOR_PRECIO}€ fijos · Gestor asignado · Sin comisión de agencia · Respuesta en 24h`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar online — ${PACK_ARRAS_VENDEDOR_PRECIO}€`}
            imageSrc={GESTORIA_CTA_BANNERS.ventaCompleta.src}
            imageAlt={GESTORIA_CTA_BANNERS.ventaCompleta.alt}
            imagePosition="right"
          />
        </div>
      </section>
    </>
  )
}
