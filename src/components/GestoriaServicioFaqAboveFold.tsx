type FaqItem = { q: string; a: string }

type Props = {
  title: string
  faqs: FaqItem[]
  limit?: number
}

/** FAQ visible bajo el hero (CTR + rich results en servicios con imp. GSC). */
export default function GestoriaServicioFaqAboveFold({ title, faqs, limit = 4 }: Props) {
  const items = faqs.slice(0, limit)
  if (items.length === 0) return null

  return (
    <section className="border-b border-gray-100 bg-white py-10 px-4">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
        <dl className="space-y-5">
          {items.map((item) => (
            <div key={item.q}>
              <dt className="text-sm font-semibold text-gray-900 mb-1">{item.q}</dt>
              <dd className="text-sm text-gray-600 leading-relaxed">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
