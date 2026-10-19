/**
 * Landings SEO: contrato de alquiler por temporada (estancia acotada) por barrio en Barcelona.
 * Contenido diferenciado por barrio (títulos, mercado, destacados) — mismos slugs que LAU.
 */

import {
  BARCELONA_ALQUILER_BARRIO_SLUGS,
  getBarcelonaAlquilerBarrio,
} from '@/lib/barcelona-contrato-alquiler-barrios'
import { TEMPORADA_DIFERENCIADORES_1 } from '@/lib/barcelona-alquiler-temporada-diferenciadores-1'
import { TEMPORADA_DIFERENCIADORES_2 } from '@/lib/barcelona-alquiler-temporada-diferenciadores-2'

export type BarcelonaTemporadaBarrioDiferenciador = {
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
  normativaLocal: {
    titulo: string
    contenido: string
    bullets?: string[]
  }
  destacados: {
    titulo: string
    etiquetas: string[]
    casos: string[]
    riesgos: { titulo: string; texto: string }[]
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

export type BarcelonaTemporadaBarrioConfig = {
  slug: string
  nombre: string
  distrito: string
  meta: BarcelonaTemporadaBarrioDiferenciador['meta']
  hero: BarcelonaTemporadaBarrioDiferenciador['hero']
  mercado: BarcelonaTemporadaBarrioDiferenciador['mercado']
  destacados: BarcelonaTemporadaBarrioDiferenciador['destacados']
  normativa: {
    titulo: string
    intro: string
    bloques: { titulo: string; contenido: string; bullets?: string[] }[]
  }
  blindaje: BarcelonaTemporadaBarrioDiferenciador['blindaje']
  paraPropietario: BarcelonaTemporadaBarrioDiferenciador['paraPropietario']
  paraInquilino: BarcelonaTemporadaBarrioDiferenciador['paraInquilino']
  faqs: BarcelonaTemporadaBarrioDiferenciador['faqs']
  /** Bloque «Trámite 100 % online» distinto al hero */
  tramiteOnline: {
    titulo: string
    desc: string
    overlaySubtitulo: string
    imagenAlt: string
  }
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
      'En temporada la fianza y garantías se pactan con libertad distinta al depósito legal LAU en INCASÒL. Debe quedar por escrito importe, plazo de devolución, retenciones por daños y estado de salida.',
    bullets: ['Renta mensual y forma de pago', 'Gastos de suministros', 'Resolución anticipada si se pacta'],
  },
  {
    titulo: 'Cataluña: no confundir temporada, turismo y LAU',
    contenido:
      'En Barcelona conviene distinguir estancia temporal de meses, alquiler turístico con licencia y arrendamiento LAU con índice de referencia.',
    bullets: [
      'Uso pactado coherente con la realidad',
      'Licencia turística aparte del contrato de temporada',
      'Versión bilingüe castellano/catalán si las partes lo prefieren',
    ],
  },
]

const TEMPORADA_DIFERENCIADORES: Record<
  BarcelonaTemporadaBarrioSlug,
  BarcelonaTemporadaBarrioDiferenciador
> = {
  ...TEMPORADA_DIFERENCIADORES_1,
  ...TEMPORADA_DIFERENCIADORES_2,
}

function buildConfig(slug: BarcelonaTemporadaBarrioSlug): BarcelonaTemporadaBarrioConfig {
  const lau = getBarcelonaAlquilerBarrio(slug)
  const d = TEMPORADA_DIFERENCIADORES[slug]
  if (!lau || !d) {
    throw new Error(`Missing temporada config for ${slug}`)
  }

  return {
    slug,
    nombre: lau.nombre,
    distrito: lau.distrito,
    meta: d.meta,
    hero: d.hero,
    mercado: d.mercado,
    destacados: d.destacados,
    normativa: {
      titulo: `Normativa · temporada en ${lau.nombre}`,
      intro: `Marco estatal y catalán aplicable a estancias acotadas en ${lau.nombre} (${lau.distrito}), más el matiz local del barrio.`,
      bloques: [
        ...NORMA_TEMPORADA_BASE,
        {
          titulo: d.normativaLocal.titulo,
          contenido: d.normativaLocal.contenido,
          bullets: d.normativaLocal.bullets,
        },
      ],
    },
    blindaje: d.blindaje,
    paraPropietario: d.paraPropietario,
    paraInquilino: d.paraInquilino,
    faqs: d.faqs,
    tramiteOnline: {
      titulo: `${d.mercado.titulo}: redacción online en 48 h`,
      desc: `${d.mercado.particularidad} Subes documentación en el panel, tu gestor redacta el contrato de temporada (no LAU genérico) y recibes PDF firmable.`,
      overlaySubtitulo: `${lau.nombre} · ${d.destacados.etiquetas.slice(0, 3).join(' · ')}`,
      imagenAlt: `Contrato alquiler temporada ${lau.nombre} Barcelona — trámite online`,
    },
  }
}

export const BARCELONA_TEMPORADA_BARRIO_SLUGS = BARCELONA_ALQUILER_BARRIO_SLUGS

export type BarcelonaTemporadaBarrioSlug = (typeof BARCELONA_TEMPORADA_BARRIO_SLUGS)[number]

export const BARCELONA_TEMPORADA_BARRIOS = Object.fromEntries(
  BARCELONA_TEMPORADA_BARRIO_SLUGS.map((slug) => [slug, buildConfig(slug)]),
) as Record<BarcelonaTemporadaBarrioSlug, BarcelonaTemporadaBarrioConfig>

export function getBarcelonaTemporadaBarrio(slug: string): BarcelonaTemporadaBarrioConfig | undefined {
  if (!(BARCELONA_TEMPORADA_BARRIO_SLUGS as readonly string[]).includes(slug)) return undefined
  return BARCELONA_TEMPORADA_BARRIOS[slug as BarcelonaTemporadaBarrioSlug]
}

export function getBarcelonaTemporadaBarrioPaths(): string[] {
  return BARCELONA_TEMPORADA_BARRIO_SLUGS.map((b) => `/barcelona/alquiler-temporada/${b}`)
}

export function listBarcelonaTemporadaBarrios(): BarcelonaTemporadaBarrioConfig[] {
  return BARCELONA_TEMPORADA_BARRIO_SLUGS.map((s) => BARCELONA_TEMPORADA_BARRIOS[s])
}
