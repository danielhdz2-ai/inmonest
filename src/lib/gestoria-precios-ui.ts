/** Etiquetas de precio para UI — siempre derivadas de gestoria-catalogo (Stripe). */
import {
  CONTRATO_ALQUILER_PRECIO_BARCELONA,
  CONTRATO_ALQUILER_PRECIO_ESPANA,
  GESTORIA_SERVICIOS,
  formatPrecioEuro,
  getContratoAlquilerPrecio,
  getPrecioServicio,
} from './gestoria-catalogo'

export function precio(slug: string): number {
  const v = getPrecioServicio(slug)
  if (v == null) throw new Error(`Precio no definido en catálogo: ${slug}`)
  return v
}

export function precioLabel(slug: string, ciudadSlug?: string | null): string {
  if (slug === 'contrato-alquiler') {
    return formatPrecioEuro(getContratoAlquilerPrecio(ciudadSlug))
  }
  return formatPrecioEuro(precio(slug))
}

export function precioLauLabel(ciudadSlug?: string | null): string {
  return precioLabel('contrato-alquiler', ciudadSlug)
}

export function precioLauInventarioLabel(): string {
  return `${CONTRATO_ALQUILER_PRECIO_BARCELONA}€–${CONTRATO_ALQUILER_PRECIO_ESPANA}€`
}

export function precioPorNombreServicio(nombre: string): number | undefined {
  return Object.values(GESTORIA_SERVICIOS).find((s) => s.nombre === nombre)?.precio
}

export function precioDesdeLabel(slug: string): string {
  return `Desde ${precioLabel(slug)}`
}
