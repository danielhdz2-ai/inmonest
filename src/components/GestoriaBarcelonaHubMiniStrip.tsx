import Link from 'next/link'

type Props = {
  /** Ej. Eixample, Gràcia */
  barrioNombre?: string
}

/** Enlace contextual al hub BCN desde landings por barrio (refuerzo internal linking). */
export default function GestoriaBarcelonaHubMiniStrip({ barrioNombre }: Props) {
  return (
    <section className="py-6 px-4 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto text-sm text-gray-600 leading-relaxed">
        <p>
          {barrioNombre ? (
            <>
              En <strong>{barrioNombre}</strong> operamos como{' '}
            </>
          ) : (
            <>Somos </>
          )}
          <strong>gestoría inmobiliaria en Barcelona</strong> para particulares (no agencia): LAU, arras y packs 687 €
          venta/compra hasta escritura.{' '}
          <Link href="/gestoria/barcelona" className="text-gold-800 font-semibold hover:underline">
            Ver gestoría inmobiliaria Barcelona →
          </Link>
        </p>
      </div>
    </section>
  )
}
