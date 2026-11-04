import Link from 'next/link'
import PackArrasDocumentalCiudadLanding from '@/components/PackArrasDocumentalCiudadLanding'
import BarcelonaPackArrasCompradorBarriosHub from '@/components/BarcelonaPackArrasCompradorBarriosHub'
import InmonestOficinaBarcelonaSection from '@/components/InmonestOficinaBarcelonaSection'
import type { BarcelonaPackArrasDocumentalBarrioConfig } from '@/lib/barcelona-pack-arras-documental-barrios-types'
import {
  BARCELONA_PACK_ARRAS_COMPRADOR_BASE,
  buildPackArrasDocumentalBarrioViewConfig,
  listBarcelonaPackArrasDocumentalBarrios,
} from '@/lib/barcelona-pack-arras-documental-barrios'

function BarrioPackDocumentalSeoBlocks({ config }: { config: BarcelonaPackArrasDocumentalBarrioConfig }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Precio / señal</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.precioOrientativo}</p>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Perfil comprador</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.perfilComprador}</p>
        </div>
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 text-sm mb-2">Riesgo documental</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{config.mercado.riesgoDocumental}</p>
        </div>
      </section>

      <section id="para-comprador" className="scroll-mt-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.paraComprador.titulo}</h2>
        <p className="text-gray-600 mb-5 leading-relaxed">{config.paraComprador.intro}</p>
        <ul className="space-y-3">
          {config.paraComprador.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-gray-700">
              <span className="text-gold-500 font-bold mt-0.5">✓</span>
              {b}
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border-2 border-dashed border-gold-400/60 bg-white p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gold-600 mb-2">Solo en {config.nombre}</p>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{config.contenidoUnico.tituloSeccion}</h2>
        <p className="text-gray-700 leading-relaxed mb-4">{config.contenidoUnico.lead}</p>
        <p className="text-gray-600 leading-relaxed mb-6 italic border-l-4 border-gold-500 pl-4">
          {config.contenidoUnico.escenarioLocal}
        </p>
        <ul className="space-y-4">
          {config.contenidoUnico.erroresEvitados.map((e) => (
            <li key={e.titulo} className="rounded-xl bg-cream-50 border border-gold-200/50 p-4">
              <p className="font-semibold text-gray-900 text-sm">{e.titulo}</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{e.detalle}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Otros barrios — Pack Arras Plus</p>
        <div className="flex flex-wrap gap-2">
          {listBarcelonaPackArrasDocumentalBarrios()
            .filter((b) => b.slug !== config.slug)
            .map((b) => (
              <Link
                key={b.slug}
                href={`${BARCELONA_PACK_ARRAS_COMPRADOR_BASE}/${b.slug}`}
                className="text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-gold-500 text-gray-700 hover:text-gold-700 transition-colors"
              >
                {b.nombre}
              </Link>
            ))}
          <Link
            href="/gestoria/pack-arras-revision-documental/barcelona"
            className="text-sm px-3 py-1.5 rounded-full border border-gold-300 bg-cream-50 text-gold-800 font-medium"
          >
            Hub pack Barcelona
          </Link>
        </div>
      </section>
    </div>
  )
}

type Props = {
  config: BarcelonaPackArrasDocumentalBarrioConfig
}

export default function PackArrasDocumentalBarrioBarcelonaLanding({ config }: Props) {
  const merged = buildPackArrasDocumentalBarrioViewConfig(config)
  const pagePath = `${BARCELONA_PACK_ARRAS_COMPRADOR_BASE}/${config.slug}`

  return (
    <>
      <PackArrasDocumentalCiudadLanding
        config={merged}
        pagePath={pagePath}
        breadcrumbHub={{
          name: 'Pack Arras comprador Barcelona',
          path: '/gestoria/pack-arras-revision-documental/barcelona',
        }}
        includeBarcelonaLocalBusiness
        barrioNombre={config.nombre}
        barrioSlug={config.slug}
        showBarrioFaqAboveFold
        barrioSeoContent={<BarrioPackDocumentalSeoBlocks config={config} />}
      />
      <BarcelonaPackArrasCompradorBarriosHub />
      <InmonestOficinaBarcelonaSection
        backHref="/gestoria/pack-arras-revision-documental/barcelona"
        backLabel="← Pack Arras Plus Barcelona (hub)"
      />
    </>
  )
}
