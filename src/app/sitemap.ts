import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { AGENCIAS_GESTORIA_CIUDAD_SLUGS } from '@/lib/agencias-gestoria-ciudades'
import { GESTORIA_NOINDEX_CITY_PATHS } from '@/lib/gestoria-indexacion-tier'
import { buildInventarioSitemapEntries, dedupeSitemapByUrl } from '@/lib/sitemap-inventario'

export const revalidate = 86400

const BASE_URL = 'https://inmonest.com'
const today = new Date()

const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
  { url: `${BASE_URL}/pisos`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
  { url: `${BASE_URL}/gestoria`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/servicios`, lastModified: today, changeFrequency: 'weekly', priority: 0.92 },
  { url: `${BASE_URL}/gestoria/solicitar`, lastModified: today, changeFrequency: 'weekly', priority: 0.88 },
  { url: `${BASE_URL}/hipoteca`, lastModified: today, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/calculadora-gastos-compra`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/calculadora-gastos-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/calculadora-ahorro-comisiones`, lastModified: today, changeFrequency: 'monthly', priority: 0.92 },
  { url: `${BASE_URL}/publicar-anuncio`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/vender-casa`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/vender-piso-sin-agencia`, lastModified: today, changeFrequency: 'weekly', priority: 0.92 },
  { url: `${BASE_URL}/agencias`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/agencias/gestoria`, lastModified: today, changeFrequency: 'weekly', priority: 0.85 },
  ...AGENCIAS_GESTORIA_CIUDAD_SLUGS.map((ciudad) => ({
    url: `${BASE_URL}/gestoria/${ciudad}/agencias`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.84,
  })),
  { url: `${BASE_URL}/sobre-nosotros`, lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/contacto`, lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/aviso-legal`, lastModified: today, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/privacidad`, lastModified: today, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/cookies`, lastModified: today, changeFrequency: 'yearly', priority: 0.2 },
  { url: `${BASE_URL}/seguridad`, lastModified: today, changeFrequency: 'yearly', priority: 0.2 },

  { url: `${BASE_URL}/gestoria/solicitar/arras-penitenciales`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/arras-confirmatorias`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/reserva-compra`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-alquiler-barcelona`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/rescision-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-habitaciones`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-local-comercial`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-opcion-compra`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/prestamo-particulares`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-garaje-trastero`, lastModified: today, changeFrequency: 'monthly', priority: 0.78 },
  { url: `${BASE_URL}/gestoria/solicitar/pack-revision-reserva-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/arras-parking-garage`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/gestoria/solicitar/acompanamiento-reserva-arras`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/compra-completa-reserva-escritura`, lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/solicitar/compra-completa-parking-trastero`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-correccion`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-correccion-arras`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-ilegal`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/pack-due-diligence-precompra`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/pack-arras-plus-vendedor`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/pack-arras-revision-documental`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-compraventa`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-temporada`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/reserva-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/gestoria/solicitar/liquidacion-fianza`, lastModified: today, changeFrequency: 'monthly', priority: 0.78 },
  { url: `${BASE_URL}/gestoria/solicitar/venta-completa-reserva-escritura`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/asesoramiento-arras-venta`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },

  { url: `${BASE_URL}/oportunidades-bancarias`, lastModified: today, changeFrequency: 'weekly', priority: 0.92 },

  { url: `${BASE_URL}/blog`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/blog/contrato-arrendamiento-lau`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/contrato-alquiler-vivienda-guia`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/contrato-arras-diferencias`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/vender-piso-sin-comisiones`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/como-alquilar-piso-sin-agencia`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/blog/alquiler-con-opcion-a-compra`, lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/blog/alquiler-habitacion-coliving`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/blog/pisos-fondo-bancario-baratos`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/blog/prestamo-entre-particulares-hacienda`, lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/blog/asesoria-juridica-compra-vivienda`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/blog/clausulas-abusivas-contrato-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/blog/detectar-contrato-arras-fraudulento`, lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/blog/gestoria-barcelona-valencia-madrid`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/servicio-completo-compra-vivienda`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/blog/due-diligence-compra-vivienda`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/blog/que-es-gestoria-inmobiliaria`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/cuanto-cuesta-contrato-arras`, lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/revision-contrato-arras-antes-firmar`, lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/blog/lau-actualizacion-renta-irav-2026`, lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
]

const MAX_SITEMAP_LISTINGS = 5_000

function excludeGestoriaNoindex(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  return entries.filter((entry) => {
    const path = entry.url.replace(BASE_URL, '')
    return !GESTORIA_NOINDEX_CITY_PATHS.has(path)
  })
}

async function getListingUrls(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )

    const { data, error } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'published')
      .eq('has_images', true)
      .order('ranking_score', { ascending: false })
      .order('published_at', { ascending: false })
      .limit(MAX_SITEMAP_LISTINGS)

    if (error || !data) return []

    return data.map((listing) => ({
      url: `${BASE_URL}/pisos/${listing.id}`,
      lastModified: listing.updated_at ? new Date(listing.updated_at) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listingUrls = await getListingUrls()
  const inventarioEntries = buildInventarioSitemapEntries(BASE_URL, today)

  return dedupeSitemapByUrl(
    excludeGestoriaNoindex([...STATIC_PAGES, ...inventarioEntries, ...listingUrls]),
  )
}
