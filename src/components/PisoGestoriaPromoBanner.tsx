import Link from 'next/link'
import { GestoriaImageBanner } from '@/components/ui/GestoriaImageBanner'
import {
  getContratoAlquilerHref,
  getContratoArrasHref,
  normalizeCiudadSlug,
} from '@/lib/gestoria-compra-cross-sell'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const LISTING_BANNER_CLASS =
  'ring-1 ring-gold-500/35 shadow-2xl shadow-black/25'

const EYEBROW_CLASS = 'text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-gold-400 mb-3'
const TITLE_CLASS = 'text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight'
const BODY_CLASS = 'text-white/85 text-base sm:text-lg mb-6 leading-relaxed max-w-2xl'
const BTN_PRIMARY =
  'inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-gold-500 text-white font-bold hover:bg-gold-400 transition-colors text-base shadow-lg shadow-gold-900/30'
const BTN_SECONDARY =
  'inline-flex items-center justify-center px-7 py-3.5 rounded-full border-2 border-white/35 text-white font-semibold hover:bg-white/10 transition-colors text-base'

type PisoGestoriaBannerProps = {
  city?: string | null
}

export function PisoAlquilerLauBanner({ city }: PisoGestoriaBannerProps) {
  const precio = precioLabel('contrato-alquiler')
  const href = getContratoAlquilerHref(normalizeCiudadSlug(city))

  return (
    <GestoriaImageBanner
      imageSrc="/contratodealquiler.jpg"
      imageAlt="Contrato de alquiler LAU redactado por gestoría inmobiliaria"
      imagePosition="right"
      size="lg"
      className={LISTING_BANNER_CLASS}
    >
      <p className={EYEBROW_CLASS}>Gestoría inmobiliaria</p>
      <h3 className={TITLE_CLASS}>¿Vas a alquilar este piso?</h3>
      <p className={BODY_CLASS}>
        Necesitas un <strong className="text-white">contrato de alquiler LAU</strong> (obligatorio por ley).
        Nuestros gestores lo redactan personalizado con todas las cláusulas legales.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link href={href} className={BTN_PRIMARY}>
          Crear contrato LAU — {precio} →
        </Link>
        <Link href="/blog/contrato-arrendamiento-lau" className={BTN_SECONDARY}>
          Leer guía completa
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}

export function PisoArrasCompraBanner({ city }: PisoGestoriaBannerProps) {
  const precio = precioLabel('arras-penitenciales')
  const href = getContratoArrasHref(normalizeCiudadSlug(city))

  return (
    <GestoriaImageBanner
      imageSrc="/contratodearras.jpg"
      imageAlt="Contrato de arras penitenciales redactado por gestoría"
      imagePosition="left"
      size="lg"
      className={LISTING_BANNER_CLASS}
    >
      <p className={EYEBROW_CLASS}>Compraventa segura</p>
      <h3 className={TITLE_CLASS}>¿Listo para comprar?</h3>
      <p className={BODY_CLASS}>
        Protege tu señal con un <strong className="text-white">contrato de arras</strong> redactado por gestores expertos.
        Evita problemas legales y asegura tu compra.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link href={href} className={BTN_PRIMARY}>
          Crear contrato de arras — {precio} →
        </Link>
        <Link href="/gestoria" className={BTN_SECONDARY}>
          Ver todos los servicios
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}

export function PisoVendedorBanner() {
  const precio = precioLabel('venta-completa-reserva-escritura')

  return (
    <GestoriaImageBanner
      imageSrc="/gestoria10.jpg"
      imageAlt="Acompañamiento de venta entre particulares hasta escritura"
      imagePosition="right"
      size="lg"
      className={LISTING_BANNER_CLASS}
    >
      <p className={EYEBROW_CLASS}>Venta entre particulares</p>
      <h3 className={TITLE_CLASS}>¿Eres el vendedor de este piso?</h3>
      <p className={BODY_CLASS}>
        Si vendes de <strong className="text-white">particular a particular con comprador ya encontrado</strong>,
        te ayudamos con contratos, documentación y acompañamiento hasta escritura. Sin comisión del 3–5% de agencia.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link href="/gestoria/venta-completa-reserva-escritura" className={BTN_PRIMARY}>
          Ver servicio completo — {precio} →
        </Link>
        <Link href="/gestoria/solicitar" className={BTN_SECONDARY}>
          Solicitar información →
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}
