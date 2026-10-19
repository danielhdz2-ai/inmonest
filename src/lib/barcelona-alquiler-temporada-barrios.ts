/**
 * Landings SEO: contrato de alquiler por temporada (estancia acotada) por barrio en Barcelona.
 * Mismos slugs que LAU; contenido derivado del barrio con enfoque temporada vs vivienda habitual.
 */

import type { BarcelonaAlquilerBarrioConfig } from '@/lib/barcelona-contrato-alquiler-barrios'
import {
  BARCELONA_ALQUILER_BARRIO_SLUGS,
  getBarcelonaAlquilerBarrio,
  listBarcelonaAlquilerBarrios,
} from '@/lib/barcelona-contrato-alquiler-barrios'

export type BarcelonaTemporadaBarrioConfig = {
  slug: string
  nombre: string
  distrito: string
  meta: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
  }
  hero: {
    badge: string
    h1: string
    subtitulo: string
    anguloPropietario: string
    anguloInquilino: string
  }
  mercado: {
    titulo: string
    intro: string
    rentaOrientativa: string
    perfilDemanda: string
    particularidad: string
  }
  normativa: {
    titulo: string
    intro: string
    bloques: { titulo: string; contenido: string; bullets?: string[] }[]
  }
  blindaje: {
    titulo: string
    intro: string
    puntos: { titulo: string; texto: string }[]
  }
  paraPropietario: {
    titulo: string
    intro: string
    bullets: string[]
  }
  paraInquilino: {
    titulo: string
    intro: string
    bullets: string[]
  }
  faqs: { q: string; a: string }[]
}

const NORMA_TEMPORADA_BASE: BarcelonaTemporadaBarrioConfig['normativa']['bloques'] = [
  {
    titulo: 'Arrendamiento de temporada vs LAU de vivienda habitual',
    contenido:
      'El alquiler por meses con causa temporal (trabajo, estudios, reforma, mudanza) no debe redactarse como un LAU de larga duración si no quieres activar prórrogas obligatorias, duración mínima catalana (5/7 años) ni confusión con vivienda habitual en zona tensionada. El contrato debe fijar fechas de inicio y fin, objeto de la temporalidad y condiciones de devolución.',
    bullets: [
      'Causa real y acotada de la estancia',
      'Sin prórroga tácita LAU si el uso es temporal',
      'Inventario recomendable en pisos amueblados',
    ],
  },
  {
    titulo: 'Fianza, renta y devolución del inmueble',
    contenido:
      'En temporada la fianza y garantías se pactan con libertad distinta al depósito legal LAU en INCASÒL. Debe quedar por escrito importe, plazo de devolución, retenciones por daños y estado de salida. Mezclar cláusulas LAU en un arrendamiento temporal genera nulidad parcial o reclasificación.',
    bullets: ['Renta mensual y forma de pago', 'Gastos de suministros', 'Resolución anticipada si se pacta'],
  },
  {
    titulo: 'Cataluña: no confundir temporada, turismo y LAU',
    contenido:
      'En Barcelona conviene distinguir estancia temporal de meses, alquiler turístico con licencia y arrendamiento LAU con índice de referencia. Un piso en área tensionada no “escapa” automáticamente a la regulación si en la práctica es vivienda habitual.',
    bullets: [
      'Uso pactado coherente con la realidad',
      'Licencia turística aparte del contrato de temporada',
      'Versión bilingüe castellano/catalán si las partes lo prefieren',
    ],
  },
]

function slugifyKeyword(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function adaptLauToTemporada(lau: BarcelonaAlquilerBarrioConfig): BarcelonaTemporadaBarrioConfig {
  const { slug, nombre, distrito } = lau
  const kw = slugifyKeyword(nombre)

  return {
    slug,
    nombre,
    distrito,
    meta: {
      title: `Contrato alquiler temporada ${nombre} Barcelona — meses sin LAU largo · 165€`,
      description: `Alquiler por meses en ${nombre} (${distrito}): contrato de temporada con fechas y fianza claras, no plantilla LAU genérica. Propietarios e inquilinos. 165 € IVA incl. · 48 h.`,
      keywords: [
        `contrato alquiler temporada ${kw}`,
        `alquiler por meses ${kw} barcelona`,
        `arrendamiento temporal ${kw}`,
        'contrato temporada barcelona particular',
        'alquiler temporal eixample gracia barcelona',
      ],
      ogTitle: `${nombre}: alquiler temporal — no mezclar con LAU habitual`,
      ogDescription: lau.mercado.particularidad.slice(0, 155),
    },
    hero: {
      badge: `${nombre} · temporada · ${distrito}`,
      h1: `Alquiler por temporada en ${nombre}: delimita fechas antes de firmar un LAU de larga duración`,
      subtitulo: `En ${nombre}, ${lau.mercado.intro.split('.')[0]}. Si la estancia es de meses (trabajo, Erasmus, reforma), el contrato debe reflejar temporalidad real — no copiar un LAU con prórrogas que no encajan.`,
      anguloPropietario: lau.hero.anguloPropietario
        .replace(/LAU/gi, 'temporada')
        .replace(/larga duración/gi, 'estancia acotada')
        .replace(/alquiler/gi, 'alquiler temporal')
        .concat(` Fechas fin, fianza y devolución del piso en ${nombre} por escrito.`),
      anguloInquilino: lau.hero.anguloInquilino
        .replace(/LAU/gi, 'temporada')
        .replace(/fianza/gi, 'fianza de temporada')
        .concat(' Confirma que no estás firmando vivienda habitual con 5 años de prórroga disfrazados.'),
    },
    mercado: {
      titulo: `Alquiler temporal en ${nombre}: mercado local`,
      intro: `${lau.mercado.intro} En esta zona también hay demanda de estancias de 3–11 meses: pisos amueblados, profesionales desplazados y propietarios entre inquilinos LAU. El contrato de temporada debe reflejar calendario real y ${lau.mercado.particularidad.charAt(0).toLowerCase()}${lau.mercado.particularidad.slice(1)}`,
      rentaOrientativa: lau.mercado.rentaOrientativa.replace(
        /larga duración|LAU|prórroga/gi,
        (m) => (m.toLowerCase().includes('lau') ? 'temporada' : m),
      ),
      perfilDemanda: `Estancias medias: ${lau.mercado.perfilDemanda.replace(/larga duración|LAU/gi, 'temporal')}`,
      particularidad: `Temporada vs LAU vs turismo: ${lau.mercado.particularidad}`,
    },
    normativa: {
      titulo: `Normativa aplicable al alquiler temporal en ${nombre}`,
      intro: `En ${nombre} (${distrito}) el riesgo habitual es firmar un LAU cuando el uso es temporal — o un “temporada” encubierto que en la práctica es vivienda habitual con IRAV e INCASÒL. Adaptamos el contrato al supuesto real.`,
      bloques: [
        ...NORMA_TEMPORADA_BASE,
        {
          titulo: `${nombre}: matiz local`,
          contenido: lau.normativa.bloques[lau.normativa.bloques.length - 1]?.contenido ?? lau.mercado.particularidad,
          bullets: [
            'Coherencia entre anuncio “por meses” y clausulado',
            'Inventario en amueblados de rotación alta',
            'Enlace conceptual con LAU si luego conviertes a habitual',
          ],
        },
      ],
    },
    blindaje: {
      titulo: `Contrato de temporada blindado en ${nombre}`,
      intro:
        'Redacción a medida (no plantilla): fechas, renta, fianza, suministros, estado del inmueble y causa de temporalidad. Gestor asignado y entrega orientativa en 48 h.',
      puntos: [
        {
          titulo: 'Tipificación correcta',
          texto: `Evita que un juez reclasifique tu alquiler en ${nombre} como LAU habitual por lagunas en duración o prórroga.`,
        },
        {
          titulo: 'Anexo de inventario',
          texto: 'Mobiliario y estado en pisos amueblados de estancia media — clave al devolver llaves.',
        },
        {
          titulo: '165 € IVA incluido',
          texto: 'Mismo precio Inmonest en todos los barrios de Barcelona; personalización incluida.',
        },
      ],
    },
    paraPropietario: {
      titulo: `Propietario: alquiler temporal en ${nombre}`,
      intro: `Alquilas por meses en ${nombre} mientras vendes, reformas o cubres un hueco entre inquilinos LAU:`,
      bullets: [
        'Fechas de ocupación y causa de temporalidad expresas',
        'Fianza y devolución fuera de la lógica LAU si procede',
        'Prohibición de subarriendo turístico sin licencia',
        ...lau.paraPropietario.bullets.slice(0, 2).map((b) => b.replace(/LAU|INCASÒL|IRAV/gi, (m) => m)),
      ],
    },
    paraInquilino: {
      titulo: `Inquilino: temporada en ${nombre}`,
      intro: `Antes de pagar fianza por un piso amueblado en ${nombre} para unos meses:`,
      bullets: [
        'Confirma fecha fin y que no hay prórroga LAU oculta',
        'Renta, suministros y limpieza final pactados',
        'Inventario firmado si el piso viene amueblado',
        ...lau.paraInquilino.bullets.slice(0, 2).map((b) => b.replace(/LAU/gi, 'temporada')),
      ],
    },
    faqs: [
      {
        q: `¿Alquiler de meses en ${nombre} es LAU o temporada?`,
        a: 'Depende del uso real y la redacción. Si es vivienda habitual con prórrogas legales, aplica LAU. Si es estancia acotada con causa temporal, conviene contrato de temporada específico. Tu gestor orienta según tu caso en Barcelona.',
      },
      {
        q: `¿Cuánto cuesta el contrato de temporada en ${nombre}?`,
        a: '165 € IVA incluido en Inmonest, mismo precio en todos los barrios: redacción personalizada, panel online y gestor asignado.',
      },
      {
        q: lau.faqs[0]?.q.replace(/LAU/gi, 'temporada') ?? `¿Entregáis en 48 horas en ${nombre}?`,
        a: 'Sí, con datos completos de propietario, inquilino e inmueble. Trámite 100 % online.',
      },
    ],
  }
}

export const BARCELONA_TEMPORADA_BARRIO_SLUGS = BARCELONA_ALQUILER_BARRIO_SLUGS

export type BarcelonaTemporadaBarrioSlug = (typeof BARCELONA_TEMPORADA_BARRIO_SLUGS)[number]

export function getBarcelonaTemporadaBarrio(slug: string): BarcelonaTemporadaBarrioConfig | undefined {
  const lau = getBarcelonaAlquilerBarrio(slug)
  if (!lau) return undefined
  return adaptLauToTemporada(lau)
}

export function getBarcelonaTemporadaBarrioPaths(): string[] {
  return BARCELONA_TEMPORADA_BARRIO_SLUGS.map((b) => `/barcelona/alquiler-temporada/${b}`)
}

export function listBarcelonaTemporadaBarrios(): BarcelonaTemporadaBarrioConfig[] {
  return listBarcelonaAlquilerBarrios().map(adaptLauToTemporada)
}
