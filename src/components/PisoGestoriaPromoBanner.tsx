import Link from 'next/link'
import { GestoriaImageBanner } from '@/components/ui/GestoriaImageBanner'
import { precioLabel } from '@/lib/gestoria-precios-ui'

export function PisoAlquilerLauBanner() {
  const precio = precioLabel('contrato-alquiler')

  return (
    <GestoriaImageBanner
      imageSrc="/contratodealquiler.jpg"
      imageAlt="Contrato de alquiler LAU redactado por gestoría inmobiliaria"
      imagePosition="right"
      size="sm"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Gestoría inmobiliaria</p>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">¿Vas a alquilar este piso?</h3>
      <p className="text-white/80 text-sm sm:text-base mb-5 leading-relaxed">
        Necesitas un <strong className="text-white">contrato de alquiler LAU</strong> (obligatorio por ley).
        Nuestros gestores lo redactan personalizado con todas las cláusulas legales.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/gestoria/contrato-alquiler"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors text-sm"
        >
          Crear contrato LAU — {precio} →
        </Link>
        <Link
          href="/blog/contrato-arrendamiento-lau"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors text-sm"
        >
          Leer guía completa
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}

export function PisoArrasCompraBanner() {
  const precio = precioLabel('arras-penitenciales')

  return (
    <GestoriaImageBanner
      imageSrc="/contratodearras.jpg"
      imageAlt="Contrato de arras penitenciales redactado por gestoría"
      imagePosition="left"
      size="sm"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Compraventa segura</p>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">¿Listo para comprar?</h3>
      <p className="text-white/80 text-sm sm:text-base mb-5 leading-relaxed">
        Protege tu señal con un <strong className="text-white">contrato de arras</strong> redactado por gestores expertos.
        Evita problemas legales y asegura tu compra.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/gestoria/arras-penitenciales"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors text-sm"
        >
          Crear contrato de arras — {precio} →
        </Link>
        <Link
          href="/gestoria"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors text-sm"
        >
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
      size="sm"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">Venta entre particulares</p>
      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">¿Eres el vendedor de este piso?</h3>
      <p className="text-white/80 text-sm sm:text-base mb-5 leading-relaxed">
        Si vendes de <strong className="text-white">particular a particular con comprador ya encontrado</strong>,
        te ayudamos con contratos, documentación y acompañamiento hasta escritura. Sin comisión del 3–5% de agencia.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/gestoria/venta-completa-reserva-escritura"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full bg-gold-500 text-white font-semibold hover:bg-gold-600 transition-colors text-sm"
        >
          Ver servicio completo — {precio} →
        </Link>
        <Link
          href="/gestoria/solicitar"
          className="inline-flex items-center justify-center px-5 py-3 rounded-full border border-white/30 text-white font-medium hover:bg-white/10 transition-colors text-sm"
        >
          Solicitar información →
        </Link>
      </div>
    </GestoriaImageBanner>
  )
}
