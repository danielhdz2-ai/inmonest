import Image from 'next/image'
import Link from 'next/link'
import { GESTOR_DANIEL_HERNANDEZ } from '@/lib/gestores-inmonest'
import { GESTORIA_PHONE_DISPLAY, GESTORIA_PHONE_TEL, GESTORIA_PHONE_WA } from '@/lib/gestoria-contact'

type BlogGestorExpedientePanelProps = {
  whatsappMessage?: string
  title?: string
  body?: string
}

export function BlogGestorExpedientePanel({
  whatsappMessage = 'Hola Daniel, leo vuestro blog y necesito hablar con un gestor sobre mi operación',
  title = '¿Necesitas hablar con tu gestor?',
  body = 'Primera consulta sin compromiso. Tras contratar, abres expediente en el panel de cliente: subes documentos, chateas con Daniel Hernández (gestor asignado) y recibes informes o contratos en PDF.',
}: BlogGestorExpedientePanelProps) {
  const waHref = `https://wa.me/${GESTORIA_PHONE_WA}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <aside className="not-prose my-10 rounded-2xl border border-gold-200 bg-gradient-to-br from-cream-50 to-white overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-0">
        <div className="relative h-36 sm:h-full sm:min-h-[180px] bg-gray-100">
          <Image
            src={GESTOR_DANIEL_HERNANDEZ.foto}
            alt={`${GESTOR_DANIEL_HERNANDEZ.nombre}, gestor inmobiliario Inmonest`}
            fill
            className="object-cover object-top"
            sizes="140px"
          />
        </div>
        <div className="p-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gold-700 mb-1">Panel + gestor asignado</p>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{body}</p>
          <ul className="text-xs text-gray-700 space-y-1.5 mb-5">
            <li>✓ Videollamada, llamada o WhatsApp (L–V 9:00–19:00)</li>
            <li>✓ Expediente online tras el pago — sin desplazamientos</li>
            <li>✓ Sin comisión sobre el precio del piso</li>
          </ul>
          <div className="flex flex-wrap gap-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
            >
              WhatsApp gestor
            </a>
            <a
              href={GESTORIA_PHONE_TEL}
              className="inline-flex rounded-lg bg-gold-500 px-4 py-2.5 text-xs font-bold text-gray-900 hover:bg-gold-600 transition-colors"
            >
              Llamar {GESTORIA_PHONE_DISPLAY}
            </a>
            <Link
              href="/gestoria/acceso-cliente"
              className="inline-flex rounded-lg border border-gray-300 px-4 py-2.5 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Acceso panel cliente
            </Link>
          </div>
        </div>
      </div>
    </aside>
  )
}
