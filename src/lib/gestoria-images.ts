/**
 * Imágenes de gestoría — asignación única por servicio para evitar repetición.
 * hero: cabecera landing · mid: franja intermedia · cta: banner final
 */
export type ServicioImageSet = {
  hero: { src: string; alt: string }
  mid: { src: string; alt: string }
  cta: { src: string; alt: string }
  imagePosition: 'left' | 'right'
}

const DEFAULT: ServicioImageSet = {
  hero: { src: '/gestoria1.jpg', alt: 'Gestoría inmobiliaria Inmonest' },
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
    cta: { src: '/gestoria12.jpg', alt: 'Cierre de operación inmobiliaria' },
    imagePosition: 'left',
  },
  'contrato-alquiler': {
    hero: { src: '/contratodealquiler.jpg', alt: 'Contrato de alquiler LAU' },
    mid: { src: '/familia1.jpg', alt: 'Familia en su nuevo hogar de alquiler' },
    cta: { src: '/gestoria7.jpg', alt: 'Entrega de contrato de alquiler' },
    imagePosition: 'right',
  },
  'rescision-alquiler': {
    hero: { src: '/gestoria6.jpg', alt: 'Rescisión de contrato de alquiler' },
    mid: { src: '/interior3.jpg', alt: 'Estado del inmueble en la entrega' },
    cta: { src: '/sofainmonest.png', alt: 'Devolución de fianza y llaves' },
    imagePosition: 'left',
  },
  'alquiler-habitaciones': {
    hero: { src: '/familia5.jpg', alt: 'Alquiler de habitación en piso compartido' },
    mid: { src: '/gestoria16.jpg', alt: 'Contrato de habitación personalizado' },
    cta: { src: '/contrato6.jpg', alt: 'Normas de convivencia en contrato' },
    imagePosition: 'right',
  },
  'alquiler-local-comercial': {
    hero: { src: '/comercial1.jpg', alt: 'Contrato de alquiler de local comercial' },
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
    hero: { src: '/gestoria3.jpg', alt: 'Contrato de préstamo entre particulares formalizado' },
    mid: { src: '/gestoria15.jpg', alt: 'Revisión jurídica de préstamo privado' },
    cta: { src: '/gestora5.jpg', alt: 'Asesor fiscal para préstamo entre particulares' },
    imagePosition: 'left',
  },
  'alquiler-garaje-trastero': {
    hero: { src: '/gestoria9.jpg', alt: 'Alquiler de plaza de garaje o trastero' },
    mid: { src: '/contrato5.jpg', alt: 'Contrato de arrendamiento de parking' },
    cta: { src: '/comercial2.jpg', alt: 'Garaje y trastero en comunidad' },
    imagePosition: 'right',
  },
  'acompanamiento-reserva-arras': {
    hero: { src: '/gestoria10.jpg', alt: 'Reserva y arras de compraventa' },
    mid: { src: '/contrato2.jpg', alt: 'Pack reserva más arras' },
    cta: { src: '/gestoria17.jpg', alt: 'Acompañamiento hasta escritura' },
    imagePosition: 'left',
  },
  'compra-completa-reserva-escritura': {
    hero: { src: '/promo.png', alt: 'Compra de vivienda con acompañamiento' },
    mid: { src: '/gestoria11.jpg', alt: 'Gestoría en compraventa completa' },
    cta: { src: '/familia10.jpg', alt: 'Compradores en su nueva vivienda' },
    imagePosition: 'right',
  },
  'compra-completa-parking-trastero': {
    hero: { src: '/comercial4.jpg', alt: 'Compra de parking o trastero' },
    mid: { src: '/gestoria18.jpg', alt: 'Due diligence de plaza de garaje' },
    cta: { src: '/gestoria8.jpg', alt: 'Escritura de parking o trastero' },
    imagePosition: 'left',
  },
  'pack-revision-reserva-alquiler': {
    hero: { src: '/contrato2.jpg', alt: 'Pack revisión reserva y alquiler' },
    mid: { src: '/contrato3.jpg', alt: 'Revisión de contratos inmobiliarios' },
    cta: { src: '/gestoria4.jpg', alt: 'Contratos revisados por expertos' },
    imagePosition: 'right',
  },
  'pack-arras-revision-documental': {
    hero: { src: '/gestoria10.jpg', alt: 'Pack arras y revisión documental completa' },
    mid: { src: '/gestoria15.jpg', alt: 'Verificación documental para compradores particulares' },
    cta: { src: '/contratodearras.jpg', alt: 'Arras seguras con informe documental' },
    imagePosition: 'left',
  },
  'pack-due-diligence-precompra': {
    hero: { src: '/gestoria9.jpg', alt: 'Due diligence pre-compra inmobiliaria' },
    mid: { src: '/interior1.jpg', alt: 'Auditoría documental antes de escriturar' },
    cta: { src: '/gestoria15.jpg', alt: 'Informe ejecutivo de compraventa' },
    imagePosition: 'right',
  },
  'arras-parking-garage': {
    hero: { src: '/contrato5.jpg', alt: 'Arras para compraventa de parking' },
    mid: { src: '/gestoria13.jpg', alt: 'Plaza de garaje en operación de compra' },
    cta: { src: '/publicar-keys.jpg', alt: 'Señal de arras en parking' },
    imagePosition: 'left',
  },
}

/** Imágenes para banners CTA en landings premium (no genéricas) */
export const GESTORIA_CTA_BANNERS = {
  prestamo: { src: '/gestoria3.jpg', alt: 'Formalizar préstamo entre particulares' },
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
}

/** @deprecated Usar CIUDAD_IMAGES */
export const VENTA_CIUDAD_IMAGES = CIUDAD_IMAGES

/** Pool de respaldo para ciudades sin foto dedicada */
const CIUDAD_CTA_POOL: { src: string; alt: string }[] = [
  { src: '/gestoria2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria5.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria8.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria12.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria13.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/gestoria17.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia4.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia7.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia8.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/familia9.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/interior2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/interior3.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/amigos2.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/amigos3.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
  { src: '/amigos4.jpg', alt: 'Gestoría inmobiliaria por ciudad' },
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
  return SERVICIO_IMAGES[slug] ?? DEFAULT
}
