import Image from 'next/image'
import TrackedContactLink from '@/components/TrackedContactLink'
import { getComoTrabajamosIntro } from '@/lib/gestoria-servicio-contexto'

type Props = {
  servicioSlug: string
  servicioNombre: string
}

const PASOS = [
  {
    num: '01',
    titulo: 'Llamas o escribes por WhatsApp',
    desc: 'Cuentas tu caso en pocos minutos: tipo de operación, urgencia y dudas concretas. Sin compromiso y sin formularios obligatorios.',
  },
  {
    num: '02',
    titulo: 'Un gestor de Inmonest te atiende',
    desc: 'Despejamos dudas legales antes de que pagues. Te explicamos qué necesitas realmente y si este servicio encaja con tu situación.',
  },
  {
    num: '03',
    titulo: 'Tú decides si contratas',
    desc: 'Solo si te encaja el precio cerrado y el plazo de entrega. Primero claridad, después servicio — sin presión comercial.',
  },
  {
    num: '04',
    titulo: 'Redactamos, revisamos y entregamos',
    desc: 'Documento personalizado en PDF firmable. Revisiones razonables antes de firmar incluidas en el precio del servicio.',
  },
]

export default function ComoTrabajamosGestoria({ servicioSlug, servicioNombre }: Props) {
  const intro = getComoTrabajamosIntro(servicioSlug, servicioNombre)
  const wa = encodeURIComponent(
    `Hola Daniel, tengo dudas sobre ${servicioNombre} antes de contratar`,
  )

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] rounded-2xl overflow-hidden">
        <Image
          src="/gestor/gestora.jpg"
          alt="Gestor inmobiliario Inmonest atendiendo consultas"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-sm font-semibold">Daniel Hernández · Inmonest</p>
          <p className="text-xs text-white/80">Gestoría inmobiliaria boutique · Resuelve dudas antes de contratar</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-2">
          Cómo trabajamos
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Primero hablas con un gestor. Después decides.
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{intro}</p>

        <ol className="space-y-4 mb-6">
          {PASOS.map((p) => (
            <li key={p.num} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-gold-500 text-white font-bold text-sm flex items-center justify-center">
                {p.num}
              </span>
              <div>
                <p className="font-semibold text-gray-900">{p.titulo}</p>
                <p className="text-sm text-gray-600">{p.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="flex flex-wrap gap-3">
          <TrackedContactLink
            event="click_phone"
            href="tel:+34745022862"
            className="inline-flex items-center gap-2 rounded-xl bg-gold-600 hover:bg-gold-700 text-white font-bold px-5 py-3 text-sm"
          >
            Llama a tu gestor — 745 022 862
          </TrackedContactLink>
          <TrackedContactLink
            event="click_whatsapp"
            href={`https://wa.me/34745022862?text=${wa}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-green-600 text-green-700 hover:bg-green-50 font-semibold px-5 py-3 text-sm"
          >
            WhatsApp
          </TrackedContactLink>
        </div>
      </div>
    </section>
  )
}
