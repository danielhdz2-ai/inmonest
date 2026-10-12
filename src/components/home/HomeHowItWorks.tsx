import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle } from '@/components/ui/Icons'
import { HOME_PROCESO_BLOQUES, HOME_PROCESO_NAV } from '@/lib/home-proceso-content'

export default function HomeHowItWorks() {
  return (
    <section className="border-b border-gray-100 bg-white" aria-labelledby="home-proceso-titulo" id="como-funciona">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:py-16 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-gold-700">Proceso</p>
          <h2
            id="home-proceso-titulo"
            className="mt-2 text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
          >
            Cómo funciona Inmonest
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 sm:text-base">
            Gestoría inmobiliaria 100 % online: llamada con gestor, precio cerrado con IVA incluido, panel de cliente
            y entrega en plazos cortos — sin desplazamientos.
          </p>
          <div className="mx-auto mt-6 inline-flex flex-col items-center rounded-2xl border-2 border-gold-300 bg-[#fdfbf5] px-8 py-4 shadow-sm sm:flex-row sm:gap-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">Tarifa plana · IVA incluido</p>
              <p className="text-4xl font-extrabold text-gold-600">Desde 61 €</p>
            </div>
            <p className="max-w-xs text-sm text-gray-600">
              Sin comisión sobre el precio del piso. Trámite online con gestor real asignado.
            </p>
          </div>
        </div>

        <nav aria-label="Pasos del proceso Inmonest" className="mb-4 flex flex-wrap justify-center gap-2">
          {HOME_PROCESO_NAV.map((item) => (
            <a
              key={item.id}
              href={`#home-proceso-${item.id}`}
              className="rounded-full border border-gold-200 bg-cream-50 px-3 py-1.5 text-xs font-semibold text-gold-800 transition hover:border-gold-400 hover:bg-gold-50 sm:px-4 sm:py-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <p className="mb-2 text-center text-sm text-gray-600">
          <Link
            href="/gestoria/solicitar"
            className="font-semibold text-gold-800 underline underline-offset-2 hover:text-gold-950"
          >
            Ver catálogo y contratar
          </Link>
          {' · '}
          <Link href="/servicios" className="text-gray-700 underline underline-offset-2 hover:text-gray-900">
            Qué incluye cada servicio
          </Link>
        </p>
      </div>

      {HOME_PROCESO_BLOQUES.map((bloque, index) => (
        <article
          key={bloque.id}
          id={`home-proceso-${bloque.id}`}
          className={`scroll-mt-24 border-t border-gray-200 px-4 py-16 sm:py-20 ${index % 2 === 1 ? 'bg-cream-50' : 'bg-white'}`}
        >
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div className={bloque.invertido ? 'lg:order-2' : ''}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold-500/10 px-3 py-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700">{bloque.kicker}</span>
              </div>
              <h3 className="mb-4 text-2xl font-extrabold leading-snug text-gray-900 sm:text-3xl">{bloque.titulo}</h3>
              <p className="mb-6 leading-relaxed text-gray-600">{bloque.intro}</p>

              <div className="mb-6 rounded-2xl border border-gray-100 bg-gray-50/80 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gold-600">Cómo lo hacemos</p>
                <ol className="space-y-3">
                  {bloque.pasos.map((paso, i) => (
                    <li key={paso} className="flex gap-3 text-sm text-gray-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-0.5 leading-relaxed">{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <ul className="space-y-2.5">
                {bloque.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={`relative lg:sticky lg:top-24 ${bloque.invertido ? 'lg:order-1' : ''}`}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5">
                <Image
                  src={bloque.imagen}
                  alt={bloque.imagenAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" aria-hidden />
                <div className="absolute top-4 right-4 rounded-xl bg-gold-500 px-4 py-2 shadow-lg">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/80">IVA incl.</p>
                  <p className="text-lg font-extrabold text-white">Desde 61 €</p>
                </div>
                <div className="absolute right-4 bottom-4 left-4 rounded-xl bg-white/95 p-4 shadow-lg backdrop-blur-sm">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-600">
                    Gestoría inmobiliaria · Inmonest
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{bloque.kicker}</p>
                  <p className="mt-1 text-xs text-gray-600">toda España · 100 % online · gestor asignado</p>
                </div>
              </div>
            </div>
          </div>
        </article>
      ))}

      <div className="border-t border-gray-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-6 text-gray-600">
            ¿Listo para formalizar tu operación? Elige servicio, habla con un gestor o contrata directamente online.
          </p>
          <Link
            href="/gestoria/solicitar"
            className="inline-block rounded-xl bg-gold-500 px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-gold-600"
          >
            Ver catálogo y contratar →
          </Link>
        </div>
      </div>
    </section>
  )
}
