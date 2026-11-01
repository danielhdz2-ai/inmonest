import Link from 'next/link'
import { CONTRATO_ALQUILER_PREMIUM } from '@/lib/contrato-alquiler-premium-config'
import { getContratoAlquilerSolicitarHref } from '@/lib/gestoria-catalogo'

type Props = {
  ciudadNombre: string
  ciudadSlug: string
}

/** Bloque on-page para query GSC «gestoría inmobiliaria [ciudad]» (posición ~25–46). */
export default function GestoriaCiudadKeywordSection({ ciudadNombre, ciudadSlug }: Props) {
  const lauLandingHref =
    ciudadSlug in CONTRATO_ALQUILER_PREMIUM
      ? `/${ciudadSlug}/contrato-alquiler`
      : '/gestoria/contrato-alquiler'
  const solicitarLauHref = getContratoAlquilerSolicitarHref(ciudadSlug)

  return (
    <section className="py-10 px-4 bg-white border-b border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Gestoría inmobiliaria en {ciudadNombre} para particulares
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          Una <strong>gestoría inmobiliaria</strong> redacta y revisa contratos (alquiler LAU, arras, compraventa),
          comprueba documentación y coordina con notaría. En {ciudadNombre} no necesitas pagar comisión de agencia del 3–5
          %: en Inmonest contratas packs desde 145 € o acompañamiento completo hasta escritura por 687 € IVA incluido,
          con gestor asignado y panel online.
        </p>
        <ul className="text-sm text-gray-600 space-y-2 mb-5 list-disc pl-5">
          <li>Contrato de alquiler LAU adaptado a normativa 2026</li>
          <li>Arras penitenciales y revisión antes de firmar</li>
          <li>Venta o compra entre particulares sin captación de inmuebles</li>
        </ul>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href={solicitarLauHref} className="font-semibold text-gold-800 hover:underline">
            Contratar alquiler LAU →
          </Link>
          <Link href={lauLandingHref} className="font-semibold text-gray-700 hover:underline">
            Landing LAU {ciudadNombre} →
          </Link>
          <Link
            href={`/gestoria/venta-completa-reserva-escritura/${ciudadSlug}`}
            className="font-semibold text-gold-800 hover:underline"
          >
            Venta completa {ciudadNombre} →
          </Link>
          <Link
            href={`/gestoria/compra-completa-reserva-escritura/${ciudadSlug}`}
            className="font-semibold text-emerald-800 hover:underline"
          >
            Compra completa {ciudadNombre} →
          </Link>
        </div>
      </div>
    </section>
  )
}
