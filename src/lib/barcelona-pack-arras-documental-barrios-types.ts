import type { PackArrasDocumentalFaqItem } from '@/lib/pack-arras-documental-ciudad-faq'
import type { PackArrasBarrioPrecio, PackArrasCasoReal } from '@/lib/pack-arras-documental-ciudad-data'

export type BarcelonaPackArrasDocumentalBarrioConfig = {
  slug: string
  nombre: string
  distrito: string
  testimoniosLanding: string
  precioEjemploPiso: number
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: {
    badge: string
    h1: string
    lead: string
  }
  mercado: {
    titulo: string
    intro: string
    precioOrientativo: string
    perfilComprador: string
    riesgoDocumental: string
  }
  paraComprador: {
    titulo: string
    intro: string
    bullets: string[]
  }
  guiaBarrio: {
    titulo: string
    parrafos: string[]
  }
  contenidoUnico: {
    tituloSeccion: string
    lead: string
    escenarioLocal: string
    erroresEvitados: Array<{ titulo: string; detalle: string }>
  }
  riesgosBarrio: Array<{ titulo: string; desc: string }>
  casosBarrio: PackArrasCasoReal[]
  barriosPrecio: PackArrasBarrioPrecio[]
  faqs: PackArrasDocumentalFaqItem[]
}
