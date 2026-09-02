import { getPrecioServicio } from '@/lib/gestoria-catalogo'

export const CONTRATOS_INMOBILIARIOS_FAQ = [
  {
    q: '¿Qué son los contratos inmobiliarios?',
    a: 'Son los documentos legales que regulan operaciones sobre inmuebles: compraventa (arras, reserva), alquiler de vivienda (LAU), alquiler temporal, préstamos entre particulares o rescisión. Un contrato bien redactado protege a comprador, vendedor, arrendador e inquilino.',
  },
  {
    q: '¿Redactáis contratos inmobiliarios para particulares?',
    a: 'Sí. Inmonest nació como portal entre particulares y nuestra gestoría está pensada para propietarios, compradores e inquilinos que operan sin agencia. Cada contrato se personaliza con vuestros datos reales, no es una plantilla genérica.',
  },
  {
    q: '¿Cuánto cuesta redactar un contrato inmobiliario?',
    a: 'Desde 61 € (reserva de alquiler) hasta packs integrales de 450 €. Los contratos más solicitados —arras penitenciales y alquiler LAU— están a 145 € con entrega en 48 h y revisiones incluidas.',
  },
  {
    q: '¿Por qué no usar una plantilla gratuita de internet?',
    a: 'Las plantillas no se adaptan a tu CCAA, suelen incluir cláusulas nulas tras la Ley de Vivienda 2023 y no revisan la nota simple registral. Un contrato mal redactado puede costarte miles de euros en conflictos judiciales evitables.',
  },
  {
    q: '¿En qué plazo entregáis el contrato?',
    a: 'La mayoría de contratos se entregan en 24-48 h laborables en PDF firmable. Los packs documentales (due diligence, arras plus) pueden tardar 3-5 días según la complejidad del inmueble.',
  },
  {
    q: '¿Puedo gestionar todo desde la plataforma Inmonest?',
    a: 'Sí. Con una cuenta gratuita puedes solicitar contratos con datos prefilled, hacer seguimiento del estado, acceder al historial de documentos y publicar anuncios en el portal de pisos entre particulares.',
  },
] as const

export type ContratoDestacado = {
  slug: string
  nombre: string
  categoria: string
  descripcion: string
  precio: number
  imagen: string
  badge?: string
}

export const CONTRATOS_DESTACADOS: ContratoDestacado[] = [
  {
    slug: 'arras-penitenciales',
    nombre: 'Contrato de Arras Penitenciales',
    categoria: 'Compraventa',
    descripcion: 'El más solicitado en compraventa entre particulares. Protege la señal con cláusulas de desistimiento.',
    precio: getPrecioServicio('arras-penitenciales') ?? 145,
    imagen: '/gestoria1.jpg',
    badge: 'Más solicitado',
  },
  {
    slug: 'contrato-alquiler',
    nombre: 'Contrato de Alquiler LAU',
    categoria: 'Alquiler',
    descripcion: 'Arrendamiento de vivienda habitual actualizado a Ley de Vivienda 2023-2026.',
    precio: getPrecioServicio('contrato-alquiler') ?? 145,
    imagen: '/gestoria7.jpg',
    badge: 'Ley 2026',
  },
  {
    slug: 'reserva-compra',
    nombre: 'Contrato de Reserva de Compra',
    categoria: 'Compraventa',
    descripcion: 'Bloquea el inmueble 48-72 h mientras revisáis documentación antes de las arras.',
    precio: getPrecioServicio('reserva-compra') ?? 120,
    imagen: '/gestoria4.jpg',
  },
  {
    slug: 'reserva-alquiler',
    nombre: 'Contrato de Reserva de Alquiler',
    categoria: 'Alquiler',
    descripcion: 'Formaliza la reserva mientras preparáis el contrato definitivo de alquiler.',
    precio: getPrecioServicio('reserva-alquiler') ?? 61,
    imagen: '/gestoria5.jpg',
  },
  {
    slug: 'pack-arras-revision-documental',
    nombre: 'Pack Arras Plus Comprador',
    categoria: 'Compraventa',
    descripcion: 'Arras + revisión documental integral del inmueble antes de escriturar.',
    precio: getPrecioServicio('pack-arras-revision-documental') ?? 450,
    imagen: '/gestoria10.jpg',
    badge: 'Compradores',
  },
  {
    slug: 'prestamo-particulares',
    nombre: 'Préstamo entre Particulares',
    categoria: 'Financiación',
    descripcion: 'Formaliza préstamos familiares con validez jurídica y fiscal ante Hacienda.',
    precio: getPrecioServicio('prestamo-particulares') ?? 130,
    imagen: '/gestoria9.jpg',
    badge: 'Capital privado',
  },
]

/** Ciudades para bloque SEO local (fase 2: landings dedicadas) */
export const CONTRATOS_CIUDADES_LOCAL = [
  { slug: 'madrid', label: 'Madrid', href: '/contratos-inmobiliarios/madrid' },
  { slug: 'barcelona', label: 'Barcelona', href: '/contratos-inmobiliarios/barcelona' },
  { slug: 'valencia', label: 'Valencia', href: '/contratos-inmobiliarios/valencia' },
  { slug: 'sevilla', label: 'Sevilla', href: '/contratos-inmobiliarios/sevilla' },
  { slug: 'malaga', label: 'Málaga', href: '/contratos-inmobiliarios/malaga' },
  { slug: 'bilbao', label: 'Bilbao', href: '/contratos-inmobiliarios/bilbao' },
  { slug: 'zaragoza', label: 'Zaragoza', href: '/contratos-inmobiliarios/zaragoza' },
  { slug: 'alicante', label: 'Alicante', href: '/contratos-inmobiliarios/alicante' },
  { slug: 'palma', label: 'Palma', href: '/contratos-inmobiliarios/palma' },
] as const
