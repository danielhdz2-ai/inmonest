/**
 * template-description.ts
 *
 * Generador de descripciones para listings basado en plantillas dinámicas.
 * No requiere ninguna API externa ni consume tokens.
 * Reemplaza a generateAiDescription para el backfill masivo.
 *
 * Uso:
 *  import { generateTemplateDescription } from '@/lib/template-description'
 *  const desc = generateTemplateDescription(listing)
 */

interface ListingInput {
  id: string
  title?: string | null
  description?: string | null
  operation: string
  city?: string | null
  district?: string | null
  province?: string | null
  price_eur?: number | null
  bedrooms?: number | null
  bathrooms?: number | null
  area_m2?: number | null
  is_particular?: boolean | null
}

// ─── Contexto por ciudad ────────────────────────────────────────────────────

const CITY_CONTEXT: Record<string, { transport: string; lifestyle: string }> = {
  madrid: {
    transport: 'metro, cercanías y una extensa red de autobuses',
    lifestyle: 'una ciudad vibrante con todo tipo de servicios, cultura y ocio a tu alcance',
  },
  barcelona: {
    transport: 'metro, bus y Bicing para moverte por toda la ciudad',
    lifestyle: 'una ciudad cosmopolita con playa, montaña y una oferta cultural inigualable',
  },
  valencia: {
    transport: 'metro, tranvía y autobuses urbanos bien conectados',
    lifestyle: 'una ciudad mediterránea con un ritmo de vida agradable y un clima envidiable',
  },
  sevilla: {
    transport: 'metro, tranvía y una completa red de autobuses',
    lifestyle: 'una ciudad con mucho carácter, historia y una gastronomía excepcional',
  },
  malaga: {
    transport: 'metro, tren de cercanías y autobuses urbanos',
    lifestyle: 'una ciudad en pleno crecimiento con sol garantizado casi todo el año',
  },
  bilbao: {
    transport: 'metro, tranvía y una eficiente red de autobuses',
    lifestyle: 'una ciudad moderna y acogedora con una excelente oferta cultural y gastronómica',
  },
  zaragoza: {
    transport: 'tranvía y una completa red de autobuses urbanos',
    lifestyle: 'una ciudad bien comunicada, tranquila y con todos los servicios a mano',
  },
  alicante: {
    transport: 'tram y autobuses bien distribuidos por la ciudad',
    lifestyle: 'una ciudad costera con un clima mediterráneo y una calidad de vida muy alta',
  },
  granada: {
    transport: 'autobuses urbanos y fácil acceso a pie por el centro histórico',
    lifestyle: 'una ciudad universitaria, acogedora y con una riqueza cultural única',
  },
  murcia: {
    transport: 'autobuses urbanos y buenas conexiones con los municipios de alrededor',
    lifestyle: 'una ciudad asequible, tranquila y con todos los servicios necesarios',
  },
}

const DEFAULT_CITY_CONTEXT = {
  transport: 'transporte público y buenas conexiones por carretera',
  lifestyle: 'todos los servicios necesarios para el día a día',
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCityContext(city?: string | null) {
  if (!city) return DEFAULT_CITY_CONTEXT
  return CITY_CONTEXT[city.toLowerCase()] ?? DEFAULT_CITY_CONTEXT
}

function formatBedrooms(n?: number | null): string {
  if (n == null) return 'amplio'
  if (n === 0) return 'estudio'
  if (n === 1) return 'un dormitorio'
  if (n === 2) return 'dos dormitorios'
  if (n === 3) return 'tres dormitorios'
  if (n === 4) return 'cuatro dormitorios'
  return `${n} dormitorios`
}

function formatPrice(price?: number | null, operation?: string): string {
  if (!price) return ''
  if (operation === 'rent') return `${price.toLocaleString('es-ES')} €/mes`
  return `${price.toLocaleString('es-ES')} €`
}

function formatArea(m2?: number | null): string {
  if (!m2) return ''
  return `${m2} m²`
}

function formatBathrooms(n?: number | null): string {
  if (!n) return ''
  return n === 1 ? '1 baño' : `${n} baños`
}

function locationString(district?: string | null, city?: string | null): string {
  if (district && city) return `${district}, ${city}`
  if (city) return city
  if (district) return district
  return 'una ubicación muy bien comunicada'
}

// ─── Variantes de apertura ────────────────────────────────────────────────────

function pickVariant<T>(arr: T[], seed: string): T {
  const hash = [...seed].reduce((acc, c) => acc + c.charCodeAt(0), 0)
  return arr[hash % arr.length]
}

// ─── Bloques de texto ─────────────────────────────────────────────────────────

function buildIntroParticular(l: ListingInput): string {
  const op = l.operation === 'rent' ? 'alquilar' : 'vender'
  const loc = locationString(l.district, l.city)
  const beds = formatBedrooms(l.bedrooms)
  const area = formatArea(l.area_m2)
  const price = formatPrice(l.price_eur, l.operation)

  const variants = [
    `Te ofrezco mi piso de ${beds}${area ? ` y ${area}` : ''} situado en ${loc}${price ? `, por ${price}` : ''}. Un espacio ideal para quien busca tranquilidad y comodidad en una zona privilegiada.`,
    `Pongo a tu disposición este piso de ${beds}${area ? ` con ${area} construidos` : ''} en ${loc}${price ? ` al precio de ${price}` : ''}. Una oportunidad real de encontrar tu hogar sin intermediarios.`,
    `Soy el propietario y quiero ${op} mi piso de ${beds}${area ? `, ${area}` : ''} en ${loc}${price ? `. Precio: ${price}` : ''}. Sin agencia, trato directo y honesto.`,
  ]

  return pickVariant(variants, l.id)
}

function buildIntroAgencia(l: ListingInput): string {
  const op = l.operation === 'rent' ? 'alquiler' : 'venta'
  const loc = locationString(l.district, l.city)
  const beds = formatBedrooms(l.bedrooms)
  const area = formatArea(l.area_m2)
  const price = formatPrice(l.price_eur, l.operation)

  const variants = [
    `Presentamos este magnífico piso de ${beds}${area ? ` y ${area}` : ''} en ${op}, ubicado en ${loc}${price ? ` por ${price}` : ''}. Una propiedad en perfectas condiciones lista para entrar a vivir.`,
    `Ofrecemos en ${op} este fantástico piso de ${beds}${area ? ` con ${area}` : ''} situado en ${loc}${price ? `. Precio: ${price}` : ''}. Ideal para quienes buscan calidad y comodidad.`,
    `Ponemos a tu disposición este piso de ${beds}${area ? ` (${area})` : ''} en ${op} en ${loc}${price ? `, a ${price}` : ''}. Un inmueble con excelentes acabados en una de las mejores zonas.`,
  ]

  return pickVariant(variants, l.id)
}

function buildPisoDetails(l: ListingInput): string {
  const parts: string[] = []
  const baths = formatBathrooms(l.bathrooms)
  const area = formatArea(l.area_m2)
  const beds = formatBedrooms(l.bedrooms)

  if (l.bedrooms != null && l.bathrooms != null && l.area_m2 != null) {
    parts.push(`El piso cuenta con ${beds}, ${baths} y ${area} bien distribuidos`)
  } else if (l.bedrooms != null && l.area_m2 != null) {
    parts.push(`El inmueble ofrece ${beds} y ${area} de superficie`)
  } else if (l.bedrooms != null) {
    parts.push(`El piso dispone de ${beds}`)
  } else if (l.area_m2 != null) {
    parts.push(`Con ${area} de superficie`)
  }

  const qualityPhrases = [
    'La distribución es óptima y aprovecha al máximo cada rincón, ofreciendo espacios amplios y luminosos.',
    'La vivienda está en buen estado de conservación, con estancias bien proporcionadas y abundante luz natural.',
    'El piso goza de buena orientación, lo que garantiza luminosidad durante gran parte del día y una sensación de amplitud muy agradable.',
  ]

  parts.push(pickVariant(qualityPhrases, l.id + 'q'))

  return parts.join('. ') + '.'
}

function buildBarrioSection(l: ListingInput): string {
  const ctx = getCityContext(l.city)
  const loc = l.district ? `El barrio de ${l.district}` : (l.city ? `La zona de ${l.city}` : 'La zona')

  const variants = [
    `${loc} destaca por su excelente comunicación mediante ${ctx.transport}. Encontrarás supermercados, colegios, centros de salud y todo lo necesario a pocos minutos a pie. Vivir aquí significa disfrutar de ${ctx.lifestyle}.`,
    `La ubicación es uno de los grandes puntos fuertes de este piso. ${loc} cuenta con acceso a ${ctx.transport} y dispone de una amplia oferta de comercios, restaurantes y servicios en los alrededores. Sin duda, ${ctx.lifestyle}.`,
    `${loc} es una zona muy solicitada gracias a su conectividad con ${ctx.transport} y su proximidad a todo tipo de servicios cotidianos. Una zona donde disfrutar de ${ctx.lifestyle}.`,
  ]

  return pickVariant(variants, l.id + 'b')
}

function buildCierreParticular(l: ListingInput): string {
  const op = l.operation === 'rent' ? 'alquilar' : 'vender'
  const variants = [
    `Si quieres ${op} sin comisiones y con total transparencia, este es tu piso. Soy el propietario, trato directo y sin intermediarios. No dudes en contactarme para concertar una visita.`,
    `Gestiono yo mismo el proceso: sin agencias, sin comisiones ocultas. Puedes visitar el piso cuando mejor te venga y resolver todas tus dudas conmigo directamente.`,
    `Apuesto por el trato directo entre propietario e inquilino/comprador. Sin comisiones de agencia, con toda la documentación en regla. Escríbeme y organizamos una visita.`,
  ]
  return pickVariant(variants, l.id + 'c')
}

function buildCierreAgencia(l: ListingInput): string {
  const op = l.operation === 'rent' ? 'alquilar' : 'comprar'
  const variants = [
    `Si estás pensando en ${op} en esta zona, este piso es una oportunidad que merece la pena visitar. Contáctanos para más información o para concertar una visita sin compromiso.`,
    `Te acompañamos en todo el proceso de ${op === 'alquilar' ? 'arrendamiento' : 'compraventa'}, desde la primera visita hasta la firma. Ponte en contacto con nosotros para resolver cualquier duda.`,
    `No dejes escapar esta oportunidad. Estaremos encantados de mostrarte el piso y asesorarte en todo lo que necesites. Llámanos o escríbenos para coordinar una visita.`,
  ]
  return pickVariant(variants, l.id + 'c')
}

// ─── Función principal ────────────────────────────────────────────────────────

/**
 * Genera una descripción completa para un listing usando plantillas dinámicas.
 * Sin coste de tokens, sin dependencias externas.
 */
export function generateTemplateDescription(listing: ListingInput): string {
  const isParticular = listing.is_particular === true

  const intro = isParticular
    ? buildIntroParticular(listing)
    : buildIntroAgencia(listing)

  const details = buildPisoDetails(listing)
  const barrio = buildBarrioSection(listing)
  const cierre = isParticular
    ? buildCierreParticular(listing)
    : buildCierreAgencia(listing)

  return [intro, details, barrio, cierre].join('\n\n')
}
