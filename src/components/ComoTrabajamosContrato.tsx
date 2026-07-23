import Image from 'next/image'
import TrackedContactLink from '@/components/TrackedContactLink'

type Props = {
  ciudad: string
  ciudadSlug: string
  servicio: 'alquiler' | 'arras'
}

const PASOS = [
  {
    num: '01',
    titulo: 'Llamas o escribes por WhatsApp',
    desc: 'Cuentas tu caso en 2 minutos: tipo de contrato, ciudad, urgencia. Sin compromiso y sin formulario obligatorio.',
  },
  {
    num: '02',
    titulo: 'Un gestor de Inmonest te atiende',
    desc: 'Despejamos dudas legales (fianza, duración, señal, hipoteca…). Te explicamos qué necesitas realmente.',
  },
  {
    num: '03',
    titulo: 'Tú decides si contratas',
    desc: 'Solo si te encaja el precio cerrado y el plazo (48h). Sin presión: primero claridad, después servicio.',
  },
  {
    num: '04',
    titulo: 'Redactamos y entregamos',
    desc: 'Contrato personalizado en PDF firmable. Revisiones antes de firmar incluidas en el precio.',
  },
]

export default function ComoTrabajamosContrato({ ciudad, ciudadSlug, servicio }: Props) {
  const wa = encodeURIComponent(
    servicio === 'alquiler'
      ? `Hola, necesito info sobre el contrato de alquiler en ${ciudad}`
      : `Hola, necesito info sobre el contrato de arras en ${ciudad}`,
  )

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div className="relative h-64 sm:h-80 lg:h-full min-h-[280px] rounded-2xl overflow-hidden">
        <Image
          src="/gestor/gestora.jpg"
          alt={`Gestor inmobiliario Inmonest atendiendo consultas en ${ciudad}`}
          fill
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1a0f]/70 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-sm font-semibold">Tu gestor Inmonest</p>
          <p className="text-xs text-white/80">Resuelve dudas antes de contratar · {ciudad}</p>
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#c9a84c] mb-2">Cómo trabajamos</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
          Primero hablas con un gestor. Después decides.
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          No vendemos plantillas: te atendemos como gestoría inmobiliaria especializada. La idea es simple — llamas,
          resolvemos dudas del {servicio === 'alquiler' ? 'alquiler' : 'contrato de arras'} en {ciudad}, y solo si te
          encaja contratas la redacción.
        </p>

        <ol className="space-y-4 mb-6">
          {PASOS.map((p) => (
            <li key={p.num} className="flex gap-4">
              <span className="shrink-0 w-10 h-10 rounded-full bg-[#c9a84c] text-white font-bold text-sm flex items-center justify-center">
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
            city={ciudadSlug}
            href="tel:+34745022862"
            className="inline-flex items-center gap-2 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-3 text-sm"
          >
            Llama a tu gestor — 745 022 862
          </TrackedContactLink>
          <TrackedContactLink
            event="click_whatsapp"
            city={ciudadSlug}
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
