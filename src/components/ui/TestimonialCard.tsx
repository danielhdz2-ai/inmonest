import { Card } from './Card'
import { Star } from './Icons'

type TestimonialCardProps = {
  author: string
  time: string
  text: string
  tag?: string
}

function Stars({ size = 'sm' }: { size?: 'sm' | 'md' }) {
  const cls = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} text-gold-400 fill-gold-400`} />
      ))}
    </div>
  )
}

export function TestimonialCard({ author, time, text, tag }: TestimonialCardProps) {
  return (
    <Card hover padding="md">
      <div className="flex items-start justify-between mb-3 gap-3">
        <div>
          <div className="font-semibold text-gray-900">{author}</div>
          <div className="text-xs text-gray-500 mt-0.5">{time}</div>
        </div>
        <Stars size="sm" />
      </div>
      <p className="text-gray-600 leading-relaxed text-sm">&ldquo;{text}&rdquo;</p>
      {tag && (
        <div className="mt-4">
          <span className="text-xs font-medium text-gold-700 bg-cream-100 px-2.5 py-1 rounded-full border border-gold-500/20">
            {tag}
          </span>
        </div>
      )}
    </Card>
  )
}
