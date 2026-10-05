/** Tipos compartidos landings arras por barrio (Barcelona). */

export type BarcelonaArrasBarrioConfig = {
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
    anguloComprador: string
    anguloVendedor: string
  }
  mercado: {
    titulo: string
    intro: string
    precioOrientativo: string
    perfilComprador: string
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
  paraComprador: {
    titulo: string
    intro: string
    bullets: string[]
  }
  paraVendedor: {
    titulo: string
    intro: string
    bullets: string[]
  }
  faqs: { q: string; a: string }[]
  contenidoUnico: {
    tituloSeccion: string
    lead: string
    escenarioLocal: string
    erroresEvitados: { titulo: string; detalle: string }[]
  }
}
