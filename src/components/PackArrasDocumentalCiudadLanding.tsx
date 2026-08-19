import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import CiudadHubServiciosGrid from '@/components/CiudadHubServiciosGrid'
import JsonLd from '@/components/JsonLd'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import LocalRegulationsBlock from '@/components/LocalRegulationsBlock'
import { RELACIONADOS_PACK_ARRAS_DOCUMENTAL } from '@/lib/gestoria-relacionados'
import WhatsAppButton from '@/components/WhatsAppButton'
import StickyMobileContratoCta from '@/components/StickyMobileContratoCta'
import { MobileDockSpacer } from '@/components/ui/MobileDockSpacer'
import type { PackArrasDocumentalCiudadConfig } from '@/lib/pack-arras-documental-ciudad-data'
import {
  PACK_ARRAS_DOCUMENTAL_CIUDADES_LIST,
  PACK_ARRAS_DOCUMENTAL_PRECIO,
  PACK_ARRAS_SERVICIO_SLUG,
  comisionAgenciaMax,
  comisionAgenciaMin,
} from '@/lib/pack-arras-documental-ciudad-data'
import { getPackArrasDocumentalFaq } from '@/lib/pack-arras-documental-ciudad-faq'
import { buildFaqSchema } from '@/lib/gestoria-ciudad-schema'
import { GestoriaImageBanner, GestoriaCtaBanner } from '@/components/ui/GestoriaImageBanner'
import { getCiudadCtaImage } from '@/lib/gestoria-images'
import GestoriaPanelShowcase from '@/components/GestoriaPanelShowcase'
import { ORGANIZATION_SCHEMA_ID } from '@/lib/organization-schema'

const BASE_URL = 'https://inmonest.com'
const SOLICITAR_URL = '/gestoria/solicitar/pack-arras-revision-documental'

const PASOS = [
  {
    titulo: 'Cuéntanos la operación',
    desc: 'En menos de 24 h tu gestor analiza precio, vendedor, plazos y documentación disponible. Sin compromiso hasta contratar.',
  },
  {
    titulo: 'Contratas el Pack Arras Plus (450€)',
    desc: 'Pago único IVA incluido. Incluye redacción de arras penitenciales y auditoría documental completa.',
  },
  {
    titulo: 'Redacción de arras penitenciales',
    desc: 'Personalizamos cláusulas, señal, plazos, penitenciales y condiciones suspensivas (hipoteca, cargas). PDF en 48 h.',
  },
  {
    titulo: 'Recopilación documental',
    desc: 'Solicitamos nota simple, actas de comunidad, certificados técnicos y documentación exigida en tu comunidad autónoma.',
  },
  {
    titulo: 'Informe documental completo',
    desc: 'Análisis de cargas, derramas, ITE/IEE, deudas e incoherencias. Recomendaciones claras antes o justo después de firmar arras.',
  },
  {
    titulo: 'Seguimiento pre-escritura',
    desc: 'Tu gestor resuelve dudas, apoya en renegociación si hay hallazgos graves y verifica que todo esté en regla.',
  },
] as const

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}

type Props = {
  config: PackArrasDocumentalCiudadConfig
}

export default function PackArrasDocumentalCiudadLanding({ config }: Props) {
  const { nombre, slug, region, precioEjemploPiso } = config
  const agenciaMin = comisionAgenciaMin(precioEjemploPiso)
  const agenciaMax = comisionAgenciaMax(precioEjemploPiso)
  const ahorroMin = agenciaMin - PACK_ARRAS_DOCUMENTAL_PRECIO
  const faq = getPackArrasDocumentalFaq(nombre, region, config.faqPrioritarias)

  const schemaJson = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Pack Arras Plus — Revisión Documental Completa en ${nombre}`,
    description: `Arras penitenciales redactadas y revisión documental integral para compradores entre particulares en ${nombre}.`,
    areaServed: {
      '@type': 'City',
      name: nombre,
      containedIn: { '@type': 'Country', name: 'España' },
    },
    provider: { '@id': ORGANIZATION_SCHEMA_ID },
    offers: {
      '@type': 'Offer',
      price: String(PACK_ARRAS_DOCUMENTAL_PRECIO),
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceValidUntil: '2026-12-31',
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gestoría', item: `${BASE_URL}/gestoria` },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Pack Arras Plus',
        item: `${BASE_URL}/gestoria/pack-arras-revision-documental`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: nombre,
        item: `${BASE_URL}/gestoria/pack-arras-revision-documental/${slug}`,
      },
    ],
  }

  const revisionBlocks = [
    {
      titulo: 'Contrato de arras penitenciales',
      items: [
        'Redacción personalizada comprador/vendedor',
        'Importe de señal y plazo para escritura',
        'Penitenciales equilibrados',
        'Cláusulas suspensivas (hipoteca, cargas)',
        'PDF firmable en 48 h',
      ],
    },
    {
      titulo: 'Nota simple y registro',
      items: ['Titularidad real', 'Hipotecas y cargas', 'Embargos y anotaciones', 'Concordancia con catastro'],
    },
    {
      titulo: 'Comunidad de propietarios',
      items: ['Deudas pendientes', 'Derramas aprobadas y en curso', 'Actas últimos 2 años', 'Estatutos relevantes'],
    },
    {
      titulo: config.docTecnicaTitulo,
      items: config.docTecnicaItems,
    },
  ]

  return (
    <>
      <JsonLd schema={[schemaJson, breadcrumbSchema, buildFaqSchema(faq)]} />
      <Navbar />
      <WhatsAppButton />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 pb-12">
        <GestoriaImageBanner
          imageSrc={config.heroImage}
          imageAlt={`Pack Arras Plus compra vivienda ${nombre}`}
          imagePosition="right"
          size="lg"
        >
          <span className="inline-block bg-gold-500/20 text-gold-300 text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border border-gold-500/30 uppercase tracking-widest">
            {config.hero.badge}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-snug max-w-2xl">
            {config.hero.h1}
          </h1>
          <p className="text-white/75 text-base sm:text-lg max-w-xl mb-5 leading-relaxed">{config.hero.lead}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
            <span className="text-3xl font-bold text-gold-400">{PACK_ARRAS_DOCUMENTAL_PRECIO}€</span>
            <span className="text-white/50 text-xs">IVA incluido · arras + documentación</span>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-5">
            <Link
              href={SOLICITAR_URL}
              className="inline-flex items-center justify-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-600 transition-colors"
            >
              Contratar pack — {PACK_ARRAS_DOCUMENTAL_PRECIO}€
            </Link>
            <a
              href="#gestor-daniel"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Hablar con Daniel
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/60">
            <li className="flex items-center gap-2"><CheckIcon /> Arras en 48h</li>
            <li className="flex items-center gap-2"><CheckIcon /> Informe documental</li>
            <li className="flex items-center gap-2"><CheckIcon /> Solo particulares</li>
          </ul>
        </GestoriaImageBanner>
      </div>

      {/* Qué incluye el pack — dos pilares */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Qué incluye el Pack Arras Plus en {nombre}
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Un solo servicio para no contratar arras y revisión por separado. Pensado para compradores que negocian
            directamente con el vendedor sin agencia inmobiliaria.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-forest-900 text-white p-8 rounded-2xl">
              <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">Parte 1</p>
              <h3 className="text-xl font-bold mb-4">Arras penitenciales redactadas</h3>
              <ul className="space-y-3 text-white/85 text-sm">
                <li className="flex gap-2"><CheckIcon /> Contrato personalizado con datos reales</li>
                <li className="flex gap-2"><CheckIcon /> Cláusulas de desistimiento equilibradas</li>
                <li className="flex gap-2"><CheckIcon /> Condiciones suspensivas por hipoteca</li>
                <li className="flex gap-2"><CheckIcon /> Plazos realistas para escritura en {nombre}</li>
                <li className="flex gap-2"><CheckIcon /> PDF firmable en 48 horas</li>
              </ul>
            </div>
            <div className="bg-cream-50 border border-gold-200 p-8 rounded-2xl">
              <p className="text-gold-700 text-xs font-bold uppercase tracking-widest mb-2">Parte 2</p>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Revisión documental completa</h3>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex gap-2"><CheckIcon /> Nota simple y cargas registrales</li>
                <li className="flex gap-2"><CheckIcon /> Actas y derramas de comunidad</li>
                <li className="flex gap-2"><CheckIcon /> Certificados técnicos ({region})</li>
                <li className="flex gap-2"><CheckIcon /> IBI, suministros y coherencia urbanística</li>
                <li className="flex gap-2"><CheckIcon /> Informe PDF en 3–5 días laborables</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Diferencia vs otros servicios */}
      <section className="py-16 px-4 bg-slate-50 border-y border-gray-200">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            ¿Pack Arras Plus, Due Diligence o solo arras?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-900">Servicio</th>
                  <th className="p-4 text-center font-semibold text-gray-600">Precio</th>
                  <th className="p-4 text-left font-semibold text-gray-600">Ideal si…</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-cream-50/80">
                  <td className="p-4 font-bold text-gold-800">Pack Arras Plus ({nombre})</td>
                  <td className="p-4 text-center font-bold">{PACK_ARRAS_DOCUMENTAL_PRECIO}€</td>
                  <td className="p-4 text-gray-700">
                    Quieres arras redactadas + revisión documental integral antes de comprometerte
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Due Diligence Pre-Compra</td>
                  <td className="p-4 text-center">350€</td>
                  <td className="p-4 text-gray-600">Ya tienes arras firmadas y solo necesitas auditoría documental</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-4 font-medium text-gray-900">Solo arras penitenciales</td>
                  <td className="p-4 text-center">145€</td>
                  <td className="p-4 text-gray-600">Ya revisaste documentación por tu cuenta (no recomendado)</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-gray-900">Compra completa hasta escritura</td>
                  <td className="p-4 text-center">687€</td>
                  <td className="p-4 text-gray-600">Quieres gestor dedicado en todo el proceso hasta notaría</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mercado local */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{config.mercadoLocal.titulo}</h2>
          {config.mercadoLocal.parrafos.map((p) => (
            <p key={p.slice(0, 40)} className="text-gray-600 mb-4 leading-relaxed">
              {p}
            </p>
          ))}
          {config.mercadoLocal.datos && (
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {config.mercadoLocal.datos.map((d) => (
                <div key={d.label} className="bg-slate-50 border border-gray-200 rounded-xl p-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{d.label}</p>
                  <p className="font-bold text-gray-900">{d.valor}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Riesgos locales */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Riesgos frecuentes al comprar de particular en {nombre}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Estos son los problemas que detectamos a menudo en operaciones sin agencia. El pack está diseñado para
            cubrirlos antes de la señal.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {config.riesgosLocales.map((r) => (
              <div key={r.titulo} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-2">{r.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Qué revisamos */}
      <section className="py-16 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Detalle del pack en {nombre}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Arras + cuatro bloques de auditoría documental. Tu gestor verifica cada punto crítico.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {revisionBlocks.map((block) => (
              <div key={block.titulo} className="bg-slate-50 p-8 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">{block.titulo}</h3>
                <ul className="space-y-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                      <CheckIcon />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos reales */}
      <section className="py-16 px-4 bg-forest-900 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Escenarios reales en {nombre}</h2>
          <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
            Compradores entre particulares que evitaron pérdidas gracias a arras bien redactadas y documentación
            verificada.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {config.casosReales.map((caso) => (
              <article key={caso.titulo} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gold-400 text-xs font-bold uppercase tracking-widest mb-2">{caso.perfil}</p>
                <h3 className="text-lg font-bold mb-3">{caso.titulo}</h3>
                <p className="text-white/75 text-sm mb-3">
                  <strong className="text-white">Situación:</strong> {caso.situacion}
                </p>
                <p className="text-white/75 text-sm mb-3">
                  <strong className="text-white">Resultado:</strong> {caso.resultado}
                </p>
                {caso.ahorro && (
                  <p className="text-gold-400 font-bold text-sm">Impacto: {caso.ahorro}</p>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Cómo funciona el pack en {nombre}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Proceso claro: primero arras seguras, en paralelo la auditoría documental. Mismo gestor de principio a fin.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PASOS.map((paso, i) => (
              <div key={paso.titulo} className="border border-gray-200 rounded-xl p-6 bg-slate-50">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-full bg-forest-800 text-gold-400 font-bold text-sm mb-4">
                  {i + 1}
                </span>
                <h3 className="font-bold text-gray-900 mb-2 text-sm leading-snug">{paso.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{paso.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocalRegulationsBlock ciudad={nombre} region={region} servicio="arras" />

      {/* Comparativa agencia */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Pack Arras Plus frente a agencia inmobiliaria en {nombre}
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            En una compra de {precioEjemploPiso.toLocaleString('es-ES')}€, una agencia cobraría entre{' '}
            {agenciaMin.toLocaleString('es-ES')}€ y {agenciaMax.toLocaleString('es-ES')}€. Tú pagas{' '}
            {PACK_ARRAS_DOCUMENTAL_PRECIO}€ por arras + revisión documental.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-sm rounded-xl overflow-hidden text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-left font-semibold text-gray-900 w-1/3" />
                  <th className="p-4 text-center font-bold text-gold-700 bg-cream-100 border-b-2 border-gold-500">
                    Inmonest Pack Arras Plus
                  </th>
                  <th className="p-4 text-center font-semibold text-gray-600 border-b-2 border-gray-300">
                    Agencia inmobiliaria
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Coste del servicio', `${PACK_ARRAS_DOCUMENTAL_PRECIO}€ tarifa plana`, `${agenciaMin.toLocaleString('es-ES')}€ – ${agenciaMax.toLocaleString('es-ES')}€ (3–5%)`],
                  ['Redacción arras penitenciales', 'Incluida', 'A menudo modelo del vendedor'],
                  ['Revisión documental completa', 'Incluida con informe', 'Parcial o inexistente'],
                  ['Trabaja solo para el comprador', 'Sí', 'Defiende al vendedor (comisión)'],
                  ['Conocimiento normativa local', region, 'Variable'],
                ].map(([label, inmo, agencia]) => (
                  <tr key={label} className="border-b border-gray-100">
                    <td className="p-4 font-medium text-gray-900">{label}</td>
                    <td className="p-4 text-center bg-green-50/50 font-medium text-gray-800">{inmo}</td>
                    <td className="p-4 text-center text-gray-600">{agencia}</td>
                  </tr>
                ))}
                <tr className="bg-cream-100">
                  <td className="p-4 font-bold text-gray-900">Ahorro estimado</td>
                  <td colSpan={2} className="p-4 text-center font-bold text-gold-700 text-lg">
                    Hasta {ahorroMin.toLocaleString('es-ES')}€ menos que una agencia en esta operación
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Zonas */}
      <section className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cobertura del pack en {nombre}</h2>
          <p className="text-gray-600 mb-8">{config.zonasIntro}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-4 py-2 bg-slate-50 border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CiudadHubServiciosGrid
        ciudad={nombre}
        ciudadSlug={slug}
        subtitulo={`Otros servicios de gestoría en ${nombre}. Precios transparentes, sin comisiones sobre el piso.`}
        excluirServicios={[PACK_ARRAS_SERVICIO_SLUG, 'pack-due-diligence-precompra']}
      />

      <section className="py-12 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Pack Arras Plus también en:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {PACK_ARRAS_DOCUMENTAL_CIUDADES_LIST.filter((c) => c.slug !== slug).map((c) => (
              <Link
                key={c.slug}
                href={`/gestoria/pack-arras-revision-documental/${c.slug}`}
                className="text-sm font-semibold text-gold-500 hover:underline"
              >
                {c.nombre} →
              </Link>
            ))}
            <Link
              href="/gestoria/pack-arras-revision-documental"
              className="text-sm font-semibold text-gray-600 hover:underline"
            >
              Ver pack genérico →
            </Link>
          </div>
        </div>
      </section>

      <GestoriaPanelShowcase servicioLabel={`pack arras plus en ${nombre}`} />

      <GestoriaLandingExtras
        servicio={PACK_ARRAS_SERVICIO_SLUG}
        servicioNombre={`Pack Arras Plus en ${nombre}`}
        ciudad={nombre}
        whatsappMessage={`Hola Daniel, quiero el Pack Arras Plus en ${nombre} (arras + documentación)`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes — Pack Arras Plus en ${nombre}`}
        subtitulo="Resolvemos dudas sobre arras, revisión documental y compra entre particulares antes de contratar."
      />

      <GestoriaLandingExtras
        servicio={PACK_ARRAS_SERVICIO_SLUG}
        servicioNombre={`Pack Arras Plus en ${nombre}`}
        ciudad={nombre}
        testimonioLanding={config.testimoniosLanding}
        relacionados={RELACIONADOS_PACK_ARRAS_DOCUMENTAL}
        skipCiudades
        skipDaniel
        skipLlamaGestor
        phase="footer"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <GestoriaCtaBanner
            eyebrow={`Pack Arras Plus · ${nombre}`}
            title={`Compra en ${nombre} con arras y documentación blindadas`}
            description={`Arras penitenciales + revisión documental completa por ${PACK_ARRAS_DOCUMENTAL_PRECIO}€. Gestor asignado para particulares.`}
            primaryHref={SOLICITAR_URL}
            primaryLabel={`Contratar ahora — ${PACK_ARRAS_DOCUMENTAL_PRECIO}€`}
            imageSrc={getCiudadCtaImage(slug).src}
            imageAlt={`Pack Arras Plus ${nombre}`}
            imagePosition="right"
          />
        </div>
      </section>

      <MobileDockSpacer />
      <StickyMobileContratoCta
        ciudad={nombre}
        ciudadSlug={slug}
        servicio="arras"
        whatsappMessage={`Hola, quiero Pack Arras Plus en ${nombre}`}
      />
    </>
  )
}
