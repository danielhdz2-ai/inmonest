import Link from 'next/link'
import GestoriaServicioFaqAboveFold from '@/components/GestoriaServicioFaqAboveFold'
import { buildGestoriaWhatsAppHref } from '@/lib/gestoria-contact'

type FaqItem = { q: string; a: string }

type Props = {
  ciudadNombre: string
  faqs: readonly FaqItem[]
  whatsappMessage: string
}

/** FAQ + WhatsApp bajo el hero en hubs BCN/MAD/VLC (query «gestoría inmobiliaria [ciudad]»). */
export default function GestoriaCiudadHubAboveFold({ ciudadNombre, faqs, whatsappMessage }: Props) {
  const waHref = buildGestoriaWhatsAppHref(whatsappMessage)

  return (
    <>
      <section className="border-b border-gold-200/40 bg-white py-6 px-4">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            <strong>Gestoría inmobiliaria en {ciudadNombre}</strong> para particulares: LAU desde 145 €, arras y packs
            687 € sin comisión de agencia. Respuesta en horario laboral.
          </p>
          <Link
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
          >
            WhatsApp con Daniel
          </Link>
        </div>
      </section>
      <GestoriaServicioFaqAboveFold
        title={`Gestoría inmobiliaria ${ciudadNombre}: preguntas frecuentes`}
        faqs={[...faqs]}
        limit={3}
      />
    </>
  )
}
