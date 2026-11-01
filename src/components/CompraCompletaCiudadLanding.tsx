import Link from 'next/link'
import Navbar from '@/components/NavbarServer'
import CiudadHubFaq from '@/components/CiudadHubFaq'
import GestoriaLandingSeo from '@/components/GestoriaLandingSeo'
import { gestoriaLandingBreadcrumbs, howToStepsFromCompletaBloques } from '@/lib/gestoria-ciudad-schema'
import AgenciaGestoriaPanelDemo from '@/app/agencias/gestoria/AgenciaGestoriaPanelDemo'
import GestoriaLandingExtras from '@/components/GestoriaLandingExtras'
import GestoriaCiudadHero from '@/components/GestoriaCiudadHero'
import WhatsAppButton from '@/components/WhatsAppButton'
import CompletaServiciosDetalle from '@/components/CompletaServiciosDetalle'
import GestoriaCompletaModalidadSections from '@/components/GestoriaCompletaModalidadSections'
import InmonestOficinaBarcelonaSection from '@/components/InmonestOficinaBarcelonaSection'
import BarcelonaCompletaBarriosHubSection from '@/components/BarcelonaCompletaBarriosHubSection'
import type { CompraCompletaCiudadConfig } from '@/lib/compra-completa-ciudad-data'
import { COMPRA_COMPLETA_PRECIO } from '@/lib/compra-completa-ciudad-data'
import { getCompraCompletaFaq } from '@/lib/compra-completa-ciudad-faq'
import { COMPRA_COMPLETA_SERVICIO_BLOQUES } from '@/lib/completa-reserva-escritura-pasos-content'
import { COMPRA_COMPLETA_DOCUMENTOS_CHECKLIST } from '@/lib/venta-completa-servicio-content'

const SOLICITAR_URL = '/gestoria/solicitar/compra-completa-reserva-escritura'
const SERVICIO_SLUG = 'compra-completa-reserva-escritura'

const COMPRA_COMPARATIVA = [
  { aspecto: 'Revisión registral antes de arras', inmonest: 'Incluida y explicada', solo: 'Confías en el vendedor' },
  { aspecto: 'Cláusula de hipoteca', inmonest: 'Redactada a tu favor', solo: 'Copiada de internet' },
  { aspecto: 'Gestor dedicado', inmonest: 'Asignado en 24 h', solo: 'No tienes' },
  { aspecto: 'Coordinación notaría', inmonest: 'Incluida', solo: 'Improvisas el día' },
  { aspecto: 'Coste gestoría', inmonest: '687 € fijos', solo: '0 € hasta el problema' },
  { aspecto: 'Comisión agencia', inmonest: '0 % — no somos agencia', solo: '3–5 % si usas inmobiliaria' },
] as const

type Props = {
  config: CompraCompletaCiudadConfig
}

export default function CompraCompletaCiudadLanding({ config }: Props) {
  const { nombre, slug, region, precioEjemploPiso, comprasAcompanadas } = config
  const faq = getCompraCompletaFaq(nombre, region, precioEjemploPiso, config.faqPrioritarias)
  const howTo = howToStepsFromCompletaBloques(
    COMPRA_COMPLETA_SERVICIO_BLOQUES,
    `Comprar piso en ${nombre} hasta escritura — 5 pasos`,
  )
  const pagePath = `/gestoria/${SERVICIO_SLUG}/${slug}`

  return (
    <>
      <GestoriaLandingSeo
        pagePath={pagePath}
        pageTitle={`Compra completa hasta escritura en ${nombre}`}
        description={config.hero.lead}
        servicioNombre="Compra completa hasta escritura"
        ciudadNombre={nombre}
        precioEuros={COMPRA_COMPLETA_PRECIO}
        faqs={faq}
        howTo={howTo}
        includeBarcelonaLocalBusiness={slug === 'barcelona'}
        breadcrumbs={gestoriaLandingBreadcrumbs(
          { name: 'Compra completa', path: `/gestoria/${SERVICIO_SLUG}` },
          { name: nombre },
        )}
      />
      <Navbar />
      <WhatsAppButton />

      <GestoriaCiudadHero
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Gestoría', href: '/gestoria' },
          { label: 'Compra completa', href: `/gestoria/${SERVICIO_SLUG}` },
          { label: nombre },
        ]}
        badge={`Gestoría inmobiliaria · Comprador · ${region}`}
        title={config.hero.h1}
        lead={config.hero.lead}
        precio={COMPRA_COMPLETA_PRECIO}
        imageSrc={config.heroImage}
        imageAlt={`Compra piso particular ${nombre}`}
        solicitarHref={SOLICITAR_URL}
        footnote={`${comprasAcompanadas} compras acompañadas en ${nombre} · Gestor en 24h · Sin comisión de captación`}
      />

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-10">Este servicio es para ti si…</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', titulo: 'Compras a un particular', desc: 'Encontraste piso en portal o boca a boca sin agencia.' },
              { num: '02', titulo: 'Quieres due diligence', desc: 'No entregarás señal alta sin revisar registros y comunidad.' },
              { num: '03', titulo: 'Financias con hipoteca', desc: 'Necesitas cláusula suspensiva bien redactada.' },
              { num: '04', titulo: 'Buscas gestor real', desc: 'Alguien que responda WhatsApp hasta el día de notaría.' },
            ].map((item) => (
              <div key={item.titulo} className="bg-cream-50 border border-gold-300/40 rounded-xl p-5 text-center">
                <div className="w-10 h-10 mx-auto rounded-full bg-gold-500/15 text-gold-600 flex items-center justify-center font-bold text-sm mb-3">
                  {item.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.titulo}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AgenciaGestoriaPanelDemo
        audience="particular"
        particularRole="comprador"
        ciudadNombre={nombre}
        servicioDemo="compra-completa"
      />

      <GestoriaCompletaModalidadSections
        modo="compra"
        lugarNombre={nombre}
        solicitarHref={SOLICITAR_URL}
        showDespachoBarcelona={slug === 'barcelona'}
      />

      <CompletaServiciosDetalle
        modo="compra"
        lugarNombre={nombre}
        solicitarHref={SOLICITAR_URL}
        headingOverride={`Cómo funciona la compra completa en ${nombre} — 5 pasos con imágenes`}
        modalidadOverlay={
          slug === 'barcelona'
            ? '100 % online · gestor asignado · despacho Les Corts (Mejía Lequerica 44)'
            : '100 % online · gestor asignado'
        }
      />

      <section className="py-14 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-3">
            Documentación que revisamos antes de escritura
          </h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
            Checklist orientado al comprador en {nombre}. Tu gestor indica cómo obtener cada certificado.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {COMPRA_COMPLETA_DOCUMENTOS_CHECKLIST.map((doc) => (
              <div key={doc} className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4">
                <span className="text-gold-500 font-bold shrink-0">✓</span>
                <span className="text-sm text-gray-800">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Comprar con Inmonest vs. confiar solo en el vendedor</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="p-4 text-left font-semibold">Aspecto</th>
                  <th className="p-4 text-center font-semibold text-gold-700">Con Inmonest</th>
                  <th className="p-4 text-center font-semibold text-gray-500">Sin gestor</th>
                </tr>
              </thead>
              <tbody>
                {COMPRA_COMPARATIVA.map((row, i) => (
                  <tr key={row.aspecto} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="p-4 font-medium text-gray-900">{row.aspecto}</td>
                    <td className="p-4 text-center text-green-700 font-semibold">{row.inmonest}</td>
                    <td className="p-4 text-center text-gray-600">{row.solo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 bg-slate-50 border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-4">Zonas donde acompañamos compras en {nombre}</p>
          <div className="flex flex-wrap justify-center gap-2">
            {config.zonas.map((z) => (
              <span key={z} className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700">
                {z}
              </span>
            ))}
          </div>
        </div>
      </section>

      {slug === 'barcelona' ? (
        <>
          <BarcelonaCompletaBarriosHubSection modo="compra" showCanonicalNote />
          <InmonestOficinaBarcelonaSection
            backHref={`/gestoria/${SERVICIO_SLUG}/barcelona`}
            backLabel="← Compra completa Barcelona (hub)"
          />
        </>
      ) : null}

      <section className="py-10 px-4 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto text-sm text-gray-600">
          <h2 className="text-lg font-bold text-gray-900 mb-3 text-center">Guías relacionadas</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/blog/servicio-completo-compra-vivienda" className="text-gold-700 font-semibold hover:underline">
                Servicio completo de compra: reserva a escritura
              </Link>
            </li>
            <li>
              <Link href="/blog/errores-comprar-piso-entre-particulares-2026" className="text-gold-700 font-semibold hover:underline">
                Errores al comprar piso entre particulares (2026)
              </Link>
            </li>
            <li>
              <Link href="/blog/due-diligence-compra-vivienda" className="text-gold-700 font-semibold hover:underline">
                Due diligence antes de comprar
              </Link>
            </li>
            <li>
              <Link href="/gestoria/pack-due-diligence-precompra" className="text-gray-700 hover:underline">
                Pack due diligence pre-compra (350 €)
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CiudadHubFaq
        ciudad={nombre}
        items={faq}
        titulo={`Preguntas frecuentes — Comprar piso en ${nombre}`}
        subtitulo="Dudas habituales de compradores particulares con pack 687 €."
      />

      <GestoriaLandingExtras
        servicio={SERVICIO_SLUG}
        servicioNombre={`Compra completa en ${nombre}`}
        ciudad={nombre}
        whatsappMessage={`Hola Daniel, quiero comprar en ${nombre} a un particular`}
        skipCiudades
        skipRelacionados
        skipTestimonios
        phase="contact"
        className="max-w-5xl mx-auto px-4 sm:px-6"
      />

      <section className="py-12 px-4 bg-gray-900 text-center">
        <Link
          href={SOLICITAR_URL}
          className="inline-flex rounded-full bg-gold-500 px-8 py-3 text-sm font-bold text-gray-900 hover:bg-gold-400"
        >
          Contratar compra completa — {COMPRA_COMPLETA_PRECIO}€
        </Link>
      </section>
    </>
  )
}
