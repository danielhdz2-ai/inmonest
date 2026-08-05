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
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ¿Cuánto ahorras con gestoría vs agencia tradicional?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Somos <strong>gestoría inmobiliaria para particulares</strong>, no agencia.
              Las inmobiliarias cobran entre <strong>3% y 5%</strong> del precio de venta.
              Con Inmonest pagas <strong>687€ fijos</strong> por acompañamiento completo hasta escritura.
            </p>
          </div>
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
