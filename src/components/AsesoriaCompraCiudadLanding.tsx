import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import JsonLd from '@/components/JsonLd'
import LocalRegulationsBlock from '@/components/LocalRegulationsBlock'
import TestimoniosSection from '@/components/TestimoniosSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import type { AsesoriaCompraCiudadConfig } from '@/lib/asesoria-compra-ciudad-data'
import {
  ASESORIA_COMPRA_CIUDADES_LIST,
  ASESORIA_COMPRA_PRECIO,
  comisionAgenciaMax,
  comisionAgenciaMin,
} from '@/lib/asesoria-compra-ciudad-data'
import { getAsesoriaCompraFaq } from '@/lib/asesoria-compra-ciudad-faq'
import {
  buildFaqSchema,
  buildLegalServiceSchema,
  buildServiceOfferSchema,
} from '@/lib/gestoria-ciudad-schema'
import { getDueDiligenceHref } from '@/lib/gestoria-compra-cross-sell'

const BASE_URL = 'https://inmonest.com'
const SOLICITAR_URL = '/gestoria/solicitar/compra-completa-reserva-escritura'
const PHONE = '+34745022862'

const PASOS = [
  {
    titulo: 'Primera llamada con tu gestor',
    desc: 'En menos de 24h un gestor experto analiza tu operación: precio, plazos, vendedor y documentación disponible.',
  },
  {
    titulo: 'Contratas el servicio (687€)',
    desc: 'Tarifa plana IVA incluido. Sin comisión sobre el precio del piso. Comenzamos la revisión de inmediato.',
  },
  {
    titulo: 'Revisión de reserva y arras',
    desc: 'Analizamos contratos, nota simple, cargas, deudas de comunidad y documentación técnica obligatoria.',
  },
  {
    titulo: 'Acompañamiento hasta escritura',
    desc: 'Coordinación con notaría, resolución de dudas y verificación final antes de firmar.',
  },
] as const

type AsesoriaCompraCiudadLandingProps = {
  config: AsesoriaCompraCiudadConfig
}

export default function AsesoriaCompraCiudadLanding({ config }: AsesoriaCompraCiudadLandingProps) {
  const { nombre, slug, region, gestor, precioEjemploPiso } = config
  const agenciaMin = comisionAgenciaMin(precioEjemploPiso)
  const agenciaMax = comisionAgenciaMax(precioEjemploPiso)
  const ahorroMin = agenciaMin - ASESORIA_COMPRA_PRECIO
  const faq = getAsesoriaCompraFaq(nombre, region, precioEjemploPiso, config.faqPrioritarias)
  const waText = encodeURIComponent(`Hola, necesito asesoría para comprar piso en ${nombre}`)

  return (
    <>
      <JsonLd
        schema={[
          buildLegalServiceSchema(nombre, slug, {
            path: `${BASE_URL}/gestoria/asesoria-compra-piso/${slug}`,
            name: `Inmonest Asesoría Compra Piso ${nombre}`,
          }),
          buildServiceOfferSchema('Asesoría Compra de Piso', nombre, ASESORIA_COMPRA_PRECIO),
          buildFaqSchema(faq),
        ]}
      />
      <Navbar />
      <WhatsAppButton />

      <section className="bg-gradient-to-br from-purple-50 via-white to-amber-50 py-16 px-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-[#c9962a]">Inicio</Link>
            <span>/</span>
            <Link href="/gestoria" className="hover:text-[#c9962a]">Gestoría</Link>
            <span>/</span>
            <Link href="/gestoria/asesoria-compra-piso" className="hover:text-[#c9962a]">Asesoría Compra</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{nombre}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#a87a20] bg-[#fdf8ee] border border-[#e8d48a] px-3 py-1 rounded-full mb-4">
                Compra entre particulares · {region}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {config.hero.h1}
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">{config.hero.lead}</p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  href={SOLICITAR_URL}
                  className="inline-flex justify-center px-8 py-4 rounded-lg bg-[#c9962a] text-white font-semibold hover:bg-[#a87a20] transition-colors"
                >
                  Contratar — {ASESORIA_COMPRA_PRECIO}€
                </Link>
                <a
                  href={`tel:${PHONE}`}
                  className="inline-flex justify-center px-8 py-4 rounded-lg border-2 border-gray-300 text-gray-800 font-semibold hover:border-[#c9962a] transition-colors"
                >
                  745 022 862
                </a>
              </div>
              <p className="text-sm text-gray-500">
                También disponible:{' '}
                <Link href={getDueDiligenceHref(slug)} className="text-[#c9962a] hover:underline font-medium">
                  Due Diligence documental (350€)
                </Link>
              </p>
            </div>
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={config.heroImage}
                alt={`Asesoría compra piso ${nombre}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">
            Proceso en 4 pasos
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PASOS.map((paso, i) => (
              <div key={paso.titulo} className="bg-slate-50 border border-gray-200 rounded-xl p-5">
                <span className="text-3xl font-black text-[#c9962a]/30 block mb-2">0{i + 1}</span>
                <h3 className="font-bold text-gray-900 mb-2">{paso.titulo}</h3>
                <p className="text-sm text-gray-600">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocalRegulationsBlock ciudad={nombre} region={region} servicio="compra" />

      <section className="py-14 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Tabla de precios</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left font-semibold">Servicio</th>
                  <th className="p-4 text-center font-semibold text-[#a87a20]">Inmonest</th>
                  <th className="p-4 text-center font-semibold text-gray-500">Agencia tradicional</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4">Asesoría compra completa ({nombre})</td>
                  <td className="p-4 text-center font-bold text-green-700">{ASESORIA_COMPRA_PRECIO}€</td>
                  <td className="p-4 text-center text-red-600">
                    {agenciaMin.toLocaleString('es-ES')}–{agenciaMax.toLocaleString('es-ES')}€ (3-5%)
                  </td>
                </tr>
                <tr>
                  <td className="p-4 font-medium">Tu ahorro estimado</td>
                  <td className="p-4 text-center font-bold text-[#a87a20]" colSpan={2}>
                    Hasta {ahorroMin.toLocaleString('es-ES')}€ en un piso de {precioEjemploPiso.toLocaleString('es-ES')}€
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          <Image
            src={gestor.foto}
            alt={gestor.nombre}
            width={120}
            height={120}
            className="rounded-full object-cover border-4 border-[#e8d48a] shrink-0"
          />
          <div>
            <p className="text-sm text-[#a87a20] font-semibold mb-1">Tu gestor en {nombre}</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{gestor.nombre}</h2>
            <p className="text-gray-500 text-sm mb-3">{gestor.rol}</p>
            <p className="text-gray-700">{gestor.bio}</p>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Zonas con cobertura en {nombre}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CiudadHubServiciosGrid
        ciudad={nombre}
        ciudadSlug={slug}
        subtitulo={`Otros servicios de gestoría en ${nombre}. Precios transparentes, sin comisiones.`}
        excluirServicios={['compra-completa-reserva-escritura']}
      />

      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-3">Asesoría compra también en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {ASESORIA_COMPRA_CIUDADES_LIST.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/gestoria/asesoria-compra-piso/${c.slug}`}
                className="text-sm font-semibold text-[#c9962a] hover:underline"
              >
                {c.nombre} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes — Asesoría compra piso en ${nombre}`}
        subtitulo="Resolvemos las dudas más habituales antes de contratar."
      />

      <TestimoniosSection landing={config.testimoniosLanding} layout="stack" hideRating />

      <section className="py-16 px-4 bg-gradient-to-br from-[#1a2f1c] to-[#0d1a0f] text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Compra en {nombre} con total seguridad</h2>
          <p className="text-white/80 mb-8">
            687€ fijos · Gestor asignado · Sin comisión de agencia · Respuesta en 24h
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href={SOLICITAR_URL}
              className="px-8 py-3 rounded-lg bg-[#c9962a] text-[#1a2f1c] font-semibold hover:bg-[#f4c94a] transition-colors"
            >
              Solicitar online
            </Link>
            <a href={`tel:${PHONE}`} className="px-8 py-3 rounded-lg border border-white/30 font-semibold hover:bg-white/10">
              745 022 862
            </a>
            <a
              href={`https://wa.me/34745022862?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 rounded-lg border border-white/30 font-semibold hover:bg-white/10"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
