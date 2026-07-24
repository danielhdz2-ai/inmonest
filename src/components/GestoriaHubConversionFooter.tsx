import Link from 'next/link'
import LlamaGestorBanner from '@/components/LlamaGestorBanner'
import GestoriaPideInfoForm from '@/components/GestoriaPideInfoForm'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import TrackedContactLink from '@/components/TrackedContactLink'
import {
  getContratoAlquilerPrecio,
  getContratoAlquilerSolicitarHref,
} from '@/lib/gestoria-catalogo'

type Props = {
  ciudad: string
  ciudadSlug: string
  /** Título del CTA final oscuro */
  ctaTitulo?: string
  ctaTexto?: string
}

/**
 * Bloque de conversión compartido para hubs /gestoria/[ciudad]:
 * banner llamar, form pide info, CTA a contratos 145€, sticky móvil.
 */
export default function GestoriaHubConversionFooter({
  ciudad,
  ciudadSlug,
  ctaTitulo,
  ctaTexto,
}: Props) {
  const precioLau = getContratoAlquilerPrecio(ciudadSlug)
  const solicitarLauHref = getContratoAlquilerSolicitarHref(ciudadSlug)
  const waMsg = `Hola, necesito gestoría inmobiliaria en ${ciudad}`

  return (
    <>
      <LlamaGestorBanner
        variant="strip"
        ciudad={ciudad}
        title={`¿Dudas sobre gestoría en ${ciudad}?`}
        subtitle="Llama a tu gestor Inmonest: te atendemos sin compromiso y luego decides"
        whatsappMessage={waMsg}
      />

      <section className="py-12 px-4 bg-[#fdf8ee] border-y border-[#e8d48a]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#7a5c1e] mb-2">Sin compromiso</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              ¿Prefieres que te llamemos?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Déjanos nombre y teléfono. Un gestor de Inmonest te contacta, resuelve dudas sobre contratos,
              arras o compraventa en {ciudad}, y tú decides si contratas.
            </p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-[#c9a84c]">✓</span>
                Contrato alquiler desde {precioLau}€ · Arras 145€
              </li>
              <li className="flex gap-2">
                <span className="text-[#c9a84c]">✓</span>
                Respuesta en horario laboral
              </li>
              <li className="flex gap-2">
                <span className="text-[#c9a84c]">✓</span>
                Sin comisión de agencia
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl border border-[#e8d48a] p-5 sm:p-6 shadow-sm">
            <GestoriaPideInfoForm
              ciudad={ciudad}
              servicio="gestoría inmobiliaria"
              precioLabel={`desde ${precioLau}€`}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {ctaTitulo ?? `Gestoría inmobiliaria en ${ciudad}: empieza por lo que necesitas`}
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            {ctaTexto ??
              `Contrato de alquiler o arras desde ${precioLau}€, o habla con un gestor ahora. Sin compromiso.`}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={solicitarLauHref}
              className="bg-[#c9a84c] text-[#1a2f1c] px-8 py-3 rounded-lg font-semibold hover:bg-[#b8973d] transition"
            >
              Contrato alquiler desde {precioLau}€
            </Link>
            <Link
              href="/gestoria/solicitar/arras-penitenciales"
              className="bg-white/10 border border-[#c9a84c]/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/15 transition"
            >
              Arras desde 145€
            </Link>
            <TrackedContactLink
              event="click_phone"
              city={ciudadSlug}
              href="tel:+34745022862"
              className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Llamar: 745 022 862
            </TrackedContactLink>
            <TrackedContactLink
              event="click_whatsapp"
              city={ciudadSlug}
              href={`https://wa.me/34745022862?text=${encodeURIComponent(waMsg)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/30 px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              WhatsApp
            </TrackedContactLink>
          </div>
        </div>
      </section>

      <div className="h-20 md:hidden" aria-hidden />
      <StickyMobileContratoCta ciudad={ciudad} ciudadSlug={ciudadSlug} servicio="gestoria" />
    </>
  )
}
