import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Star } from '@/components/ui/Icons'

const REVIEWS = [
  {
    author: 'zonetechonline',
    time: 'Hace 16 horas',
    text: 'Tramité el contrato de arras; me ayudaron en todo el proceso de documentación. Muy ágiles, rápidos y profesionales.',
    tag: 'Contrato de arras',
  },
  {
    author: 'Alicia Fernández',
    time: 'Hace 23 horas',
    text: 'Contraté servicio de acompañamiento de compra y estoy muy contenta con el trato y la ayuda con la documentación.',
    tag: 'Acompañamiento de compra',
  },
  {
    author: 'Daniel Mercat',
    time: 'Hace 1 semana',
    text: 'Tramité un contrato de arras con Inmonest porque no me fiaba del de la agencia. Me ayudaron en puntos importantes.',
    tag: 'Contrato de arras',
  },
  {
    author: 'Wendy Bermudez',
    time: 'Hace 3 semanas · Local Guide',
    text: 'Necesitaba un contrato de arras para el piso de mi madre y el equipo jurídico nos ayudó con la gestión.',
    tag: 'Contrato de arras',
  },
] as const

function Stars({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} text-gold-400 fill-gold-400`} />
      ))}
    </div>
  )
}

export default function HomeTestimonials() {
  return (
    <Section
      className="py-16 bg-gray-50"
      eyebrow="Reseñas verificadas"
      title="Lo que dicen nuestros clientes"
      description="Valoración 5.0 en Google · casos reales de gestoría y compraventa."
    >
      <div className="flex items-center justify-center gap-2 mb-10 -mt-4">
        <Stars />
        <span className="text-lg font-bold text-gray-900">5.0</span>
        <span className="text-sm text-gray-500">· Google</span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {REVIEWS.map((r) => (
          <Card key={r.author} hover padding="md">
            <div className="flex items-start justify-between mb-3 gap-3">
              <div>
                <div className="font-semibold text-gray-900">{r.author}</div>
                <div className="text-xs text-gray-500 mt-0.5">{r.time}</div>
              </div>
              <Stars size="sm" />
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">&ldquo;{r.text}&rdquo;</p>
            <div className="mt-4">
              <span className="text-xs font-medium text-gold-700 bg-cream-100 px-2.5 py-1 rounded-full border border-gold-500/20">
                {r.tag}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="https://www.google.com/search?q=inmonest"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-gold-600 hover:text-gold-700 font-medium transition-colors"
        >
          Ver reseñas en Google
        </Link>
        <Link
          href="/gestoria"
          className="text-sm font-semibold text-white bg-gold-500 hover:bg-gold-600 px-6 py-2.5 rounded-full transition-colors"
        >
          Ver servicios de gestoría
        </Link>
      </div>
    </Section>
  )
}
