import { getPrecioServicio } from './gestoria-catalogo'

export const ALQUILER_LOCAL_COMERCIAL_PRECIO = getPrecioServicio('alquiler-local-comercial') ?? 145

/** Rango orientativo gestoría tradicional presencial por contrato */
export function mercadoTradicionalMin() {
  return 350
}

export function mercadoTradicionalMax() {
  return 650
}

export function ahorroVsMercadoTradicional(precio: number = ALQUILER_LOCAL_COMERCIAL_PRECIO) {
  return mercadoTradicionalMin() - precio
}

export const LOCAL_COMERCIAL_COMPARATIVA = [
  {
    aspecto: 'Régimen LAU uso distinto vivienda',
    inmonest: 'Contrato adaptado al Título III LAU',
    solo: 'Plantilla genérica de vivienda',
  },
  {
    aspecto: 'Derecho de tanteo y retracto',
    inmonest: 'Cláusulas reguladas con precisión',
    solo: 'Omitido o mal redactado',
  },
  {
    aspecto: 'Obras, mejoras y estado del local',
    inmonest: 'Reparto de costes y reversión pactado',
    solo: 'Conflictos al finalizar el contrato',
  },
  {
    aspecto: 'Actualización de renta',
    inmonest: 'Fórmula IPC o libre explícita',
    solo: 'Ambigüedad y pleitos',
  },
  {
    aspecto: 'Traspaso de negocio',
    inmonest: 'Regulado según lo pactado',
    solo: 'Sin protección para propietario',
  },
  {
    aspecto: 'Gestor inmobiliario dedicado',
    inmonest: 'Asignado en 24h · WhatsApp y teléfono',
    solo: 'No tienes a nadie',
  },
  {
    aspecto: 'Coste total',
    inmonest: `${ALQUILER_LOCAL_COMERCIAL_PRECIO}€ fijos IVA incl.`,
    solo: '0€… hasta el primer impago',
  },
] as const

export const LOCAL_COMERCIAL_PASOS = [
  {
    num: '01',
    titulo: 'Primera consulta con tu gestor',
    desc: 'En menos de 24 horas un gestor inmobiliario experto te contacta. Revisamos actividad permitida, renta, duración, obras y si hay traspaso o aval bancario.',
  },
  {
    num: '02',
    titulo: 'Contratas el servicio',
    desc: `Pago único de ${ALQUILER_LOCAL_COMERCIAL_PRECIO}€ IVA incluido. Sin costes ocultos ni comisión sobre la renta.`,
  },
  {
    num: '03',
    titulo: 'Recopilación de datos',
    desc: 'Tu gestor te guía: datos del local, licencia de actividad, garantías, estado de conservación, IBI y cargas de comunidad si aplica.',
  },
  {
    num: '04',
    titulo: 'Redacción jurídica',
    desc: 'Contrato conforme LAU empresarial: duración, renta, actualización, obras, tanteo, rescisión e impago.',
  },
  {
    num: '05',
    titulo: 'Entrega y asesoramiento',
    desc: 'PDF firmable en 48h. Tu gestor resuelve dudas antes de la firma y te orienta sobre registro de contrato si la renta supera umbrales legales.',
  },
] as const

export const LOCAL_COMERCIAL_BASES_LEGALES = [
  {
    titulo: 'LAU de uso distinto de vivienda (Título III)',
    desc: 'Los locales comerciales no tienen las prórrogas obligatorias del alquiler de vivienda. La duración, la renta y las condiciones dependen casi por completo de lo pactado por escrito.',
  },
  {
    titulo: 'Libertad de pactos — y sus riesgos',
    desc: 'Sin contrato profesional, cláusulas abusivas o vacíos legales pueden dejarte sin derecho de tanteo, con obras impagadas o con un inquilino que traspasa el negocio sin tu consentimiento.',
  },
  {
    titulo: 'Licencia de actividad y compatibilidad de uso',
    desc: 'La actividad que desarrolle el arrendatario debe ser compatible con la licencia y el planeamiento urbanístico. El contrato puede condicionar la operación a la obtención de licencias.',
  },
  {
    titulo: 'Registro de contratos de larga duración',
    desc: 'Si la renta anual supera el umbral legal (9.000 € en 2026), el contrato debe inscribirse en el Registro de la Propiedad. Tu gestor te indica si aplica y qué implica.',
  },
] as const

export const LOCAL_COMERCIAL_INCLUYE = [
  'Identificación de propietario, arrendatario y local (dirección, referencia catastral)',
  'Actividad permitida y compatibilidad con licencia municipal',
  'Renta, fianza, aval bancario y forma de pago',
  'Duración, prórrogas y preaviso de resolución',
  'Actualización de renta (IPC, libre o mixta)',
  'Obras iniciales, mejoras y estado de entrega',
  'Derecho de tanteo y retracto ante venta del local',
  'Traspaso de negocio y condiciones de subarrendamiento',
  'Causas de resolución e impago de renta',
  'PDF firmable · Entrega en 48 horas laborables',
] as const

export const LOCAL_COMERCIAL_PARA_QUIEN_BASE = [
  'Propietarios de locales, bajos comerciales o naves ligeras que alquilan a autónomos o pymes',
  'Empresarios que abren tienda, oficina o taller y quieren un contrato serio antes de invertir en obras',
  'Particulares que arriendan sin pasar por agencia inmobiliaria ni pagar comisión',
  'Quien ya tiene inquilino pero solo un acuerdo verbal o borrador genérico de internet',
  'Operaciones con renta variable, periodo de carencia o obras a cargo del arrendatario',
] as const
