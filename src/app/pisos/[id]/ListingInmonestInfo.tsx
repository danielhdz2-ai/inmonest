import Link from 'next/link'

interface Props {
  isLoggedIn: boolean
  listingId: string
}

export default function ListingInmonestInfo({ isLoggedIn, listingId }: Props) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-amber-200/80 bg-amber-50/60 px-5 py-4">
        <p className="text-sm text-amber-950 leading-relaxed">
          <strong>Inmonest no es el propietario de este inmueble.</strong>{' '}
          {isLoggedIn ? (
            <>
              Usa el botón de la columna lateral para ver el teléfono del propietario o acceder a su
              anuncio original.
            </>
          ) : (
            <>
              <Link
                href={`/registro?next=/pisos/${listingId}`}
                className="font-semibold text-gold-700 underline underline-offset-2 hover:text-gold-800"
              >
                Regístrate gratis
              </Link>{' '}
              para ver el teléfono del propietario o el anuncio original del propietario.
            </>
          )}
        </p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-gray-50/80 px-5 py-5">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">¿Qué es Inmonest?</h2>
        <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
          <p>
            Inmonest es una <strong className="text-gray-800">plataforma para particulares</strong> que
            ayuda a dar visibilidad a viviendas de propietarios directos, para que encuentres tu hogar
            ideal <strong className="text-gray-800">sin pagar comisión de agencia</strong>.
          </p>
          <p>
            También somos una <strong className="text-gray-800">gestoría inmobiliaria online</strong>{' '}
            para todo tipo de trámites entre particulares: contratos de alquiler LAU, arras penitenciales,
            revisión documental antes de comprar y asesoría en compraventa.
          </p>
          <p>
            <strong className="text-gray-800">No somos una inmobiliaria</strong> ni gestionamos esta
            propiedad. No llevamos el piso ni cobramos comisión sobre el precio. Solo facilitamos que
            particulares den visibilidad a sus anuncios y que otros particulares encuentren alquileres y
            ventas de forma gratuita.
          </p>
        </div>
        <Link
          href="/gestoria"
          className="inline-block mt-4 text-sm font-semibold text-gold-700 hover:text-gold-800"
        >
          Ver servicios de gestoría →
        </Link>
      </div>
    </div>
  )
}
