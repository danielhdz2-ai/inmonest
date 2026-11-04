import { listBarcelonaAlquilerBarrios } from '@/lib/barcelona-contrato-alquiler-barrios'
import { listBarcelonaArrasBarrios } from '@/lib/barcelona-contrato-arras-barrios'
import { listBarcelonaHabitacionBarrios } from '@/lib/barcelona-alquiler-habitacion-barrios'
import { listBarcelonaTemporadaBarrios } from '@/lib/barcelona-alquiler-temporada-barrios'
import { listBarcelonaCompraCompletaBarrios } from '@/lib/barcelona-compra-completa-barrios'
import { listBarcelonaVentaCompletaBarrios } from '@/lib/barcelona-venta-completa-barrios'
import { listBarcelonaPackArrasDocumentalBarrios } from '@/lib/barcelona-pack-arras-documental-barrios'
import { BARCELONA_PACK_ARRAS_COMPRADOR_BASE } from '@/lib/barcelona-pack-arras-documental-barrios'
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
  barriosTemporada: { slug: string; nombre: string }[]
  barriosCompraCompleta: { slug: string; nombre: string }[]
  barriosVentaCompleta: { slug: string; nombre: string }[]
  barriosHabitacion: { slug: string; nombre: string }[]
  barriosPackArrasDocumental: { slug: string; nombre: string }[]
  todasLasUrls: string[]
}

/** Servicios con landing en Barcelona + desglose por barrio donde exista ruta. */
export function buildBarcelonaSeoInventario(): BarcelonaSeoInventario {
  const barriosArras = listBarcelonaArrasBarrios().map((b) => ({ slug: b.slug, nombre: b.nombre }))
  const barriosAlquiler = listBarcelonaAlquilerBarrios().map((b) => ({ slug: b.slug, nombre: b.nombre }))
  const barriosTemporada = listBarcelonaTemporadaBarrios().map((b) => ({ slug: b.slug, nombre: b.nombre }))
  const barriosHabitacion = listBarcelonaHabitacionBarrios().map((b) => ({ slug: b.slug, nombre: b.nombre }))
  const barriosCompraCompleta = listBarcelonaCompraCompletaBarrios().map((b) => ({
    slug: b.slug,
    nombre: b.nombre,
  }))
  const barriosVentaCompleta = listBarcelonaVentaCompletaBarrios().map((b) => ({
    slug: b.slug,
    nombre: b.nombre,
  }))
  const barriosPackArrasDocumental = listBarcelonaPackArrasDocumentalBarrios().map((b) => ({
    slug: b.slug,
    nombre: b.nombre,
  }))

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
    } else if (servicio.id === 'contrato-alquiler-habitacion') {
      enlaces.push(
        toEnlace('Barcelona (ciudad)', '/gestoria/contrato-alquiler-habitacion/barcelona', 'ciudad')
      )
      for (const b of listBarcelonaHabitacionBarrios()) {
        enlaces.push(
          toEnlace(
            `${b.nombre} (barrio)`,
            `/barcelona/contrato-alquiler-habitacion/${b.slug}`,
            'barrio'
          )
        )
      }
    } else if (servicio.id === 'alquiler-temporada') {
      enlaces.push(toEnlace('Barcelona (ciudad)', '/barcelona/alquiler-temporada', 'ciudad'))
      for (const b of listBarcelonaTemporadaBarrios()) {
        enlaces.push(
          toEnlace(`${b.nombre} (barrio)`, `/barcelona/alquiler-temporada/${b.slug}`, 'barrio')
        )
      }
    } else if (servicio.id === 'compra-completa') {
      enlaces.push(
        toEnlace(
          'Barcelona (hub gestoría)',
          '/gestoria/compra-completa-reserva-escritura/barcelona',
          'ciudad'
        )
      )
      for (const b of barriosCompraCompleta) {
        enlaces.push(
          toEnlace(`${b.nombre} (barrio)`, `/barcelona/compra-completa/${b.slug}`, 'barrio')
        )
      }
    } else if (servicio.id === 'venta-completa') {
      enlaces.push(
        toEnlace(
          'Barcelona (hub gestoría)',
          '/gestoria/venta-completa-reserva-escritura/barcelona',
          'ciudad'
        )
      )
      for (const b of barriosVentaCompleta) {
        enlaces.push(
          toEnlace(`${b.nombre} (barrio)`, `/barcelona/venta-completa/${b.slug}`, 'barrio')
        )
      }
    } else if (servicio.id === 'pack-arras-documental') {
      enlaces.push(
        toEnlace(
          'Barcelona (hub gestoría)',
          '/gestoria/pack-arras-revision-documental/barcelona',
          'ciudad'
        )
      )
      for (const b of listBarcelonaPackArrasDocumentalBarrios()) {
        enlaces.push(
          toEnlace(
            `${b.nombre} (barrio)`,
            `${BARCELONA_PACK_ARRAS_COMPRADOR_BASE}/${b.slug}`,
            'barrio'
          )
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
    barriosTemporada,
    barriosCompraCompleta,
    barriosVentaCompleta,
    barriosHabitacion,
    barriosPackArrasDocumental,
    todasLasUrls,
  }
}
