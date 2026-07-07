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
  ASESORIA_COMPRA_TRAMITES,
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

const BENEFICIOS = [
  {
    titulo: 'Sin comisión sobre el piso',
    desc: 'Las agencias cobran 3-5% del precio. Inmonest cobra 687€ fijos aunque el piso cueste 200.000€ o 500.000€.',
  },
  {
    titulo: 'Gestor asignado de verdad',
    desc: 'No eres un ticket: tienes nombre, teléfono y WhatsApp de un gestor inmobiliario que conoce tu operación.',
  },
  {
    titulo: 'Trabajamos para ti, no para el vendedor',
    desc: 'La agencia defiende al que paga la comisión (el vendedor). Nosotros revisamos contratos pensando en tu interés como comprador.',
  },
  {
    titulo: 'Evitas errores de miles de euros',
    desc: 'Arras mal redactadas, cargas ocultas o derramas no detectadas pueden costarte mucho más que 687€.',
  },
  {
    titulo: '100% online, respuesta en 24h',
    desc: 'Ideal si compras desde otra ciudad o tienes poco tiempo. Videollamada, WhatsApp y revisión documental a distancia.',
  },
  {
    titulo: 'De reserva a llaves',
    desc: 'No solo revisamos un contrato suelto: te acompañamos en todo el proceso hasta la firma en notaría.',
  },
] as const

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

      <section className="py-14 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            ¿Por qué contratar Inmonest si compras de particular?
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Comprar sin agencia ahorra comisiones, pero no elimina el riesgo legal. Un gestor profesional
            te protege en cada trámite.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFICIOS.map((b) => (
              <div key={b.titulo} className="bg-white border border-gray-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-900 mb-2">{b.titulo}</h3>
                <p className="text-sm text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Trámites que gestionamos por ti en {nombre}
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Todo lo que una agencia haría en la parte legal — sin cobrarte un porcentaje del piso.
          </p>
          <ul className="grid sm:grid-cols-2 gap-3">
            {ASESORIA_COMPRA_TRAMITES.map((t) => (
              <li key={t} className="flex items-start gap-2 text-sm text-gray-700 bg-slate-50 rounded-lg p-3">
                <span className="text-[#c9962a] shrink-0 mt-0.5">✓</span>
                {t}
              </li>
            ))}
          </ul>
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
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3">
            Casos reales en {nombre}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Compradores particulares que encontraron piso sin agencia y contrataron gestoría profesional.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {config.casosReales.map((caso) => (
              <article key={caso.titulo} className="border border-gray-200 rounded-xl p-6 bg-slate-50">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#a87a20] mb-2">{caso.perfil}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{caso.titulo}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  <strong className="text-gray-800">Situación:</strong> {caso.situacion}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  <strong className="text-gray-800">Resultado:</strong> {caso.resultado}
                </p>
                {caso.ahorro && (
                  <p className="text-sm font-semibold text-green-700">Ahorro estimado: {caso.ahorro}</p>
                )}
              </article>
            ))}
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
                {c.emoji ? `${c.emoji} ` : ''}{c.nombre} →
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
