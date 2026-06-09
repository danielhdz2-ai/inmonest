import { CONTRATO_ARRAS_PREMIUM } from './contrato-arras-premium-config'
import { CONTRATO_ALQUILER_PREMIUM } from './contrato-alquiler-premium-config'

export type CiudadRef = {
  slug: string
  nombre: string
}

export type LandingPorCiudad = {
  id: string
  nombre: string
  precio?: string
  href: (ciudad: string) => string
  ciudades: string[]
}

const NOMBRES_EXTRA: Record<string, string> = {
  salamanca: 'Salamanca',
  valladolid: 'Valladolid',
  granada: 'Granada',
  coruna: 'A Coruña',
  palma: 'Palma de Mallorca',
  mallorca: 'Mallorca',
  asturias: 'Asturias',
}

export function getNombreCiudad(slug: string): string {
  return (
    CONTRATO_ARRAS_PREMIUM[slug]?.nombre ??
    CONTRATO_ALQUILER_PREMIUM[slug]?.nombre ??
    NOMBRES_EXTRA[slug] ??
    slug.charAt(0).toUpperCase() + slug.slice(1)
  )
}

export const CIUDADES_DESTACADAS: CiudadRef[] = [
  'madrid',
  'barcelona',
  'valencia',
  'sevilla',
  'malaga',
  'salamanca',
  'valladolid',
  'bilbao',
  'zaragoza',
  'alicante',
  'granada',
].map((slug) => ({ slug, nombre: getNombreCiudad(slug) }))

const CIUDADES_PORTAL = ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao', 'zaragoza', 'alicante']

export const LANDINGS_GENERICAS = [
  { slug: 'asesoria-compra-piso', nombre: 'Asesoría Compra de Piso', precio: '687€' },
  { slug: 'due-diligence-precompra', nombre: 'Due Diligence Pre-Compra', precio: '350€' },
  { slug: 'asesoramiento-arras-venta', nombre: 'Asesoramiento Arras a Venta', precio: '166€' },
  { slug: 'arras-vs-reserva-compra', nombre: 'Arras vs Reserva Compra', precio: 'Info' },
  { slug: 'guia-arras-penitenciales', nombre: 'Guía Arras Penitenciales', precio: 'Info' },
  { slug: 'revision-contrato-arras', nombre: 'Revisión Contrato Arras', precio: '60€' },
  { slug: 'contrato-compraventa', nombre: 'Contrato Compraventa', precio: '80€' },
  { slug: 'cuanto-cuesta-contrato-alquiler', nombre: 'Cuánto Cuesta Contrato Alquiler', precio: 'Info' },
  { slug: 'revision-contrato-alquiler', nombre: 'Revisión Contrato Alquiler', precio: '60€' },
  { slug: 'contrato-ilegal', nombre: 'Análisis Contrato Ilegal', precio: '29€' },
  { slug: 'ayuda-propietarios', nombre: 'Ayuda Propietarios LAU', precio: '120€' },
  { slug: 'contrato-arras', nombre: 'Contrato Arras (Info)', precio: '145€' },
  { slug: 'venta-completa-reserva-escritura', nombre: 'Venta Completa Genérica', precio: '687€' },
] as const

export const LANDINGS_POR_CIUDAD: LandingPorCiudad[] = [
  {
    id: 'contrato-arras',
    nombre: 'Contrato de Arras Penitenciales',
    precio: '145€',
    href: (c) => `/${c}/contrato-arras`,
    ciudades: Object.keys(CONTRATO_ARRAS_PREMIUM).sort(),
  },
  {
    id: 'contrato-alquiler',
    nombre: 'Contrato de Alquiler LAU',
    precio: '120€',
    href: (c) => `/${c}/contrato-alquiler`,
    ciudades: [...new Set([...Object.keys(CONTRATO_ALQUILER_PREMIUM), 'granada'])].sort(),
  },
  {
    id: 'gestoria-hub',
    nombre: 'Gestoría Ciudad (Hub)',
    precio: 'Desde 120€',
    href: (c) => `/gestoria/${c}`,
    ciudades: ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'bilbao', 'palma', 'zaragoza', 'alicante'],
  },
  {
    id: 'venta-completa',
    nombre: 'Venta Completa hasta Escritura',
    precio: '687€',
    href: (c) => `/gestoria/venta-completa-reserva-escritura/${c}`,
    ciudades: ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga', 'salamanca', 'valladolid'],
  },
  {
    id: 'due-diligence',
    nombre: 'Due Diligence Pre-Compra',
    precio: '350€',
    href: (c) => `/gestoria/due-diligence-precompra/${c}`,
    ciudades: ['madrid', 'barcelona'],
  },
  {
    id: 'alquiler-particulares',
    nombre: 'Alquiler de Particulares',
    precio: 'Portal',
    href: (c) => `/${c}/alquiler-particulares`,
    ciudades: CIUDADES_PORTAL,
  },
  {
    id: 'alquiler-sin-agencia',
    nombre: 'Alquiler sin Agencia',
    precio: 'Portal',
    href: (c) => `/${c}/alquiler-sin-agencia`,
    ciudades: CIUDADES_PORTAL,
  },
  {
    id: 'vender-piso',
    nombre: 'Vender Piso en Ciudad',
    precio: 'Portal',
    href: (c) => `/${c}/vender-piso`,
    ciudades: CIUDADES_PORTAL,
  },
  {
    id: 'pisos-ciudad',
    nombre: 'Pisos en Ciudad',
    precio: 'Portal',
    href: (c) => `/${c}/pisos`,
    ciudades: CIUDADES_PORTAL,
  },
  {
    id: 'pisos-sin-comision',
    nombre: 'Pisos Particulares sin Comisión',
    precio: 'Portal',
    href: (c) => `/${c}/pisos-particulares-sin-comision`,
    ciudades: ['madrid', 'barcelona', 'valencia', 'sevilla', 'malaga'],
  },
]

export function contarLandingsPorCiudad(): number {
  return LANDINGS_POR_CIUDAD.reduce((sum, s) => sum + s.ciudades.length, 0)
}

export const SERVICIOS_GUIA = [
  {
    titulo: 'Gestoría Inmobiliaria',
    descripcion: 'Asesoría completa para comprar, vender o alquilar tu propiedad',
    slug: 'gestoria',
    imagen: '/gestoria2.jpg',
    categoria: 'Gestoría',
  },
  {
    titulo: 'Contrato de Arras',
    descripcion: 'Redacción profesional de contratos de señal y arras penitenciales',
    slug: 'contrato-arras',
    imagen: '/gestoria1.jpg',
    categoria: 'Compraventa',
  },
  {
    titulo: 'Contrato de Alquiler',
    descripcion: 'Contratos LAU con todas las cláusulas legales actualizadas',
    slug: 'ayuda-propietarios',
    imagen: '/gestoria4.jpg',
    categoria: 'Alquiler',
  },
  {
    titulo: 'Acompañamiento de Venta',
    descripcion: 'Te ayudamos en todo el proceso de venta de tu propiedad',
    slug: 'asesoramiento-arras-venta',
    imagen: '/gestoria10.jpg',
    categoria: 'Premium',
  },
  {
    titulo: 'Revisión Contrato Alquiler',
    descripcion: 'Revisión legal de contratos de alquiler existentes',
    slug: 'revision-contrato-alquiler',
    imagen: '/gestoria7.jpg',
    categoria: 'Revisión',
  },
  {
    titulo: 'Contrato de Compraventa',
    descripcion: 'Contratos privados de compraventa inmobiliaria',
    slug: 'contrato-compraventa',
    imagen: '/gestoria3.jpg',
    categoria: 'Compraventa',
  },
  {
    titulo: 'Venta Completa + Escritura',
    descripcion: 'Servicio integral desde reserva hasta firma en notaría',
    slug: 'venta-completa-reserva-escritura',
    imagen: '/gestoria11.jpg',
    categoria: 'Premium',
  },
  {
    titulo: 'Asesoría Compra de Piso',
    descripcion: 'Asesoramiento experto antes de comprar tu vivienda',
    slug: 'asesoria-compra-piso',
    imagen: '/gestoria3.jpg',
    categoria: 'Premium',
  },
] as const

export const CIUDADES_SEO = [
  { slug: 'madrid', nombre: 'Madrid', texto: 'Contratos de arras, alquiler LAU, compraventa' },
  { slug: 'barcelona', nombre: 'Barcelona', texto: 'Cesión de contrato, alquiler turístico, compraventa' },
  { slug: 'valencia', nombre: 'Valencia', texto: 'Contratos de alquiler, arras, asesoría compra' },
  { slug: 'sevilla', nombre: 'Sevilla', texto: 'Venta sin agencia, contratos LAU, due diligence' },
  { slug: 'malaga', nombre: 'Málaga', texto: 'Venta completa reserva→escritura, costa y centro' },
  { slug: 'bilbao', nombre: 'Bilbao', texto: 'Contratos LAU, arras y normativa foral vasca' },
  { slug: 'palma', nombre: 'Palma', texto: 'Normativa balear, IBAVI, zonas tensionadas' },
  { slug: 'zaragoza', nombre: 'Zaragoza', texto: 'Contratos de alquiler y arras, mercado en crecimiento' },
  { slug: 'alicante', nombre: 'Alicante', texto: 'Costa blanca, compradores extranjeros, cédula habitabilidad' },
  { slug: 'salamanca', nombre: 'Salamanca', texto: 'Venta universitaria, casco histórico, Castilla y León' },
  { slug: 'valladolid', nombre: 'Valladolid', texto: 'Venta particular, compradores desde Madrid, provincia' },
] as const
