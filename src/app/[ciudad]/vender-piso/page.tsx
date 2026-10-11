import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ParticularesGestoriaCiudadLanding from '@/components/ParticularesGestoriaCiudadLanding'
import {
  CIUDADES_PORTAL_EXTENDIDAS_SLUGS,
  getCiudadPortalNombre,
  isCiudadPortalActiva,
} from '@/lib/ciudades-portal'
import { getAlquilerParticularesCiudadDatos } from '@/lib/alquiler-particulares-ciudad-datos'
import { getPortalMercadoGenerico } from '@/lib/portal-ciudad-generic'
import { precioLabel } from '@/lib/gestoria-precios-ui'

const BASE_URL = 'https://inmonest.com'

const MERCADO_VENTA: Record<
  string,
  { precio_m2: string; tiempo_venta: string; tendencia: string }
> = {
  madrid: { precio_m2: '4.200 €/m²', tiempo_venta: '45 días', tendencia: 'subiendo +8 % anual' },
  barcelona: { precio_m2: '4.500 €/m²', tiempo_venta: '50 días', tendencia: 'subiendo +10 % anual' },
  valencia: { precio_m2: '2.400 €/m²', tiempo_venta: '55 días', tendencia: 'subiendo +12 % anual' },
  sevilla: { precio_m2: '2.100 €/m²', tiempo_venta: '65 días', tendencia: 'estable +4 % anual' },
  malaga: { precio_m2: '3.100 €/m²', tiempo_venta: '40 días', tendencia: 'subiendo +15 % anual' },
  bilbao: { precio_m2: '3.300 €/m²', tiempo_venta: '60 días', tendencia: 'subiendo +6 % anual' },
  zaragoza: { precio_m2: '1.900 €/m²', tiempo_venta: '70 días', tendencia: 'estable +3 % anual' },
  alicante: { precio_m2: '2.200 €/m²', tiempo_venta: '50 días', tendencia: 'subiendo +9 % anual' },
}

export function generateStaticParams() {
  return CIUDADES_PORTAL_EXTENDIDAS_SLUGS.map((ciudad) => ({ ciudad }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ciudad: string }>
}): Promise<Metadata> {
  const { ciudad } = await params
  if (!isCiudadPortalActiva(ciudad)) return {}
  const nombre = getCiudadPortalNombre(ciudad) ?? ciudad
  return {
    title: `Vender piso en ${nombre} sin comisión — arras y gestoría | Inmonest`,
    description: `Vende en ${nombre} sin agencia: arras desde ${precioLabel('arras-penitenciales')}, venta integral y documentación. Inmonest ya no publica anuncios.`,
    alternates: { canonical: `${BASE_URL}/${ciudad}/vender-piso` },
    openGraph: {
      title: `Vender piso ${nombre} entre particulares`,
      description: `Gestoría para vendedores: arras, pack vendedor y servicio integral.`,
      url: `${BASE_URL}/${ciudad}/vender-piso`,
      locale: 'es_ES',
      type: 'article',
      siteName: 'Inmonest',
    },
  }
}

export default async function VenderPisoPage({ params }: { params: Promise<{ ciudad: string }> }) {
  const { ciudad } = await params
  if (!isCiudadPortalActiva(ciudad)) notFound()
  const nombre = getCiudadPortalNombre(ciudad) ?? ciudad
  const datos = getAlquilerParticularesCiudadDatos(ciudad)
  const generic = getPortalMercadoGenerico(ciudad)
  const venta = MERCADO_VENTA[ciudad] ?? {
    precio_m2: generic.precio_m2,
    tiempo_venta: 'Variable',
    tendencia: generic.tendencia_venta,
  }

  const faqs = [
    {
      q: `¿Inmonest publica mi piso en ${nombre}?`,
      a: 'No. Somos gestoría: te ayudamos con arras, revisión documental y venta integral una vez tienes comprador.',
    },
    {
      q: '¿Qué necesito para vender sin inmobiliaria?',
      a: 'Nota simple, ITE si aplica, arras bien redactadas y camino a escritura. Tenemos packs para vendedor particulares.',
    },
    ...datos.faq.filter((f) => !f.q.includes('portal')),
  ]

  return (
    <ParticularesGestoriaCiudadLanding
      ciudad={ciudad}
      nombre={nombre}
      precioMedio={datos.precio_medio}
      barrios={datos.barrios}
      intro={datos.descripcion_seo}
      faqs={faqs}
      variant="vender-piso"
      mercado={{
        precio_venta: venta.precio_m2,
        precio_alquiler: datos.precio_medio,
        precio_m2: venta.precio_m2,
        tendencia_venta: venta.tendencia,
        tendencia_alquiler: generic.tendencia_alquiler,
        descripcion: `Contexto de venta en ${nombre}: tiempo medio orientativo ${venta.tiempo_venta}. Inmonest no intermedia en la búsqueda de comprador; formalizamos la operación con contratos y seguimiento.`,
      }}
    />
  )
}
