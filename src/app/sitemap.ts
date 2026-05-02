import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const BASE_URL = 'https://inmonest.com'

const CIUDADES = [
  'madrid', 'barcelona', 'valencia', 'sevilla',
  'malaga', 'bilbao', 'zaragoza', 'alicante',
]

const today = new Date()

// Páginas estáticas principales
const STATIC_PAGES: MetadataRoute.Sitemap = [
  { url: BASE_URL,                           lastModified: today, changeFrequency: 'daily',   priority: 1.0 },
  { url: `${BASE_URL}/pisos`,                lastModified: today, changeFrequency: 'daily',   priority: 0.9 },
  { url: `${BASE_URL}/gestoria`,             lastModified: today, changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE_URL}/hipoteca`,             lastModified: today, changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE_URL}/calculadora-gastos-compra`,   lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/calculadora-gastos-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/publicar-anuncio`,     lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/vender-casa`,          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/agencias`,             lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/contacto`,             lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/aviso-legal`,          lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/privacidad`,           lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/cookies`,              lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/seguridad`,            lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },

  // Gestoría — servicios SEO
  { url: `${BASE_URL}/gestoria/burofax-desistimiento-alquiler`,    lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/certificado-eficiencia-energetica`, lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-compraventa`,              lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/nota-simple`,                       lastModified: today, changeFrequency: 'monthly', priority: 0.88 },

  // Páginas de oportunidades especiales
  { url: `${BASE_URL}/oportunidades-bancarias`, lastModified: today, changeFrequency: 'weekly' as const, priority: 0.92 },

  // Blog — todos los artículos
  { url: `${BASE_URL}/blog`,                                       lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/blog/contrato-arrendamiento-lau`,            lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/contrato-alquiler-vivienda-guia`,       lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/contrato-arras-diferencias`,            lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/vender-piso-sin-comisiones`,            lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/como-alquilar-piso-sin-agencia`,        lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/blog/alquiler-con-opcion-a-compra`,          lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/blog/alquiler-habitacion-coliving`,          lastModified: today, changeFrequency: 'monthly', priority: 0.80 },
  { url: `${BASE_URL}/blog/pisos-fondo-bancario-baratos`,          lastModified: today, changeFrequency: 'monthly', priority: 0.80 },
  { url: `${BASE_URL}/blog/prestamo-entre-particulares-hacienda`,  lastModified: today, changeFrequency: 'monthly', priority: 0.80 },

  // Páginas de pisos-particulares por ciudad
  { url: `${BASE_URL}/barcelona/pisos-particulares-sin-comision`,  lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/madrid/pisos-particulares-sin-comision`,     lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/valencia/pisos-particulares-sin-comision`,   lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/sevilla/pisos-particulares-sin-comision`,    lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/malaga/pisos-particulares-sin-comision`,     lastModified: today, changeFrequency: 'daily', priority: 0.95 },
]

// Hub de ciudad — página principal por ciudad
const CIUDAD_HUB_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}`,
  lastModified: today,
  changeFrequency: 'weekly' as const,
  priority: 0.92,
}))

// Páginas SEO de contratos de arras por ciudad
const ARRAS_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}/contrato-arras`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.85,
}))

// Páginas SEO de contratos de alquiler por ciudad
const ALQUILER_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}/contrato-alquiler`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.85,
}))

// Páginas SEO de alquiler sin agencia por ciudad
const ALQUILER_SIN_AGENCIA_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}/alquiler-sin-agencia`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.85,
}))

// Páginas SEO de vender piso sin comisión por ciudad
const VENDER_PISO_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}/vender-piso`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.85,
}))

// Páginas SEO de pisos por ciudad
const PISOS_CIUDAD_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}/pisos`,
  lastModified: new Date(),
  changeFrequency: 'weekly' as const,
  priority: 0.9,
}))

// Páginas SEO de alquiler de particulares por ciudad
const ALQUILER_PARTICULARES_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}/alquiler-particulares`,
  lastModified: new Date(),
  changeFrequency: 'daily' as const,
  priority: 0.92,
}))

async function getListingUrls(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Todos los listings publicados (con o sin ai_description — ahora tenemos plantillas)
    const { data, error } = await supabase
      .from('listings')
      .select('id, updated_at')
      .eq('status', 'published')
      .limit(10000)

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

  return [
    ...STATIC_PAGES,
    ...CIUDAD_HUB_PAGES,
    ...ARRAS_PAGES,
    ...ALQUILER_PAGES,
    ...ALQUILER_SIN_AGENCIA_PAGES,
    ...VENDER_PISO_PAGES,
    ...PISOS_CIUDAD_PAGES,
    ...ALQUILER_PARTICULARES_PAGES,
    ...listingUrls,
  ]
}
