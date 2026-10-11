import { GESTORIA_SLUG_ALIASES } from '@/lib/gestoria-catalogo'

/**
 * Imágenes de gestoría — asignación única por servicio para evitar repetición.
 * hero: cabecera landing · mid: franja intermedia · cta: banner final
 *
 * En catálogo y panel, el hero usa solo fotos de contratos (getContractHero).
 */
export type ServicioImageSet = {
  hero: { src: string; alt: string }
  mid: { src: string; alt: string }
  cta: { src: string; alt: string }
  imagePosition: 'left' | 'right'
}

/**
 * Hero de tarjeta por servicio — una imagen distinta por slug (catálogo / panel / solicitar).
 * Pool: contrato*, gestoría, inmobiliaria y fotos profesionales de firma/revisión.
 */
const CONTRACT_HERO_BY_SLUG: Record<string, { src: string; alt: string }> = {
  'arras-penitenciales': { src: '/contratodearras.jpg', alt: 'Contrato de arras penitenciales' },
  'arras-confirmatorias': { src: '/contrato1.jpg', alt: 'Contrato de arras confirmatorias' },
  'reserva-compra': { src: '/sign-here-please.jpg', alt: 'Contrato de reserva de compra' },
  'contrato-compraventa': { src: '/contrato9.jpg', alt: 'Contrato de compraventa' },
  'arras-parking-garage': { src: '/comercial2.jpg', alt: 'Arras de compraventa de parking' },
  'contrato-alquiler': { src: '/contratodealquiler.jpg', alt: 'Contrato de alquiler LAU' },
  'contrato-alquiler-barcelona': { src: '/contrato2.jpg', alt: 'Contrato de alquiler en Barcelona' },
  'alquiler-habitaciones': { src: '/contrato6.jpg', alt: 'Contrato de alquiler de habitación' },
  'alquiler-local-comercial': {
    src: '/colynary-media-ZKkuYgbTRl8-unsplash.jpg',
    alt: 'Contrato de alquiler de local comercial',
  },
  'alquiler-opcion-compra': { src: '/contrato5.jpg', alt: 'Alquiler con opción a compra' },
  'alquiler-garaje-trastero': { src: '/comercial4.jpg', alt: 'Contrato de alquiler de garaje o trastero' },
  'rescision-alquiler': { src: '/gestoria2.jpg', alt: 'Rescisión de contrato de alquiler' },
  'reserva-alquiler': {
    src: '/businessman-checking-documents-table.jpg',
    alt: 'Reserva de alquiler',
  },
  'alquiler-temporada': { src: '/contrato4.jpg', alt: 'Contrato de alquiler de temporada' },
  'liquidacion-fianza': {
    src: '/kelly-sikkema-l9HFojj_yHQ-unsplash.jpg',
    alt: 'Liquidación de fianza',
  },
  'revision-alquiler': { src: '/2h-media-PUd6C90Isp0-unsplash.jpg', alt: 'Revisión de contrato de alquiler' },
  'revision-correccion': {
    src: '/olena-kholina-MhqUBTxQ3Hw-unsplash.jpg',
    alt: 'Revisión y corrección de contrato',
  },
  'revision-correccion-arras': { src: '/gestoria15.jpg', alt: 'Revisión de contrato de arras' },
  'contrato-ilegal': {
    src: '/employee-woman-employment-recruitment-candidate.jpg',
    alt: 'Análisis de fraude inmobiliario',
  },
  'pack-due-diligence-precompra': { src: '/gestoria14.jpg', alt: 'Due diligence pre-compra' },
  'pack-arras-revision-documental': {
    src: '/dallas-penner-Ea9u3lvwcCg-unsplash.jpg',
    alt: 'Pack arras y revisión documental',
  },
  'pack-arras-plus-vendedor': { src: '/sarah-b-BJqzjxwQhK8-unsplash.jpg', alt: 'Pack arras para vendedor' },
  'compra-completa-reserva-escritura': {
    src: '/publicar-deal.jpg',
    alt: 'Compraventa con acompañamiento hasta escritura',
  },
  'venta-completa-reserva-escritura': { src: '/inmobiliaria8.jpg', alt: 'Venta con acompañamiento hasta escritura' },
  'acompanamiento-reserva-arras': {
    src: '/vitaly-gariev-RbYg6fKSfcY-unsplash.jpg',
    alt: 'Reserva y arras de compraventa',
  },
  'asesoramiento-arras-venta': {
    src: '/unseen-studio-s9CC2SKySJM-unsplash.jpg',
    alt: 'Asesoramiento en arras para vendedor',
  },
  'compra-completa-parking-trastero': { src: '/comercial5.jpg', alt: 'Compra de parking o trastero' },
  'asesoria-compra-piso': { src: '/inmobiliaria3.jpg', alt: 'Asesoría en compra de vivienda' },
  'pack-revision-reserva-alquiler': {
    src: '/scott-graham-5fNmWej4tAA-unsplash.jpg',
    alt: 'Pack revisión reserva y alquiler',
  },
  'prestamo-particulares': {
    src: '/guille-b-xYnominUM0I-unsplash.jpg',
    alt: 'Contrato de préstamo entre particulares',
  },
  'pack-agencia-agente': { src: '/gestora5.jpg', alt: 'Gestoría para agentes independientes' },
  'pack-agencia-agencia': { src: '/gestora8.jpg', alt: 'Gestoría para agencias inmobiliarias' },
  'pack-agencia-agencia-plus': { src: '/gestora10.jpg', alt: 'Gestoría premium para agencias' },
  'prueba-pago-stripe': { src: '/contratos.jpg', alt: 'Contrato de prueba' },
}

/** Reserva para slugs nuevos sin entrada explícita (sin repetir las ya asignadas arriba) */
const CONTRACT_HERO_FALLBACK: { src: string; alt: string }[] = [
  { src: '/gestoria1.jpg', alt: 'Gestoría inmobiliaria' },
  { src: '/gestoria4.jpg', alt: 'Formalización de contrato' },
  { src: '/gestoria5.jpg', alt: 'Contrato inmobiliario' },
  { src: '/gestoria7.jpg', alt: 'Documentación de gestoría' },
  { src: '/gestoria10.jpg', alt: 'Operación inmobiliaria' },
  { src: '/gestoria11.jpg', alt: 'Compraventa entre particulares' },
  { src: '/gestoria16.jpg', alt: 'Revisión documental' },
  { src: '/gestoria18.jpg', alt: 'Expediente de gestoría' },
  { src: '/gestora6.jpg', alt: 'Equipo de gestoría' },
  { src: '/gestora7.jpg', alt: 'Asesoramiento jurídico' },
  { src: '/gestora9.jpg', alt: 'Tramitación de contrato' },
  { src: '/adolfo-felix-uo7AHIpjOu0-unsplash.jpg', alt: 'Firma de contrato' },
  { src: '/imagine-buddy-bTMTggEt5s4-unsplash.jpg', alt: 'Revisión de documentación' },
  { src: '/luke-miller-WvZot2OyWLo-unsplash.jpg', alt: 'Contrato inmobiliario' },
  { src: '/radission-us-_XeQ8XEWb4Q-unsplash.jpg', alt: 'Negociación de compraventa' },
  { src: '/gb-the-green-brand--QfEQhI0OlI-unsplash.jpg', alt: 'Documentos de arras' },
  { src: '/publicar-hero.jpg', alt: 'Contrato online Inmonest' },
  { src: '/contrato3.jpg', alt: 'Cláusulas contractuales' },
]

export function getContractHero(slug: string): { src: string; alt: string } {
  const canon = GESTORIA_SLUG_ALIASES[slug] ?? slug
  const mapped = CONTRACT_HERO_BY_SLUG[canon] ?? CONTRACT_HERO_BY_SLUG[slug]
  if (mapped) return mapped
  const idx = [...canon].reduce((acc, c) => acc + c.charCodeAt(0), 0) % CONTRACT_HERO_FALLBACK.length
  return CONTRACT_HERO_FALLBACK[idx]!
}

const DEFAULT: ServicioImageSet = {
  hero: { src: '/contratos.jpg', alt: 'Contratos inmobiliaria Inmonest' },
  mid: { src: '/gestora6.jpg', alt: 'Equipo de gestoría revisando contratos' },
  cta: { src: '/keys.jpg', alt: 'Entrega de llaves tras contrato' },
  imagePosition: 'right',
}

export const SERVICIO_IMAGES: Record<string, ServicioImageSet> = {
  'arras-penitenciales': {
    hero: { src: '/contratodearras.jpg', alt: 'Firma de contrato de arras penitenciales' },
    mid: { src: '/gestoria15.jpg', alt: 'Revisión jurídica de contrato de arras' },
    cta: { src: '/publicar-keys.jpg', alt: 'Llaves tras formalizar arras' },
    imagePosition: 'right',
  },
  'arras-confirmatorias': {
    hero: { src: '/contrato1.jpg', alt: 'Contrato de arras confirmatorias' },
    mid: { src: '/gestoria14.jpg', alt: 'Gestoría especializada en compraventa' },
    cta: { src: '/gestoria10.jpg', alt: 'Cierre de operación inmobiliaria' },
    imagePosition: 'left',
  },
  'contrato-alquiler': {
    hero: { src: '/contratodealquiler.jpg', alt: 'Contrato de alquiler LAU' },
    mid: { src: '/familia1.jpg', alt: 'Familia en su nuevo hogar de alquiler' },
    cta: { src: '/gestoria7.jpg', alt: 'Entrega de contrato de alquiler' },
    imagePosition: 'right',
  },
  'rescision-alquiler': {
    hero: { src: '/contrato6.jpg', alt: 'Rescisión de contrato de alquiler' },
    mid: { src: '/interior3.jpg', alt: 'Estado del inmueble en la entrega' },
    cta: { src: '/sofainmonest.png', alt: 'Devolución de fianza y llaves' },
    imagePosition: 'left',
  },
  'alquiler-habitaciones': {
    hero: { src: '/contrato6.jpg', alt: 'Contrato de alquiler de habitación' },
    mid: { src: '/gestoria16.jpg', alt: 'Contrato de habitación personalizado' },
    cta: { src: '/contrato6.jpg', alt: 'Normas de convivencia en contrato' },
    imagePosition: 'right',
  },
  'alquiler-local-comercial': {
    hero: { src: '/contrato4.jpg', alt: 'Contrato de alquiler de local comercial' },
    mid: { src: '/comercial5.jpg', alt: 'Local comercial listo para actividad' },
    cta: { src: '/gestora7.jpg', alt: 'Asesoramiento en arrendamiento comercial' },
    imagePosition: 'left',
  },
  'alquiler-opcion-compra': {
    hero: { src: '/contrato4.jpg', alt: 'Alquiler con opción a compra' },
    mid: { src: '/familia3.jpg', alt: 'Familia evaluando compra de vivienda' },
    cta: { src: '/promo3.png', alt: 'Formalización de opción de compra' },
    imagePosition: 'right',
  },
  'prestamo-particulares': {
    hero: { src: '/contrato2.jpg', alt: 'Contrato de préstamo entre particulares formalizado' },
    mid: { src: '/gestoria15.jpg', alt: 'Revisión jurídica de préstamo privado' },
    cta: { src: '/gestora5.jpg', alt: 'Asesor fiscal para préstamo entre particulares' },
    imagePosition: 'left',
  },
  'alquiler-garaje-trastero': {
    hero: { src: '/contrato5.jpg', alt: 'Contrato de alquiler de garaje o trastero' },
    mid: { src: '/contrato5.jpg', alt: 'Contrato de arrendamiento de parking' },
    cta: { src: '/comercial2.jpg', alt: 'Garaje y trastero en comunidad' },
    imagePosition: 'right',
  },
  'acompanamiento-reserva-arras': {
    hero: { src: '/contratodearras.jpg', alt: 'Reserva y arras de compraventa' },
    mid: { src: '/contrato2.jpg', alt: 'Pack reserva más arras' },
    cta: { src: '/gestoria16.jpg', alt: 'Acompañamiento hasta escritura' },
    imagePosition: 'left',
  },
  'compra-completa-reserva-escritura': {
    hero: { src: '/contrato1.jpg', alt: 'Compra de vivienda con acompañamiento' },
    mid: { src: '/gestoria11.jpg', alt: 'Gestoría en compraventa completa' },
    cta: { src: '/familia10.jpg', alt: 'Compradores en su nueva vivienda' },
    imagePosition: 'right',
  },
  'compra-completa-parking-trastero': {
    hero: { src: '/contrato5.jpg', alt: 'Compra de parking o trastero' },
    mid: { src: '/gestoria18.jpg', alt: 'Due diligence de plaza de garaje' },
    cta: { src: '/gestoria18.jpg', alt: 'Escritura de parking o trastero' },
    imagePosition: 'left',
  },
  'pack-revision-reserva-alquiler': {
    hero: { src: '/contrato2.jpg', alt: 'Pack revisión reserva y alquiler' },
    mid: { src: '/contrato3.jpg', alt: 'Revisión de contratos inmobiliarios' },
    cta: { src: '/gestoria4.jpg', alt: 'Contratos revisados por expertos' },
    imagePosition: 'right',
  },
  'pack-arras-revision-documental': {
    hero: { src: '/contratodearras.jpg', alt: 'Pack Arras Plus Comprador — arras y revisión documental' },
    mid: { src: '/gestoria15.jpg', alt: 'Verificación documental para compradores particulares' },
    cta: { src: '/contratodearras.jpg', alt: 'Arras seguras con informe documental' },
    imagePosition: 'left',
  },
  'pack-arras-plus-vendedor': {
    hero: { src: '/contratodearras.jpg', alt: 'Pack Arras Plus Vendedor — arras y documentación' },
    mid: { src: '/gestoria14.jpg', alt: 'Documentación para escriturar como vendedor' },
    cta: { src: '/publicar-keys.jpg', alt: 'Venta entre particulares con gestoría' },
    imagePosition: 'right',
  },
  'pack-due-diligence-precompra': {
    hero: { src: '/contrato3.jpg', alt: 'Due diligence pre-compra inmobiliaria' },
    mid: { src: '/interior1.jpg', alt: 'Auditoría documental antes de escriturar' },
    cta: { src: '/gestoria15.jpg', alt: 'Informe ejecutivo de compraventa' },
    imagePosition: 'right',
  },
  'arras-parking-garage': {
    hero: { src: '/contrato5.jpg', alt: 'Arras para compraventa de parking' },
    mid: { src: '/gestoria14.jpg', alt: 'Plaza de garaje en operación de compra' },
    cta: { src: '/publicar-keys.jpg', alt: 'Señal de arras en parking' },
    imagePosition: 'left',
  },
}

/** Imágenes para banners CTA en landings premium (no genéricas) */
export const GESTORIA_CTA_BANNERS = {
  prestamo: { src: '/contrato2.jpg', alt: 'Formalizar préstamo entre particulares' },
  dueDiligence: { src: '/interior1.jpg', alt: 'Due diligence pre-compra' },
  ventaCompleta: { src: '/familia2.jpg', alt: 'Venta de piso entre particulares' },
  habitacion: { src: '/familia6.jpg', alt: 'Alquiler de habitación' },
  parking: { src: '/comercial2.jpg', alt: 'Compra de parking o trastero' },
  hubCiudad: { src: '/promo.png', alt: 'Gestoría inmobiliaria por ciudad' },
  asesoriaCompra: { src: '/interior4.jpg', alt: 'Asesoría en compra de vivienda' },
} as const

/** Imágenes landing premium Due Diligence */
export const DUE_DILIGENCE_LANDING = {
  hero: { src: '/gestoria15.jpg', alt: 'Due diligence pre-compra inmobiliaria' },
  mid: { src: '/interior1.jpg', alt: 'Verificación documental antes de escriturar' },
  imagePosition: 'right' as const,
}

/** Banner llamada a gestoría — foto familia */
export const GESTORIA_LLAMADA_BANNER = {
  src: '/familia1.jpg',
  alt: 'Familia asesorada por gestoría inmobiliaria Inmonest',
} as const

/** Banner «cuéntanos tu caso» — cercanía, amigos o familia */
export const GESTORIA_CUENTANOS_BANNER = {
  src: '/amigos5.jpg',
  alt: 'Cuéntanos tu caso — gestoría inmobiliaria Inmonest',
} as const

/** Imágenes reales por ciudad — tarjetas, heroes y landings locales */
export const CIUDAD_IMAGES: Record<string, { src: string; alt: string }> = {
  madrid: { src: '/madrid1.jpg', alt: 'Gestoría inmobiliaria Madrid' },
  barcelona: { src: '/barcelona1.jpg', alt: 'Gestoría inmobiliaria Barcelona' },
  valencia: { src: '/valencia.jpg', alt: 'Gestoría inmobiliaria Valencia' },
  sevilla: { src: '/sevilla1.jpg', alt: 'Gestoría inmobiliaria Sevilla' },
  malaga: { src: '/malaga1.jpg', alt: 'Gestoría inmobiliaria Málaga' },
  salamanca: { src: '/gestoria2.jpg', alt: 'Gestoría inmobiliaria Salamanca' },
  valladolid: { src: '/valladolid.jpg', alt: 'Gestoría inmobiliaria Valladolid' },
  zaragoza: { src: '/zaragoza.jpg', alt: 'Gestoría inmobiliaria Zaragoza' },
  gijon: { src: '/gijon.jpg', alt: 'Gestoría inmobiliaria Gijón' },
  vigo: { src: '/vigo.jpg', alt: 'Gestoría inmobiliaria Vigo' },
  mallorca: { src: '/mallorca.jpg', alt: 'Gestoría inmobiliaria Mallorca' },
  palma: { src: '/mallorca.jpg', alt: 'Gestoría inmobiliaria Palma de Mallorca' },
  asturias: { src: '/gijon.jpg', alt: 'Gestoría inmobiliaria Asturias' },
  coruna: { src: '/vigo.jpg', alt: 'Gestoría inmobiliaria A Coruña' },
  bilbao: { src: '/gestoria7.jpg', alt: 'Gestoría inmobiliaria Bilbao' },
  alicante: { src: '/alicante1.jpg', alt: 'Gestoría inmobiliaria Alicante — Costa Blanca' },
  granada: { src: '/gestoria5.jpg', alt: 'Gestoría inmobiliaria Granada' },
  murcia: { src: '/gestoria4.jpg', alt: 'Gestoría inmobiliaria Murcia' },
  pamplona: { src: '/gestoria3.jpg', alt: 'Gestoría inmobiliaria Pamplona' },
  santander: { src: '/gestoria6.jpg', alt: 'Gestoría inmobiliaria Santander' },
  vitoria: { src: '/gestoria9.jpg', alt: 'Gestoría inmobiliaria Vitoria' },
  castellon: { src: '/valencia.jpg', alt: 'Gestoría inmobiliaria Castellón' },
  'san-sebastian': { src: '/gestoria10.jpg', alt: 'Gestoría inmobiliaria San Sebastián' },
  cordoba: { src: '/gestoria5.jpg', alt: 'Gestoría inmobiliaria Córdoba' },
  'las-palmas': { src: '/gestoria14.jpg', alt: 'Gestoría inmobiliaria Las Palmas' },
  'santa-cruz': { src: '/gestoria16.jpg', alt: 'Gestoría inmobiliaria Santa Cruz de Tenerife' },
  cadiz: { src: '/gestoria6.jpg', alt: 'Gestoría inmobiliaria Cádiz' },
  badajoz: { src: '/gestoria4.jpg', alt: 'Gestoría inmobiliaria Badajoz' },
  toledo: { src: '/gestoria9.jpg', alt: 'Gestoría inmobiliaria Toledo' },
  tarragona: { src: '/barcelona1.jpg', alt: 'Gestoría inmobiliaria Tarragona' },
  almeria: { src: '/malaga1.jpg', alt: 'Gestoría inmobiliaria Almería' },
}

/** @deprecated Usar CIUDAD_IMAGES */
export const VENTA_CIUDAD_IMAGES = CIUDAD_IMAGES

/** Pool de respaldo para ciudades sin foto dedicada */
const CIUDAD_CTA_POOL: { src: string; alt: string }[] = [
  { src: '/gestoria2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria5.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria10.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria14.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria16.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria18.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia3.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia5.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia6.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia10.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/interior2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/interior3.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/interior4.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/amigos1.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/amigos5.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/keys.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/publicar-keys.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
]

export function getCiudadImage(slug: string): { src: string; alt: string } {
  const known = CIUDAD_IMAGES[slug]
  if (known) return known
  return getCiudadCtaImage(slug)
}

export function getCiudadCtaImage(slug: string): { src: string; alt: string } {
  const known = CIUDAD_IMAGES[slug]
  if (known) return known
  const idx = [...slug].reduce((acc, c) => acc + c.charCodeAt(0), 0) % CIUDAD_CTA_POOL.length
  return CIUDAD_CTA_POOL[idx]!
}

export function getServicioImages(slug: string): ServicioImageSet {
  const canon = GESTORIA_SLUG_ALIASES[slug] ?? slug
  const base = SERVICIO_IMAGES[slug] ?? SERVICIO_IMAGES[canon] ?? DEFAULT
  return { ...base, hero: getContractHero(slug) }
}
