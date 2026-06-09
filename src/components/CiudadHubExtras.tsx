import CalculadoraAhorroComisiones from '@/components/CalculadoraAhorroComisiones'
import GestorContactBanner from '@/components/GestorContactBanner'
import TestimoniosSection from '@/components/TestimoniosSection'

type CiudadHubExtrasProps = {
  ciudad: string
  whatsappMessage?: string
  testimoniosLayout?: 'carousel' | 'stack'
  showGoogleReviews?: boolean
}

export default function CiudadHubExtras({
  ciudad,
  whatsappMessage,
  testimoniosLayout = 'carousel',
  showGoogleReviews = false,
}: CiudadHubExtrasProps) {
  const wa =
    whatsappMessage ??
    `Hola, necesito gestoría inmobiliaria para particulares en ${ciudad}`

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

      <GestorContactBanner
        whatsappMessage={wa}
        subtitle={`Te explicamos cómo comprar o vender en ${ciudad} sin comisiones abusivas. Sin compromiso.`}
      />

      <TestimoniosSection
        className="bg-gray-50"
        layout={testimoniosLayout}
        showGoogleReviews={showGoogleReviews}
      />
    </>
  )
}
