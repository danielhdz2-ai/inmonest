/** Portales de fondos bancarios / servicers permitidos en el catálogo público */
export const BANK_SOURCE_PORTALS = [
  'solvia.es',
  'solvia',
  'alisedainmobiliaria.com',
  'aliseda.es',
  'aliseda',
  'hipoges',
  'servihabitat',
] as const

/** Portales scrapeados que ya no deben alimentar el catálogo */
export const RETIRED_SOURCE_PORTALS = [
  'pisos.com',
  'milanuncios.com',
  'milanuncios',
  'fotocasa',
  'habitaclia.com',
  'habitaclia',
  'tecnocasa',
  'redpiso',
  'monapart',
  'gilmar.es',
  'gilmar',
  'indomio',
  'properstar',
  'enalquiler',
  'wallapop',
  'yaencontre',
] as const

/** Catálogo /pisos: solo chollos bancarios */
export const PUBLIC_LISTINGS_BANK_ONLY = true
