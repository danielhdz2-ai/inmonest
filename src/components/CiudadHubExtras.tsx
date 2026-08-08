import CalculadoraAhorroComisiones from '@/components/CalculadoraAhorroComisiones'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'

type CiudadHubExtrasProps = {
  ciudad: string
  hubSlug?: string
  whatsappMessage?: string
  testimoniosLayout?: 'carousel' | 'stack'
  showGoogleReviews?: boolean
  /** calculator-contact = calculadora + Daniel · testimonios = reseñas al final */
  section?: 'calculator-contact' | 'testimonios'
}

export default function CiudadHubExtras({
  ciudad,
  hubSlug,
  whatsappMessage,
  testimoniosLayout = 'carousel',
  showGoogleReviews = true,
  section = 'calculator-contact',
}: CiudadHubExtrasProps) {
  const wa =
    whatsappMessage ??
    `Hola Daniel, necesito gestoría inmobiliaria para particulares en ${ciudad}`

  if (section === 'testimonios') {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <GestoriaLandingExtras
          servicio="contrato-alquiler"
          servicioNombre={`Gestoría inmobiliaria en ${ciudad}`}
          hubSlug={hubSlug}
          ciudad={ciudad}
          testimoniosLayout={testimoniosLayout}
          showGoogleReviews={showGoogleReviews}
          skipCiudades
          skipRelacionados
          skipDaniel
          skipLlamaGestor
          phase="footer"
        />
      </div>
    )
  }

  return (
    <>
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <CalculadoraAhorroComisiones />
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <GestoriaLandingExtras
          servicio="contrato-alquiler"
          servicioNombre={`Gestoría inmobiliaria en ${ciudad}`}
          hubSlug={hubSlug}
          ciudad={ciudad}
          whatsappMessage={wa}
          skipCiudades
          skipRelacionados
          skipTestimonios
          phase="contact"
        />
      </div>
    </>
  )
}
