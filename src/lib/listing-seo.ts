import { decodeHtml } from '@/lib/html'
import type { Listing } from '@/types/listings'

type ListingSeoFields = Pick<
  Listing,
  'title' | 'bedrooms' | 'city' | 'price_eur' | 'operation' | 'area_m2'
>

function formatListingPrice(price: number, operation: Listing['operation']): string {
  const formatted = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
  return operation === 'rent' ? `${formatted}/mes` : formatted
}

function buildRoomLabel(bedrooms: number | null): string {
  if (bedrooms == null || bedrooms <= 0) return 'Piso'
  if (bedrooms === 1) return 'Piso 1 hab.'
  return `Piso ${bedrooms} hab.`
}

/** Título SEO para fichas de piso: "Piso 2 hab. en Bilbao — 850€/mes | Inmonest" */
export function buildListingSeoTitle(listing: ListingSeoFields): string {
  const city = listing.city?.trim()
  const roomLabel = buildRoomLabel(listing.bedrooms)
  const ubicacion = city ? ` en ${city}` : ''
  const precio =
    listing.price_eur != null && listing.price_eur > 0
      ? formatListingPrice(listing.price_eur, listing.operation)
      : null

  const hasStructuredData = Boolean(city || listing.bedrooms || precio)
  if (!hasStructuredData) {
    return `${decodeHtml(listing.title)} | Inmonest`
  }

  const core = precio
    ? `${roomLabel}${ubicacion} — ${precio}`
    : `${roomLabel}${ubicacion}`

  return `${core} | Inmonest`
}

/** Meta description con datos clave del anuncio */
export function buildListingSeoDescription(listing: ListingSeoFields): string | undefined {
  const raw = decodeHtml(listing.description)?.replace(/\s+/g, ' ').trim()
  if (raw && raw.length >= 40) return raw.slice(0, 160)

  const parts: string[] = []
  const op = listing.operation === 'rent' ? 'en alquiler' : 'en venta'
  parts.push(`${buildRoomLabel(listing.bedrooms)}${listing.city ? ` en ${listing.city}` : ''} ${op}`)

  if (listing.price_eur != null && listing.price_eur > 0) {
    parts.push(formatListingPrice(listing.price_eur, listing.operation))
  }
  if (listing.area_m2 != null && listing.area_m2 > 0) {
    parts.push(`${listing.area_m2} m²`)
  }
  parts.push('Entre particulares sin comisiones en Inmonest.')

  return parts.join('. ').slice(0, 160)
}
