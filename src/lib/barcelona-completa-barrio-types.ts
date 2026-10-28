export type BarcelonaCompletaBarrioConfig = {
  slug: string
  nombre: string
  distrito: string
  heroImage: string
  meta: {
    title: string
    description: string
    keywords: string
    ogTitle: string
    ogDescription: string
  }
  hero: {
    h1: string
    lead: string
  }
  mercado: {
    titulo: string
    intro: string
    puntos: string[]
  }
  faqs: { q: string; a: string }[]
}
