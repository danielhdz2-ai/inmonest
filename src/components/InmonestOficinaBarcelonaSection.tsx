import Link from 'next/link'
import { INMONEST_OFICINA_BARCELONA } from '@/lib/inmonest-oficina-barcelona'

type InmonestOficinaBarcelonaSectionProps = {
  className?: string
  backHref?: string
  backLabel?: string
}

export default function InmonestOficinaBarcelonaSection({
  className = '',
  backHref = '/gestoria/barcelona',
  backLabel = '← Gestoría inmobiliaria en Barcelona',
}: InmonestOficinaBarcelonaSectionProps) {
  const o = INMONEST_OFICINA_BARCELONA

  return (
    <section className={`py-14 px-4 bg-slate-50 border-t border-gray-200 ${className}`} id="despacho-barcelona">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gold-700 mb-2">Barcelona · Les Corts</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug">
            Despacho físico en Les Corts para trámites presenciales
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Inmonest es <strong>gestoría inmobiliaria digital</strong>: el día a día es panel online, WhatsApp y
            videollamada. Cuando necesitas entregar documentación en mano, firmar una autorización o hablar cara a cara
            con tu gestor antes de las arras o la escritura, tienes{' '}
            <strong>oficina en {o.barrio}</strong>.
          </p>
          <p className="text-gray-800 font-medium mb-2">{o.direccionCompleta}</p>
          <p className="text-sm text-gray-500 mb-6">{o.horario}</p>
          <p className="text-sm text-gray-600 mb-6">{o.nota}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href={o.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gold-600 transition-colors"
            >
              <span aria-hidden="true">📍</span>
              Ver en Google Maps
            </a>
            <Link
              href={backHref}
              className="inline-flex items-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-800 hover:bg-white transition-colors"
            >
              {backLabel}
            </Link>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-100 aspect-[4/3] lg:aspect-auto lg:min-h-[320px] relative">
          <iframe
            title={`Mapa despacho Inmonest — ${o.direccionCompleta}`}
            src={o.mapsEmbedUrl}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
