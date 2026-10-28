import Image from 'next/image'
import Link from 'next/link'
import { INMONEST_OFICINA_BARCELONA } from '@/lib/inmonest-oficina-barcelona'
import {
  getDespachoBarcelonaTramiteContent,
  type DespachoTramiteSectionContent,
} from '@/lib/gestoria-tramite-despacho-section-content'
import type { CompletaServicioModo } from '@/lib/completa-reserva-escritura-pasos-content'

type Props = {
  modo: CompletaServicioModo
  lugarNombre: string
  solicitarHref: string
  mapAnchorId?: string
  contentOverride?: Partial<DespachoTramiteSectionContent>
}

export default function GestoriaDespachoBarcelonaTramiteSection({
  modo,
  lugarNombre,
  solicitarHref,
  mapAnchorId = 'despacho-barcelona',
  contentOverride,
}: Props) {
  const base = getDespachoBarcelonaTramiteContent(modo, lugarNombre)
  const content = { ...base, ...contentOverride }
  const o = INMONEST_OFICINA_BARCELONA

  return (
    <section
      id="tramite-despacho-barcelona"
      className="scroll-mt-24 border-y border-gray-200 bg-white py-14 sm:py-16 px-4"
      aria-labelledby="tramite-despacho-titulo"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 lg:order-1">
          <Image
            src="/gestoria-expertos-calle.jpg"
            alt={content.imagenAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Despacho Barcelona</p>
            <p className="text-sm font-bold text-gray-900">{content.overlaySubtitulo}</p>
            <p className="mt-1 text-xs text-gray-600">{o.calle}, {o.barrio}</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">
            Trámite en despacho · Les Corts
          </span>
          <h2 id="tramite-despacho-titulo" className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl leading-snug">
            {content.titulo}
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{content.hero}</p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{content.desc}</p>
          <ul className="mt-8 space-y-4">
            {content.puntos.map((p) => (
              <li key={p.titulo} className="flex gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-xs font-bold text-white">
                  ✓
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{p.titulo}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{p.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`#${mapAnchorId}`}
              className="inline-flex rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-white hover:bg-gold-600 transition-colors"
            >
              Mapa del despacho
            </Link>
            <a
              href={o.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-xl border border-gold-400 px-5 py-3 text-sm font-semibold text-gold-800 hover:bg-cream-50 transition-colors"
            >
              Abrir en Google Maps
            </a>
            <Link
              href={solicitarHref}
              className="inline-flex rounded-xl border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
            >
              Contratar pack →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
