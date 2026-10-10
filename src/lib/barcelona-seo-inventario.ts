import { listBarcelonaAlquilerBarrios } from '@/lib/barcelona-contrato-alquiler-barrios'
import { listBarcelonaArrasBarrios } from '@/lib/barcelona-contrato-arras-barrios'
import {
  filterCiudadesLandingActiva,
  getLandingPrecioDisplay,
  LANDINGS_POR_CIUDAD,
} from '@/lib/gestoria-ciudades-inventario'

export const BARCELONA_SEO_BASE_URL = 'https://inmonest.com'

export type BarcelonaSeoEnlace = {
  label: string
  path: string
  url: string
  tipo: 'ciudad' | 'barrio'
}

export type BarcelonaSeoConteo = {
  /** Hub / landing solo ciudad (sin barrio en la URL) */
  landingsCiudad: number
  /** Rutas /barcelona/.../[barrio] */
  landingsBarrio: number
  totalBarcelona: number
}

export type BarcelonaSeoServicioBloque = {
  id: string
  nombre: string
  precio: string
  enlaces: BarcelonaSeoEnlace[]
  conteo: BarcelonaSeoConteo
}

function contarEnlaces(enlaces: BarcelonaSeoEnlace[]): BarcelonaSeoConteo {
  const landingsBarrio = enlaces.filter((e) => e.tipo === 'barrio').length
  const landingsCiudad = enlaces.filter((e) => e.tipo === 'ciudad').length
  return {
    landingsCiudad,
    landingsBarrio,
    totalBarcelona: enlaces.length,
  }
}

function toEnlace(label: string, path: string, tipo: 'ciudad' | 'barrio'): BarcelonaSeoEnlace {
  return {
    label,
    path,
    url: `${BARCELONA_SEO_BASE_URL}${path}`,
    tipo,
  }
}

export type BarcelonaSeoInventario = {
  servicios: BarcelonaSeoServicioBloque[]
  porServicioId: Record<string, BarcelonaSeoServicioBloque>
  totalUrls: number
  totalLandingsBarrio: number
  barriosArras: { slug: string; nombre: string }[]
  barriosAlquiler: { slug: string; nombre: string }[]
  todasLasUrls: string[]
}

/** Servicios con landing en Barcelona + desglose por barrio donde exista ruta. */
export function buildBarcelonaSeoInventario(): BarcelonaSeoInventario {
  const barriosArras = listBarcelonaArrasBarrios().map((b) => ({ slug: b.slug, nombre: b.nombre }))
  const barriosAlquiler = listBarcelonaAlquilerBarrios().map((b) => ({ slug: b.slug, nombre: b.nombre }))

  const servicios: BarcelonaSeoServicioBloque[] = []

  for (const servicio of LANDINGS_POR_CIUDAD) {
    const ciudades = filterCiudadesLandingActiva(servicio.id, servicio.ciudades)
    if (!ciudades.includes('barcelona')) continue

    const precio = getLandingPrecioDisplay(servicio)
    const enlaces: BarcelonaSeoEnlace[] = []

    if (servicio.id === 'contrato-arras') {
      enlaces.push(toEnlace('Barcelona (ciudad)', '/barcelona/contrato-arras', 'ciudad'))
      for (const b of barriosArras) {
        enlaces.push(
          toEnlace(`${b.nombre} (barrio)`, `/barcelona/contrato-arras/${b.slug}`, 'barrio')
        )
      }
    } else if (servicio.id === 'contrato-alquiler') {
      enlaces.push(toEnlace('Barcelona (ciudad)', '/barcelona/contrato-alquiler', 'ciudad'))
      for (const b of barriosAlquiler) {
        enlaces.push(
          toEnlace(`${b.nombre} (barrio)`, `/barcelona/contrato-alquiler/${b.slug}`, 'barrio')
        )
      }
    } else {
      const path = servicio.href('barcelona')
      enlaces.push(toEnlace('Barcelona', path, 'ciudad'))
    }

    servicios.push({
      id: servicio.id,
      nombre: servicio.nombre,
      precio,
      enlaces,
      conteo: contarEnlaces(enlaces),
    })
  }

  const todasLasUrls = servicios.flatMap((s) => s.enlaces.map((e) => e.url))
  const porServicioId = Object.fromEntries(servicios.map((s) => [s.id, s])) as Record<
    string,
    BarcelonaSeoServicioBloque
  >

  const totalLandingsBarrio = servicios.reduce((n, s) => n + s.conteo.landingsBarrio, 0)

  return {
    servicios,
    porServicioId,
    totalUrls: todasLasUrls.length,
    totalLandingsBarrio,
    barriosArras,
    barriosAlquiler,
    todasLasUrls,
  }
}
