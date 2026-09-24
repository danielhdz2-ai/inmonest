import Image from 'next/image'
import Link from 'next/link'
import { GESTORIA_TRAMITE_ONLINE_DESC, GESTORIA_TRAMITE_ONLINE_HERO } from '@/lib/gestoria-tramite-online'

type Props = {
  ciudad: string
  /** Ancla del panel interactivo en la misma página */
  panelAnchorId?: string
}

const PUNTOS = [
  {
    titulo: 'Panel mi-cuenta/contratos',
    desc: 'Sube documentos, consulta el progreso y descarga el PDF cuando esté listo.',
  },
  {
    titulo: 'Gestor con teléfono directo',
    desc: 'Un gestor inmobiliario asignado en menos de 24 h — WhatsApp, llamada o videollamada.',
  },
  {
    titulo: 'Firma digital FIRMACERT',
    desc: 'Contrato firmable con firma electrónica avanzada (eIDAS) incluida en el precio.',
  },
  {
    titulo: 'Sin desplazamientos',
    desc: 'Todo el trámite desde casa: contratación, documentación, revisión y entrega.',
  },
] as const

export default function GestoriaTramiteOnlineSection({ ciudad, panelAnchorId = 'panel-gestoria-lau' }: Props) {
  return (
    <section
      id="tramite-100-online"
      className="scroll-mt-24 border-y border-gold-200/60 bg-gradient-to-b from-[#fdfbf5] to-white py-14 sm:py-16 px-4"
      aria-labelledby="tramite-online-titulo"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-600">Trámite 100 % online</span>
          <h2 id="tramite-online-titulo" className="mt-2 text-2xl font-extrabold text-gray-900 sm:text-3xl leading-snug">
            Tu alquiler LAU en {ciudad} sin ir a ninguna oficina
          </h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{GESTORIA_TRAMITE_ONLINE_HERO}</p>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">{GESTORIA_TRAMITE_ONLINE_DESC}</p>
          <ul className="mt-8 space-y-4">
            {PUNTOS.map((p) => (
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
              href={`#${panelAnchorId}`}
              className="inline-flex rounded-xl bg-gold-500 px-5 py-3 text-sm font-bold text-white hover:bg-gold-600 transition-colors"
            >
              Ver panel interactivo
            </Link>
            <Link
              href="/gestoria/acceso-cliente"
              className="inline-flex rounded-xl border border-gold-400 px-5 py-3 text-sm font-semibold text-gold-800 hover:bg-cream-50 transition-colors"
            >
              Acceso clientes
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5">
          <Image
            src="/gestora6.jpg"
            alt={`Gestoría inmobiliaria online en ${ciudad} — panel y gestor`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" aria-hidden />
          <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">100 % online</p>
            <p className="text-sm font-bold text-gray-900">{ciudad} · gestor asignado · panel de expediente</p>
          </div>
        </div>
      </div>
    </section>
  )
}
