/** Firma electrónica avanzada incluida en todos los servicios de gestoría Inmonest */
export const FIRMACERT_URL = 'https://www.firmacert.com'

export const FIRMACERT_INCLUYE_ITEM =
  'Firma electrónica avanzada certificada con FIRMACERT (eIDAS) — incluida sin coste extra'

export function withFirmaCertIncluido(items: readonly string[]): string[] {
  if (items.some((item) => item.toLowerCase().includes('firmacert'))) {
    return [...items]
  }
  return [...items, FIRMACERT_INCLUYE_ITEM]
}
