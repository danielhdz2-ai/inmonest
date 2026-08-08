import type { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { CONTRATO_ALQUILER_PREMIUM } from '@/lib/contrato-alquiler-premium-config'
import { CONTRATO_ARRAS_PREMIUM } from '@/lib/contrato-arras-premium-config'
import { GESTORIA_SERVICIOS } from '@/lib/gestoria-catalogo'
// ✅ OPTIMIZACIÓN: Regenerar sitemap cada 24 horas (reducido de 1h por alto consumo CPU)
// Con 0.5 visitas/día, regenerar cada hora es innecesario y costoso
export const revalidate = 86400  // 24 horas (antes: 1h - consumía CPU excesivo)
// export const dynamic = 'force-dynamic'  // ❌ DESACTIVADO - consumía CPU innecesario

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
  { url: `${BASE_URL}/servicios`,            lastModified: today, changeFrequency: 'weekly',  priority: 0.92 },
  { url: `${BASE_URL}/gestoria/solicitar`,  lastModified: today, changeFrequency: 'weekly',  priority: 0.88 },
  { url: `${BASE_URL}/hipoteca`,             lastModified: today, changeFrequency: 'weekly',  priority: 0.9 },
  { url: `${BASE_URL}/calculadora-gastos-compra`,   lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/calculadora-gastos-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.9 },
  { url: `${BASE_URL}/calculadora-ahorro-comisiones`, lastModified: today, changeFrequency: 'monthly', priority: 0.92 },
  { url: `${BASE_URL}/publicar-anuncio`,     lastModified: today, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/vender-casa`,          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  
  // Servicios Premium - Alternativa a Inmobiliarias
  { url: `${BASE_URL}/servicios/vender-piso-sin-inmobiliaria`, lastModified: today, changeFrequency: 'weekly', priority: 0.92 },
  
  { url: `${BASE_URL}/agencias`,             lastModified: today, changeFrequency: 'weekly',  priority: 0.8 },
  { url: `${BASE_URL}/sobre-nosotros`,       lastModified: today, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/contacto`,             lastModified: today, changeFrequency: 'monthly', priority: 0.5 },
  { url: `${BASE_URL}/aviso-legal`,          lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/privacidad`,           lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/cookies`,              lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },
  { url: `${BASE_URL}/seguridad`,            lastModified: today, changeFrequency: 'yearly',  priority: 0.2 },

  // Gestoría — landings por ciudad (las genéricas van en GESTORIA_GENERIC_LANDING_PAGES)
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/madrid`,       lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/barcelona`,    lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/valencia`,     lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/sevilla`,      lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/malaga`,       lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/zaragoza`,     lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/valladolid`,   lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/mallorca`,     lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/bilbao`,       lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/coruna`,       lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/murcia`,       lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/asesoria-compra-piso/pamplona`,     lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/madrid`,    lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/barcelona`, lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/sevilla`,   lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/malaga`,    lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/bilbao`,    lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/valencia`,  lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/zaragoza`,  lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-alquiler-habitacion/asturias`,  lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/madrid`,     lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/barcelona`,  lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/valencia`,   lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/sevilla`,    lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/malaga`,     lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/bilbao`,     lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/zaragoza`,   lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/mallorca`,   lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/prestamo-particulares/valladolid`, lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/contrato-arras`,                    lastModified: today, changeFrequency: 'monthly', priority: 0.92 },
  { url: `${BASE_URL}/gestoria/cuanto-cuesta-contrato-alquiler`,   lastModified: today, changeFrequency: 'monthly', priority: 0.92 },
  { url: `${BASE_URL}/gestoria/guia-arras-penitenciales`,          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/arras-vs-reserva-compra`,           lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/ciudades`,                          lastModified: today, changeFrequency: 'weekly',  priority: 0.88 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/madrid`,    lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/barcelona`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/valencia`,  lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/sevilla`,   lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/malaga`,   lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/bilbao`,   lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/zaragoza`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/due-diligence-precompra/coruna`,   lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  // Hubs gestoría por ciudad
  { url: `${BASE_URL}/gestoria/barcelona`,                         lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/madrid`,                            lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/valencia`,                          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/sevilla`,                           lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/malaga`,                            lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/bilbao`,                            lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/zaragoza`,                          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/alicante`,                          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/palma`,                             lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/madrid`,     lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/barcelona`,  lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valencia`,   lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/sevilla`,    lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/malaga`,     lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/salamanca`,  lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/gestoria/venta-completa-reserva-escritura/valladolid`, lastModified: today, changeFrequency: 'monthly', priority: 0.87 },

  // Gestoría — Landing pages SEO ciudad-específicas (NUEVAS - Mayo 2026 - URLs limpias)
  // Zaragoza: hub + contrato (legacy page aún en árbol)
  { url: `${BASE_URL}/zaragoza/contrato-alquiler`,           lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
  { url: `${BASE_URL}/granada/contrato-alquiler`,            lastModified: today, changeFrequency: 'weekly', priority: 0.8 },

  // Gestoría — formularios de solicitud (21 servicios)
  { url: `${BASE_URL}/gestoria/solicitar/arras-penitenciales`,           lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/arras-confirmatorias`,          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/reserva-compra`,                lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-alquiler`,             lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-alquiler-barcelona`,  lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/rescision-alquiler`,            lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-habitaciones`,         lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-local-comercial`,      lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-opcion-compra`,        lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/prestamo-particulares`,         lastModified: today, changeFrequency: 'monthly', priority: 0.80 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-garaje-trastero`,      lastModified: today, changeFrequency: 'monthly', priority: 0.78 },
  { url: `${BASE_URL}/gestoria/solicitar/pack-revision-reserva-alquiler`, lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/arras-parking-garage`,          lastModified: today, changeFrequency: 'monthly', priority: 0.80 },
  { url: `${BASE_URL}/gestoria/solicitar/acompanamiento-reserva-arras`,  lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/compra-completa-reserva-escritura`, lastModified: today, changeFrequency: 'monthly', priority: 0.88 },
  { url: `${BASE_URL}/gestoria/solicitar/compra-completa-parking-trastero`,  lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-arras`,                lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-alquiler`,             lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-correccion`,           lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/revision-correccion-arras`,     lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/ayuda-propietarios`,            lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-ilegal`,               lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/asesoria-compra`,               lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/pack-due-diligence-precompra`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/contrato-compraventa`,          lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/gestoria/solicitar/alquiler-temporada`,            lastModified: today, changeFrequency: 'monthly', priority: 0.82 },
  { url: `${BASE_URL}/gestoria/solicitar/reserva-alquiler`,              lastModified: today, changeFrequency: 'monthly', priority: 0.80 },
  { url: `${BASE_URL}/gestoria/solicitar/liquidacion-fianza`,            lastModified: today, changeFrequency: 'monthly', priority: 0.78 },
  { url: `${BASE_URL}/gestoria/solicitar/venta-completa-reserva-escritura`, lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/gestoria/solicitar/asesoramiento-arras-venta`,     lastModified: today, changeFrequency: 'monthly', priority: 0.84 },

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
  { url: `${BASE_URL}/blog/asesoria-juridica-compra-vivienda`,     lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/blog/clausulas-abusivas-contrato-alquiler`,  lastModified: today, changeFrequency: 'monthly', priority: 0.84 },
  { url: `${BASE_URL}/blog/detectar-contrato-arras-fraudulento`,   lastModified: today, changeFrequency: 'monthly', priority: 0.87 },
  { url: `${BASE_URL}/blog/gestoria-barcelona-valencia-madrid`,    lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/servicio-completo-compra-vivienda`,     lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/blog/due-diligence-compra-vivienda`,        lastModified: today, changeFrequency: 'monthly', priority: 0.86 },
  { url: `${BASE_URL}/blog/que-es-gestoria-inmobiliaria`,         lastModified: today, changeFrequency: 'monthly', priority: 0.85 },
  { url: `${BASE_URL}/blog/cuanto-cuesta-contrato-arras`,         lastModified: today, changeFrequency: 'monthly', priority: 0.85 },

  // Páginas de pisos-particulares por ciudad
  { url: `${BASE_URL}/barcelona/pisos-particulares-sin-comision`,  lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/madrid/pisos-particulares-sin-comision`,     lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/valencia/pisos-particulares-sin-comision`,   lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/sevilla/pisos-particulares-sin-comision`,    lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  { url: `${BASE_URL}/malaga/pisos-particulares-sin-comision`,     lastModified: today, changeFrequency: 'daily', priority: 0.95 },
]

// Landings genéricas de gestoría — /gestoria/{slug} (29 servicios públicos)
const GESTORIA_GENERIC_LANDING_PAGES: MetadataRoute.Sitemap = Object.entries(GESTORIA_SERVICIOS)
  .filter(([slug, svc]) => !svc.interno && slug !== 'contrato-alquiler-barcelona')
  .map(([slug, svc]) => ({
    url: `${BASE_URL}/gestoria/${slug}`,
    lastModified: today,
    changeFrequency: 'monthly' as const,
    priority: svc.categoria === 'Servicios Premium' ? 0.9 : 0.88,
  }))

// Hub de ciudad — página principal por ciudad
const CIUDAD_HUB_PAGES: MetadataRoute.Sitemap = CIUDADES.map((ciudad) => ({
  url: `${BASE_URL}/${ciudad}`,
  lastModified: today,
  changeFrequency: 'weekly' as const,
  priority: 0.92,
}))

// Páginas SEO de contratos de arras por ciudad (alineado con rutas premium)
const ARRAS_PAGES: MetadataRoute.Sitemap = Object.keys(CONTRATO_ARRAS_PREMIUM).map((slug) => ({
  url: `${BASE_URL}/${slug}/contrato-arras`,
  lastModified: new Date(),
  changeFrequency: 'monthly' as const,
  priority: 0.85,
}))

// Páginas SEO de contratos de alquiler por ciudad (alineado con rutas premium)
const ALQUILER_PAGES: MetadataRoute.Sitemap = Object.keys(CONTRATO_ALQUILER_PREMIUM).map((slug) => ({
  url: `${BASE_URL}/${slug}/contrato-alquiler`,
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

const MAX_SITEMAP_LISTINGS = 5_000

async function getListingUrls(): Promise<MetadataRoute.Sitemap> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    // Solo listings de calidad: publicados, con imágenes, ordenados por ranking
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

  return [
    ...STATIC_PAGES,
    ...GESTORIA_GENERIC_LANDING_PAGES,
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
