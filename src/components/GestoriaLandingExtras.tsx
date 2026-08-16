import GestorDanielSection from '@/components/GestorDanielSection'
import LlamaGestorBanner from '@/components/LlamaGestorBanner'
import GestoriaServicioCiudades from '@/components/GestoriaServicioCiudades'
import { ServicioRelacionadoCard } from '@/components/ServicioRelacionadoCard'
import TestimoniosSection from '@/components/TestimoniosSection'
import FirmaCertIncluidaSection from '@/components/FirmaCertIncluidaSection'
import { getServicioImages } from '@/lib/gestoria-images'
import type { RelacionadoServicio } from '@/lib/gestoria-relacionados'
import {
  getGestorCopy,
  getTestimonioLandingForServicio,
} from '@/lib/gestoria-servicio-template'
import { hubTestimoniosLanding } from '@/lib/testimonios-data'
import { cn } from '@/lib/cn'

export type GestoriaLandingExtrasProps = {
  servicio: string
  servicioNombre: string
  testimonioLanding?: string
  whatsappMessage?: string
  llamaGestor?: {
    title?: string
    subtitle?: string
    eyebrow?: string
    imagePosition?: 'left' | 'right'
  }
  relacionados?: RelacionadoServicio[]
  showGoogleReviews?: boolean
  testimoniosLayout?: 'stack' | 'carousel'
  hideRating?: boolean
  /** Nombre de ciudad para filtrar testimonios en landings locales */
  ciudad?: string
  hubSlug?: string
  skipDaniel?: boolean
  skipLlamaGestor?: boolean
  skipCiudades?: boolean
  skipRelacionados?: boolean
  skipTestimonios?: boolean
  /** contact = Daniel + banner · footer = ciudades + relacionados + testimonios · all = todo */
  phase?: 'all' | 'contact' | 'footer'
  className?: string
}

export default function GestoriaLandingExtras({
  servicio,
  servicioNombre,
  testimonioLanding,
  whatsappMessage,
  llamaGestor,
  relacionados,
  showGoogleReviews = true,
  testimoniosLayout = 'stack',
  hideRating = true,
  ciudad,
  hubSlug,
  skipDaniel = false,
  skipLlamaGestor = false,
  skipCiudades = false,
  skipRelacionados = false,
  skipTestimonios = false,
  phase = 'all',
  className,
}: GestoriaLandingExtrasProps) {
  const showContact = phase === 'all' || phase === 'contact'
  const showFooter = phase === 'all' || phase === 'footer'
  const showDanielBlock = !skipDaniel && showContact
  const showLlamaBlock = !skipLlamaGestor && showContact && !showDanielBlock
  const waDefault = whatsappMessage ?? `Hola Daniel, tengo dudas sobre ${servicioNombre}`
  const gestorCopy = getGestorCopy(servicio, servicioNombre)
  const landingKey =
    testimonioLanding ??
    (hubSlug ? hubTestimoniosLanding(hubSlug) : getTestimonioLandingForServicio(servicio))

  const cuentanosWa =
    whatsappMessage ??
    `Hola, quiero contaros mi caso sobre ${servicioNombre.toLowerCase()}${ciudad ? ` en ${ciudad}` : ''}`

  return (
    <div className={cn('space-y-16', className)}>
      {(showDanielBlock || showLlamaBlock) && (
        <div className={cn(showDanielBlock && showLlamaBlock && 'space-y-6')}>
          {showDanielBlock && (
            <GestorDanielSection copy={gestorCopy} whatsappMessage={waDefault} />
          )}

          {showLlamaBlock && (
            <LlamaGestorBanner
              title={
                llamaGestor?.title ??
                (ciudad
                  ? `Llama a tu gestor en ${ciudad} y cuéntanos tu caso`
                  : 'Llama a tu gestor y cuéntanos tu caso')
              }
              subtitle={
                llamaGestor?.subtitle ??
                'Te explicamos el proceso, resolvemos dudas y te informamos sin compromiso. Tú decides si contratas.'
              }
              whatsappMessage={cuentanosWa}
              eyebrow={llamaGestor?.eyebrow ?? 'Atención personalizada'}
              imagePosition={llamaGestor?.imagePosition ?? 'right'}
              ciudad={ciudad}
            />
          )}
        </div>
      )}

      {showFooter && <FirmaCertIncluidaSection compact />}

      {!skipCiudades && showFooter && <GestoriaServicioCiudades servicio={servicio} />}

      {!skipRelacionados && showFooter && relacionados && relacionados.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
            Otros servicios relacionados
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto text-sm">
            Contratos redactados por gestoría especializada · Entrega en 48h
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relacionados.map((rel) => {
              const relVisuals = getServicioImages(rel.slug)
              return (
                <ServicioRelacionadoCard
                  key={rel.href}
                  href={rel.href}
                  nombre={rel.nombre}
                  precio={rel.precio}
                  descripcion={rel.descripcion}
                  imageSrc={relVisuals.hero.src}
                  imageAlt={relVisuals.hero.alt}
                />
              )
            })}
          </div>
        </section>
      )}

      {!skipTestimonios && showFooter && (
        <TestimoniosSection
          landing={landingKey}
          ciudad={ciudad}
          layout={testimoniosLayout}
          hideRating={hideRating}
          showGoogleReviews={showGoogleReviews}
          className="bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6 rounded-2xl"
        />
      )}
    </div>
  )
}
